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
  // The list is the library — always the full one. Which templates a given
  // outlet can actually use is answered by step 2's dropdowns, not by
  // silently filtering this grid.
  await getPrintTemplates({})
}

async function fetchOutlets() {
  const res = await useOutlets().getOutlets({ page: 1, limit: 9999, is_kiosk: true })
  outlets.value = res?.data || []
  if (outlets.value.length === 1) selectedOutletId.value = outlets.value[0].id
}

function openCreate() { editingTemplate.value = null; editorOpen.value = true }
function openEdit(t: any) { editingTemplate.value = t; editorOpen.value = true }

function outletNames(t: any) {
  if (t.is_global) return 'Semua outlet'
  if (!t.outlet_ids?.length) return 'Belum ditugaskan ke outlet'
  return t.outlet_ids.map((id: string) => outlets.value.find(o => o.id === id)?.name ?? id).join(', ')
}

function typeLabel(t: any) { return t.print_type === 'secondary' ? 'Strip foto' : 'Foto biasa' }

// Short, so it fits a chip. "Draft" is the state that blocks a template from
// being selectable in step 2, so it has to read as a problem, not a stage.
function statusOf(t: any) {
  if (!t.is_active) return { text: 'Nonaktif', color: 'default' }
  if (!t.current_version) return { text: 'Draft', color: 'warning' }
  if (t.draft_version && t.draft_version.id !== t.current_version.id) return { text: `Live v${t.current_version.version_number} + draft`, color: 'info' }
  return { text: `Live v${t.current_version.version_number}`, color: 'success' }
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
  toast.success('Outlet template diperbarui')
  showAssign.value = false
  await fetchAll()
}

// ── Step 2: per-outlet printing settings ───────────────────────────────────
const selectedOutletId = ref<string>('')
const currentSetting = ref<any | null>(null)
const settingLoading = ref(false)
const settingSaving = ref(false)

async function loadOutletSetting() {
  if (!selectedOutletId.value) { currentSetting.value = null; return }
  settingLoading.value = true
  currentSetting.value = await getOutletPrintSetting(selectedOutletId.value)
  settingLoading.value = false
  if (settingError.value) toast.error(settingError.value)
}
watch(selectedOutletId, loadOutletSetting)

const selectedOutletName = computed(() => outlets.value.find(o => o.id === selectedOutletId.value)?.name ?? '')

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
  toast.success(`Pengaturan cetak ${selectedOutletName.value} disimpan — kiosk sinkron otomatis.`)
}

onMounted(async () => { await fetchOutlets(); await fetchAll() })
</script>

