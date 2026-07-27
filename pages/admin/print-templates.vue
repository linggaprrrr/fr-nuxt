<script setup lang="ts">
import { usePrintTemplates } from '@/composables/usePrintTemplates'
import { useOutlets } from '@/composables/useOutlets'
import { useOutletPrintSettings } from '@/composables/useOutletPrintSettings'
import PrintTemplateEditor from '@/components/admin/PrintTemplateEditor.vue'

const { templates, loading, error, getPrintTemplates, deletePrintTemplate, assignOutlets } = usePrintTemplates()
const { getOutletPrintSetting, updateOutletPrintSetting, error: settingError } = useOutletPrintSettings()
const toast = useToast()
const { confirm } = useConfirm()

const outlets = ref<any[]>([])

const editorOpen      = ref(false)
const editingTemplate = ref<any | null>(null)

async function fetchAll() {
  const params: any = {}
  if (selectedOutletId.value) params.outlet_id = selectedOutletId.value
  await getPrintTemplates(params)
}

async function fetchOutlets() {
  const res = await useOutlets().getOutlets({ page: 1, limit: 9999, is_kiosk: true })
  outlets.value = res?.data || []
}

function openCreate() { editingTemplate.value = null; editorOpen.value = true }
function openEdit(t: any) { editingTemplate.value = t; editorOpen.value = true }

function outletNames(t: any) {
  if (t.is_global) return 'Semua Outlet'
  if (!t.outlet_ids?.length) return 'Belum ditugaskan'
  return t.outlet_ids.map((id: string) => outlets.value.find(o => o.id === id)?.name ?? id).join(', ')
}

function statusOf(t: any) {
  if (!t.is_active) return { text: 'Nonaktif', color: 'default' }
  if (!t.current_version) return { text: 'Belum publish', color: 'warning' }
  if (t.draft_version && t.draft_version.id !== t.current_version.id) return { text: `Published v${t.current_version.version_number} · draft menunggu`, color: 'info' }
  return { text: `Published v${t.current_version.version_number}`, color: 'success' }
}

async function handleDelete(t: any) {
  if (!await confirm({ title: 'Nonaktifkan Template', message: `Nonaktifkan "${t.label}"? Template tidak akan muncul lagi di kiosk.`, tone: 'danger', confirmText: 'Nonaktifkan' })) return
  await deletePrintTemplate(t.id)
  if (error.value) { toast.error(error.value); return }
  toast.success('Template dinonaktifkan')
  await fetchAll()
}

// ── Manage outlets dialog ──────────────────────────────────────────────────
const showAssign = ref(false)
const assigningTemplate = ref<any | null>(null)
const assignSelection = ref<string[]>([])
function openAssign(t: any) {
  assigningTemplate.value = t
  assignSelection.value = [...(t.outlet_ids ?? [])]
  showAssign.value = true
}
async function saveAssign() {
  await assignOutlets(assigningTemplate.value.id, assignSelection.value)
  if (error.value) { toast.error(error.value); return }
  toast.success('Assignment outlet diperbarui')
  showAssign.value = false
  await fetchAll()
}

// ── Outlet printing settings panel ─────────────────────────────────────────
const selectedOutletId = ref<string>('')
const currentSetting = ref<any | null>(null)
const settingSaving = ref(false)

async function loadOutletSetting() {
  if (!selectedOutletId.value) { currentSetting.value = null; return }
  currentSetting.value = await getOutletPrintSetting(selectedOutletId.value)
}
watch(selectedOutletId, () => { loadOutletSetting(); fetchAll() })

const templatesForSettingsOutlet = computed(() => {
  if (!selectedOutletId.value) return []
  return templates.value.filter(t => t.is_active && t.current_version && (t.is_global || t.outlet_ids?.includes(selectedOutletId.value)))
})

// Each slot only lists templates of its own type — the backend rejects a
// mismatch at checkout, so offering one here would just be a trap.
const primaryOptions = computed(() =>
  templatesForSettingsOutlet.value.filter(t => (t.print_type ?? 'primary') === 'primary')
    .map(t => ({ title: t.label, value: t.id })))
