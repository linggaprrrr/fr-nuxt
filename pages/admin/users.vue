<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { User } from '~/types/user'
import type { OutletList, GetOutletsByUnitResponse } from '~/types/outlet'
import type { Unit } from '@/types/unit'
import type { DataTableHeader } from '@/components/AppDataTable.vue'
import { getApiErrorMessage } from '@/utils/apiHelpers'

const { getUsers, updateUserById, deleteUserById, createUser } = useUsers()
const { getUnits } = useUnits()
const { getOutletsByUnit } = useOutlets()
const toast = useToast()
const { confirm } = useConfirm()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const isSubmitting = ref(false)
const users = ref<User[]>([])
const search = ref('')

const showCreate = ref(false)
const showEdit = ref(false)
const showPassword = ref(false)

const blankCreateForm = () => ({
  name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  picture: '',
  role: '',
  unit_id: '',
  outlet_id: '',
})
const createForm = ref(blankCreateForm())

const editForm = ref({ id: '', name: '', email: '' })

const units = ref<Unit[]>([])
const outletList = ref<OutletList[]>([])

const roleColorMap = { superadmin: 'primary', unit: 'info', outlet: 'warning', customer: 'secondary' }

const headers: DataTableHeader[] = [
  { key: 'name', title: 'Name' },
  { key: 'email', title: 'Email' },
  { key: 'phone', title: 'No Telp' },
  { key: 'address', title: 'Alamat' },
  { key: 'role', title: 'Role' },
  { key: 'actions', title: '', align: 'end' },
]

const passwordRules = [
  (v: string) => !!v || 'Password wajib diisi',
  (v: string) => v.length >= 6 || 'Minimal 6 karakter',
]

const selectedUnit = computed(() => units.value.find(u => u.id === createForm.value.unit_id) || null)

async function fetchUnits() {
  try {
    const res = await getUnits({ page: 1, limit: 9999 })
    units.value = res?.data || []
  } catch (error) {
    console.error('Failed to fetch units:', error)
    units.value = []
  }
}

