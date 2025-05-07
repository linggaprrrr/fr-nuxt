<script setup lang="ts">

// compposables
const { getUsers, getUserById, updateUserById, deleteUserById, getCurrentUser } = useUsers()



const { data: users, refresh } = await useAsyncData<User[]>('users', () =>
  getUsers({ page: 1, limit: 25 }).then(res => {
    if (!res) return []
    return res.data
  }),
)


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