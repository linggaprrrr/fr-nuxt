<script setup lang="ts">
import { useAiTemplates } from '@/composables/useAiTemplates'
import { useOutlets } from '@/composables/useOutlets'

const { templates, loading, error, getAiTemplates, createAiTemplate, updateAiTemplate, deleteAiTemplate, reorderAiTemplates, tryAiTemplate } = useAiTemplates()
const toast = useToast()
const { confirm } = useConfirm()

const activeTab = ref<'templates' | 'try'>('templates')

const outlets      = ref<any[]>([])
const outletFilter = ref<string>('')
const isSubmitting = ref(false)

// ── Create dialog ──────────────────────────────────────────────────────────
const showCreate      = ref(false)
const createLabel     = ref('')
const createPrompt    = ref('')
const createOutlet    = ref('')
const beforeFile      = ref<File | null>(null)
const afterFile       = ref<File | null>(null)
const beforeFileInput = ref<HTMLInputElement | null>(null)
const afterFileInput  = ref<HTMLInputElement | null>(null)
const beforePreviewUrl = computed(() => beforeFile.value ? URL.createObjectURL(beforeFile.value) : null)
const afterPreviewUrl  = computed(() => afterFile.value  ? URL.createObjectURL(afterFile.value)  : null)

// ── Edit dialog ────────────────────────────────────────────────────────────
const showEdit  = ref(false)
const editForm  = ref({ id: '', label: '', prompt: '', outlet_id: '', is_active: true })
const editBeforeFile      = ref<File | null>(null)
const editAfterFile       = ref<File | null>(null)
const editBeforeFileInput = ref<HTMLInputElement | null>(null)
const editAfterFileInput  = ref<HTMLInputElement | null>(null)

// ── Drag-to-reorder ────────────────────────────────────────────────────────
const dragIndex     = ref<number | null>(null)
const overIndex     = ref<number | null>(null)
const isSavingOrder = ref(false)

// ── Try Prompt ─────────────────────────────────────────────────────────────
const tryMode        = ref<'template' | 'custom'>('template')
const tryTemplateId  = ref<string>('')
const tryCustomPrompt = ref<string>('')
const tryImageFile   = ref<File | null>(null)
const tryImageInput  = ref<HTMLInputElement | null>(null)
const tryResultUrl   = ref<string | null>(null)
const isTrying       = ref(false)
const tryImagePreview = computed(() => tryImageFile.value ? URL.createObjectURL(tryImageFile.value) : null)

const templateItems = computed(() => templates.value.map(t => ({ title: t.label, value: t.id })))
const selectedTemplate = computed(() => templates.value.find(t => t.id === tryTemplateId.value) ?? null)

const tryReady = computed(() => {
  if (!tryImageFile.value) return false
  if (tryMode.value === 'template') return !!tryTemplateId.value
  return !!tryCustomPrompt.value.trim()
})

async function handleTry() {
  if (!tryImageFile.value) { toast.error('Upload gambar terlebih dahulu.'); return }
  if (tryMode.value === 'template' && !tryTemplateId.value) { toast.error('Pilih template terlebih dahulu.'); return }
  if (tryMode.value === 'custom' && !tryCustomPrompt.value.trim()) { toast.error('Tulis prompt terlebih dahulu.'); return }
  isTrying.value = true
  tryResultUrl.value = null
  const opts = tryMode.value === 'template'
    ? { templateId: tryTemplateId.value }
    : { prompt: tryCustomPrompt.value.trim() }
  const url = await tryAiTemplate(tryImageFile.value, opts)
  isTrying.value = false
  if (!url) { toast.error(error.value || 'Gagal menjalankan prompt.'); return }
  tryResultUrl.value = url
}

function resetTry() {
  tryImageFile.value = null
  tryResultUrl.value = null
  if (tryImageInput.value) tryImageInput.value.value = ''
}

// ── Drag ───────────────────────────────────────────────────────────────────
function onDragStart(i: number) { dragIndex.value = i }
function onDragOver(i: number)  { overIndex.value = i }

async function onDrop(targetIndex: number) {
  if (dragIndex.value === null || dragIndex.value === targetIndex) {
    dragIndex.value = null; overIndex.value = null; return
  }
  const reordered = [...templates.value]
  const [moved] = reordered.splice(dragIndex.value, 1)
  reordered.splice(targetIndex, 0, moved)
  templates.value = reordered
  dragIndex.value = null; overIndex.value = null

  isSavingOrder.value = true
  await reorderAiTemplates(reordered)
  isSavingOrder.value = false
  if (error.value) toast.error(error.value)
}

