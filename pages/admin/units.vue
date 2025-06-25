<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Unit } from '~/types/unit'

const { getUnits, createUnit, updateUnitById, getUnitById, deleteUnitById } = useUnits()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const units = ref<Unit[]>([])
const search = ref('')

// Modal
const showCreate = ref(false)
const showEdit = ref(false)
const form = ref({  
  id: '',
  name: '',
  location: '',
})


const createForm = ref({    
  name: '',
  location: '',
})



async function fetchUnits() {
  isLoading.value = true
  try {
    const res = await getUnits({
      page: page.value,
      limit,
      search: search.value
    })
    units.value = res?.data || []
    total.value = res?.total || 0

  } catch (error) {
    console.error('Failed to fetch units:', error)
    units.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
  
}

// Create unit
async function handleCreateUnit() {
  await createUnit({
    name: createForm.value.name,
    location: createForm.value.location
  })
  showCreate.value = false
  await fetchUnits()
}

// Edit Unit
function openEditModal(unit: any) {
  form.value = { ...unit }
  showEdit.value = true
}

async function saveEdit() {
  await updateUnitById(form.value.id, {
    name: form.value.name,
    location: form.value.location
  })
  showEdit.value = false
  await fetchUnits()
}

// Delete unit
async function confirmDelete(id: string) {
  if (confirm('Yakin ingin menghapus unit ini?')) {
    await deleteUnitById(id)
    await fetchUnits()
  }
}

// Handle pagination & search
watch([page, search], fetchUnits)

onMounted(() => {
  fetchUnits()
})
</script>

<template>
  <VCard title="Users Table" class="mb-4">
    <template v-slot:append>
        <v-btn
          class="text-none"
          color="primary"
          text="Tambah Unit"
          variant="tonal"
          slim
          @click="showCreate = true"
        ></v-btn>

      <VDialog v-model="showCreate" max-width="766">
        <VCard>
          <VCardTitle>Tambah Unit</VCardTitle>            
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
                  v-model="createForm.location"
                  persistent-hint
                ></v-text-field>
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
        label="Cari user..."
        @input="fetchUnits"  
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
          <th>Alamat</th>
          <th>API Key</th>
          <th>Dibuat</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!isLoading && units.length === 0">
          <td colspan="6" class="text-center">Tidak ada data</td>
        </tr>
        <tr v-for="(unit, index) in units" :key="unit.id">
          <td>{{ index + 1 + (page - 1) * limit }}</td>
          <td>{{ unit.name }}</td>
          <td>{{ unit.location }}</td>
          <td><code>{{ unit.api_key }}</code></td>
          <td>{{ new Date(unit.created_at).toISOString().slice(0, 10) }}</td>
          <td>
            <VBtn icon variant="text" size="small" @click="openEditModal(unit)">
              <VIcon color="warning">bx bx-edit-alt</VIcon>
            </VBtn>
            <VBtn icon variant="text"  size="small" @click="confirmDelete(unit.id)">
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
              v-model="form.location"
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
