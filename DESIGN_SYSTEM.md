# Design System & UI Components

This project is built on **Vuetify 3** (the Sneat admin template). The redesign keeps
Vuetify as the foundation and adds a thin layer of reusable components + composables so
every page looks and behaves consistently. **No Tailwind** is used — styling flows through
the Vuetify theme tokens.

---

## Design tokens

Two layers. Vuetify theme colors + component defaults live in `plugins/vuetify/theme.ts` /
`plugins/vuetify/defaults.ts`. Everything else — spacing, radius, typography, neutral grays,
semantic bg/border/text triplets, shadows, motion — is CSS custom properties in
`assets/styles/styles.scss`, loaded globally. Reach for a `styles.scss` token before writing a raw
hex or an ad-hoc `rgba(...)`; see `DESIGN_SPEC.md` §7 for the full list and rationale.

| Token | Value | Notes |
|-------|-------|-------|
| `primary` | `#1b5782` | Brand navy. Use the **token** (`color="primary"`), never the hex. |
| `primary-darken-1` | `#144462` | Hover/pressed navy. |
| `primary-light` | `#4f86b3` | Light navy tint. |
| `success` | `#1a8754` | Rebalanced from the old `#71DD37` lime, which failed text contrast (1.9:1). |
| `warning` | `#d97706` | Rebalanced from `#FFAB00` for the same reason. |
| `error` | `#d92d20` | Rebalanced from `#FF3E1D`. |
| `info` | `#2f719f` | Re-tinted toward navy from a cyan (`#03C3EC`) that was a fifth, off-brand hue. |
| `secondary` | `#8592A3` | Neutral / muted actions. |
| `--n-0` … `--n-900` | `styles.scss` | Cool neutral ramp — card/border/background grays. Prefer over Vuetify's `grey-*`. |
| `--text-primary/secondary/tertiary` | `styles.scss` | Solid text colors (not opacity-based — opacity fails contrast on tinted backgrounds). `--text-tertiary` is the only AA-safe helper-text gray. |
| `--sp-1` … `--sp-12` | `styles.scss` | 4px-based spacing scale. `--sp-3` (6px) is label↔input/input↔helper; `--sp-7` (20px) is field↔field; `--sp-9` (32px) is section↔section. |
| `--radius-md/lg/xl` | `styles.scss` | 6px inputs/buttons, 10px cards (`rounded="lg"` is remapped to this), 12px dialogs. |
| `--shadow-*` / `--shadow-dialog` / `--shadow-focus` | `styles.scss` | Cool-tinted shadows; hairline borders carry structure, shadow means "floating" (menus, dialogs, toasts only). |

Component defaults (`defaults.ts`) reference the `primary` **token**, so re-theming is a one-line
change. `VTextField`/`VSelect`/`VAutocomplete`/`VCombobox`/`VTextarea`/`VFileInput` default to
`variant="outlined"` + `density="compact"` (36px controls) — **never set either explicitly**, it's
redundant.

**Radius:** cards/modals `rounded="lg"` → 10px via the `--radius-lg` remap; dialogs 12px.
**Shadow:** hairline borders for anchored surfaces, shadow reserved for things that actually float.
**Spacing:** the 4px scale above — see `DESIGN_SPEC.md` for which token goes where.

---

## Composables

### `useToast()` — non-blocking notifications (replaces `alert()`)
```ts
const toast = useToast()
toast.success('Saved successfully')
toast.error(getApiErrorMessage(error))
toast.warning('Name is required')
toast.info('Heads up')
```
Requires `<AppToaster />` mounted once (already in `app.vue`).

### `useConfirm()` — promise-based confirm (replaces `confirm()`)
```ts
const { confirm } = useConfirm()
if (await confirm({ title: 'Delete outlet', message: 'This cannot be undone.', tone: 'danger', confirmText: 'Delete' })) {
  // proceed
}
```
Requires `<ConfirmDialog />` mounted once (already in `app.vue`).

---

## Components (auto-imported from `components/`)

