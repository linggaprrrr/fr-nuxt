<script setup lang="ts">
import { ref, onMounted } from 'vue'
// compposables
const { getUsers, getUserById, updateUserById, deleteUserById, getCurrentUser } = useUsers()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const show = ref(true)

const users = ref<User[]>([])
  async function fetchUsers() {
  isLoading.value = true
  try {
    console.log('Fetching users...', { page: page.value, limit })

    const res = await getUsers({ page: page.value, limit })

    console.log('API response:', res)

    // Check if response contains data and total
    if (res) {
      users.value = res.data 
      total.value = res.total || 0 
    } else {
      users.value = []
      total.value = 0
      console.warn('No data in response')
    }
  } catch (e) {
    console.error('Error fetching users:', e)
    users.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
}


// Modal logic
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
  await refresh()
}

async function confirmDelete(id: string) {
  if (confirm('Yakin ingin menghapus user ini?')) {
    await deleteUserById(id)
    await refresh()
  }
}

onMounted(() => {
  fetchUsers()
})

</script>

<template>
    <VCard title="Users Table">
      <VTable density="compact">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>ID</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
                <td>{{ index + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.id }}</td>
                <td>
                    <VBtn icon size="small" color="default" @click="openEditModal(user)">
                        <VIcon color="warning">bx bx-edit-alt</VIcon>                             
                    </VBtn>
                    <VBtn icon size="small" color="default" @click="confirmDelete(user.id)">
                        <VIcon color="error">bx bx-trash-alt</VIcon>                        
                    </VBtn>
                </td>
            </tr>

        </tbody>
      </VTable>
    </VCard>
  
    <!-- Edit Modal -->
    <VDialog v-model="showEdit" max-width="500">
      <VCard>
        <VCardTitle>Edit User</VCardTitle>
        <VCardText>
          <VTextField label="Name" v-model="editForm.name" />
          <VTextField label="Email" v-model="editForm.email" />
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn text="Batal" @click="showEdit = false"></VBtn>
          <VBtn color="primary" @click="saveEdit">Simpan</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </template>