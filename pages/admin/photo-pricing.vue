<script setup lang="ts">
import type { PhotoPrice, PhotoType } from '@/types/photo'
import type { Unit } from '@/types/unit'
import type { Outlet, OutletList, GetOutletsByUnitResponse } from '@/types/outlet'

const {
  getPhotoTypes,
  getPhotoPrices,
  createPhotoPricing,
  createPhotoType,
  deletePhotoTypeById,
  deletePhotoPriceById,
  getPhotoPriceById,
  getPhotoTypeById,
  updatePhotoType,
  updatePhotoPrice
} = usePricings()

const { getUnits } = useUnits()
const { getOutlets, getOutletsByUnit } = useOutlets()

const pagePhotoTypes = ref(1)
const totalPhotoTypes = ref(0)
const searchPhotoTypes = ref('')
const photoTypes = ref<PhotoType[]>([])

const formPhotoType = ref({ name: '', description: '', kode_folder: '' })
const formEditPhotoType = ref({ id: '', name: '', description: '', kode_folder: '' })
const showCreatePhotoType = ref(false)
const showEditPhotoType = ref(false)

const pagePhotoPrices = ref(1)
const totalPhotoPrices = ref(0)
const searchPhotoPrices = ref('')
const photoPrices = ref<PhotoPrice[]>([])

const formPhotoPricing = ref({ unit_id: '', outlet_id: '', photo_type_id: '', price: 0 })
const formEditPhotoPricing = ref({ id: '', unit_id: '', outlet_id: '', photo_type_id: '', price: 0 })

const showCreatePhotoPricing = ref(false)
const showEditPhotoPricing = ref(false)

const limit = 24
const isLoading = ref(false)

async function fetchPhotoTypes() {
  isLoading.value = true
  try {
    const res = await getPhotoTypes({ page: pagePhotoTypes.value, limit, search: searchPhotoTypes.value })
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
    const res = await getPhotoPrices({ page: pagePhotoPrices.value, limit, search: searchPhotoPrices.value })
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

const units = ref<Unit[]>([])
const outletList = ref<OutletList[]>([])
const outlets = ref<Outlet[]>([])

async function fetchUnitsAndOutlets() {
  isLoading.value = true
  try {
    const unitRes = await getUnits({ page: 1, limit: 9999 })
    units.value = unitRes?.data || []
  } catch (error) {
    console.error('Error fetching units:', error)
    units.value = []
  } finally {
    isLoading.value = false
  }
}

async function fetchOutlets() {
  isLoading.value = true
  try {
    const { data } = await getOutlets({ page: 1, limit: 9999 })
    outlets.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error fetching outlets:', error)
    outlets.value = []
  } finally {
    isLoading.value = false
  }
}

const selectedUnit = computed(() => units.value.find(u => u.id === formPhotoPricing.value.unit_id) || null)

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

async function handleEditPhotoPricing() {
  try {
    isLoading.value = true
    if (!formEditPhotoPricing.value.unit_id || !formEditPhotoPricing.value.outlet_id || !formEditPhotoPricing.value.photo_type_id) {
      console.warn('Semua field wajib diisi')
      return
    }
    const payload = {
      unit_id: formEditPhotoPricing.value.unit_id,
      outlet_id: formEditPhotoPricing.value.outlet_id,
      photo_type_id: formEditPhotoPricing.value.photo_type_id,
      price: Number(formEditPhotoPricing.value.price),
    }
    const response = await updatePhotoPricing(formEditPhotoPricing.value.id, payload)
    if (response.status_code === 200) {
      showEditPhotoPricing.value = false
      await fetchPhotoPrices()
    } else {
      console.error('Gagal menyimpan perubahan:', response)
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat menyimpan:', error)
  } finally {
    isLoading.value = false
  }
}

async function confirmDeletePhotoPrice(id: string) {
  if (confirm('Yakin ingin menghapus Pricing ini?')) {
    await deletePhotoPriceById(id)
    await fetchPhotoPrices()
  }
}

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
  showEditPhotoType.value = false
  await fetchPhotoTypes()
}

async function confirmDeletePhotoType(id: string) {
  if (confirm('Yakin ingin menghapus Tipe Foto ini?')) {
    await deletePhotoTypeById(id)
    await fetchPhotoTypes()
  }
}

watch([pagePhotoTypes, searchPhotoTypes], fetchPhotoTypes)
watch([pagePhotoPrices, searchPhotoPrices], fetchPhotoPrices)

watch(
  () => formPhotoPricing.value.unit_id,
  async (newUnitId) => {
    if (newUnitId) {
      const outletRes = await getOutletsByUnit(newUnitId) as GetOutletsByUnitResponse
      if (outletRes?.status_code === 200 && Array.isArray(outletRes.outlets)) {
        outletList.value = outletRes.outlets
        formPhotoPricing.value.outlet_id = outletRes.outlets[0]?.id || ''        
      } else {
        outletList.value = []
        formPhotoPricing.value.outlet_id = ''
      }
    }
  },
  { immediate: true }
)

onMounted(() => {
  fetchPhotoTypes()
  fetchPhotoPrices()
  fetchUnitsAndOutlets()
  fetchOutlets()
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
              <v-row>
                <v-col cols="3">
                  <v-list-subheader>Kode Folder</v-list-subheader>
                </v-col>

                <v-col cols="9">
                  <v-text-field                                                                       
                    v-model="formPhotoType.kode_folder"
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
        label="Search..."
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
          <th>Kode Folder</th>
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
          <td><span class="font-weight-bold text-error ">{{ photoType.kode_folder }}</span></td>         
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
          <v-row>
            <v-col cols="3">
              <v-list-subheader>Kode Folder</v-list-subheader>
            </v-col>

            <v-col cols="9">
              <v-text-field                                                                       
                v-model="formEditPhotoType.kode_folder"
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
                <v-list-subheader>Outlet</v-list-subheader>
              </v-col>

              <v-col cols="10">
                <v-select
                  v-model="formPhotoPricing.outlet_id"
                  density="comfortable"                  
                  :items="outletList"
                  item-value="id"
                  item-title="name"
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
        label="Search..."
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
          <th>Outlet</th>
          <th>Unit</th>
          <th>Tipe Foto</th>          
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
          <td>{{ photoPrice.outlet_name }}</td>
          <td>{{ photoPrice.unit_name }}</td>
          <td>{{ photoPrice.photo_type_name }}</td>
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
        <VCardTitle>Edit Pricing</VCardTitle>            
        <v-container fluid>        
          <v-row>
            <v-col cols="2">
              <v-list-subheader>Tipe Foto</v-list-subheader>
            </v-col>
            <v-col cols="10">
              <v-select
                v-model="formEditPhotoPricing.photo_type_id"
                :items="photoTypes"
                item-value="id"
                item-title="name"
                density="comfortable"
                class="mb-4"
                variant="outlined"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <v-list-subheader>Harga</v-list-subheader>
            </v-col>
            <v-col cols="10">
              <v-text-field
                v-model="formEditPhotoPricing.price"
                hint="Rp 0 jika konten/foto gratis"
                prefix="Rp"
                persistent-hint
              />
            </v-col>
          </v-row>
          
        </v-container>

        <VCardActions>
          <VSpacer />
          <VBtn text="Batal" @click="showEditPhotoPricing = false" />
          <VBtn color="primary" @click="handleEditPhotoPricing">Simpan</VBtn>
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