| Component | Purpose |
|-----------|---------|
| `AppModal` | Responsive dialog shell — header / scrollable body / footer, fullscreen on mobile, built-in loading + primary/secondary actions. `size="sm\|md\|lg\|xl"` (480/600/800/1040px), `description` for a subtitle line under the title. Header/footer dividers only appear once the body actually scrolls. |
| `FormField` | **The fix for the label/placeholder collision.** Renders a static label above the input (never a Vuetify floating label) plus helper/error text below. Wrap every labeled `VTextField`/`VSelect`/etc. in a modal form with this — see `pages/admin/kiosk-fleet.vue`. |
| `FormSection` | Groups `FormField`s under an eyebrow section title. Flex column with a fixed gap — **not** a `VRow` (don't nest a bare `VCol` inside it; wrap a genuine two-up pair in a local `VRow dense`). |
| `InlineAlert` | Tinted callout (`tone="info\|warning\|danger\|success"`) for consequential copy that shouldn't live in helper text — e.g. "saving resets X to zero." Make it conditional (`v-if`) when it doesn't always apply. |
| `SettingsCard` | Title + description + trailing control row, for toggle/switch settings lists — see `pages/admin/access-methods.vue`. |
| `AppDataTable` | List table — toolbar slot, auto row index, built-in empty / loading / pagination states. Custom cells via `#item.<key>`. |
| `EmptyState` | Centered empty placeholder (icon + title + description + action slot). |
| `LoadingState` | Centered spinner with optional label. |
| `PageHeader` | Page title + subtitle + `#actions` slot. |
| `StatCard` | Dashboard metric card (icon avatar + value). |
| `StatusChip` | Status → semantic color badge (`active`→success, `expired`→error, …; extend via `:map`). |
| `AppToaster` / `ConfirmDialog` | Global hosts, mounted in `app.vue`. Do not place per-page. |

> **Vuetify input rule:** Never set `label` directly on a `VTextField`/`VSelect` inside a modal
> form — wrap it in `FormField` and put the label there instead. The old advice here was "just add
> `variant="outlined"`", which is wrong: `variant="outlined"` does **not** prevent the floating
> label from overlapping the value (this was a real, live bug on `kiosk-fleet.vue` despite the field
> already having `variant="outlined"`). The floating label itself is the cause; `FormField` removes
> it by rendering a static label instead. `placeholder` is safe to use again once the field has no
> `label` of its own — use it for format examples (`cth: 1000`). Only use bare `placeholder` with no
> `FormField` wrapper on search/filter fields that have no label at all.

> Button / Input / Select / Tabs / Dropdown / Pagination are **not re-wrapped** — Vuetify's
> `VBtn` / `VTextField` / `VSelect` / `VTabs` / `VMenu` / `VPagination` are already
> standardized via `defaults.ts`. Re-wrapping them would be overengineering. Just use them directly,
> inside `FormField` for the labeled ones.

---

## Standard CRUD page pattern

Every list/CRUD page should follow this shape (see `pages/admin/outlets.vue` as the reference):

```vue
<script setup lang="ts">
import type { DataTableHeader } from '@/components/AppDataTable.vue'
const toast = useToast()
const { confirm } = useConfirm()

const dialog = ref(false)
const editingId = ref<string | null>(null)
const isEditing = computed(() => editingId.value !== null)
const blankForm = () => ({ /* fields */ })
const form = ref(blankForm())

const headers: DataTableHeader[] = [ /* { key, title, align?, width?, nowrap? } */ ]

function openCreate() { editingId.value = null; form.value = blankForm(); dialog.value = true }
function openEdit(row) { editingId.value = row.id; form.value = { ...row }; dialog.value = true }

async function submit() {
  isSubmitting.value = true
  try {
    isEditing.value ? await updateById(editingId.value!, form.value) : await create(form.value)
    toast.success(isEditing.value ? 'Updated' : 'Created')
    dialog.value = false
    await fetchList()
  } catch (e) { toast.error(getApiErrorMessage(e)) }
  finally { isSubmitting.value = false }
}

async function removeRow(row) {
  if (!await confirm({ title: 'Delete', message: `Delete "${row.name}"?`, tone: 'danger', confirmText: 'Delete' })) return
  try { await deleteById(row.id); toast.success('Deleted'); await fetchList() }
  catch (e) { toast.error(getApiErrorMessage(e)) }
}
</script>

<template>
  <div>
    <PageHeader title="…" subtitle="…">
      <template #actions><VBtn color="primary" prepend-icon="bx-plus" @click="openCreate">Add</VBtn></template>
    </PageHeader>

    <VCard rounded="lg">
      <AppDataTable :headers="headers" :items="rows" :loading="isLoading" show-index
        :page="page" :items-per-page="limit" :total="total" @update:page="p => page = p">
        <template #toolbar><VTextField v-model="search" placeholder="Search…" prepend-inner-icon="bx-search" clearable style="max-width:320px" /></template>
        <template #item.status="{ item }"><StatusChip :status="item.status" /></template>
        <template #item.actions="{ item }">
          <div class="d-flex justify-end" style="gap:4px">
            <VBtn icon variant="text" size="small" @click="openEdit(item)"><VIcon icon="bx-edit-alt" /></VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="removeRow(item)"><VIcon icon="bx-trash-alt" /></VBtn>
          </div>
        </template>
      </AppDataTable>
    </VCard>

    <AppModal v-model="dialog" :title="isEditing ? 'Edit' : 'Add'" size="md"
      :loading="isSubmitting" :confirm-text="isEditing ? 'Update' : 'Save'" @confirm="submit">
      <FormSection title="Details">
        <FormField label="…">
          <template #default="{ id, describedBy }">
            <VTextField :id="id" v-model="form.x" :aria-describedby="describedBy" />
          </template>
        </FormField>
      </FormSection>
    </AppModal>
  </div>
</template>
```

---

## Migration checklist (per remaining page)

Refactored so far (proof slice): `admin/outlets`, `admin/promo-codes`, `admin/users`, `admin/dashboard`.

For each remaining page:
1. Replace `alert(...)` → `toast.error/success/warning(...)`.
2. Replace `confirm(...)` / hand-rolled delete `VDialog` → `await confirm({...})`.
3. Replace hand-rolled `<VTable>` + `<VPagination>` + empty/loading rows → `<AppDataTable>`.
4. Merge duplicate create + edit `VDialog`s into one `<AppModal>` driven by `editingId`.
5. Add `<PageHeader>` with the page title + primary action.
6. Use `<StatusChip>` for any status column; `<StatCard>` for dashboard metrics.
7. Keep all API calls, composables, watchers and business logic exactly as-is.

Remaining: `admin/{photos, upload-photo, print-analytics}`, `units/{dashboard, transactions, photos}`,
`outlets/{dashboard, transactions, upload-photo, photos}`, all `*/reports/*` pages. These are pure
list/dashboard/report views with no multi-field dialog — they already inherit the global token
changes (font, input height, radius, colors) with zero markup changes needed, and don't need the
`FormField`/`FormSection` treatment described below since there's no form to apply it to.

## Form/dialog migration status (FormField + AppModal pattern)

Separate from the checklist above — this tracks adoption of `FormField`/`FormSection`/`InlineAlert`/
`SettingsCard` (see `DESIGN_SPEC.md` for the full rationale) across pages that have an actual
multi-field dialog.

**Done** — dialog fields wrapped in `FormField`, grouped under `FormSection`, raw `VDialog`s migrated
to `AppModal` where the layout allows it:
`admin/{kiosk-fleet, access-methods, outlets, users, promo-codes, transactions, photo-pricing,
time-operation, units, event-tickets, templates, ai-logs, stickers, print-templates, ai-templates}`,
`units/{outlets, photo-pricing, users}`, `outlets/photo-pricing`, `login`, `register` (the two real
fields on each auth form).

**Deliberately not migrated to `AppModal`** — `components/admin/PrintTemplateEditor.vue` and
`TemplateFrameEditor.vue` keep their raw `VDialog` because their two-pane canvas+sidebar layout
doesn't fit AppModal's single-scrolling-column body. They got the same visual language applied
directly instead (radius, shadow, header/footer padding, hex→token chrome cleanup) — see the
`.editor-shell` classes in each file. Their `SLOT_COLORS` categorical palette and all slot/handle/
badge colors are left as hardcoded hex deliberately — they differentiate same-type canvas elements,
not a theme mistake.

**Not migrated (no multi-field dialog to migrate)** — see the "Remaining" list above.