async function fetchUsers() {
  isLoading.value = true
  try {
    const res = await getUsers({ page: page.value, limit, search: search.value })
    users.value = res?.data || []
    total.value = res?.total || 0
  } catch (error) {
    console.error('Failed to fetch users:', error)
    users.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
}

function openCreate() {
  createForm.value = blankCreateForm()
  showCreate.value = true
}

async function handleCreateUser() {
  if (!createForm.value.name.trim() || !createForm.value.email.trim()) {
    toast.warning('Nama dan email wajib diisi')
    return
  }
  if (!createForm.value.password || createForm.value.password.length < 6) {
    toast.warning('Password minimal 6 karakter')
    return
  }

  // Build payload without mutating the form bound to the UI
  const payload = { ...createForm.value, role: createForm.value.role.toLowerCase() }
  if (payload.role === 'customer' || payload.role === 'superadmin') {
    payload.unit_id = ''
    payload.outlet_id = ''
  }

  isSubmitting.value = true
  try {
    await createUser(payload)
    toast.success('User berhasil ditambahkan')
    showCreate.value = false
    createForm.value = blankCreateForm()
    await fetchUsers()
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  } finally {
    isSubmitting.value = false
  }
}

function openEditModal(user: User) {
  editForm.value = { id: user.id, name: user.name, email: user.email }
  showEdit.value = true
}

async function saveEdit() {
  isSubmitting.value = true
  try {
    await updateUserById(editForm.value.id, { name: editForm.value.name, email: editForm.value.email })
    toast.success('User berhasil diperbarui')
    showEdit.value = false
    await fetchUsers()
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  } finally {
    isSubmitting.value = false
  }
}

async function removeUser(user: User) {
  const ok = await confirm({
    title: 'Hapus user',
    message: `Yakin ingin menghapus "${user.name}"?`,
    tone: 'danger',
    confirmText: 'Hapus',
    cancelText: 'Batal',
  })
  if (!ok) return
  try {
    await deleteUserById(user.id)
    toast.success('User berhasil dihapus')
    await fetchUsers()
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  }
}

// Load outlets when the selected unit changes (create form only)
watch(
  () => createForm.value.unit_id,
  async (newUnitId) => {
    if (!newUnitId) {
      outletList.value = []
      return
    }
    const res = await getOutletsByUnit(newUnitId) as GetOutletsByUnitResponse
    if (res?.status_code === 200 && Array.isArray(res.outlets)) {
      outletList.value = res.outlets
      createForm.value.outlet_id = res.outlets[0]?.id || ''
    } else {
      outletList.value = []
      createForm.value.outlet_id = ''
    }
  },
)

watch([page, search], fetchUsers)

onMounted(() => {
  fetchUsers()
  fetchUnits()
})
</script>

<template>
  <div>
    <PageHeader title="Users" subtitle="Kelola akun pengguna dan hak aksesnya.">
      <template #actions>
        <VBtn color="primary" prepend-icon="bx-plus" @click="openCreate">
          Tambah User
        </VBtn>
      </template>
    </PageHeader>

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
        empty-text="Tambahkan user pertama untuk mulai."
        @update:page="p => (page = p)"
      >
        <template #toolbar>
          <VTextField
            v-model="search"
            placeholder="Cari user..."
            prepend-inner-icon="bx-search"
            clearable
            style="max-width: 320px;"
          />
        </template>

        <template #item.phone="{ item }">
          {{ item.phone?.trim() ? item.phone : '-' }}
        </template>

        <template #item.address="{ item }">
          {{ item.address?.trim() ? item.address : '-' }}
        </template>

        <template #item.role="{ item }">
          <StatusChip :status="item.role?.trim() || 'Customer'" :map="roleColorMap" />
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end" style="gap: 4px;">
            <VBtn icon variant="text" size="small" color="default" @click="openEditModal(item)">
              <VIcon icon="bx-edit-alt" />
              <VTooltip activator="parent">Edit</VTooltip>
            </VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="removeUser(item)">
              <VIcon icon="bx-trash-alt" />
              <VTooltip activator="parent">Hapus</VTooltip>
            </VBtn>
          </div>
        </template>
      </AppDataTable>
    </VCard>

    <!-- Create user -->
    <AppModal
      v-model="showCreate"
      title="Tambah User"
      icon="bx-user-plus"
      max-width="720"
      :loading="isSubmitting"
      confirm-text="Simpan"
      cancel-text="Batal"
      @confirm="handleCreateUser"
    >
      <FormSection title="Akun">
        <VCol cols="12" md="6">
          <VTextField v-model="createForm.email" label="Email" type="email" />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField v-model="createForm.name" label="Nama" />
        </VCol>
        <VCol cols="12">
          <VTextField
            v-model="createForm.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'bx-show' : 'bx-hide'"
            :rules="passwordRules"
            hint="Minimal 6 karakter"
            counter
            @click:append-inner="showPassword = !showPassword"
          />
        </VCol>
      </FormSection>

      <FormSection title="Kontak">
        <VCol cols="12" md="6">
          <VTextField v-model="createForm.phone" label="No Telp" />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField v-model="createForm.address" label="Alamat" />
        </VCol>
      </FormSection>

      <FormSection title="Hak Akses">
        <VCol cols="12" md="6">
          <VSelect
            v-model="createForm.role"
            :items="['Customer', 'Unit', 'Outlet', 'Superadmin']"
            label="Role"
          />
        </VCol>
        <VCol v-if="createForm.role === 'Unit' || createForm.role === 'Outlet'" cols="12" md="6">
          <VSelect
            v-model="createForm.unit_id"
            label="Unit"
            :items="units"
            item-value="id"
            item-title="name"
            :hint="selectedUnit?.location"
            persistent-hint
          />
        </VCol>
        <VCol v-if="createForm.role === 'Outlet'" cols="12" md="6">
          <VSelect
            v-model="createForm.outlet_id"
            label="Outlet"
            :items="outletList"
            item-value="id"
            item-title="name"
          />
        </VCol>
      </FormSection>
    </AppModal>

    <!-- Edit user -->
    <AppModal
      v-model="showEdit"
      title="Edit User"
      icon="bx-user"
      max-width="480"
      :loading="isSubmitting"
      confirm-text="Simpan"
      cancel-text="Batal"
      @confirm="saveEdit"
    >
      <VRow>
        <VCol cols="12">
          <VTextField v-model="editForm.name" label="Name" />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="editForm.email" label="Email" type="email" />
        </VCol>
      </VRow>
    </AppModal>
  </div>
</template>
