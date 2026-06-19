<script setup lang="ts">
import type { Unit } from '~/types/unit'
import { getApiErrorMessage } from '@/utils/apiHelpers'
import type { DataTableHeader } from '@/components/AppDataTable.vue'

const { getUnits, createUnit, updateUnitById, deleteUnitById } = useUnits()
const toast = useToast()
const { confirm } = useConfirm()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const isSubmitting = ref(false)
const units = ref<Unit[]>([])
const search = ref('')

const dialog = ref(false)
const editingId = ref<string | null>(null)
const isEditing = computed(() => editingId.value !== null)

const blankForm = () => ({ name: '', location: '', kode_folder: '' })
const form = ref(blankForm())

const headers: DataTableHeader[] = [
  { key: 'name', title: 'Nama' },
  { key: 'location', title: 'Lokasi' },
  { key: 'api_key', title: 'API Key' },
  { key: 'kode_folder', title: 'Kode Folder', nowrap: true },
  { key: 'created_at', title: 'Dibuat', nowrap: true },
  { key: 'actions', title: '', align: 'end', width: '80px' },
]

async function fetchUnits() {
  isLoading.value = true
  try {
    const res = await getUnits({ page: page.value, limit, search: search.value })
    units.value = res?.data || []
    total.value = res?.total || 0
  } catch {
    units.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
}

function openCreate() {
  editingId.value = null
  form.value = blankForm()
  dialog.value = true
}

function openEdit(unit: any) {
  editingId.value = unit.id
  form.value = { name: unit.name, location: unit.location, kode_folder: unit.kode_folder }
  dialog.value = true
}

async function submit() {
  isSubmitting.value = true
  try {
    if (isEditing.value) {
      await updateUnitById(editingId.value!, form.value)
      toast.success('Unit berhasil diperbarui')
    } else {
      await createUnit(form.value)
      toast.success('Unit berhasil ditambahkan')
    }
    dialog.value = false
    await fetchUnits()
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  } finally {
    isSubmitting.value = false
  }
}

async function removeUnit(unit: any) {
  if (!await confirm({ title: 'Hapus Unit', message: `Hapus unit "${unit.name}"? Tindakan ini tidak bisa dibatalkan.`, tone: 'danger', confirmText: 'Hapus' })) return
  try {
    await deleteUnitById(unit.id)
    toast.success('Unit dihapus')
    await fetchUnits()
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  }
}

watch([page, search], fetchUnits)
onMounted(fetchUnits)
</script>

<template>
  <div>
    <PageHeader title="Units" subtitle="Kelola data unit / lokasi.">
      <template #actions>
        <VBtn color="primary" prepend-icon="bx-plus" @click="openCreate">Tambah Unit</VBtn>
      </template>
    </PageHeader>

    <VCard rounded="lg">
      <AppDataTable
        :headers="headers"
        :items="units"
        :loading="isLoading"
        show-index
        :page="page"
        :items-per-page="limit"
        :total="total"
        empty-title="Belum ada unit"
        empty-text="Klik 'Tambah Unit' untuk menambahkan unit pertama."
        @update:page="p => { page = p; fetchUnits() }"
      >
        <template #toolbar>
          <VTextField v-model="search" placeholder="Cari unit..." prepend-inner-icon="bx-search" clearable style="max-width:320px" />
        </template>

        <template #item.api_key="{ item }">
          <code class="text-caption">{{ item.api_key }}</code>
        </template>

        <template #item.kode_folder="{ item }">
          <VChip color="error" size="small" variant="tonal">{{ item.kode_folder }}</VChip>
        </template>

        <template #item.created_at="{ item }">
          {{ new Date(item.created_at).toISOString().slice(0, 10) }}
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end" style="gap:4px">
            <VBtn icon variant="text" size="small" @click="openEdit(item)">
              <VIcon color="warning" icon="bx-edit-alt" />
            </VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="removeUnit(item)">
              <VIcon icon="bx-trash-alt" />
            </VBtn>
          </div>
        </template>
      </AppDataTable>
    </VCard>

    <AppModal
      v-model="dialog"
      :title="isEditing ? 'Edit Unit' : 'Tambah Unit'"
      icon="bx-map"
      :loading="isSubmitting"
      :confirm-text="isEditing ? 'Update' : 'Simpan'"
      cancel-text="Batal"
      @confirm="submit"
    >
      <VRow>
        <VCol cols="12" md="6">
          <VTextField v-model="form.name" label="Nama" />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField v-model="form.kode_folder" label="Kode Folder" />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="form.location" label="Alamat / Lokasi" />
        </VCol>
      </VRow>
    </AppModal>
  </div>
</template>
