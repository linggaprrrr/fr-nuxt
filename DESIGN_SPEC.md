# Product Design Specification — Form & Dialog System

**Product:** Ownize admin (`dufansnap`)
**Stack:** Nuxt 3 · Vuetify 3.12.8 · SCSS
**Status:** Proposal
**Supersedes:** the form/dialog sections of `DESIGN_SYSTEM.md`

---

## 0. Thesis

> The app doesn't look like default Vuetify because of *bad taste*. It looks like default Vuetify
> because of **four defaults nobody has overridden**: Roboto, 56px Material fields, floating labels,
> and elevation-based shadows. Kill those four and the product changes character before a single
> page is refactored.

Everything in this spec is downstream of that. The audit is grounded in a measured pass over
the repo, not impressions:

| Measured | Count | Where |
|---|---:|---|
| Page files | 48 | `pages/**` |
| Form controls in real app code | **199** | 120 `VTextField`, 53 `VSelect`, 12 `VSwitch`, 6 `VTextarea`, 6 `VCheckbox`, 2 `VFileInput` |
| `density="compact"` overrides | **93** | …against a `comfortable` default in `defaults.ts` |
| `density="comfortable"` overrides | 3 | |
| `variant="outlined"` written by hand | **90** | …already the default in `defaults.ts` |
| Hardcoded hex colors | **103** | incl. **16 × `#4f46e5` indigo** in a navy-branded app |
| Inline `style="…"` attributes | **156** | `pages/`, `components/` |
| Fields with both `label` **and** `placeholder` | **37** (6 in real code) | the overlap bug |
| Raw `<VDialog>` bypassing `AppModal` | **14** in 5 pages + 2 editors | vs 22 `AppModal` |
| Configured web font | **0** | `"Public Sans"` is declared and never loaded |

The last row is the headline. `@core/scss/template/libs/vuetify/_variables.scss:3` declares
`$font-family-custom: "Public Sans", sans-serif, …`, but there is no `@font-face`, no Google Fonts
link, no `@fontsource` package anywhere in the project. `roboto-fontface` *is* in `package.json`.
**The intended typeface has never rendered a single time in production.** Every screenshot in this
review is Roboto or a generic fallback — which is precisely the "default Vuetify" feeling.

---

# 1. UX Audit

Issues are ranked by damage. Each states the mechanism, not just the symptom.

## 1.1 Critical — the label/value collision is a code bug, not a styling opinion

`pages/admin/kiosk-fleet.vue:185-195`

```vue
<VTextField
  v-model.number="stockInitial"
  label="Jumlah Kertas Terpasang"
  placeholder="cth: 1000"      <!-- ← this line is the bug -->
  variant="outlined"
/>
```

The project's own `DESIGN_SYSTEM.md:68` already forbids this:

> Never set both `label` and `placeholder` on the same `VTextField`/`VSelect`. In
> `variant="outlined"` the label sits inside the field when unfocused (acting as the placeholder) —
> adding `placeholder` on top causes them to overlap.

**Note the doc drift:** `CLAUDE.md` attributes this class of bug to a *missing* `variant="outlined"`.
The field above already has `variant="outlined"` and still collides. The documented remedy does not
cover the documented rule. Both files need correcting.

Remaining live instances: `pages/login.vue` (2), `pages/register.vue` (3), `kiosk-fleet.vue` (1).
The other 31 are in vendored Sneat demo views (`views/pages/form-layouts/*`,
`views/pages/account-settings/*`) which should be deleted, not fixed — they are template samples,
not product surface.

**Why this hurts:** the field's accessible name and its value occupy the same pixels. A screen
reader announces a label the sighted user cannot read; the sighted user cannot tell whether the
field is empty or filled. It is a correctness failure, not an aesthetic one.

**Root cause beyond this one field:** floating labels are a state machine (rest ⇄ floated) whose
correctness depends on Vuetify's `isDirty` inference. Any input where dirtiness is ambiguous —
`type="number"` with `0`/`null`, custom `v-model` shapes, values set after mount, a co-present
`placeholder` — can desynchronise it. Section 3.1 removes the state machine entirely.

## 1.2 Critical — defaults nobody trusts

`plugins/vuetify/defaults.ts` sets `density: 'comfortable'` on every input. Pages then write
`density="compact"` **93 times** and `comfortable` 3 times, plus `variant="outlined"` **90 times**
when that is already the default.

This is the most reliable signal in the codebase: **the default is wrong, and every author knows
it.** 183 attributes exist solely to fight the config. That is 183 chances to forget one, which is
exactly why densities drift between pages.

**Why this hurts:** a default that is overridden 96% of the time provides no consistency guarantee
at all. It provides the *illusion* of one, which is worse — reviewers stop checking.

## 1.3 High — the spacing between a field and its own helper text equals the spacing to the next field

In the screenshot, the hint under "Jumlah Kertas Terpasang" sits roughly as far from its own input
as the next input sits from the hint. Gestalt proximity therefore groups the helper with the
**wrong** field. Readers must parse the sentence to work out what it describes.

The mechanism is compound spacing that nobody authored deliberately:

```
VRow/VCol gutter            12px (VCol bottom padding)
+ .v-input__details         ~6px + line-height of a 2-line hint
+ VCol top padding          12px
= a variable 40–52px gap that changes per field depending on hint length
```

Fields *without* a hint get 24px. Fields with a one-line hint get ~44px. Two lines, ~62px. **The
vertical rhythm is a function of copy length.** That is the "inconsistent vertical spacing" the
brief names, and no amount of restyling fixes it while `VRow`/`VCol` gutters carry form layout.

## 1.4 High — helper text is doing a job it cannot do

The hint on the stock field reads: *"Isi setelah mengganti kertas/ribbon — hitungan tercetak
otomatis kembali ke 0."*

**Saving this form resets a counter to zero.** That is a destructive side effect, and it is
communicated in 12px, 70%-opacity, secondary-emphasis text — the single lowest-salience slot in
the entire design system. Helper text is where users' eyes go *last*, if at all.

**Why this hurts:** it is a data-loss warning styled as a footnote. Section 5 moves it to an
`InlineAlert` that appears only when the value actually changes.

Contrast, separately: Vuetify renders `.v-messages` with `opacity: var(--v-medium-emphasis-opacity)`
= `0.7`. On `#22303E` over white that computes to roughly `#62707c` — about **4.9:1**, which passes
AA by a small margin on white *only*. The same 70% opacity over a tonal `VAlert`, a grey table
stripe, or any tinted surface drops below 4.5:1. **Opacity-based text color is not contrast-safe by
construction**, because its result depends on whatever happens to be behind it.

## 1.5 High — the primary action has no more weight than Cancel

Footer today:

```vue
<VBtn variant="tonal" color="secondary">Batal</VBtn>   <!-- filled grey pill -->
<VBtn color="primary" variant="flat">Simpan</VBtn>     <!-- filled navy pill -->
```

Two filled buttons of near-identical size and identical shape sit side by side. The only difference
is hue. For the ~8% of men with a red-green deficiency the pair is still distinguishable here
(navy vs grey), but the *hierarchy* is carried entirely by saturation — a weak channel. Cancel is
the safe, reversible, high-frequency-in-error action; it should recede to a ghost button. A tonal
grey fill actively advertises it.

## 1.6 Medium — the dialog is horizontally roomy and vertically starved

`max-width="480"` with `app-modal__body { padding: 1.25rem }` (20px), plus `VCol` gutters adding
another 12px inside that. So:

- **Horizontal:** 20 + 12 = 32px of inset per side. Content column ≈ 416px for two number inputs
  that need maybe 120px each. Enormous slack.
- **Vertical:** three different paddings — header `1rem 1.25rem`, body `1.25rem`, footer
  `0.875rem 1.25rem`. 16 / 20 / 14. Nothing aligns to a scale, and the optical top and bottom
  margins of the dialog differ by 6px.

**Why this hurts:** the eye reads the uneven header/footer inset as misalignment without being able
to name it. It is the main reason the dialog "feels heavy" while the form "feels compressed."

## 1.7 Medium — border noise

The 480px dialog contains, top to bottom: dialog edge, header divider, field 1 border, field 2
border, alert border, footer divider, dialog edge. **Seven horizontal rules in ~400px of height**,
all at the same 1px weight and near-identical color. None of them encodes hierarchy — they are all
saying "a boundary exists here" with equal emphasis, so none of them communicates *which* boundary
matters.

The two `VDivider`s are unconditional. They exist to separate a scrolling body from sticky
chrome — but this body never scrolls.

