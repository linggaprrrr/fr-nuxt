<script setup lang="ts">
import type { PhotoPrice, PhotoType } from '@/types/photo'
import type { Unit } from '@/types/unit'

const { getPhotoTypes, getPhotoPrices, createPhotoPricing, createPhotoType, deletePhotoTypeById, deletePhotoPriceById, getPhotoPriceById, getPhotoTypeById, updatePhotoType, updatePhotoPrice } = usePricings()
const { getUnits } = useUnits()

// Photo Types
const pagePhotoTypes = ref(1)
const totalPhotoTypes = ref(0)
const searchPhotoTypes = ref('')
const photoTypes = ref<PhotoType[]>([])
const formPhotoType = ref({
  name: '',
  description: '',  
})
const formEditPhotoType = ref({
  id: '',
  name: '',
  description: '',  
})
const showCreatePhotoType = ref(false)
const showEditPhotoType = ref(false)


// Photo Prices
const pagePhotoPrices = ref(1)
const totalPhotoPrices = ref(0)
const searchPhotoPrices = ref('')
const photoPrices = ref<PhotoPrice[]>([])
const formPhotoPricing = ref({
  unit_id: '',
  photo_type_id: '',
  price: 0
})
const formEditPhotoPricing = ref({
  id: '',
  unit_id: '',
  photo_type_id: '',
  price: 0
})

const showCreatePhotoPricing = ref(false)
const showEditPhotoPricing = ref(false)

const limit = 24
const isLoading = ref(false)

async function fetchPhotoTypes() {
  isLoading.value = true
  try {
    const res = await getPhotoTypes({
      page: pagePhotoTypes.value,
      limit,
      search: searchPhotoTypes.value,
    })
    photoTypes.value = res?.data || []
    totalPhotoTypes.value = res?.total || 0
    if (photoTypes.value.length > 0 && !formPhotoPricing.value.photo_type_id) {
      formPhotoPricing.value.photo_type_id = photoTypes.value[0].id
    }
  } catch (error) {
    console.error('Failed to fetch Photo types:', error)
    photoTypes.value = []
    totalPhotoTypes.value = 0
  } finally {
    isLoading.value = false
  }
}

async function fetchPhotoPrices() {
  isLoading.value = true
  try {
    const res = await getPhotoPrices({
      page: pagePhotoPrices.value,
      limit,
      search: searchPhotoPrices.value,
    })
    photoPrices.value = res?.photo_prices || []
    totalPhotoPrices.value = res?.total || 0
  } catch (error) {
    console.error('Failed to fetch Photo prices:', error)
    photoPrices.value = []
    totalPhotoPrices.value = 0
  } finally {
    isLoading.value = false
  }
}




// Create Photo Pricing
// load units
const units = ref<Unit[]>([])
async function fetchUnits() {
  isLoading.value = true
  try {
    const res = await getUnits({
      page: 1,
      limit: 9999,
      
    })
    units.value = res?.data || []    
    if (units.value.length > 0 && !formPhotoPricing.value.unit_id) {
      formPhotoPricing.value.unit_id = units.value[0].id
    }
  } catch (error) {
    console.error('Failed to fetch units:', error)
    units.value = []    
  } finally {
    isLoading.value = false
  }
  
}

const selectedUnit = computed(() => {
  return units.value.find(u => u.id === formPhotoPricing.value.unit_id) || null
})


const snackbar = ref(false)
const text = ref('')
const timeout = ref(3000)
async function handleCreatePhotoPricing() {  
   try {
    await createPhotoPricing(formPhotoPricing.value)
    showCreatePhotoPricing.value = false
    await fetchPhotoPrices()
  } catch (error) {    
    text.value = 'Photo price for this unit and photo type already exists'
    snackbar.value = true
    
  }
}

async function openEditPriceModal(id: string) {
  const data = await getPhotoPriceById(id)  
  if (data?.photo_price) {
    formEditPhotoPricing.value = data.photo_price    
  }  
  showEditPhotoPricing.value = true
}


async function handleUpdatePhotoPricing(id: string) {
  
  await updatePhotoPrice(id, formEditPhotoPricing.value)
  showEditPhotoPricing.value = false
  await fetchPhotoPrices()
}

// delete photo type
async function confirmDeletePhotoPrice(id: string) {
  if (confirm('Yakin ingin menghapus Pricing ini?')) {
    await deletePhotoPriceById(id)
    await fetchPhotoPrices()
  }
}

// Create Photo Type
async function handleCreatePhotoType() {
  await createPhotoType(formPhotoType.value)
  showCreatePhotoType.value = false
  await fetchPhotoTypes()  
}
async function openEditPhotoTypeModal(id: string) {
  const data = await getPhotoTypeById(id)
  if (data?.photo_type) {
    formEditPhotoType.value = data.photo_type
  }
  
  showEditPhotoType.value = true
}

