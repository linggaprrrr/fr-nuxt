<script setup lang="ts">
import type { User } from '~/types/user'
import type { DataTableHeader } from '@/components/AppDataTable.vue'

const { getUsers, updateUserById, deleteUserById } = useUsers()
const toast = useToast()
const { confirm } = useConfirm()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const isSubmitting = ref(false)
const users = ref<User[]>([])
const search = ref('')

const editDialog = ref(false)
const editForm = ref({ id: '', name: '', email: '' })

const headers: DataTableHeader[] = [
  { key: 'name', title: 'Nama' },
  { key: 'email', title: 'Email' },
  { key: 'phone', title: 'No Telp' },
  { key: 'address', title: 'Alamat' },
  { key: 'role', title: 'Role' },
  { key: 'actions', title: '', align: 'end', width: '80px' },
]

async function fetchUsers() {
  isLoading.value = true
  try {
    const res = await getUsers({ page: page.value, limit, search: search.value })
    users.value = res?.data || []
    total.value = res?.total || 0
  } catch {
    users.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
}

function openEditModal(user: any) {
  editForm.value = { id: user.id, name: user.name, email: user.email }
  editDialog.value = true
}

async function saveEdit() {
  isSubmitting.value = true
  try {
    await updateUserById(editForm.value.id, { name: editForm.value.name, email: editForm.value.email })
    toast.success('User berhasil diperbarui')
    editDialog.value = false
    await fetchUsers()
  } catch (error: any) {
    toast.error(error?.message ?? 'Gagal memperbarui')
  } finally {
    isSubmitting.value = false
  }
}

async function confirmDelete(user: any) {
  if (!await confirm({ title: 'Hapus User', message: `Hapus user "${user.name}"?`, tone: 'danger', confirmText: 'Hapus' })) return
  try {
    await deleteUserById(user.id)
    toast.success('User dihapus')
    await fetchUsers()
  } catch (error: any) {
    toast.error(error?.message ?? 'Gagal menghapus')
  }
}

watch([page, search], fetchUsers)
onMounted(fetchUsers)

definePageMeta({ layout: 'unit' })
</script>

<template>
  <div>
    <PageHeader title="Users" subtitle="Daftar user yang terdaftar di unit ini." />

    <VCard rounded="lg">
      <AppDataTable
        :headers="headers"
        :items="users"
        :loading="isLoading"
        show-index
        :page="page"
        :items-per-page="limit"
        :total="total"
        empty-title="Belum ada user"
        @update:page="p => { page = p; fetchUsers() }"
      >
        <template #toolbar>
          <VTextField v-model="search" placeholder="Cari user..." prepend-inner-icon="bx-search" clearable style="max-width:320px" />
        </template>

        <template #item.phone="{ item }">{{ item.phone?.trim() || '-' }}</template>
        <template #item.address="{ item }">{{ item.address?.trim() || '-' }}</template>
        <template #item.role="{ item }">{{ item.role?.trim() || 'Customer' }}</template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end" style="gap:4px">
            <VBtn icon variant="text" size="small" @click="openEditModal(item)">
              <VIcon color="warning" icon="bx-edit-alt" />
            </VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="confirmDelete(item)">
              <VIcon icon="bx-trash-alt" />
            </VBtn>
          </div>
        </template>
      </AppDataTable>
    </VCard>

    <AppModal
      v-model="editDialog"
      title="Edit User"
      icon="bx-user"
      :loading="isSubmitting"
      confirm-text="Simpan"
      cancel-text="Batal"
      :max-width="480"
      @confirm="saveEdit"
    >
      <FormSection title="Detail">
        <FormField label="Nama">
          <template #default="{ id, describedBy }">
            <VTextField :id="id" v-model="editForm.name" :aria-describedby="describedBy" />
          </template>
        </FormField>
        <FormField label="Email">
          <template #default="{ id, describedBy }">
            <VTextField :id="id" v-model="editForm.email" type="email" :aria-describedby="describedBy" />
          </template>
        </FormField>
      </FormSection>
    </AppModal>
  </div>
</template>