## 1.8 Medium — no section structure exists, and the one attempt is a hardcoded hack

`FormSection` exists in `components/` and is used essentially nowhere in the pages under review.
Where a page does need a subsection heading, it hand-rolls one:

`pages/admin/access-methods.vue:182`

```vue
<VCol cols="12">
  <VDivider class="my-1" />
  <p class="text-caption font-weight-bold text-uppercase" style="color:#888;">Ticket Validation</p>
</VCol>
```

A `#888` inline hex, a divider with an arbitrary `my-1`, and a paragraph impersonating a heading —
inside a grid column, so it inherits form-field gutters. This is one of the 103 hex values and one
of the 156 inline styles.

## 1.9 Medium — information architecture: context is placed after the input it should inform

`kiosk-fleet.vue:208-213` renders *"Saat ini: 340 tercetak, sisa 660 dari 1000"* in a `VAlert`
**below both inputs**. The user must type a new capacity before being shown the current one.

Correct order is: state → decision → consequence. Current order is: decision → decision → state.

## 1.10 Medium — Access Methods hides its entire purpose behind an undiscoverable interaction

The second screenshot shows the whole page: a two-column table (Outlet, Address) with one row, and
nothing else. The page is titled *"Configure which checkout methods a kiosk offers"* — yet no
checkout method is visible anywhere.

`pages/admin/access-methods.vue:133`

```vue
<template v-if="outletId && !loading">   <!-- every setting lives behind this -->
```

The outlet table is a **selector disguised as a data table**. It has table semantics, table
headers, pagination ("1–1 of 1" for a single row), and a `@click:row` handler with no affordance
announcing it. Nothing indicates that clicking a row is required, or that content will appear
below the fold when you do.

**Why this hurts:** with one outlet there is exactly one correct action and the UI neither performs
it nor points at it. The user's model is "this page is broken/empty."

Also here: pagination controls and an "Items per page: 10" selector rendered for a 1-row table —
chrome that costs vertical space and implies a scale the data doesn't have.

## 1.11 Low — typography has no hierarchy because it has no scale

Type in the dialog: title `text-h6` (Vuetify: 1.25rem/500), labels ~1rem via field defaults, hints
`.v-messages` 12px, alert body `text-caption` 12px. That's four sizes with no consistent ratio, two
of which are identical (12px) while playing different roles. There are no `font-variant-numeric:
tabular-nums` declarations anywhere, so the fleet table's `340 / 1000` counts render in
proportional figures and columns of numbers fail to align vertically.

## 1.12 Low — component consistency

- 5 pages (`ai-logs`, `ai-templates`, `print-templates`, `stickers`, `templates`) plus 2 editor
  components hand-roll `<VDialog>` instead of using `AppModal` — 14 raw usages against 22 adopted.
  Each hand-rolled one re-invents header/footer padding, so there are ~7 dialog paddings in the app.
- `rounded="lg"` is used 97 times and is genuinely consistent. **Keep this.** It is the one token
  the codebase already honors.
- The 16 `#4f46e5` (indigo-600) values in `stickers.vue`, `ai-templates.vue`,
  `PrintTemplateEditor.vue`, `TemplateFrameEditor.vue` are a second, competing brand color.
  `DESIGN_SYSTEM.md` notes the *theme* had "a stray purple — fixed", but the fix never reached the
  pages.

## 1.13 Accessibility findings

| Issue | Evidence | Severity |
|---|---|---|
| Label overlaps value → accessible name ≠ visible name | §1.1 | **Critical** |
| Text contrast depends on backdrop (opacity-based emphasis) | §1.4 | High |
| Focus styling relies on Vuetify's Material state layer, no visible ring on outlined fields | theme `focus-opacity: 0.1` | High |
| Icon-only buttons in the fleet table are 36px — below the 44px touch minimum | `kiosk-fleet.vue:162` | Medium |
| No `aria-live` region for form errors; `toast.error()` fires outside any live region | `AppToaster` | Medium |
| 11-column table with no sticky first column; on a 1280px laptop the outlet name scrolls out of view while reading status | `kiosk-fleet.vue:88-102` | Medium |
| Dialog does not document focus-trap / restore-focus behavior | `AppModal` | Low (Vuetify handles most) |
| Status conveyed by chip color **and** text label | `statusColor()` | ✅ Passes — keep |

## 1.14 Minor robustness note

`kiosk-fleet.vue:208` guards with `stockTarget?.stock?.initial !== null`. `KioskPrinter.stock` is
typed non-optional (`useKioskFleet.ts:21`), so by contract this is fine. But the same file uses
defensive `k.stock?.` in three other places (lines 28, 147, 151) — the page does not trust its own
type. If the API ever omits `stock`, `undefined !== null` is `true` and the alert renders
*"Saat ini: undefined tercetak."* Pick one: trust the type and drop the `?.`, or make the type
optional and guard consistently.

---

# 2. Design Principles

Five rules. Everything in sections 3–9 derives from them.

### P1 — Borders define structure; shadows only mean "floating"
Material uses elevation for everything, which is why Vuetify apps read as a pile of cards. Use a
1px hairline for anything anchored to the page (cards, tables, inputs, sections). Reserve shadow
for things that genuinely overlay: dialogs, menus, popovers, toasts. A card with both a border and
a shadow is saying it is floating while it sits still.

### P2 — Position is the primary hierarchy channel; color is the last
Size, weight, and placement should carry hierarchy before hue does. This makes the UI legible in
grayscale, which makes it legible to colorblind users, on bad projectors, and in a warehouse at
2am. Corollary: a ghost Cancel next to a filled Save is stronger hierarchy than grey-vs-navy.

### P3 — Four hues, and no more
Navy (brand/primary), green (success), amber (warning), red (danger). **Delete `info`.** A fifth
hue in an admin dashboard is always decoration pretending to be semantics — and the current
`info: #03C3EC` cyan is the single most Bootstrap-looking token in the theme. Informational
messages are neutral or primary.

### P4 — Dense by default, roomy where it matters
This is an operations tool: fleet tables, transaction lists, pricing grids. Controls are 36px, type
is 13–14px, table rows are tight. Spend the reclaimed space on **whitespace between groups**, not
inside them. Density and clarity are only in tension when the spacing scale is flat.

### P5 — One way to do each thing
Every deviation is a decision someone has to make, review, and remember. 199 controls means a bad
default costs 199 mistakes. The system should make the correct form *the shortest to type*.

## 2.1 Spacing scale

4px base. Only these values. If a design needs 18px, it needs 16 or 20.

| Token | px | Used for |
|---|---:|---|
| `--sp-0` | 0 | |
| `--sp-1` | 2 | label ⇄ required marker |
| `--sp-2` | 4 | icon ⇄ text |
| `--sp-3` | 6 | **label ⇄ input**, **input ⇄ helper** |
| `--sp-4` | 8 | chip gaps, button icon gap |
| `--sp-5` | 12 | inline control gaps, section title ⇄ first field |
| `--sp-6` | 16 | footer padding-y, card padding (compact) |
| `--sp-7` | 20 | **field ⇄ field** |
| `--sp-8` | 24 | dialog padding, card padding |
| `--sp-9` | 32 | **section ⇄ section** |
| `--sp-10` | 40 | page block spacing |
| `--sp-11` | 48 | page section spacing |
| `--sp-12` | 64 | page top/bottom |

The three that fix the audit: **6 / 20 / 32**. Helper hugs its input at 6px, the next field is
20px away, the next section is 32px away. Proximity now encodes grouping, and it no longer varies
with copy length.

## 2.2 Radius

| Token | px | Applies to |
|---|---:|---|
| `--radius-sm` | 4 | chips, badges, tags, swatches |
| `--radius-md` | **6** | inputs, buttons, selects, menu items |
| `--radius-lg` | **10** | cards, tables, alerts, section panels |
| `--radius-xl` | **12** | dialogs |
| `--radius-2xl` | 16 | mobile bottom-sheet top corners |
| `--radius-full` | 9999 | avatars, status dots, pills |

6px on controls is the single most recognizable difference between "Linear/Stripe" and "Material."
Vuetify's `rounded="lg"` is 8px; the existing 97 usages map cleanly to `--radius-lg` (10) with no
markup change once the token is redefined.

## 2.3 Elevation & shadows

Shadows are cool-tinted (`#16202b`) rather than pure black. Black shadows on a white UI read as
dirt; tinted ones read as depth.