const secondaryOptions = computed(() =>
  templatesForSettingsOutlet.value.filter(t => t.print_type === 'secondary')
    .map(t => ({ title: t.label, value: t.id })))

async function saveOutletSetting() {
  if (!currentSetting.value) return
  settingSaving.value = true
  const res = await updateOutletPrintSetting(selectedOutletId.value, {
    printing_enabled: currentSetting.value.printing_enabled,
    default_template_id: currentSetting.value.default_template_id,
    // Always sent, including as null — that's how the backend distinguishes
    // "withdraw strip prints" from "leave it alone".
    secondary_template_id: currentSetting.value.secondary_template_id ?? null,
    max_copies_per_order: currentSetting.value.max_copies_per_order,
  })
  settingSaving.value = false
  if (settingError.value) { toast.error(settingError.value); return }
  currentSetting.value = res
  toast.success('Pengaturan cetak outlet disimpan')
}

onMounted(async () => { await fetchOutlets(); await fetchAll() })
</script>

<template>
  <div>
    <PageHeader title="Print Templates" subtitle="Kelola template cetak foto yang bisa dikonfigurasi per outlet.">
      <template #actions>
        <VBtn color="primary" prepend-icon="bx-plus" @click="openCreate">Tambah Print Template</VBtn>
      </template>
    </PageHeader>

    <!-- Outlet printing settings -->
    <VCard flat border rounded="lg" class="mb-4">
      <VCardText>
        <p class="text-subtitle-2 font-weight-bold mb-3">Pengaturan Cetak per Outlet</p>
        <VSelect
          v-model="selectedOutletId"
          :items="[{ title: 'Semua Outlet', value: '' }, ...outlets.map(o => ({ title: o.name, value: o.id }))]"
          label="Pilih Outlet"
          density="compact"
          variant="outlined"
          hide-details
          style="max-width:320px"
          class="mb-4"
        />
        <div v-if="currentSetting" class="d-flex flex-column gap-3">
          <div class="d-flex align-center justify-space-between pa-3 rounded-lg" style="background:#f9f9f9;border:1px solid #eee;max-width:520px;">
            <div>
              <p class="text-body-2 font-weight-medium">Aktifkan Cetak</p>
              <p class="text-caption text-medium-emphasis">Nonaktif = tombol cetak tidak muncul di kiosk outlet ini</p>
            </div>
            <VSwitch v-model="currentSetting.printing_enabled" color="success" hide-details density="compact" />
          </div>
          <VSelect
            v-model="currentSetting.default_template_id"
            :items="primaryOptions"
            label="Cetak Utama (Primary) — foto biasa"
            density="compact"
            variant="outlined"
            clearable
            hint="Hanya template published yang di-assign (atau global) ke outlet ini yang muncul"
            persistent-hint
            style="max-width:320px"
          />
          <VSelect
            v-model="currentSetting.secondary_template_id"
            :items="secondaryOptions"
            label="Cetak Kedua (Secondary) — strip foto"
            density="compact"
            variant="outlined"
            clearable
            :hint="secondaryOptions.length
              ? 'Kosongkan bila outlet ini tidak menjual strip foto — pilihan strip disembunyikan di kiosk'
              : 'Belum ada template bertipe Strip Foto untuk outlet ini'"
            persistent-hint
            :disabled="!secondaryOptions.length"
            style="max-width:320px"
          />
          <VTextField
            v-model.number="currentSetting.max_copies_per_order"
            type="number"
            label="Maks. Salinan per Pesanan (opsional)"
            density="compact"
            variant="outlined"
            style="max-width:320px"
          />
          <VBtn color="primary" :loading="settingSaving" class="align-self-start" @click="saveOutletSetting">Simpan</VBtn>
        </div>
        <p v-else-if="selectedOutletId" class="text-caption text-medium-emphasis">Memuat…</p>
      </VCardText>
    </VCard>

    <VCard flat border rounded="lg">
      <VCardText>
        <VProgressLinear v-if="loading" indeterminate color="primary" class="mb-4" />
        <div v-if="!loading && templates.length === 0" class="text-center pa-12 text-medium-emphasis">
          <VIcon size="56" class="mb-3" color="grey-lighten-1">bx-image-alt</VIcon>
          <p class="text-subtitle-1">Belum ada print template</p>
          <p class="text-caption">Klik "Tambah Print Template" untuk mulai.</p>
        </div>

        <div class="templates-grid">
          <VCard v-for="t in templates" :key="t.id" :class="{ 'opacity-50': !t.is_active }" border flat class="template-card">
            <div class="template-thumb">
              <img v-if="t.current_version?.background_url" :src="t.current_version.background_url" :alt="t.label" style="width:100%;height:100%;object-fit:contain;" >
              <div v-else class="d-flex align-center justify-center" style="height:100%;color:#bbb;"><VIcon size="40">bx bx-image</VIcon></div>
              <VChip size="x-small" color="primary" style="position:absolute;top:6px;left:6px;">{{ t.paper_size }}</VChip>
              <VChip
                v-if="t.print_type === 'secondary'"
                size="x-small"
                color="secondary"
                style="position:absolute;top:6px;right:6px;"
              >Strip</VChip>
              <VChip size="x-small" :color="statusOf(t).color" style="position:absolute;top:6px;right:6px;">{{ statusOf(t).text }}</VChip>
            </div>
            <VCardText class="pa-2">
              <div class="d-flex align-center justify-space-between gap-2">
                <div class="text-body-2 font-weight-bold text-truncate">{{ t.label }}</div>
                <div class="text-caption font-weight-medium flex-shrink-0" :class="t.price ? 'text-primary' : 'text-medium-emphasis'">
                  {{ t.price ? `Rp ${t.price.toLocaleString()}` : 'Belum ada harga' }}
                </div>
              </div>
              <div class="text-caption text-medium-emphasis text-truncate">
                <VIcon size="10">bx-store</VIcon> {{ outletNames(t) }}
              </div>
            </VCardText>
            <VCardActions class="pa-2 pt-0 flex-wrap">
              <VBtn size="small" variant="tonal" color="warning" prepend-icon="bx-edit-alt" class="text-none" @click="openEdit(t)">Edit</VBtn>
              <VBtn v-if="!t.is_global" size="small" variant="tonal" color="secondary" prepend-icon="bx-store" class="text-none" @click="openAssign(t)">Outlet</VBtn>
              <VSpacer />
              <VBtn icon variant="text" size="small" @click="handleDelete(t)"><VIcon color="error">bx-trash-alt</VIcon></VBtn>
            </VCardActions>
          </VCard>
        </div>
      </VCardText>
    </VCard>

    <PrintTemplateEditor v-model="editorOpen" :editing-template="editingTemplate" @saved="fetchAll" />

    <!-- Manage outlets dialog -->
    <VDialog v-model="showAssign" max-width="420">
      <VCard v-if="assigningTemplate" rounded="lg">
        <VCardTitle class="d-flex align-center gap-2 pa-4 pb-2">
          <VIcon color="primary">bx-store</VIcon> Kelola Outlet — {{ assigningTemplate.label }}
        </VCardTitle>
        <VDivider />
        <VCardText class="pa-4">
          <VSelect
            v-model="assignSelection"
            :items="outlets.map(o => ({ title: o.name, value: o.id }))"
            label="Outlet"
            multiple
            chips
            density="compact"
            variant="outlined"
          />
        </VCardText>
        <VCardActions class="pa-4 pt-0">
          <VSpacer />
          <VBtn variant="text" @click="showAssign = false">Batal</VBtn>
          <VBtn color="primary" @click="saveAssign">Simpan</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
.templates-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
.template-card { transition: box-shadow 0.2s; }
.template-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.12); }
.template-thumb { position: relative; background: #f5f5f5; height: 160px; overflow: hidden; }
</style>