function onDragEnd() { dragIndex.value = null; overIndex.value = null }

async function fetchAll() {
  const params: any = {}
  if (outletFilter.value) params.outlet_id = outletFilter.value
  await getAiTemplates(params)
}

async function fetchOutlets() {
  const { getOutlets } = useOutlets()
  const res = await getOutlets({ page: 1, limit: 9999 })
  outlets.value = res?.data || []
}

async function handleCreate() {
  if (!createLabel.value || !createPrompt.value) {
    toast.error('Label dan Prompt wajib diisi.')
    return
  }
  isSubmitting.value = true
  error.value = null
  const form = new FormData()
  form.append('label',      createLabel.value)
  form.append('prompt',     createPrompt.value)
  form.append('sort_order', String(templates.value.length))
  if (createOutlet.value)   form.append('outlet_id', createOutlet.value)
  if (beforeFile.value)     form.append('before_file', beforeFile.value)
  if (afterFile.value)      form.append('after_file',  afterFile.value)
  await createAiTemplate(form)
  isSubmitting.value = false
  if (error.value) { toast.error(error.value); return }
  toast.success('Template ditambahkan')
  resetCreateForm()
  showCreate.value = false
  await fetchAll()
}

function resetCreateForm() {
  createLabel.value = ''; createPrompt.value = ''; createOutlet.value = ''
  beforeFile.value = null; afterFile.value = null
  if (beforeFileInput.value) beforeFileInput.value.value = ''
  if (afterFileInput.value)  afterFileInput.value.value  = ''
}

function openEdit(tpl: any) {
  editForm.value = { id: tpl.id, label: tpl.label, prompt: tpl.prompt ?? '', outlet_id: tpl.outlet_id ?? '', is_active: tpl.is_active }
  editBeforeFile.value = null; editAfterFile.value = null
  showEdit.value = true
}

async function handleUpdate() {
  isSubmitting.value = true
  error.value = null
  const form = new FormData()
  form.append('label',     editForm.value.label)
  form.append('prompt',    editForm.value.prompt)
  form.append('outlet_id', editForm.value.outlet_id)
  form.append('is_active', String(editForm.value.is_active))
  if (editBeforeFile.value) form.append('before_file', editBeforeFile.value)
  if (editAfterFile.value)  form.append('after_file',  editAfterFile.value)
  await updateAiTemplate(editForm.value.id, form)
  isSubmitting.value = false
  if (error.value) { toast.error(error.value); return }
  toast.success('Template diperbarui')
  showEdit.value = false
  await fetchAll()
}

async function handleDelete(id: string) {
  if (!await confirm({ title: 'Hapus AI Template', message: 'Hapus AI template ini?', tone: 'danger', confirmText: 'Hapus' })) return
  await deleteAiTemplate(id)
  if (error.value) { toast.error(error.value); return }
  toast.success('Template dihapus')
  await fetchAll()
}

const outletItems = computed(() => [
  { title: 'Global (semua outlet)', value: '' },
  ...outlets.value.map(o => ({ title: o.name, value: o.id })),
])

onMounted(() => { fetchOutlets(); fetchAll() })
</script>