```scss
--shadow-xs:     0 1px 2px rgb(22 32 43 / .05);
--shadow-sm:     0 1px 2px rgb(22 32 43 / .04), 0 2px 4px -1px rgb(22 32 43 / .06);
--shadow-md:     0 4px 8px -2px rgb(22 32 43 / .08), 0 2px 4px -2px rgb(22 32 43 / .04);
--shadow-lg:     0 12px 24px -6px rgb(22 32 43 / .10), 0 4px 8px -4px rgb(22 32 43 / .06);
--shadow-dialog: 0 24px 48px -12px rgb(22 32 43 / .18), 0 0 0 1px rgb(22 32 43 / .04);
--shadow-focus:  0 0 0 3px rgb(27 87 130 / .14);
```

| Surface | Elevation |
|---|---|
| Page background | none |
| Card, table, section panel | `--shadow-none` + 1px border |
| Dropdown, menu, popover, tooltip | `--shadow-md` |
| Dialog | `--shadow-dialog` (the hairline is baked in — no border) |
| Toast | `--shadow-lg` |
| Sticky dialog header/footer, **only while scrolled** | `--shadow-xs` |

That last row replaces the two permanent `VDivider`s (§1.7).

## 2.4 Typography

**Fix the font first. It is one line and it is the highest-impact change in this document.**

```scss
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI Variable Text", "Segoe UI",
             Inter, Roboto, "Helvetica Neue", Arial, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
```

**Recommendation: ship the system stack, not a webfont.** On macOS this resolves to SF Pro — the
exact typeface Linear, Raycast, and Arc use. On Windows 11, Segoe UI Variable. Zero bytes
downloaded, zero layout shift, zero FOUT, no new dependency. It stops looking like Roboto
*immediately*.

Adopt Inter Variable (`@fontsource-variable/inter`, ~28KB subset) only if brand consistency across
OSes is later judged worth a dependency and a font-loading strategy. It is a Phase 3 nice-to-have,
not a prerequisite. Use `--font-mono` for kiosk IDs, printer names, and app versions.

| Token | Size | Weight | LH | Tracking | Role |
|---|---:|---:|---:|---|---|
| `--fs-2xs` | 11 | 600 | 1.3 | `.04em` | Table headers, uppercase meta |
| `--fs-xs` | 12 | 400 | 1.4 | `0` | Timestamps, chip text, counts |
| `--fs-sm` | 13 | 400/500 | 1.45 | `0` | **Labels (500), helper (400), buttons (500)** |
| `--fs-md` | 14 | 400 | 1.5 | `0` | **Input values**, body copy, table cells |
| `--fs-lg` | 16 | 600 | 1.35 | `-.006em` | Dialog titles, card titles |
| `--fs-xl` | 20 | 600 | 1.3 | `-.011em` | Page titles |
| `--fs-2xl` | 24 | 650 | 1.25 | `-.014em` | Stat values |

Three weights only: 400, 500, 600. Negative tracking above 16px only — it is what makes large text
look typeset rather than default.

**Mandatory:** `font-variant-numeric: tabular-nums` on every numeric input, table cell, stat value,
and chip. The fleet table's `340 / 1000` column is currently unalignable without it.

## 2.5 Color

Primary `#1b5782` is the brand and does not change. Everything around it does.

```scss
/* Brand navy — ramp derived from #1b5782 */
--navy-50:#f0f6fa; --navy-100:#dceaf4; --navy-200:#b9d4e8; --navy-300:#8ab6d5;
--navy-400:#5490bb; --navy-500:#2f719f; --navy-600:#1b5782; /* brand */
--navy-700:#164767; --navy-800:#14384f; --navy-900:#122e40;

/* Cool neutrals — tuned to sit under navy, not fight it */
--n-0:#ffffff;  --n-25:#fcfcfd; --n-50:#f8fafb;  --n-100:#f1f4f7; --n-200:#e4e9ef;
--n-300:#cfd7e0; --n-400:#9aa7b6; --n-500:#6b7a8c; --n-600:#4d5c6e; --n-700:#384656;
--n-800:#24303e; --n-900:#16202b;
```

### Semantic palette — replacing the Sneat defaults

| Role | Current | Problem | **New** | bg / border / text |
|---|---|---|---|---|
| success | `#71DD37` | Highlighter lime. 1.9:1 on white — unusable as text. Reads as a toy. | `#1a8754` | `#e9f5ee` / `#a8d8bd` / `#11603c` |
| warning | `#FFAB00` | Acceptable hue, 1.9:1 as text | `#b45309` (text) `#d97706` (fill) | `#fef6e7` / `#f3d19b` / `#92400e` |
| error | `#FF3E1D` | Orange-red; vibrates against navy | `#d92d20` | `#fdf0ef` / `#f3b5ae` / `#a4231a` |
| info | `#03C3EC` | **Delete.** Fifth hue, reads as Bootstrap | — | use `--n-*` or navy |

The `success` change matters most: `#71DD37` is currently used for "online" status chips across the
fleet view, and it cannot pass contrast as text on any background. `#1a8754` at 4.6:1 on white can.

### Text colors — solid, never opacity

| Token | Value | On white | Use |
|---|---|---:|---|
| `--text-primary` | `--n-800` `#24303e` | 12.6:1 | Headings, input values |
| `--text-secondary` | `--n-600` `#4d5c6e` | 7.9:1 | Labels, body |
| `--text-tertiary` | `--n-500` `#6b7a8c` | **4.9:1** | **Helper text**, timestamps |
| `--text-disabled` | `--n-400` `#9aa7b6` | 2.6:1 | Disabled only — never conveys info |
| `--text-inverse` | `#ffffff` | — | On navy/red fills |

Fixes §1.4: contrast becomes a property of the token, not of whatever renders behind it.

## 2.6 Borders

```scss
--border-subtle:  1px solid var(--n-100);  /* row dividers, internal rules */
--border-default: 1px solid var(--n-200);  /* cards, inputs at rest */
--border-strong:  1px solid var(--n-300);  /* input hover, selected */
--border-focus:   1px solid var(--navy-600);
```

Three weights of *color*, one weight of *line*. §1.7's seven identical rules become a hierarchy:
dialog edge (none — shadow), section rule (`subtle`), input (`default`).

## 2.7 Icons

Boxicons via Iconify — keep, no change of library.

- Sizes: **16px** inline/in-field · **18px** buttons · **20px** section headers · **24px** empty states · **48px** empty-state illustrations.
- Stroke-weight parity: prefer `bx-*` outline; use `bxs-*` solid **only** for status dots and active nav.
- **Never an icon alone for meaning.** Icon-only buttons require `aria-label` + tooltip (the fleet table already does this correctly at `kiosk-fleet.vue:162-165` — keep that pattern).
- **Remove the tonal icon avatar from dialog headers.** The 40px navy `VAvatar` in `AppModal` is a Sneat signature; it adds visual weight and zero information. Linear, Stripe, and Vercel dialogs have no header icon. If a dialog is destructive, use a 20px red icon inline before the title instead.

## 2.8 Content width & field sizing

| Context | Max width | Reason |
|---|---:|---|
| Dialog — single-column settings | **480px** | 1–4 short fields |
| Dialog — standard form | **600px** | the current `AppModal` default; keep |
| Dialog — two-column / editor | **880px** | template + frame editors |
| Any body copy / helper text | **60ch** | measure — prevents §1.3's 2-line hint sprawl |
| Settings page content column | **880px** | full-bleed forms are unreadable on 27" monitors |
| Numeric input | **160px** | a paper count is never 400px wide |
| Date / time input | **200px** | |
| Short code (PIN, promo, order) | **240px** | |
| Name / title | **100%** of column | |

**Field width should signal expected input length.** A 416px-wide box for a 4-digit paper count
(§1.6) is a lie about the answer's shape. This is the single easiest fix for "inputs feel oversized
but still cramped."

---

# 3. Form Standards

## 3.1 Labels — **above the input, always**

Not floating. Not inline. Above.

```
┌──────────────────────────────────────┐
│ Jumlah kertas terpasang   Opsional   │  13px/500 --text-secondary
│                                      │  6px
│ ┌──────────────┐                     │
│ │ 1000         │                     │  36px, 14px value, tabular-nums
│ └──────────────┘                     │
│                                      │  6px
│ Sisa hitungan tercetak akan direset. │  13px/400 --text-tertiary, max 60ch
└──────────────────────────────────────┘
```

**Reasoning — seven arguments, in order of weight:**

1. **It eliminates the class of bug in §1.1 by construction.** A static label has no rest/floated
   state machine, so no `isDirty` inference can desynchronise it. Not a workaround — a removal of
   the failure mode.