<template>
  <div>
    <PageHeader
      title="Cetak Foto"
      subtitle="Dua langkah: buat template cetaknya dulu, lalu tentukan template mana yang dipakai kiosk tiap outlet."
    >
      <template #actions>
        <VBtn color="primary" prepend-icon="bx-plus" @click="openCreate">Tambah Template</VBtn>
      </template>
    </PageHeader>

    <!-- ── Step 1 · template library ───────────────────────────────────── -->
    <VCard flat border rounded="lg" class="mb-6">
      <VCardText>
        <div class="step-head">
          <span class="step-head__num">1</span>
          <div>
            <p class="step-head__title">Buat template cetak</p>
            <p class="step-head__desc">
              Atur layout, ukuran kertas, dan harga per lembar. Template baru berstatus
              <strong>Draft</strong> — publikasikan dulu agar bisa dipakai di langkah 2.
            </p>
          </div>
        </div>

        <VProgressLinear v-if="loading" indeterminate color="primary" class="mb-4" />

        <EmptyState
          v-if="!loading && templates.length === 0"
          icon="bx-image-alt"
          title="Belum ada template cetak"
          description="Mulai dari satu template foto biasa (mis. 4R), publikasikan, lalu lanjut ke langkah 2."
        >
          <VBtn color="primary" prepend-icon="bx-plus" @click="openCreate">Tambah Template</VBtn>
        </EmptyState>

        <div v-else class="templates-grid">
          <VCard v-for="t in templates" :key="t.id" :class="{ 'opacity-50': !t.is_active }" border flat class="template-card">
            <div class="template-thumb">
              <img v-if="t.current_version?.background_url" :src="t.current_version.background_url" :alt="t.label" style="width:100%;height:100%;object-fit:contain;" >
              <div v-else class="d-flex align-center justify-center template-thumb__placeholder"><VIcon size="40">bx bx-image</VIcon></div>
              <VChip size="x-small" color="primary" style="position:absolute;top:6px;left:6px;">{{ t.paper_size }}</VChip>
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
                {{ typeLabel(t) }} · {{ outletNames(t) }}
              </div>
            </VCardText>
            <VCardActions class="pa-2 pt-0 flex-wrap">
              <VBtn size="small" variant="tonal" color="primary" prepend-icon="bx-edit-alt" class="text-none" @click="openEdit(t)">Edit</VBtn>
              <VBtn v-if="!t.is_global" size="small" variant="tonal" color="secondary" prepend-icon="bx-store" class="text-none" @click="openAssign(t)">Outlet</VBtn>
              <VSpacer />
              <VBtn icon variant="text" size="small" aria-label="Nonaktifkan template" @click="handleDelete(t)">
                <VIcon color="error">bx-power-off</VIcon>
                <VTooltip activator="parent" location="top">Nonaktifkan</VTooltip>
              </VBtn>
            </VCardActions>
          </VCard>
        </div>
      </VCardText>
    </VCard>

    <!-- ── Step 2 · per-outlet setup ───────────────────────────────────── -->
    <VCard flat border rounded="lg">
      <VCardText>
        <div class="step-head">
          <span class="step-head__num">2</span>
          <div>
            <p class="step-head__title">Pakai template di outlet</p>
            <p class="step-head__desc">
              Tiap kiosk memakai satu template foto biasa dan (opsional) satu template strip foto.
              Hanya template berstatus <strong>Live</strong> dan ditugaskan ke outlet tersebut yang bisa dipilih.
            </p>
          </div>
        </div>

        <div v-if="outlets.length > 1" class="outlet-picker mb-6">
          <button
            v-for="o in outlets"
            :key="o.id"
            type="button"
            class="outlet-picker__item"
            :class="{ 'outlet-picker__item--active': o.id === selectedOutletId }"
            @click="selectedOutletId = o.id"
          >
            {{ o.name }}
          </button>
        </div>

        <EmptyState
          v-if="!outlets.length"
          icon="bx-store-alt"
          title="Belum ada outlet kiosk"
          description="Tandai sebuah outlet sebagai kiosk terlebih dahulu di halaman Outlets."
        />
        <EmptyState
          v-else-if="!selectedOutletId"
          icon="bx-store"
          title="Pilih outlet"
          description="Pilih outlet di atas untuk mengatur template cetak kiosk-nya."
        />

        <VProgressLinear v-else-if="settingLoading" indeterminate color="primary" />

        <template v-else-if="currentSetting">
          <SettingsCard
            title="Cetak foto aktif di kiosk"
            :description="`Kalau nonaktif, tombol cetak tidak muncul sama sekali di kiosk ${selectedOutletName}.`"
          >
            <VSwitch v-model="currentSetting.printing_enabled" color="success" hide-details />
          </SettingsCard>

          <InlineAlert v-if="!currentSetting.printing_enabled" tone="info" class="mt-4">
            Cetak dimatikan untuk {{ selectedOutletName }} — pelanggan hanya bisa mengunduh foto digital.
          </InlineAlert>

          <template v-else>
            <InlineAlert v-if="!primaryOptions.length" tone="warning" class="mt-4">
              Belum ada template <strong>foto biasa</strong> yang Live untuk outlet ini. Publikasikan template
              di langkah 1 dan tugaskan ke {{ selectedOutletName }} lewat tombol <strong>Outlet</strong>.
            </InlineAlert>
            <InlineAlert v-else-if="!currentSetting.default_template_id" tone="warning" class="mt-4">
              Cetak aktif tapi belum ada template foto biasa yang dipilih — kiosk akan menolak pesanan cetak.
            </InlineAlert>

            <FormSection title="Template yang dipakai">
              <FormField
                label="Cetak foto biasa"
                helper="Dipakai saat pelanggan memesan cetak foto standar."
              >
                <template #default="{ id, describedBy }">
                  <VSelect
                    :id="id"
                    v-model="currentSetting.default_template_id"
                    :items="primaryOptions"
                    :disabled="!primaryOptions.length"
                    clearable
                    placeholder="Pilih template"
                    :aria-describedby="describedBy"
                  />
                </template>
              </FormField>

              <FormField
                label="Cetak strip foto"
                optional
                :helper="secondaryOptions.length
                  ? 'Kosongkan bila outlet ini tidak menjual strip foto — pilihan strip disembunyikan di kiosk.'
                  : 'Belum ada template bertipe strip foto yang Live untuk outlet ini.'"
              >
                <template #default="{ id, describedBy }">
                  <VSelect
                    :id="id"
                    v-model="currentSetting.secondary_template_id"
                    :items="secondaryOptions"
                    :disabled="!secondaryOptions.length"
                    clearable
                    placeholder="Tidak menjual strip foto"
                    :aria-describedby="describedBy"
                  />
                </template>
              </FormField>

              <FormField
                label="Maks. salinan per pesanan"
                optional
                width="num"
                helper="Kosongkan untuk tanpa batas."
              >
                <template #default="{ id, describedBy }">
                  <VTextField
                    :id="id"
                    v-model.number="currentSetting.max_copies_per_order"
                    type="number"
                    min="1"
                    placeholder="cth: 5"
                    :aria-describedby="describedBy"
                  />
                </template>
              </FormField>
            </FormSection>
          </template>

          <div class="d-flex justify-end mt-6">
            <VBtn color="primary" :loading="settingSaving" prepend-icon="bx-save" @click="saveOutletSetting">
              Simpan Pengaturan {{ selectedOutletName }}
            </VBtn>
          </div>
        </template>
      </VCardText>
    </VCard>

    <PrintTemplateEditor v-model="editorOpen" :editing-template="editingTemplate" @saved="fetchAll" />

    <!-- Manage outlets dialog -->
    <AppModal
      v-model="showAssign"
      title="Outlet yang Memakai Template Ini"
      :description="assigningTemplate?.label"
      size="sm"
      confirm-text="Simpan"
      cancel-text="Batal"
      @confirm="saveAssign"
    >
      <FormField label="Outlet" helper="Template hanya bisa dipilih di langkah 2 untuk outlet yang tercentang di sini.">
        <template #default="{ id, describedBy }">
          <VSelect
            :id="id"
            v-model="assignSelection"
            :items="outlets.map(o => ({ title: o.name, value: o.id }))"
            multiple
            chips
            :aria-describedby="describedBy"
          />
        </template>
      </FormField>
    </AppModal>
  </div>
