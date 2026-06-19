<script setup lang="ts">
import type { Outlet } from '~/types/outlet'
import type { Unit } from '@/types/unit'
import type { DataTableHeader } from '@/components/AppDataTable.vue'

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

const dialog = ref(false)
const editingId = ref<string | null>(null)
const isEditing = computed(() => editingId.value !== null)

const blankForm = () => ({ name: '', address: '', phone: '', unit_id: '' })
const form = ref(blankForm())

const headers: DataTableHeader[] = [
  { key: 'name', title: 'Nama' },
  { key: 'phone', title: 'Telp' },
  { key: 'unit', title: 'Unit' },
  { key: 'created_at', title: 'Dibuat', nowrap: true },
  { key: 'actions', title: '', align: 'end', width: '80px' },
]

async function fetchUnits() {
  try {
    const res = await getUnits({ page: 1, limit: 9999 })
    units.value = res?.data || []
  } catch { units.value = [] }
}

async function fetchOutlets() {
  isLoading.value = true
  try {
    const res = await getOutlets({ page: page.value, limit, search: search.value })
    outlets.value = res?.data || []
    total.value = res?.total || 0
  } catch {
    outlets.value = []
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

function openEdit(outlet: any) {
  editingId.value = outlet.id
  form.value = { name: outlet.name, address: outlet.address || '', phone: outlet.phone || '', unit_id: outlet.unit_id || '' }
  dialog.value = true
}

async function submit() {
  isSubmitting.value = true
  try {
    if (isEditing.value) {
      await updateOutletById(editingId.value!, { name: form.value.name, location: form.value.address })
      toast.success('Outlet diperbarui')
    } else {
      await createOutlet({ name: form.value.name, address: form.value.address, phone: form.value.phone, unit_id: form.value.unit_id })
      toast.success('Outlet ditambahkan')
    }
    dialog.value = false
    await fetchOutlets()
  } catch (error: any) {
    toast.error(error?.message ?? 'Gagal menyimpan')
  } finally {
    isSubmitting.value = false
  }
}

async function removeOutlet(outlet: any) {
  if (!await confirm({ title: 'Hapus Outlet', message: `Hapus outlet "${outlet.name}"?`, tone: 'danger', confirmText: 'Hapus' })) return
  try {
    await deleteOutletById(outlet.id)
    toast.success('Outlet dihapus')
    await fetchOutlets()
  } catch (error: any) {
    toast.error(error?.message ?? 'Gagal menghapus')
  }
}

watch([page, search], fetchOutlets)
onMounted(() => { fetchUnits(); fetchOutlets() })

definePageMeta({ layout: 'unit' })
</script>

<template>
  <div>
    <PageHeader title="Outlets" subtitle="Kelola outlet dalam unit ini.">
      <template #actions>
        <VBtn color="primary" prepend-icon="bx-plus" @click="openCreate">Tambah Outlet</VBtn>
      </template>
    </PageHeader>

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
        @update:page="p => { page = p; fetchOutlets() }"
      >
        <template #toolbar>
          <VTextField v-model="search" placeholder="Cari outlet..." prepend-inner-icon="bx-search" clearable style="max-width:320px" />
        </template>

        <template #item.unit="{ item }">{{ item.unit?.name ?? '-' }}</template>

        <template #item.created_at="{ item }">
          {{ new Date(item.created_at).toISOString().slice(0, 10) }}
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end" style="gap:4px">
            <VBtn icon variant="text" size="small" @click="openEdit(item)">
              <VIcon color="warning" icon="bx-edit-alt" />
            </VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="removeOutlet(item)">
              <VIcon icon="bx-trash-alt" />
            </VBtn>
          </div>
        </template>
      </AppDataTable>
    </VCard>

    <AppModal
      v-model="dialog"
      :title="isEditing ? 'Edit Outlet' : 'Tambah Outlet'"
      icon="bx-store"
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
          <VTextField v-model="form.phone" label="Telepon" />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="form.address" label="Alamat" />
        </VCol>
        <VCol v-if="!isEditing" cols="12">
          <VSelect v-model="form.unit_id" :items="units" item-value="id" item-title="name" label="Unit" />
        </VCol>
      </VRow>
    </AppModal>
  </div>
</template>