2. **Labels stay readable while typing.** Floated labels shrink to ~11px and lose contrast exactly
   when the user is mid-task and most likely to need them.
3. **Long labels wrap.** "Peringatan bila sisa kurang dari" is 31 characters. Floated into a
   border notch it either truncates or forces the field wider than its content needs. Indonesian
   UI copy runs 15–30% longer than English — this system must assume long labels are normal.
4. **Vertical scanning.** Left-aligned static labels form a single scan column. The eye descends
   one straight line to find a field. Floated labels sit at different heights depending on each
   field's state — the scan path zigzags.
5. **Placeholders become usable again.** With the label above, `placeholder` is free to do its
   actual job (format examples: `cth: 1000`) instead of fighting for the same pixels. §1.1's bug
   becomes impossible *and* the feature it was reaching for starts working.
6. **Optional/required markers and helper affordances get somewhere to live** — the label row has
   free space on the right for `Opsional` or an info tooltip.
7. **Every reference product does it.** Linear, Stripe Dashboard, Vercel, Notion, GitHub Primer,
   Shopify Polaris. Not an appeal to authority — an observation that products optimizing for
   dense, high-frequency data entry converged here independently.

**Rules:**
- Sentence case (`Jumlah kertas terpasang`), never Title Case, never ALL CAPS.
- Mark the **optional** ones, not the required ones. In this app most fields are required; marking
  the majority is noise. `Opsional` in `--fs-xs` `--text-tertiary`, right-aligned on the label row.
- Never end with a colon.
- Target ≤ 4 words. Detail belongs in helper text.
- The `<label>` must carry `for=` pointing at the input `id`. `FormField` (§6) enforces this.

## 3.2 Helper text

**One slot. Below the input. 6px.**

| Property | Value |
|---|---|
| Position | Below input, `--sp-3` (6px) |
| Size / weight | `--fs-sm` (13px) / 400 |
| Color | `--text-tertiary` `#6b7a8c` — 4.9:1 |
| Max width | **60ch** — forces one to two short lines |
| Max length | **~90 characters.** Longer means it isn't helper text |
| Alignment | Flush left with the input's left border |
| Persistence | Always visible. Never `hide-details` on a field that has one |

**The rejected alternative:** an `InputDescription` slot *above* the input (as the brief suggests).
Two text slots per field means every author decides which to use, and they will decide differently
199 times. One slot, one position, no decision. Where copy genuinely must be read *before* typing —
because it warns of a consequence — it is not helper text. It is an **`InlineAlert`** (§6.4).

Applied to the audited dialog:

| Current | Verdict |
|---|---|
| *"Isi setelah mengganti kertas/ribbon — hitungan tercetak otomatis kembali ke 0"* | **Split.** "Isi setelah mengganti kertas/ribbon" is helper. "hitungan tercetak kembali ke 0" is a destructive consequence → `InlineAlert`, shown only when the value changes. |
| *"Kiosk dan dashboard menampilkan peringatan di bawah angka ini"* | Keep as helper. 58 chars, one line at 60ch. |

## 3.3 Validation states

**Errors appear on blur, then live-update on input.** Never validate on the first keystroke — it
tells a user typing "1" into a 4-digit field that they are wrong. Once a field has errored, switch
to on-input so the message clears the moment it is fixed.

| State | Border | Ring | Icon | Message | Announce |
|---|---|---|---|---|---|
| **Rest** | `--n-200` | — | — | helper `--text-tertiary` | — |
| **Hover** | `--n-300` | — | — | unchanged | — |
| **Focus** | `--navy-600` | `--shadow-focus` | — | unchanged | — |
| **Error** | `#d92d20` | `0 0 0 3px rgb(217 45 32 / .12)` on focus | 16px `bx-error-circle` right-inset | **replaces** helper, `#a4231a` | `role="alert"` |
| **Success** | `--n-200` | — | 16px `bx-check` `#1a8754` | helper stays | — |
| **Warning** | `#d97706` | — | 16px `bx-error` | `#92400e` | `aria-live="polite"` |
| **Disabled** | `--n-100` | — | — | `--text-disabled` | `disabled` |
| **Readonly** | `--n-200` on `--n-50` | — | — | helper stays | `readonly` |
| **Loading** | `--n-200` | — | 14px spinner right-inset | "Memeriksa…" | `aria-busy="true"` |

**Error messages replace helper text, never stack with it** — stacking shifts the layout of every
field below and makes the form jump while typing. Reserve the message row's height so nothing
shifts at all.

**Success state is opt-in and rare.** Use it only where confirmation has value: async uniqueness
checks (promo code available), format validation the user cannot self-verify. Green ticks on every
filled field are noise.

**Disabled vs readonly:** disabled = not applicable right now (and excluded from tab order);
readonly = real value, not editable here. `access-methods.vue:149` disables the "Default" switch
when the method is off — correct usage, but it needs a tooltip saying why. **A disabled control
with no explanation is a dead end.**

**Form-level errors** go in an `InlineAlert` at the top of the dialog body, with the count:
*"2 kolom perlu diperbaiki."* Focus moves to the first invalid field on submit.

## 3.4 Inputs

| Property | `sm` | **`md` (default)** | `lg` |
|---|---:|---:|---:|
| Height | 32px | **36px** | 44px |
| Font size | 13px | **14px** | 15px |
| Padding X | 10px | **12px** | 14px |
| Radius | 6px | **6px** | 8px |
| Icon size | 14px | **16px** | 18px |
| Use | table toolbars, filters | everything | auth pages, mobile |

Vuetify 3.12.8 exposes exactly the variables needed (verified in
`node_modules/vuetify/lib/components/VField/VField.css`): `--v-input-control-height`
(56 / 48 / 40 for default / comfortable / compact) and `--v-field-padding-{top,bottom,start,end}`.

```scss
/* assets/styles/_inputs.scss — the whole 36px override */
.v-input--density-compact {
  --v-input-control-height: 36px;
  --v-field-padding-start: 12px;
  --v-field-padding-end: 12px;
}

.v-field--variant-outlined {
  --v-field-border-width: 1px;
  border-radius: var(--radius-md);
  font-size: var(--fs-md);

  .v-field__outline { --v-field-border-opacity: 1; color: var(--n-200); }
  &:hover .v-field__outline { color: var(--n-300); }
}

/* Focus: a ring, not Material's 2px inset outline */
.v-field--variant-outlined.v-field--focused {
  box-shadow: var(--shadow-focus);
  .v-field__outline { color: var(--navy-600); --v-field-border-width: 1px; }
}

/* Top labels mean the notch must go */
.v-field--variant-outlined .v-field__outline__notch { display: none; }

.v-field input { font-variant-numeric: tabular-nums; }
```

Note `--v-field-border-width: 1px` on focus. Vuetify thickens the outline to 2px on focus, which
makes the field visibly *resize* — the classic Material tell. A ring achieves higher focus salience
without moving anything.

**Number inputs:** hide the spinners (`appearance: textfield`), right-align the value, apply
tabular figures, cap at `--input-w-num` (160px), and use `inputmode="numeric"`.

## 3.5 Buttons

Height matches inputs — **36px** default, so a button beside a field aligns without hacks.
13px / 500 / `--radius-md` / `text-transform: none`. Icon gap 6px, icons 16px.

| Variant | Fill | Border | Text | Hover | Use |
|---|---|---|---|---|---|
| **Primary** | `--navy-600` | none | `#fff` | `--navy-700` | Exactly one per view. The commit action. |
| **Secondary** | `#fff` | `--n-200` | `--text-primary` | bg `--n-50`, border `--n-300` | Alternative actions with real weight |
| **Ghost** | transparent | none | `--text-secondary` | bg `--n-100` | **Cancel/Dismiss.** Fixes §1.5 |
| **Danger** | `#d92d20` | none | `#fff` | `#b42318` | Destructive commit only |
| **Danger ghost** | transparent | none | `#d92d20` | bg `#fdf0ef` | Destructive in a row/menu |
| **Text/Link** | transparent | none | `--navy-600` | underline | Inline in prose |
| **Icon** | transparent | none | `--text-secondary` | bg `--n-100` | 32px box / **44px hit area** |

**Rules:**
- `ripple: false` globally. `defaults.ts` already sets this on `VBtn` — extend to `VList`, `VTab`,
  `VSwitch`. The ripple is a Material signature and it is the second-most recognizable tell after
  the typeface.
