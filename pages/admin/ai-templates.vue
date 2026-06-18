<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAiTemplates } from '@/composables/useAiTemplates'
import { useOutlets } from '@/composables/useOutlets'

const { templates, loading, error, getAiTemplates, createAiTemplate, updateAiTemplate, deleteAiTemplate } = useAiTemplates()

const outlets      = ref<any[]>([])
const outletFilter = ref<string>('')
const isSubmitting = ref(false)

// ── Create dialog ──────────────────────────────────────────────────────────
const showCreate       = ref(false)
const createLabel      = ref('')
const createPrompt     = ref('')
const createTag        = ref('')
const createTagBg      = ref('#eff6ff')
const createTagColor   = ref('#2563eb')
const createEmoji      = ref('')
const createSortOrder  = ref(0)
const createOutlet     = ref('')
const beforeFile       = ref<File | null>(null)
const afterFile        = ref<File | null>(null)
const beforeFileInput  = ref<HTMLInputElement | null>(null)
const afterFileInput   = ref<HTMLInputElement | null>(null)
const beforePreviewUrl = computed(() => beforeFile.value ? URL.createObjectURL(beforeFile.value) : null)
const afterPreviewUrl  = computed(() => afterFile.value  ? URL.createObjectURL(afterFile.value)  : null)

// ── Edit dialog ────────────────────────────────────────────────────────────
const showEdit  = ref(false)
const editForm  = ref({
  id: '', label: '', prompt: '', tag: '', tag_color_bg: '', tag_color_text: '',
  emoji: '', sort_order: 0, outlet_id: '', is_active: true,
})
const editBeforeFile      = ref<File | null>(null)
const editAfterFile       = ref<File | null>(null)
const editBeforeFileInput = ref<HTMLInputElement | null>(null)
const editAfterFileInput  = ref<HTMLInputElement | null>(null)

// ── Fetch ──────────────────────────────────────────────────────────────────
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

// ── Create ─────────────────────────────────────────────────────────────────
async function handleCreate() {
  if (!createLabel.value || !createPrompt.value) {
    alert('Label dan Prompt wajib diisi.')
    return
  }
  isSubmitting.value = true
  error.value = null
  const form = new FormData()
  form.append('label',        createLabel.value)
  form.append('prompt',       createPrompt.value)
  form.append('sort_order',   String(createSortOrder.value))
  if (createTag.value)        form.append('tag',           createTag.value)
  if (createTagBg.value)      form.append('tag_color_bg',  createTagBg.value)
  if (createTagColor.value)   form.append('tag_color_text',createTagColor.value)
  if (createEmoji.value)      form.append('emoji',         createEmoji.value)
  if (createOutlet.value)     form.append('outlet_id',     createOutlet.value)
  if (beforeFile.value)       form.append('before_file',   beforeFile.value)
  if (afterFile.value)        form.append('after_file',    afterFile.value)
  await createAiTemplate(form)
  isSubmitting.value = false
  if (error.value) { alert(error.value); return }
  resetCreateForm()
  showCreate.value = false
  await fetchAll()
}

function resetCreateForm() {
  createLabel.value = ''; createPrompt.value = ''
  createTag.value = ''; createTagBg.value = '#eff6ff'; createTagColor.value = '#2563eb'
  createEmoji.value = ''; createSortOrder.value = 0; createOutlet.value = ''
  beforeFile.value = null; afterFile.value = null
  if (beforeFileInput.value) beforeFileInput.value.value = ''
  if (afterFileInput.value)  afterFileInput.value.value  = ''
}

// ── Edit ───────────────────────────────────────────────────────────────────
function openEdit(tpl: any) {
  editForm.value = {
    id: tpl.id,
    label: tpl.label,
    prompt: tpl.prompt ?? '',
    tag: tpl.tag ?? '',
    tag_color_bg: tpl.tag_color?.bg ?? '',
    tag_color_text: tpl.tag_color?.color ?? '',
    emoji: tpl.emoji ?? '',
    sort_order: tpl.sort_order ?? 0,
    outlet_id: tpl.outlet_id ?? '',
    is_active: tpl.is_active,
  }
  editBeforeFile.value = null
  editAfterFile.value = null
  showEdit.value = true
}

async function handleUpdate() {
  isSubmitting.value = true
  error.value = null
  const form = new FormData()
  form.append('label',         editForm.value.label)
  form.append('prompt',        editForm.value.prompt)
  form.append('tag',           editForm.value.tag)
  form.append('tag_color_bg',  editForm.value.tag_color_bg)
  form.append('tag_color_text',editForm.value.tag_color_text)
  form.append('emoji',         editForm.value.emoji)
  form.append('sort_order',    String(editForm.value.sort_order))
  form.append('outlet_id',     editForm.value.outlet_id)
  form.append('is_active',     String(editForm.value.is_active))
  if (editBeforeFile.value) form.append('before_file', editBeforeFile.value)
  if (editAfterFile.value)  form.append('after_file',  editAfterFile.value)
  await updateAiTemplate(editForm.value.id, form)
  isSubmitting.value = false
  if (error.value) { alert(error.value); return }
  showEdit.value = false
  await fetchAll()
}

