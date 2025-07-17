<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Outlet } from '~/types/outlet'
import type { Unit } from '@/types/unit'

const { getOutlets, createOutlet, updateOutletById, getOutletById, deleteOutletById } = useOutlets()
const { getUnits } = useUnits()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const outlets = ref<Outlet[]>([])
const units = ref<Unit[]>([])
const search = ref('')

// Modal
const showCreate = ref(false)
const showEdit = ref(false)
const form = ref({  
  id: '',
  name: '',
  address: '',
  phone: '',
  kode_folder: '',
  unit_id: '',  
})


const createForm = ref({    
  name: '',
  address: '',
  phone: '',
  kode_folder: '',
  unit_id: '',
})

async function fetchUnits() {
  isLoading.value = true
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
    isLoading.value = false
  }
  
}

async function fetchOutlets() {
  isLoading.value = true
  try {
    const res = await getOutlets({
      page: page.value,
      limit,
      search: search.value
    })
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

// Create outlet
async function handleCreateUnit() {
  await createOutlet({
    name: createForm.value.name,
    address: createForm.value.address,
    phone: createForm.value.phone,
    unit_id: createForm.value.unit_id,
    kode_folder: createForm.value.kode_folder
  })
  showCreate.value = false
  await fetchOutlets()
}

// Edit Unit
function openEditModal(outlet: any) {
  form.value = { ...outlet }
  showEdit.value = true
}

async function saveEdit() {
  await updateOutletById(form.value.id, {
    name: form.value.name,
    location: form.value.address
  })
  showEdit.value = false
  await fetchOutlets()
}

// Delete outlet
async function confirmDelete(id: string) {
  if (confirm('Yakin ingin menghapus outlet ini?')) {
    await deleteOutletById(id)
    await fetchOutlets()
  }
}


onMounted(() => {
  fetchUnits()
  fetchOutlets()
})
</script>

<template>
  <VCard title="Users Table" class="mb-4">
    <template v-slot:append>
        <v-btn
          class="text-none"
          color="primary"
          text="Tambah Outlet"
          variant="tonal"
          slim
          @click="showCreate = true"
        ></v-btn>

      <VDialog v-model="showCreate" max-width="766">
        <VCard>
          <VCardTitle>Tambah Outlet</VCardTitle>            
          <v-container fluid>

            <v-row>
              <v-col cols="3">
                <v-list-subheader>Nama</v-list-subheader>
              </v-col>

              <v-col cols="9">
                <v-text-field                                                                       
                  v-model="createForm.name"
                  persistent-hint
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-list-subheader>Alamat</v-list-subheader>
              </v-col>

              <v-col cols="9">
                <v-text-field                                                                       
                  v-model="createForm.address"
                  persistent-hint
                ></v-text-field>
              </v-col>
            </v-row>
             <v-row>
              <v-col cols="3">
                <v-list-subheader>Telp</v-list-subheader>
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
                <v-list-subheader>Kode Folder</v-list-subheader>
              </v-col>

              <v-col cols="9">
                <v-text-field                                                                       
                  v-model="createForm.kode_folder"
                  persistent-hint
                ></v-text-field>
              </v-col>
            </v-row>
             <v-row>
              <v-col cols="3">
                <v-list-subheader>Unit</v-list-subheader>
              </v-col>

              <v-col cols="9">
                <v-select
                    v-model="createForm.unit_id"
                    density="comfortable"                    
                    :items="units"
                    item-value="id"
                    item-title="name"                    
                    persistent-hint
                    class="mb-4"
                    variant="outlined"
                  />
              </v-col>
            </v-row>
          </v-container>            
          <VCardActions>
            <VSpacer />
            <VBtn text="Batal" @click="showCreate = false" />
            <VBtn color="primary" @click="handleCreateUnit">Simpan</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>   
    </template>
    <VCardText>
      <VTextField
        v-model="search"
        label="Search..."
        @input="fetchOutlets"  
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
          <th>Telp</th>
          <th>Unit</th>
          <th>Kode Folder</th>
          <th>Dibuat</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!isLoading && outlets.length === 0">
          <td colspan="6" class="text-center">Tidak ada data</td>
        </tr>
        <tr v-for="(outlet, index) in outlets" :key="outlet.id">
          <td>{{ index + 1 + (page - 1) * limit }}</td>
          <td>{{ outlet.name }}</td>          
          <td>{{ outlet.phone }}</td>
          <td>{{ outlet.unit.name }}</td>
          <td><span class="font-weight-bold text-error ">{{ outlet.kode_folder }}</span></td>
          <td>{{ new Date(outlet.created_at).toISOString().slice(0, 10) }}</td>
          <td>
            <VBtn icon variant="text" size="small" @click="openEditModal(outlet)">
              <VIcon color="warning">bx bx-edit-alt</VIcon>
            </VBtn>
            <VBtn icon variant="text"  size="small" @click="confirmDelete(outlet.id)">
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
   <VDialog v-model="showEdit" max-width="766">
    <VCard>
      <VCardTitle>Tambah Unit</VCardTitle>            
      <v-container fluid>

        <v-row>
          <v-col cols="3">
            <v-list-subheader>Nama</v-list-subheader>
          </v-col>

          <v-col cols="9">
            <v-text-field                                                                       
              v-model="form.name"
              persistent-hint
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-list-subheader>Alamat</v-list-subheader>
          </v-col>

          <v-col cols="9">
            <v-text-field                                                                       
              v-model="form.address"
              persistent-hint
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-list-subheader>Kode Folder</v-list-subheader>
          </v-col>

          <v-col cols="9">
            <v-text-field                                                                       
              v-model="form.kode_folder"
              persistent-hint
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>            
      <VCardActions>
        <VSpacer />
        <VBtn text="Batal" @click="showEdit = false" />
        <VBtn color="primary" @click="saveEdit">Update</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>   
</template>