- **Never two filled buttons adjacent.** Primary + Ghost, or Primary + Secondary. This is §1.5.
- **Loading:** replace the leading icon with a 14px spinner, keep the label, keep the width fixed
  (no reflow), set `aria-busy`. Never swap the label to "Loading…" — the width jumps.
- **Disabled primary:** `--n-200` bg / `--n-400` text. If a submit is disabled, the reason must be
  visible on the form — a disabled button with no stated reason is the most common dead end in
  admin UIs.
- Destructive actions need a typed or explicit confirmation via the existing `useConfirm()`
  (`tone: 'danger'`) — already in the codebase, keep using it.

## 3.6 Field layout

**Forms are flex columns, not grids.** `VRow`/`VCol` inside a dialog is the direct cause of §1.3's
variable rhythm — the gutters add 12px to whatever the message row happens to be.

```vue
<!-- ✗ current -->
<VRow><VCol cols="12"><VTextField … /></VCol></VRow>

<!-- ✓ target -->
<FormSection title="Stok">
  <FormField label="…" …/>
  <FormField label="…" …/>
</FormSection>
```

`FormSection` becomes `display: flex; flex-direction: column; gap: var(--sp-7)`. One gap value,
applied identically regardless of whether a field has a hint, an error, or neither. **The rhythm
stops being a function of copy length.**

Side-by-side only for genuinely paired fields (start/end dates, min/max, value+unit), via
`<FieldGroup direction="row">`. Everything else is one column — the 60 existing `cols="12" md="6"`
pairs should be reviewed, not mechanically converted.

---

# 4. Dialog Standard

## 4.1 Anatomy

```
╭─────────────────────────────────────────────────╮  --radius-xl (12px)
│                                                 │  --shadow-dialog, no border
│  Stok cetak                              [×]    │  ← 20px 24px
│  test self service                              │     title 16/600, desc 13/400 --text-tertiary
│                                                 │
│  ┌───────────────────────────────────────────┐  │  ← 24px
│  │ ▪ 340 tercetak   ▪ sisa 660   ▪ dari 1000 │  │     state summary, --n-50, --radius-lg
│  └───────────────────────────────────────────┘  │
│                                                 │  ← 24px
│  STOK                                           │     11/600/.04em --text-tertiary
│                                                 │  ← 12px
│  Jumlah kertas terpasang                        │
│  ┌──────────────┐                               │     160px, not 416px
│  │ 1000         │                               │
│  └──────────────┘                               │
│  Isi setelah mengganti kertas/ribbon.           │
│                                                 │  ← 20px
│  ⚠ Menyimpan akan mereset hitungan ke 0.        │     InlineAlert, conditional
│                                                 │  ← 32px + hairline
│  PERINGATAN                                     │
│                                                 │
│  Peringatan bila sisa kurang dari               │
│  ┌──────────────┐                               │
│  │ 100          │                               │
│  └──────────────┘                               │
│  Kiosk menampilkan peringatan di bawah ini.     │
│                                                 │  ← 24px
│                        [ Batal ]  [ Simpan ]    │  ← 16px 24px, ghost + primary
╰─────────────────────────────────────────────────╯
```

## 4.2 Specification

| Region | Spec |
|---|---|
| **Container** | `--radius-xl`, `--shadow-dialog`, `--n-0`, no border, `max-height: min(90vh, 720px)`, flex column |
| **Scrim** | `rgb(22 32 43 / .40)` + `backdrop-filter: blur(2px)`. Current `overlay-scrim-opacity: 0.5` on `#22303E` is heavy — 0.40 with blur separates better at lower weight |
| **Header** | `20px 24px`. Grid: `1fr auto`. **No icon avatar** (§2.7) |
| **Title** | `--fs-lg` (16) / 600 / `--text-primary`. One line, truncate with `title` attr |
| **Description** | `--fs-sm` (13) / 400 / `--text-tertiary`, `--sp-1` (2px) below title, max 52ch. Contextual identifiers belong here — **not appended to the title with an em dash** |
| **Close** | 28px ghost icon button, 44px hit area, `aria-label="Tutup"`, top-right, optically aligned to the title's cap height |
| **Body** | `24px` padding, `overflow-y: auto`, `overscroll-behavior: contain` |
| **Dividers** | **None by default.** Header/footer get `--shadow-xs` + hairline *only while the body is scrolled* (IntersectionObserver sentinels) |
| **Footer** | `16px 24px`, right-aligned, `gap: --sp-4` (8px). Ghost Cancel, then Primary |
| **Focus** | First interactive element on open (**skip on touch** — avoid the keyboard covering the dialog). Trap inside. Restore to trigger on close |

## 4.3 Title composition — fix the em-dash pattern

```vue
<!-- ✗ current: kiosk-fleet.vue:175 -->
:title="`Stok Cetak — ${stockTarget?.outlet_name ?? ''}`"
```

This produces `"Stok Cetak — "` with a trailing em dash when the name is missing, and an
unpredictably long single line that truncates the *outlet name* — the part that identifies which
kiosk you are about to modify.

```vue
<!-- ✓ -->
title="Stok cetak"
:description="stockTarget?.outlet_name"
```

Two lines, fixed hierarchy, degrades cleanly when the name is absent.

## 4.4 Width tiers

| Tier | Max width | Use |
|---|---:|---|
| `sm` | **480** | 1–4 short fields. The audited dialog |
| `md` | **600** | Standard CRUD. `AppModal`'s current default — keep |
| `lg` | **800** | Multi-section, side-by-side fields |
| `xl` | **1040** | Template/frame editors (`PrintTemplateEditor`, `TemplateFrameEditor`) |
| `confirm` | **400** | `useConfirm()` |

## 4.5 Responsive behavior

| Breakpoint | Behavior |
|---|---|
| **≥ 960px** | Centered, width tier, `max-height: min(90vh, 720px)` |
| **600–959px** | `width: min(tier, calc(100vw - 48px))`. All fields single-column |
| **< 600px** | **Bottom sheet** — `--radius-2xl` top corners, flush to bottom, `max-height: 92vh`, slide-up. Drag-handle affordance. Sticky footer with **full-width stacked buttons**: Primary on top, Ghost Cancel below. Controls upgrade to `lg` (44px). Body padding 16px. Focus does **not** auto-move (§4.2) |

**Change from current behavior:** `AppModal` uses `:fullscreen="smAndDown"` unconditionally. A
two-field dialog going fullscreen on mobile is disorienting — it reads as a page navigation, and
the user loses the context they came from. Go fullscreen only when the content would exceed 92vh;
otherwise the bottom sheet keeps the originating screen visible behind the scrim.

## 4.6 Keyboard

| Key | Action |
|---|---|
| `Esc` | Close. **If dirty, confirm first** — the current dialog silently discards edits |
| `⌘/Ctrl + Enter` | Submit from anywhere, including a textarea |
| `Enter` | Submit when focus is in a single-line input and the form has no textarea. `AppModal` already implements this via a hidden submit button (`AppModal.vue:104`) — **keep it, it is correct** |
| `Tab` / `Shift+Tab` | Trapped inside the dialog |
| `⌘/Ctrl + K` | **Reserved.** Do not bind — leave it for a future command palette |

Announce the dialog with `role="dialog"`, `aria-modal="true"`, `aria-labelledby` → title id,
`aria-describedby` → description id.

---

# 5. Information Hierarchy — the audited dialog, restructured

## 5.1 The reordering

The current form is: *input → input → state*. It should be **state → input → consequence → input**.

| # | Block | Content | Why here |
|---|---|---|---|
| 1 | **Context strip** | `340 tercetak · sisa 660 · dari 1000` | Read-only. You cannot choose a new capacity without knowing the current one. Moved from the bottom (§1.9). A `--n-50` strip, not a blue `VAlert` — it is state, not a notification |
| 2 | **Stok** | Jumlah kertas terpasang · helper · 160px | The decision |
| 3 | **Consequence** | `InlineAlert` warning, **only when the value differs from current** | Promoted out of helper text (§1.4). Conditional, so it never becomes wallpaper |
| 4 | **Peringatan** | Peringatan bila sisa kurang dari · helper · 160px | Separate concern: restocking vs alerting. A hairline + 32px separates them |
| 5 | **Footer** | Ghost `Batal` · Primary `Simpan` | |

Two sections, because there are genuinely two concerns: **how much paper is loaded** (changes on
every restock) and **when to warn** (set once, rarely touched). Section 4 could reasonably collapse
behind a "Pengaturan lanjutan" disclosure, since the threshold is set once per kiosk and the paper
count is changed weekly. Recommended once telemetry confirms the edit ratio.