// ── Delete ─────────────────────────────────────────────────────────────────
async function handleDelete(id: string) {
  if (!confirm('Hapus AI template ini?')) return
  await deleteAiTemplate(id)
  if (error.value) alert(error.value)
}

const outletItems = computed(() => [
  { title: 'Global (semua outlet)', value: '' },
  ...outlets.value.map(o => ({ title: o.name, value: o.id })),
])

onMounted(() => { fetchOutlets(); fetchAll() })
</script>

<template>
  <div>
    <!-- ── Page header ─────────────────────────────────────────────────── -->
    <div class="d-flex align-center justify-space-between mb-4 flex-wrap gap-2">
      <div>
        <h5 class="text-h5 font-weight-bold">AI Templates</h5>
        <p class="text-caption text-medium-emphasis mt-1">
          Kelola template AI Transform yang muncul di kiosk editor foto.
        </p>
      </div>
      <VBtn color="primary" prepend-icon="bx bx-plus" @click="showCreate = true">
        Tambah Template
      </VBtn>
    </div>

    <!-- ── Filter ─────────────────────────────────────────────────────── -->
    <VCard class="mb-4" flat border>
      <VCardText class="py-3">
        <div class="d-flex align-center gap-3 flex-wrap">
          <VSelect
            v-model="outletFilter"
            :items="outletItems"
            label="Filter Outlet"
            density="compact"
            variant="outlined"
            hide-details
            style="max-width: 260px"
            @update:modelValue="fetchAll"
          />
          <VChip color="primary" size="small" variant="tonal">
            {{ templates.length }} template
          </VChip>
        </div>
      </VCardText>
    </VCard>

    <!-- ── Template grid ──────────────────────────────────────────────── -->
    <VCard flat border>
      <VCardText>
        <VProgressLinear v-if="loading" indeterminate color="primary" class="mb-4" />

        <div v-if="!loading && templates.length === 0" class="text-center pa-12 text-medium-emphasis">
          <VIcon size="56" class="mb-3" color="grey-lighten-1">bx bx-bot</VIcon>
          <p class="text-subtitle-1 font-weight-medium">Belum ada AI template</p>
          <p class="text-caption">Klik "Tambah Template" untuk membuat template pertama.</p>
        </div>

        <div class="tpl-grid">
          <div
            v-for="tpl in templates"
            :key="tpl.id"
            class="tpl-card"
            :class="{ 'tpl-card-inactive': !tpl.is_active }"
          >
            <!-- Before / after thumbnails -->
            <div class="tpl-images">
              <div class="tpl-img-wrap">
                <img v-if="tpl.before_url" :src="tpl.before_url" alt="before" class="tpl-img" />
                <div v-else class="tpl-img-placeholder">Before</div>
                <span class="tpl-img-label">Before</span>
              </div>
              <div class="tpl-img-wrap">
                <img v-if="tpl.after_url" :src="tpl.after_url" alt="after" class="tpl-img" />
                <div v-else class="tpl-img-placeholder">After</div>
                <span class="tpl-img-label">After</span>
              </div>
            </div>

            <!-- Info -->
            <div class="tpl-info">
              <div class="d-flex align-center gap-1 mb-1">
                <span v-if="tpl.emoji" style="font-size:16px; line-height:1">{{ tpl.emoji }}</span>
                <span class="tpl-label" :title="tpl.label">{{ tpl.label }}</span>
              </div>
              <div class="d-flex align-center gap-1 flex-wrap">
                <VChip
                  v-if="tpl.tag"
                  size="x-small"
                  :style="tpl.tag_color ? `background:${tpl.tag_color.bg};color:${tpl.tag_color.color}` : ''"
                >{{ tpl.tag }}</VChip>
                <VChip size="x-small" :color="tpl.is_active ? 'success' : 'default'">
                  {{ tpl.is_active ? 'Aktif' : 'Off' }}
                </VChip>
                <VChip v-if="!tpl.outlet_id" size="x-small" color="info" variant="tonal">Global</VChip>
              </div>
            </div>

            <!-- Actions -->
            <div class="tpl-actions">
              <VBtn icon variant="text" size="x-small" @click="openEdit(tpl)">
                <VIcon size="15" color="warning">bx bx-edit-alt</VIcon>
              </VBtn>
              <VBtn icon variant="text" size="x-small" @click="handleDelete(tpl.id)">
                <VIcon size="15" color="error">bx bx-trash-alt</VIcon>
              </VBtn>
            </div>
          </div>
        </div>
      </VCardText>
    </VCard>

    <!-- ── Create dialog ──────────────────────────────────────────────── -->
    <VDialog v-model="showCreate" max-width="620" persistent>
      <VCard>
        <VCardTitle class="d-flex align-center gap-2 pa-4 pb-2">
          <VIcon color="primary">bx bx-bot</VIcon>
          Tambah AI Template
          <VSpacer />
          <VBtn icon variant="text" size="small" @click="showCreate = false; resetCreateForm()">
            <VIcon>bx bx-x</VIcon>
          </VBtn>
        </VCardTitle>
        <VDivider />

        <VCardText class="pa-4 d-flex flex-column gap-4">
          <!-- Label + Emoji + Sort -->
          <div class="d-flex gap-3">
            <VTextField
              v-model="createLabel"
              label="Label *"
              density="compact"
              variant="outlined"
              style="flex:1"
              placeholder="cth: 3D Toy"
            />
            <VTextField
              v-model="createEmoji"
              label="Emoji"
              density="compact"
              variant="outlined"
              style="width:80px; font-size:20px"
              placeholder="🧸"
            />
            <VTextField
              v-model.number="createSortOrder"
              label="Urutan"
              density="compact"
              variant="outlined"
              type="number"
              style="width:90px"
            />
          </div>

          <!-- Prompt -->
          <VTextarea
            v-model="createPrompt"
            label="Prompt AI *"
            density="compact"
            variant="outlined"
            rows="4"
            hint="Prompt ini dikirim ke Gemini saat kiosk menerapkan template"
            persistent-hint
            placeholder="Q-version modern style, 3D toy, original character rendering…"
          />

          <!-- Tag + colors -->
          <div class="d-flex gap-3 align-center flex-wrap">
            <VTextField
              v-model="createTag"
              label="Tag"
              density="compact"
              variant="outlined"
              style="flex:1; min-width:100px"
              placeholder="cth: 3D, Anime, Fun"
            />
            <div class="d-flex align-center gap-2">
              <label class="text-caption text-medium-emphasis">BG</label>
              <input type="color" v-model="createTagBg" style="width:36px; height:36px; border:none; cursor:pointer; border-radius:6px" />
            </div>
            <div class="d-flex align-center gap-2">
              <label class="text-caption text-medium-emphasis">Teks</label>
              <input type="color" v-model="createTagColor" style="width:36px; height:36px; border:none; cursor:pointer; border-radius:6px" />
            </div>
            <!-- Live preview -->
            <span
              v-if="createTag"
              class="text-xs font-weight-bold px-2 py-1 rounded-pill"
              :style="`background:${createTagBg};color:${createTagColor}`"
            >{{ createTag }}</span>
          </div>

          <!-- Before / After images -->
          <div class="d-flex gap-3">
            <!-- Before -->
            <div class="flex-1">
              <p class="text-caption font-weight-bold mb-1">Gambar Before (contoh)</p>
              <div class="drop-zone" @click="beforeFileInput?.click()">
                <img v-if="beforePreviewUrl" :src="beforePreviewUrl" class="drop-preview" />
                <template v-else>
                  <VIcon size="28" color="primary">bx bx-image-add</VIcon>
                  <p class="text-caption mt-1">Klik upload</p>
                </template>
              </div>
              <input ref="beforeFileInput" type="file" accept="image/*" style="display:none" @change="e => beforeFile = (e.target as HTMLInputElement).files?.[0] ?? null" />
            </div>

            <!-- After -->
            <div class="flex-1">
              <p class="text-caption font-weight-bold mb-1">Gambar After (contoh)</p>
              <div class="drop-zone" @click="afterFileInput?.click()">
                <img v-if="afterPreviewUrl" :src="afterPreviewUrl" class="drop-preview" />
                <template v-else>
                  <VIcon size="28" color="primary">bx bx-image-add</VIcon>
                  <p class="text-caption mt-1">Klik upload</p>
                </template>
              </div>
              <input ref="afterFileInput" type="file" accept="image/*" style="display:none" @change="e => afterFile = (e.target as HTMLInputElement).files?.[0] ?? null" />
            </div>
          </div>

          <!-- Outlet -->
          <VSelect
            v-model="createOutlet"
            :items="outletItems"
            label="Outlet"
            density="compact"
            variant="outlined"
            hint="Kosongkan agar muncul di semua outlet (global)"
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
            :disabled="!createLabel || !createPrompt"
            @click="handleCreate"
          >
            Simpan
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- ── Edit dialog ─────────────────────────────────────────────────── -->
    <VDialog v-model="showEdit" max-width="620">
      <VCard>
        <VCardTitle class="d-flex align-center gap-2 pa-4 pb-2">
          <VIcon color="warning">bx bx-edit-alt</VIcon>
          Edit AI Template
          <VSpacer />
          <VBtn icon variant="text" size="small" @click="showEdit = false"><VIcon>bx bx-x</VIcon></VBtn>
        </VCardTitle>
        <VDivider />

        <VCardText class="pa-4 d-flex flex-column gap-4">
          <div class="d-flex gap-3">
            <VTextField v-model="editForm.label" label="Label *" density="compact" variant="outlined" style="flex:1" />
            <VTextField v-model="editForm.emoji" label="Emoji" density="compact" variant="outlined" style="width:80px; font-size:20px" />
            <VTextField v-model.number="editForm.sort_order" label="Urutan" density="compact" variant="outlined" type="number" style="width:90px" />
          </div>

          <VTextarea v-model="editForm.prompt" label="Prompt AI *" density="compact" variant="outlined" rows="4" />

          <div class="d-flex gap-3 align-center flex-wrap">
            <VTextField v-model="editForm.tag" label="Tag" density="compact" variant="outlined" style="flex:1; min-width:100px" />
            <div class="d-flex align-center gap-2">
              <label class="text-caption text-medium-emphasis">BG</label>
              <input type="color" v-model="editForm.tag_color_bg" style="width:36px; height:36px; border:none; cursor:pointer; border-radius:6px" />
            </div>
            <div class="d-flex align-center gap-2">
              <label class="text-caption text-medium-emphasis">Teks</label>
              <input type="color" v-model="editForm.tag_color_text" style="width:36px; height:36px; border:none; cursor:pointer; border-radius:6px" />
            </div>
            <span v-if="editForm.tag" class="text-xs font-weight-bold px-2 py-1 rounded-pill" :style="`background:${editForm.tag_color_bg};color:${editForm.tag_color_text}`">{{ editForm.tag }}</span>
          </div>

          <!-- Replace images (optional) -->
          <div class="d-flex gap-3">
            <div class="flex-1">
              <p class="text-caption font-weight-bold mb-1">Ganti Gambar Before (opsional)</p>
              <div class="drop-zone drop-zone-sm" @click="editBeforeFileInput?.click()">
                <img v-if="editBeforeFile" :src="URL.createObjectURL(editBeforeFile)" class="drop-preview" />
                <template v-else>
                  <VIcon size="22" color="grey">bx bx-image-add</VIcon>
                  <p class="text-caption">Ganti</p>
                </template>
              </div>
              <input ref="editBeforeFileInput" type="file" accept="image/*" style="display:none" @change="e => editBeforeFile = (e.target as HTMLInputElement).files?.[0] ?? null" />
            </div>
            <div class="flex-1">
              <p class="text-caption font-weight-bold mb-1">Ganti Gambar After (opsional)</p>
              <div class="drop-zone drop-zone-sm" @click="editAfterFileInput?.click()">
                <img v-if="editAfterFile" :src="URL.createObjectURL(editAfterFile)" class="drop-preview" />
                <template v-else>
                  <VIcon size="22" color="grey">bx bx-image-add</VIcon>
                  <p class="text-caption">Ganti</p>
                </template>
              </div>
              <input ref="editAfterFileInput" type="file" accept="image/*" style="display:none" @change="e => editAfterFile = (e.target as HTMLInputElement).files?.[0] ?? null" />
            </div>
          </div>

          <VSelect v-model="editForm.outlet_id" :items="outletItems" label="Outlet" density="compact" variant="outlined" />

          <div class="d-flex align-center justify-space-between pa-3 rounded-lg" style="background:#f9f9f9; border:1px solid #eee;">
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
/* ── Template grid ─────────────────────────────────────────────────────────── */
.tpl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.tpl-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  transition: box-shadow 0.2s, transform 0.15s;
}
.tpl-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}
.tpl-card-inactive { opacity: 0.5; }

.tpl-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 90px;
  background: #000;
}

.tpl-img-wrap {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tpl-img-wrap:first-child { border-right: 1px solid #333; }

.tpl-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tpl-img-placeholder {
  color: #666;
  font-size: 11px;
}

.tpl-img-label {
  position: absolute;
  bottom: 4px;
  left: 4px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: rgba(0,0,0,0.55);
  padding: 1px 5px;
  border-radius: 4px;
}

.tpl-info {
  padding: 8px 10px 4px;
}

.tpl-label {
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.tpl-actions {
  display: flex;
  justify-content: flex-end;
  padding: 2px 4px 4px;
}

/* ── Drop zone ─────────────────────────────────────────────────────────────── */
.drop-zone {
  min-height: 100px;
  border: 2px dashed #c7d2fe;
  border-radius: 10px;
  background: #f5f3ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  padding: 12px;
  text-align: center;
  overflow: hidden;
}
.drop-zone:hover {
  background: #ede9fe;
  border-color: #818cf8;
}
.drop-zone-sm { min-height: 72px; }

.drop-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}
</style>