<template>
  <div>
    <PageHeader title="AI Templates" subtitle="Kelola template AI Transform. Drag untuk mengatur urutan tampilan di kiosk.">
      <template #actions>
        <VChip v-if="isSavingOrder" color="primary" size="small" variant="tonal" prepend-icon="bx-loader-alt">
          Menyimpan urutan…
        </VChip>
        <VBtn v-if="activeTab === 'templates'" color="primary" prepend-icon="bx-plus" @click="showCreate = true">Tambah Template</VBtn>
      </template>
    </PageHeader>

    <!-- Tabs -->
    <VTabs v-model="activeTab" color="primary" class="mb-4">
      <VTab value="templates" prepend-icon="bx-list-ul">Templates</VTab>
      <VTab value="try" prepend-icon="bx-play-circle">Try Prompt</VTab>
    </VTabs>

    <!-- ── Tab: Templates ──────────────────────────────────────────────── -->
    <VTabsWindow v-model="activeTab">
      <VTabsWindowItem value="templates">
        <!-- Filter -->
        <VCard class="mb-4" flat border rounded="lg">
          <VCardText class="py-3">
            <div class="d-flex align-center gap-3 flex-wrap">
              <VSelect
                v-model="outletFilter"
                :items="outletItems"
                label="Filter Outlet"
                density="compact"
                variant="outlined"
                hide-details
                style="max-width:260px"
                @update:modelValue="fetchAll"
              />
              <VChip color="primary" size="small" variant="tonal">{{ templates.length }} template</VChip>
            </div>
          </VCardText>
        </VCard>

        <!-- Template list (drag-to-reorder) -->
        <VCard flat border rounded="lg">
          <VCardText>
            <VProgressLinear v-if="loading" indeterminate color="primary" class="mb-4" />

            <div v-if="!loading && templates.length === 0" class="text-center pa-12 text-medium-emphasis">
              <VIcon size="56" class="mb-3" color="grey-lighten-1">bx-bot</VIcon>
              <p class="text-subtitle-1 font-weight-medium">Belum ada AI template</p>
              <p class="text-caption">Klik "Tambah Template" untuk membuat template pertama.</p>
            </div>

            <div class="tpl-list">
              <div
                v-for="(tpl, i) in templates"
                :key="tpl.id"
                class="tpl-row"
                :class="{
                  'tpl-row-inactive': !tpl.is_active,
                  'tpl-row-dragging': dragIndex === i,
                  'tpl-row-over': overIndex === i && dragIndex !== i,
                }"
                draggable="true"
                @dragstart="onDragStart(i)"
                @dragover.prevent="onDragOver(i)"
                @drop.prevent="onDrop(i)"
                @dragend="onDragEnd"
              >
                <VIcon size="18" color="grey" class="drag-handle">bx-menu</VIcon>

                <div class="tpl-thumb">
                  <img v-if="tpl.after_url" :src="tpl.after_url" alt="result" />
                  <div v-else class="tpl-thumb-empty" />
                </div>

                <div class="tpl-meta flex-1 min-width-0">
                  <p class="tpl-label">{{ tpl.label }}</p>
                  <div class="d-flex gap-1 mt-1 flex-wrap">
                    <VChip size="x-small" :color="tpl.is_active ? 'success' : 'default'">{{ tpl.is_active ? 'Aktif' : 'Off' }}</VChip>
                    <VChip v-if="!tpl.outlet_id" size="x-small" color="info" variant="tonal">Global</VChip>
                  </div>
                </div>

                <div class="d-flex gap-1 flex-shrink-0">
                  <VBtn icon variant="text" size="x-small" color="info" title="Coba prompt ini"
                    @click="tryTemplateId = tpl.id; activeTab = 'try'">
                    <VIcon size="16">bx-play-circle</VIcon>
                  </VBtn>
                  <VBtn icon variant="text" size="x-small" @click="openEdit(tpl)">
                    <VIcon size="16" color="warning">bx-edit-alt</VIcon>
                  </VBtn>
                  <VBtn icon variant="text" size="x-small" @click="handleDelete(tpl.id)">
                    <VIcon size="16" color="error">bx-trash-alt</VIcon>
                  </VBtn>
                </div>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VTabsWindowItem>

      <!-- ── Tab: Try Prompt ───────────────────────────────────────────── -->
      <VTabsWindowItem value="try">
        <VRow>
          <!-- Left: input panel -->
          <VCol cols="12" md="5">
            <VCard flat border rounded="lg">
              <VCardText class="d-flex flex-column gap-4">

                <!-- Mode toggle -->
                <VBtnToggle v-model="tryMode" mandatory color="primary" variant="outlined" density="compact" rounded="lg" divided class="w-100">
                  <VBtn value="template" prepend-icon="bx-list-ul" class="flex-1">Gunakan Template</VBtn>
                  <VBtn value="custom" prepend-icon="bx-edit" class="flex-1">Prompt Sendiri</VBtn>
                </VBtnToggle>

                <!-- Template mode -->
                <template v-if="tryMode === 'template'">
                  <div>
                    <p class="text-subtitle-2 font-weight-bold mb-2">1. Pilih Template</p>
                    <VSelect
                      v-model="tryTemplateId"
                      :items="templateItems"
                      label="Template"
                      variant="outlined"
                      density="comfortable"
                      hide-details
                    />
                  </div>
                  <VCard v-if="selectedTemplate" flat color="grey-lighten-5" rounded="lg">
                    <VCardText class="pa-3">
                      <p class="text-caption text-medium-emphasis mb-1">Prompt yang akan dijalankan:</p>
                      <p class="text-body-2" style="white-space:pre-wrap;font-family:monospace;font-size:12px;">{{ selectedTemplate.prompt }}</p>
                    </VCardText>
                  </VCard>
                </template>

                <!-- Custom prompt mode -->
                <template v-else>
                  <div>
                    <p class="text-subtitle-2 font-weight-bold mb-2">1. Tulis Prompt</p>
                    <VTextarea
                      v-model="tryCustomPrompt"
                      label="Prompt AI"
                      variant="outlined"
                      rows="5"
                      hint="Prompt ini dikirim langsung ke Gemini tanpa disimpan"
                      persistent-hint
                    />
                  </div>
                </template>

                <!-- Image upload -->
                <div>
                  <p class="text-subtitle-2 font-weight-bold mb-2">2. Upload Gambar</p>
                  <div class="try-drop-zone" :class="{ 'has-image': !!tryImagePreview }" @click="tryImageInput?.click()">
                    <img v-if="tryImagePreview" :src="tryImagePreview" class="try-preview" />
                    <template v-else>
                      <VIcon size="40" color="primary">bx-image-add</VIcon>
                      <p class="text-body-2 mt-2 text-medium-emphasis">Klik untuk upload gambar</p>
                    </template>
                  </div>
                  <input ref="tryImageInput" type="file" accept="image/*" style="display:none"
                    @change="e => { tryImageFile = (e.target as HTMLInputElement).files?.[0] ?? null; tryResultUrl = null }" />
                </div>

                <div class="d-flex gap-2">
                  <VBtn
                    color="primary"
                    prepend-icon="bx-play"
                    :loading="isTrying"
                    :disabled="!tryReady"
                    class="flex-1"
                    @click="handleTry"
                  >
                    Jalankan Prompt
                  </VBtn>
                  <VBtn icon variant="outlined" color="grey" title="Reset" @click="resetTry">
                    <VIcon>bx-reset</VIcon>
                  </VBtn>
                </div>
              </VCardText>
            </VCard>
          </VCol>

          <!-- Right: result panel -->
          <VCol cols="12" md="7">
            <VCard flat border rounded="lg" height="100%">
              <VCardTitle class="pa-4 pb-2 text-subtitle-1 font-weight-bold">
                Hasil
              </VCardTitle>
              <VDivider />
              <VCardText class="d-flex align-center justify-center" style="min-height:380px">
                <!-- Loading -->
                <div v-if="isTrying" class="text-center text-medium-emphasis">
                  <VProgressCircular indeterminate color="primary" size="52" class="mb-3" />
                  <p class="text-body-2">Sedang memproses…</p>
                </div>

                <!-- Result -->
                <div v-else-if="tryResultUrl" class="result-wrap">
                  <img :src="tryResultUrl" class="result-img" alt="AI result" />
                  <div class="d-flex gap-2 mt-3">
                    <VBtn
                      color="success"
                      prepend-icon="bx-download"
                      :href="tryResultUrl"
                      download="ai-result.jpg"
                      target="_blank"
                      class="flex-1"
                    >
                      Download Hasil
                    </VBtn>
                    <VBtn
                      v-if="tryMode === 'custom' && tryCustomPrompt"
                      color="primary"
                      prepend-icon="bx-plus"
                      variant="tonal"
                      @click="showCreate = true; createPrompt = tryCustomPrompt; activeTab = 'templates'"
                    >
                      Simpan sebagai Template
                    </VBtn>
                  </div>
                </div>

                <!-- Before/after comparison if template has sample images -->
                <div v-else-if="selectedTemplate?.before_url || selectedTemplate?.after_url" class="text-center w-100">
                  <p class="text-caption text-medium-emphasis mb-4">Contoh hasil template ini:</p>
                  <div class="d-flex gap-3 justify-center">
                    <div v-if="selectedTemplate.before_url" class="sample-wrap">
                      <p class="text-caption text-medium-emphasis mb-1">Before</p>
                      <img :src="selectedTemplate.before_url" class="sample-img" />
                    </div>
                    <VIcon size="24" color="grey" class="align-self-center">bx-right-arrow-alt</VIcon>
                    <div v-if="selectedTemplate.after_url" class="sample-wrap">
                      <p class="text-caption text-medium-emphasis mb-1">After</p>
                      <img :src="selectedTemplate.after_url" class="sample-img" />
                    </div>
                  </div>
                  <p class="text-caption text-medium-emphasis mt-4">Upload gambar dan klik "Jalankan Prompt" untuk melihat hasilnya.</p>
                </div>

                <!-- Empty -->
                <div v-else class="text-center text-medium-emphasis">
                  <VIcon size="64" color="grey-lighten-2">bx-bot</VIcon>
                  <p class="text-body-2 mt-3">Pilih template dan upload gambar untuk mencoba prompt.</p>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VTabsWindowItem>
    </VTabsWindow>

    <!-- Create dialog -->
    <VDialog v-model="showCreate" max-width="580" persistent>
      <VCard rounded="lg">
        <VCardTitle class="d-flex align-center gap-2 pa-4 pb-2">
          <VIcon color="primary">bx-bot</VIcon>
          Tambah AI Template
          <VSpacer />
          <VBtn icon variant="text" size="small" @click="showCreate = false; resetCreateForm()">
            <VIcon>bx-x</VIcon>
          </VBtn>
        </VCardTitle>
        <VDivider />
        <VCardText class="pa-4 d-flex flex-column gap-4">
          <VTextField v-model="createLabel" label="Label *" density="compact" variant="outlined" />
          <VTextarea v-model="createPrompt" label="Prompt AI *" density="compact" variant="outlined" rows="4" hint="Prompt ini dikirim ke Gemini saat kiosk menerapkan template" persistent-hint />

          <div class="d-flex gap-3">
            <div class="flex-1">
              <p class="text-caption font-weight-bold mb-1">Gambar Before (contoh)</p>
              <div class="drop-zone" @click="beforeFileInput?.click()">
                <img v-if="beforePreviewUrl" :src="beforePreviewUrl" class="drop-preview" />
                <template v-else>
                  <VIcon size="28" color="primary">bx-image-add</VIcon>
                  <p class="text-caption mt-1">Klik upload</p>
                </template>
              </div>
              <input ref="beforeFileInput" type="file" accept="image/*" style="display:none"
                @change="e => beforeFile = (e.target as HTMLInputElement).files?.[0] ?? null" />
            </div>
            <div class="flex-1">
              <p class="text-caption font-weight-bold mb-1">Gambar After (contoh)</p>
              <div class="drop-zone" @click="afterFileInput?.click()">
                <img v-if="afterPreviewUrl" :src="afterPreviewUrl" class="drop-preview" />
                <template v-else>
                  <VIcon size="28" color="primary">bx-image-add</VIcon>
                  <p class="text-caption mt-1">Klik upload</p>
                </template>
              </div>
              <input ref="afterFileInput" type="file" accept="image/*" style="display:none"
                @change="e => afterFile = (e.target as HTMLInputElement).files?.[0] ?? null" />
            </div>
          </div>

          <VSelect v-model="createOutlet" :items="outletItems" label="Outlet" density="compact" variant="outlined" hint="Kosongkan agar muncul di semua outlet (global)" persistent-hint />
        </VCardText>
        <VDivider />
        <VCardActions class="pa-4">
          <VSpacer />
          <VBtn variant="text" :disabled="isSubmitting" @click="showCreate = false; resetCreateForm()">Batal</VBtn>
          <VBtn color="primary" variant="elevated" :loading="isSubmitting" :disabled="!createLabel || !createPrompt" @click="handleCreate">Simpan</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Edit dialog -->
    <VDialog v-model="showEdit" max-width="580">
      <VCard rounded="lg">
        <VCardTitle class="d-flex align-center gap-2 pa-4 pb-2">
          <VIcon color="warning">bx-edit-alt</VIcon>
          Edit AI Template
          <VSpacer />
          <VBtn icon variant="text" size="small" @click="showEdit = false"><VIcon>bx-x</VIcon></VBtn>
        </VCardTitle>
        <VDivider />
        <VCardText class="pa-4 d-flex flex-column gap-4">
          <VTextField v-model="editForm.label" label="Label *" density="compact" variant="outlined" />
          <VTextarea v-model="editForm.prompt" label="Prompt AI *" density="compact" variant="outlined" rows="4" />

          <div class="d-flex gap-3">
            <div class="flex-1">
              <p class="text-caption font-weight-bold mb-1">Ganti Gambar Before (opsional)</p>
              <div class="drop-zone drop-zone-sm" @click="editBeforeFileInput?.click()">
                <img v-if="editBeforeFile" :src="URL.createObjectURL(editBeforeFile)" class="drop-preview" />
                <template v-else>
                  <VIcon size="22" color="grey">bx-image-add</VIcon>
                  <p class="text-caption">Ganti</p>
                </template>
              </div>
              <input ref="editBeforeFileInput" type="file" accept="image/*" style="display:none"
                @change="e => editBeforeFile = (e.target as HTMLInputElement).files?.[0] ?? null" />
            </div>
            <div class="flex-1">
              <p class="text-caption font-weight-bold mb-1">Ganti Gambar After (opsional)</p>
              <div class="drop-zone drop-zone-sm" @click="editAfterFileInput?.click()">
                <img v-if="editAfterFile" :src="URL.createObjectURL(editAfterFile)" class="drop-preview" />
                <template v-else>
                  <VIcon size="22" color="grey">bx-image-add</VIcon>
                  <p class="text-caption">Ganti</p>
                </template>
              </div>
              <input ref="editAfterFileInput" type="file" accept="image/*" style="display:none"
                @change="e => editAfterFile = (e.target as HTMLInputElement).files?.[0] ?? null" />
            </div>
          </div>

          <VSelect v-model="editForm.outlet_id" :items="outletItems" label="Outlet" density="compact" variant="outlined" />

          <div class="d-flex align-center justify-space-between pa-3 rounded-lg" style="background:#f9f9f9;border:1px solid #eee;">
            <div>
              <p class="text-body-2 font-weight-medium">Status Aktif</p>
              <p class="text-caption text-medium-emphasis">Nonaktif = tidak muncul di kiosk</p>
            </div>
            <VSwitch v-model="editForm.is_active" color="success" hide-details density="compact" />
          </div>
        </VCardText>
        <VDivider />
        <VCardActions class="pa-4">
          <VSpacer />
          <VBtn variant="text" :disabled="isSubmitting" @click="showEdit = false">Batal</VBtn>
          <VBtn color="primary" variant="elevated" :loading="isSubmitting" @click="handleUpdate">Update</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