## 5.2 Target markup

```vue
<AppModal
  v-model="stockDialog"
  title="Stok cetak"
  :description="stockTarget?.outlet_name"
  size="sm"
  :loading="stockSaving"
  confirm-text="Simpan"
  cancel-text="Batal"
  @confirm="saveStock"
>
  <StatStrip
    v-if="stockTarget?.stock?.initial != null"
    :items="[
      { label: 'Tercetak', value: stockTarget.stock.printed },
      { label: 'Sisa', value: stockTarget.stock.remaining },
      { label: 'Kapasitas', value: stockTarget.stock.initial },
    ]"
  />

  <FormSection title="Stok">
    <FormField
      label="Jumlah kertas terpasang"
      helper="Isi setelah mengganti kertas atau ribbon."
      width="num"
    >
      <template #default="{ id, describedBy }">
        <VTextField
          :id="id" v-model.number="stockInitial"
          :aria-describedby="describedBy"
          type="number" inputmode="numeric" placeholder="cth: 1000" clearable
        />
      </template>
    </FormField>

    <InlineAlert v-if="stockChanged" tone="warning">
      Menyimpan akan mereset hitungan tercetak ke 0.
    </InlineAlert>
  </FormSection>

  <FormSection title="Peringatan">
    <FormField
      label="Peringatan bila sisa kurang dari"
      helper="Kiosk dan dashboard menampilkan peringatan di bawah angka ini."
      width="num"
    >
      <template #default="{ id, describedBy }">
        <VTextField
          :id="id" v-model.number="stockThreshold"
          :aria-describedby="describedBy"
          type="number" inputmode="numeric"
        />
      </template>
    </FormField>
  </FormSection>
</AppModal>
```

```ts
// The warning is conditional, so it carries weight when it does appear.
const stockChanged = computed(() =>
  stockInitial.value != null && stockInitial.value !== stockTarget.value?.stock?.initial,
)
```

Note `!= null` rather than `!== null` — it catches `undefined` too, closing §1.14.

## 5.3 Access Methods (screenshot 2)

The outlet table is a selector, not a table. Three changes, in order of value:

1. **Auto-select when there is exactly one outlet.** `if (outlets.value.length === 1) outletId.value = outlets.value[0].id`. One line, and it eliminates the empty-page experience entirely for the common case.
2. **Replace the table with a selector.** ≤ 8 outlets → a segmented control or a list with radio semantics. > 8 → a `VSelect` with search. Either removes the pagination chrome, the "Address" column nobody selects on, and the "1–1 of 1" footer.
3. **Give the empty state a body.** When no outlet is selected, render an `EmptyState` (the component already exists) reading *"Pilih outlet untuk mengatur metode checkout"* — not nothing.

Also replace the hand-rolled section header at `access-methods.vue:182` with `FormSection`, deleting the `style="color:#888;"`.

---

# 6. Component Library

**Five components, not ten.** The brief lists ten; five of them are a prop, a slot, or a component
that already exists. Each rejection is listed with its reason — an unused abstraction costs more
than the duplication it prevents.

## Build

### 6.1 `FormField` — the keystone

The one component that matters. It owns the label/input/helper contract for all **199** controls
and makes §1.1 and §1.3 unrepresentable.

```vue
<script setup lang="ts">
const props = defineProps<{
  label: string
  helper?: string
  error?: string
  optional?: boolean
  hint?: string                                  // ⓘ tooltip on the label row
  width?: 'full' | 'num' | 'date' | 'code'       // 100% / 160 / 200 / 240
}>()

const id = useId()
const helperId = `${id}-h`
// Error replaces helper, so only one id is ever advertised — no double announcement.
const describedBy = computed(() => (props.error || props.helper) ? helperId : undefined)
</script>

<template>
  <div class="ff" :class="`ff--${width ?? 'full'}`">
    <div class="ff__labelrow">
      <label :for="id" class="ff__label">{{ label }}</label>
      <VIcon v-if="hint" icon="bx-info-circle" size="14" tabindex="0">
        <VTooltip activator="parent">{{ hint }}</VTooltip>
      </VIcon>
      <span v-if="optional" class="ff__optional">Opsional</span>
    </div>

    <slot :id="id" :described-by="describedBy" :invalid="!!error" />

    <!-- height reserved so validation never shifts the form -->
    <p :id="helperId" class="ff__msg" :class="{ 'ff__msg--error': error }"
       :role="error ? 'alert' : undefined">
      {{ error || helper }}
    </p>
  </div>
</template>
```

The slot passes `id` and `describedBy` down so the consumer keeps using plain `VTextField`,
`VSelect`, `VSwitch` — no wrapper per control type, and `defaults.ts` still applies. This is why
`NumberField` is unnecessary.

### 6.2 `FormSection` — upgrade in place

Already exists (`components/FormSection.vue`). Two changes:

```diff
- <VRow><slot /></VRow>
+ <div class="fs__fields"><slot /></div>
```
```scss
.fs__fields { display: flex; flex-direction: column; gap: var(--sp-7); }  /* 20px, invariant */
.form-section + .form-section {
  margin-top: var(--sp-9);                       /* 32px, was 24 */
  padding-top: var(--sp-9);
  border-top: var(--border-subtle);              /* replaces SectionDivider */
}
.form-section__head { margin-bottom: var(--sp-5); }  /* 12px, was 8 */
```

Title becomes `--fs-2xs` (11/600/`.04em`) uppercase `--text-tertiary` — an eyebrow, not a heading.
It should not compete with the dialog title. **This single diff fixes §1.3 everywhere at once.**

### 6.3 `AppModal` — upgrade in place

Already exists with 22 adopters. Do not create `AppDialog` beside it.

- `maxWidth: number` → `size: 'sm'|'md'|'lg'|'xl'` (keep `maxWidth` as an escape hatch)
- Add `description` prop (§4.3)
- Remove the `icon` avatar (§2.7)
- Padding → 20/24/16 24 (§4.2); body gets `display:flex; flex-direction:column; gap: var(--sp-9)`
- Cancel → ghost
- Replace the two `VDivider`s with scroll-driven `--shadow-xs`
- `smAndDown` → bottom sheet unless content > 92vh (§4.5)
- Guard `Esc` when dirty

### 6.4 `InlineAlert`

Thin, but earns its place because it is the *only* correct home for consequential copy (§3.2).
`tone: 'info' | 'warning' | 'danger' | 'success'`; 16px icon, 13px text, `--radius-lg`, tinted bg +
matching border, `--sp-5` (12px) padding. Not `VAlert` — Vuetify's tonal alerts are heavy, use
opacity-based text (§1.4), and pull in the `info` cyan being deleted.

### 6.5 `SettingsCard`

For the label + description + control row pattern on `access-methods.vue`, `kiosk-settings.vue`,
and the outlet toggles. Grid: `1fr auto`, title 14/500, description 13/400 `--text-tertiary`,
control right-aligned, rows split by `--border-subtle`. Currently hand-rolled with
`d-flex justify-space-between` and inline gaps in at least three places.

## Reject

| Proposed | Verdict |
|---|---|
| `AppDialog` | **`AppModal` already exists**, 22 usages. A second dialog shell guarantees drift |
| `InputDescription` | A `<p>` inside `FormField`. Not a component |
| `NumberField` | `width="num"` + `type="number"`. A prop, not a component |
| `ActionFooter` | `AppModal`'s `#footer` slot. Already built |
| `SectionDivider` | `border-top` on `.form-section + .form-section`. Zero components (§6.2) |
| `FieldGroup` | 90% overlaps `FormSection`. Add only if side-by-side pairing proves common after Phase 2 — the 60 `md="6"` pairs need review first, and most are probably single-column mistakes |

Net: **2 new files** (`FormField`, `InlineAlert`), 1 small new one (`SettingsCard`), 2 upgraded in
place. Against 199 controls, `FormField` alone carries the migration.

---

# 7. Design Tokens

Single file, `assets/styles/_tokens.scss`, imported globally. CSS custom properties rather than
SCSS variables — runtime theme switching, no build coupling, and Vuetify components can consume
them through the override layer.

