<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Outlet } from '~/types/outlet'
import type { Unit } from '@/types/unit'
import type { DataTableHeader } from '@/components/AppDataTable.vue'
import { getApiErrorMessage } from '@/utils/apiHelpers'

const { getOutlets, createOutlet, updateOutletById, deleteOutletById } = useOutlets()
const { getUnits } = useUnits()
const toast = useToast()
const { confirm } = useConfirm()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const isSubmitting = ref(false)
const outlets = ref<Outlet[]>([])
const units = ref<Unit[]>([])
const search = ref('')

// "Outlet" = staffed outlets, "Kiosk" = self-service outlets (Outlet.is_kiosk).
// Same table/form for both — just a server-side filter on which tab is active.
const activeTab = ref<'outlet' | 'kiosk'>('outlet')

// Single modal handles both create & edit
const dialog = ref(false)
const editingId = ref<string | null>(null)
const isEditing = computed(() => editingId.value !== null)

const blankForm = (isKiosk = false) => ({ name: '', address: '', phone: '', kode_folder: '', unit_id: '', is_kiosk: isKiosk })
const form = ref(blankForm())

const headers: DataTableHeader[] = [
  { key: 'name', title: 'Name' },
  { key: 'phone', title: 'Telp' },
  { key: 'unit', title: 'Unit' },
  { key: 'kode_folder', title: 'Kode Folder' },
  { key: 'created_at', title: 'Dibuat', nowrap: true },
  { key: 'actions', title: '', align: 'end' },
]

function formatDate(iso: string) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

async function fetchUnits() {
  try {
    const res = await getUnits({ page: 1, limit: 9999 })
    units.value = res?.data || []
  } catch (error) {
    console.error('Failed to fetch units:', error)
    units.value = []
  }
}

async function fetchOutlets() {
  isLoading.value = true
  try {
    const res = await getOutlets({ page: page.value, limit, search: search.value, is_kiosk: activeTab.value === 'kiosk' })
    outlets.value = res?.data || []
    total.value = res?.total || 0
  } catch (error) {
    console.error('Failed to fetch outlets:', error)
    outlets.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
}

function openCreate() {
  editingId.value = null
  form.value = blankForm(activeTab.value === 'kiosk')
  dialog.value = true
}

function openEdit(outlet: Outlet) {
  editingId.value = outlet.id
  form.value = {
    name: outlet.name,
    address: outlet.address,
    phone: outlet.phone,
    kode_folder: outlet.kode_folder,
    unit_id: outlet.unit?.id || '',
    is_kiosk: outlet.is_kiosk,
  }
  dialog.value = true
}

async function submit() {
  if (!form.value.name.trim()) {
    toast.warning('Nama outlet wajib diisi')
    return
  }
  isSubmitting.value = true
  try {
    if (isEditing.value)
      await updateOutletById(editingId.value!, { ...form.value })
    else
      await createOutlet({ ...form.value })

    toast.success(isEditing.value ? 'Outlet berhasil diperbarui' : 'Outlet berhasil ditambahkan')
    dialog.value = false
    await fetchOutlets()
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  } finally {
    isSubmitting.value = false
  }
}

async function removeOutlet(outlet: Outlet) {
  const ok = await confirm({
    title: 'Hapus outlet',
    message: `Yakin ingin menghapus "${outlet.name}"? Tindakan ini tidak bisa dibatalkan.`,
    tone: 'danger',
    confirmText: 'Hapus',
    cancelText: 'Batal',
  })
  if (!ok) return
  try {
    await deleteOutletById(outlet.id)
    toast.success('Outlet berhasil dihapus')
    await fetchOutlets()
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  }
}

onMounted(() => {
  fetchUnits()
  fetchOutlets()
})

watch(activeTab, () => { page.value = 1 })
watch([page, search, activeTab], fetchOutlets)
</script>

<template>
  <div>
    <PageHeader title="Outlets" subtitle="Kelola outlet dan unit yang terhubung.">
      <template #actions>
        <VBtn color="primary" prepend-icon="bx-plus" @click="openCreate">
          Tambah Outlet
        </VBtn>
      </template>
    </PageHeader>

    <VTabs v-model="activeTab" color="primary" class="mb-4">
      <VTab value="outlet" prepend-icon="bx-store">Outlet</VTab>
      <VTab value="kiosk" prepend-icon="bx-desktop">Kiosk</VTab>
    </VTabs>

    <VCard rounded="lg">
      <AppDataTable
        :headers="headers"
        :items="outlets"
        :loading="isLoading"
        show-index
        :page="page"
        :items-per-page="limit"
        :total="total"
        empty-title="Belum ada outlet"
        empty-text="Tambahkan outlet pertama untuk mulai mengelola data."
        @update:page="p => (page = p)"
      >
        <template #toolbar>
          <VTextField
            v-model="search"
            placeholder="Cari outlet..."
            prepend-inner-icon="bx-search"
            clearable
            style="max-width: 320px;"
          />
        </template>

        <template #item.unit="{ item }">
          {{ item.unit?.name || '-' }}
        </template>

        <template #item.kode_folder="{ item }">
          <VChip color="primary" size="small" label class="font-weight-medium">
            {{ item.kode_folder }}
          </VChip>
        </template>

        <template #item.created_at="{ item }">
          {{ formatDate(item.created_at) }}
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end" style="gap: 4px;">
            <VBtn icon variant="text" size="small" color="default" @click="openEdit(item)">
              <VIcon icon="bx-edit-alt" />
              <VTooltip activator="parent">Edit</VTooltip>
            </VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="removeOutlet(item)">
              <VIcon icon="bx-trash-alt" />
              <VTooltip activator="parent">Hapus</VTooltip>
            </VBtn>
          </div>
        </template>
      </AppDataTable>
    </VCard>

    <AppModal
      v-model="dialog"
      :title="isEditing ? 'Edit Outlet' : 'Tambah Outlet'"
      icon="bx-store"
      max-width="640"
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
          <VTextField v-model="form.phone" label="Telp" />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="form.address" label="Alamat" />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField v-model="form.kode_folder" label="Kode Folder" />
        </VCol>
        <VCol cols="12" md="6">
          <VSelect
            v-model="form.unit_id"
            :items="units"
            item-value="id"
            item-title="name"
            label="Unit"
          />
        </VCol>
        <VCol cols="12">
          <VCheckbox
            v-model="form.is_kiosk"
            label="Outlet Kiosk"
            hint="Outlet swalayan (self-service) — bukan gerai berstaf."
            persistent-hint
          />
        </VCol>
      </VRow>
    </AppModal>
  </div>
</template>
