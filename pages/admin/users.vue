<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { User } from '~/types/user'
import type { Outlet,OutletList, GetOutletsByUnitResponse } from '~/types/outlet'
import type { Unit } from '@/types/unit'
import { create } from 'domain'

const { getUsers, updateUserById, deleteUserById, createUser } = useUsers()
const { getUnits } = useUnits()
const { getOutlets, getOutletsByUnit } = useOutlets()


const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const users = ref<User[]>([])
const search = ref('')

const showCreate = ref(false)

// Modal
const showEdit = ref(false)
const createForm = ref({  
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

const editForm = ref({
  id: '',
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

const outlets = ref<Outlet[]>([])
const units = ref<Unit[]>([])
async function fetchUnits() {  
  try {
    const res = await getUnits({
      page: 1,
      limit: 9999,
      
    })
    units.value = res?.data || []    
    
  } catch (error) {
    console.error('Failed to fetch units:', error)
    units.value = []    
  } finally {

  }  
}




const handleCreateUser = async () => {
  showCreate.value = false
  createForm.value.role = createForm.value.role.toLowerCase()
  if (createForm.value.role == 'customer' || createForm.value.role == 'superadmin') {
    createForm.value.unit_id = ''
    createForm.value.outlet_id = ''
  }
  await createUser(createForm.value)
  
  await fetchUsers()
  createForm.value = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    picture: '',
    role: '',
    unit_id: '',
    outlet_id: '',
   }

}

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

// Handle unit & outlet



const outletList = ref<OutletList[]>([])
const selectedUnit = computed(() => {
  return units.value.find(u => u.id === createForm.value.unit_id) || null
})

watch(
  () => createForm.value.unit_id,
  async (newUnitId) => {
    if (newUnitId) {
      const outletRes = await getOutletsByUnit(newUnitId) as GetOutletsByUnitResponse
      if (outletRes?.status_code === 200 && Array.isArray(outletRes.outlets)) {
        outletList.value = outletRes.outlets
        createForm.value.outlet_id = outletRes.outlets[0]?.id || ''        
        
      } else {
        outletList.value = []
        createForm.value.outlet_id
      }
    }
  },
  { immediate: true }
)

const rules = {
  required: (value: string) => !!value || 'Required.',
  min: (v: string) => v.length >= 6 || 'Min 6 characters',
  emailMatch: () => `The email and password you entered don't match`,
}


const show1 = ref(false)  
const password = ref('Password')


onMounted(() => {
  fetchUsers()
  fetchUnits()  
})

</script>
<template>
  <VCard title="Users Table" class="mb-4">
     <template v-slot:append>
        <v-btn
          class="text-none"
          color="primary"
          text="Tambah User"
          variant="tonal"
          slim
          @click="showCreate = true"
        ></v-btn>

      <VDialog v-model="showCreate" max-width="766">
        <VCard>
          <VCardTitle>Tambah User</VCardTitle>            
          <v-container fluid>
             <v-row>
              <v-col cols="3">
                <v-list-subheader>Email</v-list-subheader>
              </v-col>

              <v-col cols="9">
                <v-text-field                                                                       
                  v-model="createForm.email"
                  persistent-hint
                  placeholder="johndoe@gmail.com"
                  type="email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-list-subheader>Nama</v-list-subheader>
              </v-col>

              <v-col cols="9">
                <v-text-field                                                                       
                  v-model="createForm.name"
                  placeholder="John Doe"
                  persistent-hint
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-list-subheader>No Telp</v-list-subheader>
              </v-col>

              <v-col cols="9">
                <v-text-field                                                                       
                  v-model="createForm.phone"
                  persistent-hint
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-list-subheader>Alamat</v-list-subheader>
              </v-col>

              <v-col cols="9">
                <v-textarea 
                  v-model="createForm.address"
                  variant="outlined">
                </v-textarea>                
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-list-subheader>Role</v-list-subheader>
              </v-col>
              <v-col cols="9">
                <v-select
                    v-model="createForm.role"
                    density="comfortable"                    
                    :items="['Customer', 'Unit', 'Outlet', 'Superadmin']"                    
                    class="mb-4"
                  />               
              </v-col>
            </v-row>
            <v-row v-if="createForm.role === 'Unit' || createForm.role === 'Outlet'">
              <v-col cols="3">
                <v-list-subheader>Unit</v-list-subheader>
              </v-col>
              <v-col cols="9">
                <v-select
                  v-model="createForm.unit_id"
                  density="comfortable"
                  label="Pilih unit"                
                  :items="units"
                  item-value="id"
                  item-title="name"
                  :hint="selectedUnit?.location"
                  persistent-hint
                  class="mb-4"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            <v-row v-if="createForm.role === 'Outlet' ">
              <v-col cols="3">
                <v-list-subheader>Outlet</v-list-subheader>
              </v-col>
              <v-col cols="9">
                <v-select
                  v-model="createForm.outlet_id"
                  density="comfortable"
                  label="Pilih outlet"                
                  :items="outletList"
                  item-value="id"
                  item-title="name"                  
                  persistent-hint
                  class="mb-4"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-list-subheader>Password</v-list-subheader>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  v-model="createForm.password"
                  :append-icon="show1 ? 'bx-show' : 'bx-hide'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  hint="At least 6 characters"                  
                  name="input-10-1"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
            </v-row>            
          </v-container>            
          <VCardActions>
            <VSpacer />
            <VBtn text="Batal" @click="showCreate = false" />
            <VBtn color="primary" @click="handleCreateUser">Simpan</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>   
    </template>
    <VCardText>
      <VTextField
        v-model="search"
        label="Search..."
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