```scss
:root {
  /* ── Spacing (4px base) ────────────────────────────── */
  --sp-1:2px;  --sp-2:4px;  --sp-3:6px;   --sp-4:8px;   --sp-5:12px; --sp-6:16px;
  --sp-7:20px; --sp-8:24px; --sp-9:32px;  --sp-10:40px; --sp-11:48px; --sp-12:64px;

  /* ── Radius ────────────────────────────────────────── */
  --radius-sm:4px; --radius-md:6px; --radius-lg:10px;
  --radius-xl:12px; --radius-2xl:16px; --radius-full:9999px;

  /* ── Type ──────────────────────────────────────────── */
  --font-sans:-apple-system,BlinkMacSystemFont,"Segoe UI Variable Text","Segoe UI",
              Inter,Roboto,"Helvetica Neue",Arial,sans-serif;
  --font-mono:ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,monospace;
  --fs-2xs:11px; --fs-xs:12px; --fs-sm:13px; --fs-md:14px;
  --fs-lg:16px;  --fs-xl:20px; --fs-2xl:24px;
  --fw-normal:400; --fw-medium:500; --fw-semibold:600;
  --lh-tight:1.25; --lh-snug:1.35; --lh-normal:1.45; --lh-relaxed:1.6;
  --tracking-tight:-.014em; --tracking-snug:-.006em; --tracking-wide:.04em;

  /* ── Color ─────────────────────────────────────────── */
  --navy-50:#f0f6fa;  --navy-100:#dceaf4; --navy-200:#b9d4e8; --navy-300:#8ab6d5;
  --navy-400:#5490bb; --navy-500:#2f719f; --navy-600:#1b5782; --navy-700:#164767;
  --navy-800:#14384f; --navy-900:#122e40;

  --n-0:#ffffff;  --n-25:#fcfcfd;  --n-50:#f8fafb;  --n-100:#f1f4f7;
  --n-200:#e4e9ef; --n-300:#cfd7e0; --n-400:#9aa7b6; --n-500:#6b7a8c;
  --n-600:#4d5c6e; --n-700:#384656; --n-800:#24303e; --n-900:#16202b;

  --success:#1a8754; --success-bg:#e9f5ee; --success-border:#a8d8bd; --success-text:#11603c;
  --warning:#d97706; --warning-bg:#fef6e7; --warning-border:#f3d19b; --warning-text:#92400e;
  --danger:#d92d20;  --danger-bg:#fdf0ef;  --danger-border:#f3b5ae;  --danger-text:#a4231a;

  --text-primary:var(--n-800);   --text-secondary:var(--n-600);
  --text-tertiary:var(--n-500);  --text-disabled:var(--n-400);
  --text-inverse:var(--n-0);

  --surface-page:var(--n-50); --surface-card:var(--n-0); --surface-sunken:var(--n-100);

  /* ── Border ────────────────────────────────────────── */
  --border-subtle:1px solid var(--n-100);
  --border-default:1px solid var(--n-200);
  --border-strong:1px solid var(--n-300);
  --border-focus:1px solid var(--navy-600);

  /* ── Shadow ────────────────────────────────────────── */
  --shadow-xs:0 1px 2px rgb(22 32 43/.05);
  --shadow-sm:0 1px 2px rgb(22 32 43/.04),0 2px 4px -1px rgb(22 32 43/.06);
  --shadow-md:0 4px 8px -2px rgb(22 32 43/.08),0 2px 4px -2px rgb(22 32 43/.04);
  --shadow-lg:0 12px 24px -6px rgb(22 32 43/.10),0 4px 8px -4px rgb(22 32 43/.06);
  --shadow-dialog:0 24px 48px -12px rgb(22 32 43/.18),0 0 0 1px rgb(22 32 43/.04);
  --shadow-focus:0 0 0 3px rgb(27 87 130/.14);
  --shadow-focus-danger:0 0 0 3px rgb(217 45 32/.12);

  /* ── Size ──────────────────────────────────────────── */
  --control-h-sm:32px; --control-h:36px; --control-h-lg:44px;
  --input-w-num:160px; --input-w-date:200px; --input-w-code:240px;
  --measure:60ch; --content-max:880px;

  /* ── Motion ────────────────────────────────────────── */
  --dur-instant:80ms; --dur-fast:120ms; --dur-normal:180ms; --dur-slow:240ms;
  --ease-out:cubic-bezier(.16,1,.3,1);       /* dialogs, sheets — decisive */
  --ease-in-out:cubic-bezier(.4,0,.2,1);     /* state changes */
  --ease-spring:cubic-bezier(.34,1.56,.64,1);/* switches, checkboxes only */

  --t-color:color var(--dur-fast) var(--ease-in-out),
            background-color var(--dur-fast) var(--ease-in-out),
            border-color var(--dur-fast) var(--ease-in-out);
  --t-shadow:box-shadow var(--dur-fast) var(--ease-in-out);
  --t-transform:transform var(--dur-normal) var(--ease-out);
}

@media (prefers-reduced-motion: reduce) {
  :root { --dur-instant:0ms; --dur-fast:0ms; --dur-normal:0ms; --dur-slow:0ms; }
}
```

**Motion policy:** hover/focus 120ms, dialog enter 180ms `--ease-out` (scale .98→1 + fade, no
slide — slides read as navigation), dialog exit 120ms. Nothing animates longer than 240ms. Spring
easing on switches and checkboxes only, where the overshoot reads as tactile rather than sloppy.
`prefers-reduced-motion` zeroes all durations — currently unhandled anywhere in the app.

**Dark mode:** the theme already ships a dark palette. Re-map `--n-*` and `--surface-*` under
`.v-theme--dark`; everything else inherits. Not in scope for Phase 1–3.

---

# 8. Responsive Behavior

| | **Mobile** < 600 | **Tablet** 600–959 | **Desktop** ≥ 960 |
|---|---|---|---|
| Form columns | 1, always | 1 (except date pairs) | 1; pairs allowed |
| Control height | 44px (`lg`) | 36px | 36px |
| Font — input | 16px ⚠️ | 14px | 14px |
| Dialog | Bottom sheet, `--radius-2xl` top | `min(tier, 100vw - 48px)` | Width tier, centered |
| Dialog padding | 16px | 24px | 24px |
| Footer buttons | Full-width **stacked**, Primary top | Right-aligned | Right-aligned |
| Field ⇄ field | 20px | 20px | 20px |
| Section ⇄ section | 24px | 32px | 32px |
| Page content | 100% − 32px | 100% − 48px | `--content-max` (880) |
| Tables | **Card list**, not a table | Horizontal scroll + sticky col 1 | Full table |
| Touch targets | ≥ 44×44 | ≥ 44×44 | ≥ 32 visual / 44 hit |

⚠️ **The 16px mobile input rule is non-negotiable.** iOS Safari auto-zooms any focused input with
`font-size < 16px`, and the zoom does not reverse on blur. With `--fs-md` at 14px, every mobile
field entry in this app currently zooms the viewport. Enforce:

```scss
@media (max-width: 599px) {
  .v-field input, .v-field textarea, .v-field .v-select__selection-text { font-size: 16px; }
}
```

**The fleet table is the hard case.** 11 columns (`kiosk-fleet.vue:88-102`) cannot be a table below
960px. Below that, render each kiosk as a `SettingsCard`-style row: outlet name as the title,
status chips inline, stock as a progress bar, `Terakhir terlihat` as tertiary text, and the stock
action as a trailing icon button. Same data, vertical layout. Above 960px, keep the table but make
column 1 sticky — reading a status chip in column 7 while the outlet name has scrolled away is the
current failure.

---

# 9. Accessibility

Target **WCAG 2.2 AA**. Ordered by user impact.

### Keyboard
- Every interactive element reachable by `Tab` in DOM order. No positive `tabindex`.
- Dialogs trap focus, restore to the trigger on close, and open focus on the first field (skip on touch, §4.2).
- `Esc` closes; **if the form is dirty, confirm first** — currently a silent discard.
- Icon-only buttons are real `<button>`s with `aria-label`. The fleet table's stock button (`kiosk-fleet.vue:162`) has a tooltip but no label — a tooltip is not an accessible name.
- Custom row-click selection (`access-methods.vue:103`) is **mouse-only today.** Rows must be `<button>`/`role="radio"` with `Enter`/`Space` handlers, or the page is unusable by keyboard. §5.3's selector replacement solves this by construction.

### Focus visibility
- 3px `--shadow-focus` ring on **every** focusable element, including ghost buttons, chips, table rows, and tabs.
- Never `outline: none` without a replacement. Vuetify strips native outlines and substitutes a Material state layer that is nearly invisible on outlined fields against white.
- Use `:focus-visible`, not `:focus` — no ring on mouse clicks.
- The ring must clear the element: `outline-offset` or a non-clipping parent. Rings inside `overflow: hidden` cards get chopped.