</template>

<style scoped>
.step-head { display: flex; gap: var(--sp-5); margin-bottom: var(--sp-7); }

.step-head__num {
  flex: 0 0 auto;
  inline-size: 26px;
  block-size: 26px;
  border-radius: 50%;
  background: rgb(var(--v-theme-primary) / 10%);
  color: rgb(var(--v-theme-primary));
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-head__title { font-size: var(--fs-md); font-weight: var(--fw-semibold); color: var(--text-primary); margin: 0; }
.step-head__desc { font-size: var(--fs-sm); color: var(--text-tertiary); margin: var(--sp-1) 0 0; max-width: var(--measure); }

.outlet-picker { display: flex; flex-wrap: wrap; gap: var(--sp-4); }

.outlet-picker__item {
  padding: var(--sp-3) var(--sp-6);
  border-radius: var(--radius-md);
  border: var(--border-default);
  background: var(--n-0);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  color: var(--text-secondary);
  cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease-in-out), color var(--dur-fast) var(--ease-in-out);
}

.outlet-picker__item:hover { border-color: var(--n-300); }

.outlet-picker__item--active {
  border-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-primary));
  background: rgb(var(--v-theme-primary) / 6%);
}

.templates-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
.template-card { transition: box-shadow 0.2s; }
.template-card:hover { box-shadow: var(--shadow-md); }
.template-thumb { position: relative; background: var(--n-50); height: 160px; overflow: hidden; }
.template-thumb__placeholder { height: 100%; color: var(--text-tertiary); }
</style>
