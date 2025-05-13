<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { User } from '~/types/user'


const { getUsers, updateUserById, deleteUserById } = useUsers()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const users = ref<User[]>([])
const search = ref('')

// Modal
const showEdit = ref(false)
const editForm = ref({
  id: '',
  name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  picture: ''
})

// Fetch user data
async function fetchUsers() {
  isLoading.value = true
  try {
    const res = await getUsers({ 
      page: page.value, 
      limit, 
      search: search.value 
    })
    users.value = res?.data || []
    total.value = res?.total || 0

    console.log('Users:', users.value)
  } catch (error) {
    console.error('Failed to fetch users:', error)
    users.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
}

// Edit user
function openEditModal(user: any) {
  editForm.value = { ...user }
  showEdit.value = true
}

async function saveEdit() {
  await updateUserById(editForm.value.id, {
    name: editForm.value.name,
    email: editForm.value.email
  })
  showEdit.value = false
  await fetchUsers()
}

// Delete user
async function confirmDelete(id: string) {
  if (confirm('Yakin ingin menghapus user ini?')) {
    await deleteUserById(id)
    await fetchUsers()
  }
}

// Handle pagination & search
watch([page, search], fetchUsers)

onMounted(fetchUsers)


</script>
<template>
  <VCard title="Users Table" class="mb-4">
    <VCardText>
      <VTextField
        v-model="search"
        label="Cari user..."
        @input="fetchUsers"  
        prepend-inner-icon="bx bx-search"
        clearable
        class="mb-4"
      />
    </VCardText>

    <VTable density="compact">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>No Telp</th>
          <th>Alamat</th>
          <th>Role</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!isLoading && users.length === 0">
          <td colspan="6" class="text-center">Tidak ada data</td>
        </tr>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 + (page - 1) * limit }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone?.trim() !== '' ? user.phone : '-' }}</td>
          <td>{{ user.address?.trim() !== '' ? user.address : '-' }}</td>
          <td>{{ user.role?.trim() !== '' ? user.role : 'Customer' }}</td>          
          <td>
            <VBtn icon variant="text" size="small" @click="openEditModal(user)">
              <VIcon color="warning">bx bx-edit-alt</VIcon>
            </VBtn>
            <VBtn icon variant="text"  size="small" @click="confirmDelete(user.id)">
              <VIcon color="error">bx bx-trash-alt</VIcon>
            </VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>

    <VCardActions class="justify-center">
      <VPagination
        v-model="page"
        :length="Math.ceil(total / limit)"
        total-visible="5"
        prev-icon="bx bx-chevron-left"
        next-icon="bx bx-chevron-right"
      />
    </VCardActions>
  </VCard>

  <!-- Modal Edit -->
  <VDialog v-model="showEdit" max-width="500">
    <VCard>
      <VCardTitle>Edit User</VCardTitle>
      <VCardText>
        <VTextField label="Name" v-model="editForm.name" />
        <VTextField label="Email" v-model="editForm.email" />
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn text="Batal" @click="showEdit = false" />
        <VBtn color="primary" @click="saveEdit">Simpan</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