.tpl-list { display: flex; flex-direction: column; gap: 6px; }
.tpl-row { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border: 1.5px solid #e5e7eb; border-radius: 10px; background: #fff; transition: box-shadow 0.15s, border-color 0.15s; user-select: none; }
.tpl-row:hover { box-shadow: 0 2px 8px rgba(0,0,0,.08); }
.tpl-row-inactive { opacity: 0.5; }
.tpl-row-dragging { opacity: 0.4; border-style: dashed; }
.tpl-row-over { border-color: #4f46e5; box-shadow: 0 0 0 2px #c7d2fe; }
.drag-handle { cursor: grab; flex-shrink: 0; }
.drag-handle:active { cursor: grabbing; }
.tpl-thumb { width: 48px; height: 48px; border-radius: 6px; overflow: hidden; background: #000; flex-shrink: 0; }
.tpl-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.tpl-thumb-empty { width: 100%; height: 100%; background: #e5e7eb; }
.tpl-meta { min-width: 0; }
.tpl-label { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.drop-zone { min-height: 100px; border: 2px dashed #c7d2fe; border-radius: 10px; background: #f5f3ff; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s, border-color 0.2s; padding: 12px; text-align: center; overflow: hidden; }
.drop-zone:hover { background: #ede9fe; border-color: #818cf8; }
.drop-zone-sm { min-height: 72px; }
.drop-preview { width: 100%; height: 100%; object-fit: cover; border-radius: 6px; }
/* Try Prompt */
.try-drop-zone { min-height: 200px; border: 2px dashed #c7d2fe; border-radius: 12px; background: #f5f3ff; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s, border-color 0.2s; overflow: hidden; }
.try-drop-zone:hover { background: #ede9fe; border-color: #818cf8; }
.try-drop-zone.has-image { min-height: unset; background: transparent; border-style: solid; }
.try-preview { width: 100%; height: auto; display: block; }
.result-wrap { width: 100%; }
.result-img { width: 100%; max-height: 420px; object-fit: contain; border-radius: 8px; border: 1px solid #eee; display: block; }
.sample-wrap { max-width: 160px; }
.sample-img { width: 100%; height: 120px; object-fit: cover; border-radius: 8px; border: 1px solid #eee; display: block; }
</style>
