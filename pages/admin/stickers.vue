<script setup lang="ts">
import { useStickers } from '@/composables/useStickers'
import { useOutlets } from '@/composables/useOutlets'

const { stickers, loading, error, getStickers, createSticker, updateSticker, deleteSticker } = useStickers()
const toast = useToast()
const { confirm } = useConfirm()

const outlets      = ref<any[]>([])
const outletFilter = ref<string>('')
const isSubmitting = ref(false)

// ── Create dialog ──────────────────────────────────────────────────────────
const showCreate    = ref(false)
const createType    = ref<'image' | 'emoji'>('image')
const createLabel   = ref('')
const createEmoji   = ref('')
const createOutlet  = ref('')
const bulkFiles     = ref<File[]>([])
const bulkFileInput = ref<HTMLInputElement | null>(null)
const createPreviewUrls = computed(() => bulkFiles.value.map(f => URL.createObjectURL(f)))

// ── Edit dialog ────────────────────────────────────────────────────────────
const showEdit   = ref(false)
const editForm   = ref({ id: '', label: '', is_active: true, outlet_id: '' })

async function fetchAll() {
  const params: any = {}
  if (outletFilter.value) params.outlet_id = outletFilter.value
  await getStickers(params)
}

async function fetchOutlets() {
  const { getOutlets } = useOutlets()
  const res = await getOutlets({ page: 1, limit: 9999 })
  outlets.value = res?.data || []
}

function onBulkFileChange(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files ?? [])
  bulkFiles.value = files
  if (files.length === 1 && !createLabel.value)
    createLabel.value = files[0].name.replace(/\.[^.]+$/, '')
}

function removeBulkFile(i: number) {
  bulkFiles.value = bulkFiles.value.filter((_, idx) => idx !== i)
}

async function handleCreate() {
  isSubmitting.value = true
  error.value = null

  if (createType.value === 'emoji') {
    const form = new FormData()
    form.append('label', createLabel.value || createEmoji.value)
    form.append('type', 'emoji')
    form.append('value', createEmoji.value)
    if (createOutlet.value) form.append('outlet_id', createOutlet.value)
    await createSticker(form)
  } else {
    for (const file of bulkFiles.value) {
      const form = new FormData()
      form.append('label', createLabel.value || file.name.replace(/\.[^.]+$/, ''))
      form.append('type', 'image')
      form.append('file', file)
      if (createOutlet.value) form.append('outlet_id', createOutlet.value)
      await createSticker(form)
      if (error.value) break
    }
  }

  isSubmitting.value = false
  if (error.value) { toast.error(error.value); return }
  resetCreateForm()
  showCreate.value = false
  await fetchAll()
}

function resetCreateForm() {
  createType.value   = 'image'
  createLabel.value  = ''
  createEmoji.value  = ''
  createOutlet.value = ''
  bulkFiles.value    = []
  if (bulkFileInput.value) bulkFileInput.value.value = ''
}

function openEdit(s: any) {
  editForm.value = { id: s.id, label: s.label, is_active: s.is_active, outlet_id: s.outlet_id || '' }
  showEdit.value = true
}

async function handleUpdate() {
  isSubmitting.value = true
  const form = new FormData()
  form.append('label',     editForm.value.label)
  form.append('is_active', String(editForm.value.is_active))
  form.append('outlet_id', editForm.value.outlet_id)
  await updateSticker(editForm.value.id, form)
  isSubmitting.value = false
  if (error.value) { toast.error(error.value); return }
  showEdit.value = false
  await fetchAll()
}

