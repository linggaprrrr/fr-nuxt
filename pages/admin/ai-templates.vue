<script setup lang="ts">
import { useAiTemplates } from '@/composables/useAiTemplates'
import { useOutlets } from '@/composables/useOutlets'

const { templates, loading, error, getAiTemplates, createAiTemplate, updateAiTemplate, deleteAiTemplate, reorderAiTemplates } = useAiTemplates()
const toast = useToast()
const { confirm } = useConfirm()

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
        <VBtn color="primary" prepend-icon="bx-plus" @click="showCreate = true">Tambah Template</VBtn>
      </template>
    </PageHeader>

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
</style>
