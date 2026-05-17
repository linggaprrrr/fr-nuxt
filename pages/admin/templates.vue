<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTemplates } from '@/composables/useTemplates'
import { useOutlets } from '@/composables/useOutlets'
import TemplateFrameEditor from '@/components/admin/TemplateFrameEditor.vue'

const { templates, loading, error, getTemplates, createTemplate, updateTemplate, deleteTemplate } = useTemplates()

const outlets      = ref<any[]>([])
const outletFilter = ref<string>('')
const isSubmitting = ref<boolean>(false)

// Editor dialog state
const editorOpen       = ref(false)
const editingTemplate  = ref<any | null>(null)

async function fetchAll() {
  const params: any = {}
  if (outletFilter.value) params.outlet_id = outletFilter.value
  await getTemplates(params)
}

async function fetchOutlets() {
  const { getOutlets } = useOutlets()
  const res = await getOutlets({ page: 1, limit: 9999 })
  outlets.value = res?.data || []
}

// Open editor for create
function openCreate() {
  editingTemplate.value = null
  editorOpen.value = true
}

// Open editor for edit
function openEdit(t: any) {
  editingTemplate.value = t
  editorOpen.value = true
}

// Handle save from editor (create or update)
async function handleEditorSave(payload: {
  label: string
  aspect_ratio: number
  slot_count: number
  slots: any[]
  file: File | null
  is_active: boolean
}) {
  isSubmitting.value = true
  error.value = null

  const form = new FormData()
  form.append('label',        payload.label)
  form.append('aspect_ratio', String(payload.aspect_ratio))
  form.append('slot_count',   String(payload.slot_count))
  form.append('slots',        JSON.stringify(payload.slots))
  form.append('is_active',    String(payload.is_active))
  if (payload.file) form.append('file', payload.file)

  if (editingTemplate.value) {
    await updateTemplate(editingTemplate.value.id, form)
  } else {
    if (!payload.file) {
      error.value = 'File PNG wajib diupload untuk template baru.'
      isSubmitting.value = false
      return
    }
    await createTemplate(form)
  }

  isSubmitting.value = false

  if (error.value) {
    alert(error.value)
    return
  }

  editorOpen.value = false
  await fetchAll()
}

async function handleDelete(id: string) {
  if (!confirm('Hapus template ini? Tindakan ini tidak bisa dibatalkan.')) return
  await deleteTemplate(id)
  if (error.value) alert(error.value)
}

onMounted(() => {
  fetchOutlets()
  fetchAll()
})
</script>

<template>
  <VCard title="Layout Frame Templates" class="mb-4">
    <template v-slot:append>
      <VBtn
        color="primary"
        variant="tonal"
        class="text-none"
        slim
        prepend-icon="bx bx-plus"
        @click="openCreate"
      >
        Tambah Template
      </VBtn>
    </template>

    <VCardText>
      <VSelect
        v-model="outletFilter"
        :items="[
          { title: 'Semua Outlet', value: '' },
          ...outlets.map(o => ({ title: o.name, value: o.id }))
        ]"
        label="Filter Outlet"
        density="compact"
        variant="outlined"
        style="max-width: 300px"
        class="mb-4"
        @update:modelValue="fetchAll"
      />
    </VCardText>

    <!-- Templates grid -->
    <VCardText>
      <VProgressLinear v-if="loading" indeterminate color="primary" class="mb-4" />

      <div v-if="!loading && templates.length === 0" class="text-center pa-8 text-medium-emphasis">
        <VIcon size="48" class="mb-2">bx bx-layout</VIcon>
        <p>Belum ada template. Klik "Tambah Template" untuk mulai.</p>
      </div>

      <div class="templates-grid">
        <VCard
          v-for="(t, idx) in templates"
          :key="t.id"
          :class="{ 'opacity-50': !t.is_active }"
          border
          flat
          class="template-card"
        >
          <!-- Thumbnail -->
          <div class="template-thumb">
            <img :src="t.src" :alt="t.label" style="width:100%; height:100%; object-fit:contain;" />

            <!-- Overlay badges -->
            <VChip
              size="x-small"
              color="primary"
              style="position:absolute; top:6px; left:6px;"
            >
              {{ t.slot_count }} slot
            </VChip>

            <VChip
              size="x-small"
              :color="t.is_active ? 'success' : 'default'"
              style="position:absolute; top:6px; right:6px;"
            >
              {{ t.is_active ? 'Aktif' : 'Nonaktif' }}
            </VChip>
          </div>

          <!-- Card info -->
          <VCardText class="pa-2">
            <div class="text-body-2 font-weight-bold text-truncate">{{ t.label }}</div>            
            <div v-if="t.outlet_id" class="text-caption text-medium-emphasis">
              <VIcon size="10">bx bx-store</VIcon>
              {{ outlets.find(o => o.id === t.outlet_id)?.name ?? 'Outlet tertentu' }}
            </div>
          </VCardText>

          <VCardActions class="pa-2 pt-0">
            <VBtn
              size="small"
              variant="tonal"
              color="warning"
              prepend-icon="bx bx-edit-alt"
              class="text-none"
              @click="openEdit(t)"
            >
              Edit
            </VBtn>
            <VSpacer />
            <VBtn
              icon
              variant="text"
              size="small"
              @click="handleDelete(t.id)"
            >
              <VIcon color="error">bx bx-trash-alt</VIcon>
            </VBtn>
          </VCardActions>
        </VCard>
      </div>
    </VCardText>
  </VCard>

  <!-- Visual Frame Editor Dialog -->
  <TemplateFrameEditor
    v-model="editorOpen"
    :editing-template="editingTemplate"
    @save="handleEditorSave"
  />
</template>

<style scoped>
.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.template-card {
  transition: box-shadow 0.2s;
}
.template-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

.template-thumb {
  position: relative;
  background: #f5f5f5;
  height: 160px;
  overflow: hidden;
}
</style>