async function handleUpdatePhotoType(id: string) {
  await updatePhotoType(id, formEditPhotoType.value)
  formEditPhotoType
  showEditPhotoType.value = false
  await fetchPhotoTypes()
}

// delete photo type
async function confirmDeletePhotoType(id: string) {
  if (confirm('Yakin ingin menghapus Tipe Foto ini?')) {
    await deletePhotoTypeById(id)
    await fetchPhotoTypes()
  }
}

// Handle pagination & search per table
watch([pagePhotoTypes, searchPhotoTypes], fetchPhotoTypes)
watch([pagePhotoPrices, searchPhotoPrices], fetchPhotoPrices)

onMounted(() => {
  fetchPhotoTypes()
  fetchPhotoPrices()
  fetchUnits()
})


</script>

<template>
  <div class="container">
    <h1>Photo Pricing</h1>
    <p>Manage your photo pricing here.</p>
  </div>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ text }}
    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="snackbar = false">Close</v-btn>
    </template>
  </v-snackbar>
  <VCard title="Photo Type Table" class="mb-4">
    <template v-slot:append>
        <v-btn
          class="text-none"
          color="primary"
          text="Tambah Tipe Foto"
          variant="tonal"
          slim
          @click="showCreatePhotoType = true"
        ></v-btn>

        <VDialog v-model="showCreatePhotoType" max-width="766">
          <VCard>
            <VCardTitle>Tambah Tipe Foto</VCardTitle>            
            <v-container fluid>

              <v-row>
                <v-col cols="3">
                  <v-list-subheader>Tipe / Jenis Foto</v-list-subheader>
                </v-col>

                <v-col cols="9">
                  <v-text-field                                                                       
                    v-model="formPhotoType.name"
                    persistent-hint
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-list-subheader>Descripsi</v-list-subheader>
                </v-col>

                <v-col cols="9">
                  <v-text-field                                                                       
                    v-model="formPhotoType.description"
                    persistent-hint
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>            
            <VCardActions>
              <VSpacer />
              <VBtn text="Batal" @click="showCreatePhotoType = false" />
              <VBtn color="primary" @click="handleCreatePhotoType">Simpan</VBtn>
            </VCardActions>
          </VCard>
        </VDialog>   
      </template>
    <VCardText>
      <VTextField
        v-model="searchPhotoTypes"
        label="Cari tipe foto..."
        @input="fetchPhotoPrices"  
        prepend-inner-icon="bx bx-search"
        clearable
        class="mb-4"
      />
    </VCardText>

    <VTable density="compact">
      <thead>
        <tr>
          <th>#</th>
          <th>Nama</th>
          <th>Deskripsi</th>
          <th></th>        
        </tr>
      </thead>
      <tbody>
        <tr v-if="!isLoading && photoTypes.length === 0">
          <td colspan="6" class="text-center">Tidak ada data</td>
        </tr>
        <tr v-for="(photoType, index) in photoTypes" :key="photoType.id">
          <td>{{ index + 1 + (pagePhotoTypes - 1) * limit }}</td>
          <td>{{ photoType.name }}</td>
          <td>{{ photoType.description }}</td>          
          <td>
            <VBtn icon variant="text" size="small" @click="openEditPhotoTypeModal(photoType.id)">
              <VIcon color="warning">bx bx-edit-alt</VIcon>
            </VBtn>
            <VBtn icon variant="text"  size="small" @click="confirmDeletePhotoType(photoType.id)">
              <VIcon color="error">bx bx-trash-alt</VIcon>
            </VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>
    <VDialog v-model="showEditPhotoType" max-width="766">
      <VCard>
        <VCardTitle>Edit Tipe Foto</VCardTitle>            
        <v-container fluid>

          <v-row>
            <v-col cols="3">
              <v-list-subheader>Tipe / Jenis Foto</v-list-subheader>
            </v-col>

            <v-col cols="9">
              <v-text-field                                                                       
                v-model="formEditPhotoType.name"
                persistent-hint
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-list-subheader>Descripsi</v-list-subheader>
            </v-col>

            <v-col cols="9">
              <v-text-field                                                                       
                v-model="formEditPhotoType.description"
                persistent-hint
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>            
        <VCardActions>
          <VSpacer />
          <VBtn text="Batal" @click="showEditPhotoType = false" />
          <VBtn color="primary" @click="handleUpdatePhotoType(formEditPhotoType.id)">Update</VBtn>
        </VCardActions>
      </VCard>
    </VDialog> 
    <VCardActions class="justify-center">
      <VPagination
        v-model="pagePhotoTypes"
        :length="Math.ceil(totalPhotoTypes / limit)"
        total-visible="5"
        prev-icon="bx bx-chevron-left"
        next-icon="bx bx-chevron-right"
      />
    </VCardActions>
  </VCard>

  <VCard title="Pricing Table" class="mb-4">
    <template v-slot:append>
      <v-btn
        class="text-none"
        color="primary"
        text="Tambah Pricing"
        variant="tonal"
        slim
        @click="showCreatePhotoPricing = true"
      ></v-btn>
        <VDialog v-model="showCreatePhotoPricing" max-width="766">
          <VCard>
            <VCardTitle>Tambah Pricing</VCardTitle>            
            <v-container fluid>
              <v-row>
                <v-col cols="2">
                  <v-list-subheader>Lokasi Unit</v-list-subheader>
                </v-col>

                <v-col cols="10">
                  <v-select
                    v-model="formPhotoPricing.unit_id"
                    density="comfortable"
                    label="Unit"                
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

              <v-row>
                <v-col cols="2">
                  <v-list-subheader>Tipe Foto</v-list-subheader>
                </v-col>

                <v-col cols="10">
                   <v-select
                    v-model="formPhotoPricing.photo_type_id"
                    density="comfortable"
                    label="Tipe Foto"
                    :items="photoTypes"
                    item-value="id"
                    item-title="name"
                    class="mb-4"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="2">
                  <v-list-subheader>Harga</v-list-subheader>
                </v-col>

                <v-col cols="10">
                  <v-text-field
                    label="Amount"
                    hint="Rp 0 jika konten/foto gratis"                    
                    prefix="Rp"
                    v-model="formPhotoPricing.price"
                    persistent-hint
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>            
            <VCardActions>
              <VSpacer />
              <VBtn text="Batal" @click="showCreatePhotoPricing = false" />
              <VBtn color="primary" @click="handleCreatePhotoPricing">Simpan</VBtn>
            </VCardActions>
          </VCard>
        </VDialog>        
      </template>
    <VCardText>
      <VTextField
        v-model="searchPhotoPrices"
        label="Cari..."
        @input="fetchPhotoPrices"  
        prepend-inner-icon="bx bx-search"
        clearable
        class="mb-4"
      />
    </VCardText>
 
    <VTable density="compact">
      <thead>
        <tr>
          <th>#</th>
          <th>Tipe Foto</th>
          <th>Unit</th>
          <th>Harga</th>
          <th></th>        
        </tr>
      </thead>
      <tbody>
        <tr v-if="!isLoading && photoPrices.length === 0">
          <td colspan="6" class="text-center">Tidak ada data</td>
        </tr>
        <tr v-for="(photoPrice, index) in photoPrices" :key="photoPrice.id">
          <td>{{ index + 1 + (pagePhotoPrices - 1) * limit }}</td>
          <td>{{ photoPrice.photo_type_name }}</td>
          <td>{{ photoPrice.unit_name }}</td>
          <td>Rp {{ photoPrice.price.toLocaleString() }}</td>
          <td>
            <VBtn icon variant="text" size="small" @click="openEditPriceModal(photoPrice.id)">
              <VIcon color="warning">bx bx-edit-alt</VIcon>
            </VBtn>
            <VBtn icon variant="text"  size="small" @click="confirmDeletePhotoPrice(photoPrice.id)">
              <VIcon color="error">bx bx-trash-alt</VIcon>
            </VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>
    <VDialog v-model="showEditPhotoPricing" max-width="766">
      <VCard>
        <VCardTitle>Tambah Pricing</VCardTitle>            
        <v-container fluid>
          <v-row>
            <v-col cols="2">
              <v-list-subheader>Lokasi Unit</v-list-subheader>
            </v-col>

            <v-col cols="10">
              <v-select
                v-model="formEditPhotoPricing.unit_id"
                density="comfortable"
                label="Unit"                
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

          <v-row>
            <v-col cols="2">
              <v-list-subheader>Tipe Foto</v-list-subheader>
            </v-col>

            <v-col cols="10">
                <v-select
                  v-model="formEditPhotoPricing.photo_type_id"
                  density="comfortable"
                  label="Tipe Foto"
                  :items="photoTypes"
                  item-value="id"
                  item-title="name"
                  class="mb-4"
                />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <v-list-subheader>Harga</v-list-subheader>
            </v-col>

            <v-col cols="10">
              <v-text-field
                label="Amount"
                hint="Rp 0 jika konten/foto gratis"                    
                prefix="Rp"
                v-model="formEditPhotoPricing.price"
                persistent-hint
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>            
        <VCardActions>
          <VSpacer />
          <VBtn text="Batal" @click="showEditPhotoPricing = false" />
          <VBtn color="primary" @click="handleUpdatePhotoPricing(formEditPhotoPricing.id)">Update</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>    
    <VCardActions class="justify-center">
      <VPagination
        v-model="pagePhotoPrices"
        :length="Math.ceil(totalPhotoPrices / limit)"
        total-visible="5"
        prev-icon="bx bx-chevron-left"
        next-icon="bx bx-chevron-right"
      />
    </VCardActions>
  </VCard>


  
</template>