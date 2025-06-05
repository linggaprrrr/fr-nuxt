<script setup lang="ts">
import { ref } from 'vue'
import type { Unit } from '@/types/unit'
import type { PhotoPrice } from '@/types/photo'
import type { Outlet, OutletList, GetOutletsByUnitResponse } from '@/types/outlet'

const { uploadImages } = useFaces()
const { getUnits } = useUnits()
const { getPhotoPrices, getPhotoPricesByUnit, getPhotoPricesByOutlet } = usePricings() 
const { getOutlets, getOutletsByUnit } = useOutlets()
 
const files = ref<File[]>([])  
const loading = ref(false) 
const progress = ref(0)  
const showAlert = ref(false)  
const uploadStatus = ref<{ type: string, message: string } | null>(null)  

const photoParams = reactive({
  unit_id: '',
  outlet_id: '',
  photo_type_id: null 
})

// load units
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
  } 
}



const handleUpload = async () => {
  if (!photoParams.unit_id || !photoParams.photo_type_id) {
    uploadStatus.value = {
      type: 'error',
      message: 'Pilih Unit dan Tipe Foto terlebih dahulu.',
    }
    showAlert.value = true

    setTimeout(() => {
      showAlert.value = false
    }, 5000)
    files.value = []
    return
  }

  if (files.value.length === 0 || loading.value) return
  loading.value = true

  try {
    const response = await uploadImages(
      photoParams.unit_id,
      photoParams.outlet_id,
      photoParams.photo_type_id,
      files.value,
      (uploadedPercentage: number) => {
        progress.value = uploadedPercentage
      }
    )

    uploadStatus.value = {
      type: 'success',
      message: 'Files uploaded successfully!',
    }
    showAlert.value = true
    files.value = []

    setTimeout(() => {
      showAlert.value = false
    }, 5000)
  } catch (error) {
    console.error('Upload failed:', error)
    uploadStatus.value = {
      type: 'error',
      message: 'Upload failed. Please try again.',
    }
    showAlert.value = true

    setTimeout(() => {
      showAlert.value = false
    }, 5000)
  } finally {
    loading.value = false
  }
}


const selectedUnit = computed(() => {
  return units.value.find(u => u.id === photoParams.unit_id) || null
})

const photoPricesByOutlet = ref([])

async function fetchPhotoPricesByOutlet(id: string) {
  try {
    const res = await getPhotoPricesByOutlet(id)
    
    
    photoPricesByOutlet.value = res?.photo_prices || []    
    
    if (photoPricesByOutlet.value.length > 0 && !photoParams.photo_type_id) {
      photoParams.photo_type_id = photoPricesByOutlet.value[0].photo_type_id
    }
  } catch (error) {
    console.error('Failed to fetch photo prices by unit:', error)
    photoPricesByOutlet.value = []
  }
}


// watch(() => photoParams.unit_id, async (newUnitId) => {
//   if (newUnitId) {
//     await fetchOutletByUnit(newUnitId)
//     // await fetchPhotoPricesByUnit(newUnitId)
//   }
// })
const outletList = ref<OutletList[]>([])

watch(
  () => photoParams.unit_id,
  async (newUnitId) => {
    if (newUnitId) {
      const outletRes = await getOutletsByUnit(newUnitId) as GetOutletsByUnitResponse
      if (outletRes?.status_code === 200 && Array.isArray(outletRes.outlets)) {
        outletList.value = outletRes.outlets
        photoParams.outlet_id = outletRes.outlets[0]?.id || ''        
        await fetchPhotoPricesByOutlet(photoParams.outlet_id)
      } else {
        outletList.value = []
        photoParams.outlet_id = ''
      }
    }
  },
  { immediate: true }
)


watch(
  () => photoParams.outlet_id,
  async (outletId) => {
    if (outletId) {
      try {
        const res = await getPhotoPricesByOutlet(outletId)
        if (res?.status_code === 200) {
          photoPricesByOutlet.value = res.photo_prices || []
          // Set default photo_type_id jika kosong
          if (photoPricesByOutlet.value.length > 0) {
            photoParams.photo_type_id = photoPricesByOutlet.value[0].photo_type_id
          } else {
            photoParams.photo_type_id = null
          }
        } else {
          photoPricesByOutlet.value = []
          photoParams.photo_type_id = null
        }
      } catch (error) {
        console.error('Failed to fetch prices by outlet:', error)
        photoPricesByOutlet.value = []
        photoParams.photo_type_id = null
      }
    }
  }
)


onMounted(() => {
  fetchUnits()  
  
})

definePageMeta({
  layout: 'outlet'
})
</script>

<template>
  <v-container fluid>
    <!-- Alert Section -->
    <v-alert
      v-if="uploadStatus"
      :type="uploadStatus.type"
      dismissible
      transition="fade-transition"
      class="mb-4"
      color="#2A3B4D"
      density="compact"      
      prominent
      v-model="showAlert"
    >
      <v-icon class="me-2">mdi-information</v-icon>
      {{ uploadStatus.message }}
    </v-alert>

    <!-- Main Card -->
    <v-card elevation="8" class="rounded-xl">
      <v-card-title class="text-h6 font-weight-bold mt-2">
        Upload Foto 
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                v-model="photoParams.unit_id"
                density="comfortable"
                label="1. Pilih unit"                
                :items="units"
                item-value="id"
                item-title="name"
                :hint="selectedUnit?.location"
                persistent-hint
                class="mb-4"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="4">
               <v-select
                v-model="photoParams.outlet_id"  
                label="2. Pilih outlet"                            
                :items="outletList"                  
                item-value="id"                
                item-title="name"
                class="mb-4"
              />
            </v-col>
            <v-col cols="12" md="4">
               <v-select
                v-model="photoParams.photo_type_id"  
                label="3. Pilih harga foto"                            
                :items="photoPricesByOutlet"                  
                item-value="photo_type_id"                
                :item-title="item => `${item.photo_type_name ?? 'Select first'} - ${item.price?.toLocaleString() ?? '0'} IDR`"
                class="mb-4"
              />

            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-file-upload    
                v-model="files"                 
                accept="image/*"
                clearable
                prepend-icon="bx bx-upload"
                multiple  
                :disabled="loading" 
                @change="handleUpload"
                class="mb-4"
                />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Progress Bar -->
    <v-progress-linear
      v-if="loading"
      :value="progress"
      color="blue"
      height="16"
      striped
      indeterminate
      class="mt-6 rounded-pill"
    >
      <strong class="ms-4 text-white">Uploading...</strong>
    </v-progress-linear>
  </v-container>
</template>


