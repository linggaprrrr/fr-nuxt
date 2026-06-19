# Design System & UI Components

This project is built on **Vuetify 3** (the Sneat admin template). The redesign keeps
Vuetify as the foundation and adds a thin layer of reusable components + composables so
every page looks and behaves consistently. **No Tailwind** is used — styling flows through
the Vuetify theme tokens.

---

## Design tokens

Defined in `plugins/vuetify/theme.ts` (colors) and `plugins/vuetify/defaults.ts` (component defaults).

| Token | Value | Notes |
|-------|-------|-------|
| `primary` | `#1b5782` | Brand navy. Use the **token** (`color="primary"`), never the hex. |
| `primary-darken-1` | `#144462` | Hover/pressed navy (was a stray purple — fixed). |
| `primary-light` | `#4f86b3` | Light navy tint (was a stray purple — fixed). |
| `success / info / warning / error` | semantic | Use for status, never decoration. |
| `secondary` | `#8592A3` | Neutral / muted actions. |

Component defaults (`defaults.ts`) now reference the `primary` **token** instead of a
hardcoded hex, so re-theming is a one-line change. Inputs default to
`variant="outlined"` + `density="comfortable"` everywhere.

**Radius:** cards/modals `rounded="lg"`, chips/badges default. **Shadow:** subtle, via the
theme umbra tokens. **Spacing:** 4 / 8 / 16 / 24 px scale (Vuetify `pa-*`, `ga-*`).

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
| `AppModal` | Responsive dialog shell — header / scrollable body / footer, fullscreen on mobile, built-in loading + primary/secondary actions. |
| `AppDataTable` | List table — toolbar slot, auto row index, built-in empty / loading / pagination states. Custom cells via `#item.<key>`. |
| `EmptyState` | Centered empty placeholder (icon + title + description + action slot). |
| `LoadingState` | Centered spinner with optional label. |
| `PageHeader` | Page title + subtitle + `#actions` slot. |
| `StatCard` | Dashboard metric card (icon avatar + value). |
| `StatusChip` | Status → semantic color badge (`active`→success, `expired`→error, …; extend via `:map`). |
| `FormSection` | Groups fields under a section title in long modal forms (renders a `VRow`). |
| `AppToaster` / `ConfirmDialog` | Global hosts, mounted in `app.vue`. Do not place per-page. |

> **Vuetify input rule:** Never set both `label` and `placeholder` on the same `VTextField`/`VSelect`. In `variant="outlined"` the label sits inside the field when unfocused (acting as the placeholder) — adding `placeholder` on top causes them to overlap. Use `label` alone in modal forms. Only use `placeholder` on search/filter fields that have **no** `label`.

> Button / Input / Select / Tabs / Dropdown / Pagination are **not re-wrapped** — Vuetify's
> `VBtn` / `VTextField` / `VSelect` / `VTabs` / `VMenu` / `VPagination` are already
> standardized via `defaults.ts`. Re-wrapping them would be overengineering. Just use them directly.

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

    <AppModal v-model="dialog" :title="isEditing ? 'Edit' : 'Add'" icon="bx-…"
      :loading="isSubmitting" :confirm-text="isEditing ? 'Update' : 'Save'" @confirm="submit">
      <FormSection title="Details">
        <VCol cols="12" md="6"><VTextField v-model="form.x" label="…" /></VCol>
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

Remaining: `admin/{photos, stickers, time-operation, photo-pricing, templates, ai-templates, units, transactions, upload-photo}`, all of `outlets/*` and `units/*`.