### Contrast
- All text ≥ **4.5:1** (≥ 3:1 for ≥ 18.66px bold).
- **Solid colors, never opacity** (§1.4) — 70% opacity text is contrast-safe on white and nowhere else.
- Non-text UI (input borders, focus rings, switch tracks, chart series) ≥ **3:1**. `--n-200` `#e4e9ef` at 1.3:1 fails this as a *border* against white — acceptable for decorative rules, but the **input** border must go to `--n-300` `#cfd7e0` (1.9:1)… which still fails. **Resolution: input borders use `--n-400` `#9aa7b6` (2.6:1) at rest.** Still short of 3:1, so pair every input with its persistent top label — the label, not the border, is what identifies the control. Where a control has *no* label (search fields), the border must be `--n-500` (4.9:1).
- Never color alone. The fleet status chips carry text (`online`/`error`) — **this already passes, keep it.**

### Screen readers
- `FormField` guarantees `<label for>` + `aria-describedby` for all 199 controls (§6.1).
- Errors: `role="alert"` on the message. Error and helper share one id so only one is announced.
- On submit failure, move focus to the first invalid field and announce the count in a live region.
- Toasts (`AppToaster`) need `role="status"` `aria-live="polite"` — `toast.error()` currently fires into no live region, so screen-reader users get no feedback at all on a failed save.
- Loading: `aria-busy="true"` on the form, not just a spinner.
- Decorative icons `aria-hidden="true"`; meaningful ones get a `<title>`.

### Touch
- 44×44 minimum. Visual size may be 32px with a `::after` hit expander:
  ```scss
  .icon-btn { position: relative;
    &::after { content:''; position:absolute; inset:-6px; } }
  ```
- 8px minimum between adjacent targets. The fleet table's action column and the `access-methods` switch pairs are currently tighter.

### Also
- `prefers-reduced-motion` zeroes durations (§7) — unhandled today.
- Zoom to 200% without horizontal scroll (dialogs must use `max-width`, not fixed `width`).
- `<html lang="id">` — the UI copy is Indonesian; screen readers will otherwise use English phonemes.

---

# 10. Implementation Roadmap

Effort assumes one frontend engineer. Impact is on perceived quality.

## Phase 1 — Quick wins · **1 day** · Impact: ★★★★★

Zero new components. Global CSS and config only. **This is where most of the visual change lands.**

| # | Change | Files | Effort |
|---|---|---|---|
| 1 | **Set `--font-sans` and apply it** to `$body-font-family` | 1 line | 10 min |
| 2 | Add `assets/styles/_tokens.scss` (§7), import globally | 1 new file | 45 min |
| 3 | Input override layer (§3.4): 36px, 6px radius, focus ring, kill the notch, `tabular-nums` | 1 new file | 1.5 h |
| 4 | **Flip `defaults.ts` to `density: 'compact'`**, then codemod-delete the 93 `density="compact"` and 90 `variant="outlined"` attributes | `defaults.ts` + sed | 1 h |
| 5 | Remove `placeholder` from the 6 real fields that also have `label` (§1.1) | 3 files | 15 min |
| 6 | Delete `views/pages/form-layouts/*` and `views/pages/account-settings/*` (31 of the 37 violations; vendored demos, not product) | delete | 15 min |
| 7 | `AppModal`: unify padding to 20/24/16-24, Cancel → ghost, drop both `VDivider`s | `AppModal.vue` | 1 h |
| 8 | Button spec (§3.5): 36px, 13/500, `text-transform: none`, ripple off | override file | 45 min |
| 9 | Replace `success` `#71DD37` → `#1a8754`, `error` → `#d92d20`, delete `info` cyan | `theme.ts` | 30 min |
| 10 | `prefers-reduced-motion` block; `<html lang="id">` | 2 lines | 10 min |

**Ships:** new typeface, 36px controls, 6px radius, real focus rings, correct button hierarchy,
no label collisions, ~183 fewer attributes. All 22 `AppModal` dialogs improve at once.
**Risk:** low — mostly deletion. Verify the 5 hand-rolled `VDialog` pages visually, since they do
not inherit `AppModal`'s fixes.

## Phase 2 — Shared components · **3 days** · Impact: ★★★★☆

| # | Change | Effort |
|---|---|---|
| 1 | Build `FormField` (§6.1) with the id/`describedBy` slot contract | 0.5 d |
| 2 | Upgrade `FormSection` to flex + 20px gap + 32px section rule (§6.2) — **fixes §1.3 app-wide** | 2 h |
| 3 | Build `InlineAlert` (§6.4) | 3 h |
| 4 | Build `SettingsCard` (§6.5) | 4 h |
| 5 | `AppModal`: `size` tiers, `description` prop, drop the icon avatar, scroll-shadow chrome, bottom sheet, dirty-`Esc` guard | 0.5 d |
| 6 | **Rebuild the kiosk stock dialog per §5.2 as the reference implementation** | 3 h |
| 7 | Fix Access Methods (§5.3): auto-select single outlet, selector instead of table, empty state | 3 h |
| 8 | `AppToaster` → `role="status"` `aria-live="polite"` | 30 min |

**Ships:** two exemplar screens the rest of the migration copies. Do not start Phase 4 before
these two are approved — they are the pattern.

## Phase 3 — Design system consolidation · **2 days** · Impact: ★★★☆☆

| # | Change | Effort |
|---|---|---|
| 1 | Replace the 103 hardcoded hex values with tokens — the 16 `#4f46e5` indigo first | 0.5 d |
| 2 | Audit the 156 inline `style=` attributes; convert or tokenize | 0.5 d |
| 3 | Migrate the 5 raw-`VDialog` pages + 2 editor components to `AppModal` | 0.5 d |
| 4 | Rewrite `DESIGN_SYSTEM.md`; fix `CLAUDE.md`'s incorrect label-overlap remedy (§1.1) | 2 h |
| 5 | CI guard — 3 grep lines, no new tooling: | 1 h |

```bash
# fails the build on the three regressions this spec exists to prevent
! grep -rEn '<V(TextField|Select|Autocomplete|Textarea|Combobox)[^>]*label=[^>]*placeholder=' pages components
! grep -rn 'density="' pages components        # the default is correct now
! grep -rEn 'style="[^"]*#[0-9a-fA-F]{3,6}'   pages components
```

## Phase 4 — Full migration · **8–10 days** · Impact: ★★★☆☆ (consistency)

199 controls across 48 pages. Migrate by traffic, not alphabetically.

| Wave | Pages | Days |
|---|---|---|
| 1 | `login`, `register` — highest traffic, and 5 of the 6 live label bugs | 1 |
| 2 | `admin/{dashboard, kiosk-fleet, kiosk-settings, access-methods, outlets}` — daily ops | 2 |
| 3 | `admin/{transactions, photo-pricing, promo-codes, users, units}` | 2.5 |
| 4 | `admin/{photos, stickers, templates, ai-templates, print-templates, time-operation}` | 2.5 |
| 5 | `units/*`, `outlets/*` | 1.5 |
| 6 | Mobile card-list for the fleet table (§8); sticky first column | 1 |

Per page: swap `VRow`/`VCol` → `FormSection`/`FormField`, delete leftover `density`/`variant`,
replace `VAlert` → `InlineAlert`, verify tab order + focus ring. ~45 min/page average.

## Summary

| Phase | Effort | Impact | Ships |
|---|---|---|---|
| **1** | **1 day** | ★★★★★ | Stops looking like Vuetify. Do this week. |
| 2 | 3 days | ★★★★☆ | Form rhythm fixed system-wide; 2 reference screens |
| 3 | 2 days | ★★★☆☆ | One palette, one dialog, regressions blocked in CI |
| 4 | 8–10 days | ★★★☆☆ | Every screen consistent |
| | **~14–16 days** | | |

**The ratio worth noticing:** Phase 1 is 6% of the effort and delivers most of the perceived
change. Ship it standalone, look at it for a week, then commit to Phase 2. Nothing in Phase 1
depends on Phases 2–4, and nothing in it is hard to revert.

---

## Appendix — the three highest-leverage lines

```scss
/* 1. Not Roboto. */
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI Variable Text", Inter, sans-serif;

/* 2. Not 56px Material. */
.v-input--density-compact { --v-input-control-height: 36px; }

/* 3. Not a floating label. */
.v-field--variant-outlined .v-field__outline__notch { display: none; }
```

Plus one line in `defaults.ts`:

```diff
- density: 'comfortable',
+ density: 'compact',
```