async function handleDelete(id: string) {
  if (!await confirm({ title: 'Hapus Sticker', message: 'Hapus sticker ini?', tone: 'danger', confirmText: 'Hapus' })) return
  await deleteSticker(id)
  if (error.value) { toast.error(error.value); return }
  toast.success('Sticker dihapus')
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
    <PageHeader title="Stickers" subtitle="Kelola sticker emoji & image yang muncul di kiosk editor foto.">
      <template #actions>
        <VBtn color="primary" prepend-icon="bx-plus" @click="showCreate = true">Tambah Sticker</VBtn>
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
          <VChip color="primary" size="small" variant="tonal">{{ stickers.length }} sticker</VChip>
        </div>
      </VCardText>
    </VCard>

    <!-- Sticker grid -->
    <VCard flat border rounded="lg">
      <VCardText>
        <VProgressLinear v-if="loading" indeterminate color="primary" class="mb-4" />

        <div v-if="!loading && stickers.length === 0" class="text-center pa-12 text-medium-emphasis">
          <VIcon size="56" class="mb-3" color="grey-lighten-1">bx-smile</VIcon>
          <p class="text-subtitle-1 font-weight-medium">Belum ada sticker</p>
          <p class="text-caption">Klik "Tambah Sticker" untuk upload sticker pertama.</p>
        </div>

        <div class="sticker-grid">
          <div
            v-for="s in stickers"
            :key="s.id"
            class="sticker-card"
            :class="{ 'sticker-card-inactive': !s.is_active }"
          >
            <div class="sticker-thumb">
              <img v-if="s.type === 'image' && s.url" :src="s.url" :alt="s.label" class="sticker-img" />
              <span v-else class="sticker-emoji">{{ s.value }}</span>
              <VChip size="x-small" :color="s.is_active ? 'success' : 'default'" class="sticker-status-chip">
                {{ s.is_active ? 'Aktif' : 'Off' }}
              </VChip>
            </div>
            <div class="sticker-info">
              <span class="sticker-label" :title="s.label">{{ s.label }}</span>
              <span class="sticker-type">{{ s.type }}</span>
            </div>
            <div class="sticker-actions">
              <VBtn icon variant="text" size="x-small" @click="openEdit(s)">
                <VIcon size="15" color="warning">bx-edit-alt</VIcon>
              </VBtn>
              <VBtn icon variant="text" size="x-small" @click="handleDelete(s.id)">
                <VIcon size="15" color="error">bx-trash-alt</VIcon>
              </VBtn>
            </div>
          </div>
        </div>
      </VCardText>
    </VCard>

    <!-- Create dialog -->
    <VDialog v-model="showCreate" max-width="560" persistent>
      <VCard rounded="lg">
        <VCardTitle class="d-flex align-center gap-2 pa-4 pb-2">
          <VIcon color="primary">bx-smile</VIcon>
          Tambah Sticker
          <VSpacer />
          <VBtn icon variant="text" size="small" @click="showCreate = false; resetCreateForm()">
            <VIcon>bx-x</VIcon>
          </VBtn>
        </VCardTitle>
        <VDivider />
        <VCardText class="pa-4">
          <p class="text-caption font-weight-bold text-uppercase mb-2" style="color:#888;">Tipe Sticker</p>
          <div class="d-flex gap-3 mb-4">
            <div class="type-card" :class="{ 'type-card-active': createType === 'image' }" @click="createType = 'image'">
              <VIcon size="28" :color="createType === 'image' ? 'primary' : 'grey'">bx-image</VIcon>
              <span class="text-caption font-weight-bold mt-1">Image / PNG</span>
              <span class="text-caption text-medium-emphasis">Upload file gambar</span>
            </div>
            <div class="type-card" :class="{ 'type-card-active': createType === 'emoji' }" @click="createType = 'emoji'">
              <span style="font-size:28px;">😊</span>
              <span class="text-caption font-weight-bold mt-1">Emoji</span>
              <span class="text-caption text-medium-emphasis">Karakter emoji</span>
            </div>
          </div>

          <template v-if="createType === 'image'">
            <div
              class="drop-zone"
              @click="bulkFileInput?.click()"
              @dragover.prevent
              @drop.prevent="e => { bulkFiles.value = Array.from(e.dataTransfer?.files ?? []) }"
            >
              <VIcon size="36" color="primary" class="mb-2">bx-cloud-upload</VIcon>
              <p class="font-weight-medium mb-1">Klik atau drag & drop</p>
              <p class="text-caption text-medium-emphasis">PNG, JPG, WebP · Bisa pilih banyak file sekaligus</p>
              <input ref="bulkFileInput" type="file" accept="image/*" multiple style="display:none" @change="onBulkFileChange" />
            </div>

            <div v-if="bulkFiles.length > 0" class="mt-3">
              <p class="text-caption font-weight-bold mb-2">{{ bulkFiles.length }} file dipilih:</p>
              <div class="bulk-preview-grid">
                <div v-for="(url, i) in createPreviewUrls" :key="i" class="bulk-preview-item">
                  <img :src="url" :alt="bulkFiles[i].name" class="bulk-preview-img" />
                  <span class="bulk-preview-name text-caption">{{ bulkFiles[i].name }}</span>
                  <VBtn icon variant="text" size="x-small" class="bulk-preview-del" @click="removeBulkFile(i)">
                    <VIcon size="12" color="error">bx-x</VIcon>
                  </VBtn>
                </div>
              </div>
            </div>

            <VTextField v-model="createLabel" label="Label (opsional)" density="compact" variant="outlined" class="mt-3" hint="Kosongkan untuk menggunakan nama file sebagai label" persistent-hint />
          </template>

          <template v-else>
            <VTextField v-model="createEmoji" label="Karakter Emoji" density="compact" variant="outlined" class="mb-3" :style="{ fontSize: '24px' }" />
            <VTextField v-model="createLabel" label="Label" density="compact" variant="outlined" />
          </template>

          <VSelect
            v-model="createOutlet"
            :items="outletItems"
            label="Outlet"
            density="compact"
            variant="outlined"
            class="mt-3"
            hint="Kosongkan agar muncul di semua outlet"
            persistent-hint
          />
        </VCardText>
        <VDivider />
        <VCardActions class="pa-4">
          <VSpacer />
          <VBtn variant="text" :disabled="isSubmitting" @click="showCreate = false; resetCreateForm()">Batal</VBtn>
          <VBtn
            color="primary"
            variant="elevated"
            :loading="isSubmitting"
            :disabled="(createType === 'image' && bulkFiles.length === 0) || (createType === 'emoji' && !createEmoji)"
            @click="handleCreate"
          >
            {{ createType === 'image' && bulkFiles.length > 1 ? `Upload ${bulkFiles.length} Sticker` : 'Simpan' }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Edit dialog -->
    <VDialog v-model="showEdit" max-width="420">
      <VCard rounded="lg">
        <VCardTitle class="d-flex align-center gap-2 pa-4 pb-2">
          <VIcon color="warning">bx-edit-alt</VIcon>
          Edit Sticker
          <VSpacer />
          <VBtn icon variant="text" size="small" @click="showEdit = false"><VIcon>bx-x</VIcon></VBtn>
        </VCardTitle>
        <VDivider />
        <VCardText class="pa-4 d-flex flex-column gap-3">
          <VTextField v-model="editForm.label" label="Label" density="compact" variant="outlined" />
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
.sticker-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 12px; }
.sticker-card { border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background: #fff; transition: box-shadow 0.2s, transform 0.15s; }
.sticker-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.1); transform: translateY(-2px); }
.sticker-card-inactive { opacity: 0.5; }
.sticker-thumb { position: relative; height: 90px; background: #f9fafb; display: flex; align-items: center; justify-content: center; }
.sticker-img { max-width: 80%; max-height: 80%; object-fit: contain; }
.sticker-emoji { font-size: 44px; line-height: 1; }
.sticker-status-chip { position: absolute; top: 5px; right: 5px; }
.sticker-info { padding: 6px 8px 2px; display: flex; flex-direction: column; }
.sticker-label { font-size: 11px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sticker-type { font-size: 10px; color: #999; }
.sticker-actions { display: flex; justify-content: flex-end; padding: 2px 4px 4px; }
.type-card { flex: 1; display: flex; flex-direction: column; align-items: center; padding: 16px 8px; border: 2px solid #e5e7eb; border-radius: 12px; cursor: pointer; transition: border-color 0.15s, background 0.15s; text-align: center; }
.type-card:hover { border-color: #a5b4fc; background: #f5f3ff; }
.type-card-active { border-color: #4f46e5; background: #eef2ff; }
.drop-zone { min-height: 120px; border: 2px dashed #c7d2fe; border-radius: 12px; background: #f5f3ff; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s, border-color 0.2s; padding: 20px; text-align: center; }
.drop-zone:hover { background: #ede9fe; border-color: #818cf8; }
.bulk-preview-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 8px; }
.bulk-preview-item { position: relative; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: #f9f9f9; }
.bulk-preview-img { width: 100%; height: 70px; object-fit: contain; display: block; }
.bulk-preview-name { display: block; padding: 2px 4px; font-size: 9px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #666; }
.bulk-preview-del { position: absolute; top: 2px; right: 2px; background: rgba(255,255,255,.9) !important; width: 18px !important; height: 18px !important; min-width: unset !important; }
</style>
