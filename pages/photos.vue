<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import type { UserPhoto } from '@/types/userPhoto'
import { usePhotos } from '@/composables/usePhotos'
import { useFaces } from '@/composables/useFaces'

const { fetchFaceSearch } = useFaces()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const showDetail = ref<Record<string, boolean>>({})
const show = ref(true)

const userPhoto = ref<UserPhoto[]>([])
const imageSizes = ref<Record<string, any>>({})
const imageRefs = new Map<string, HTMLImageElement>()

// Ambil data dan bounding box
async function fetchPhotos() {
  isLoading.value = true
  try {
    const res = await fetchFaceSearch({ page: page.value, limit })

    if (res?.status_code === 200) {
      userPhoto.value = JSON.parse(JSON.stringify(res.results))
      total.value = res.total_items
      console.log( userPhoto.value)
      const stored = localStorage.getItem('boundingBoxes')
      const boxesFromStorage = stored ? JSON.parse(stored) : []

      // Gabungkan bounding box dari localStorage
      userPhoto.value.forEach(photo => {
        const matched = boxesFromStorage.find(item => item.id === photo.photo_id)
        if (matched) {
          photo.bounding_boxes_db = matched.boundingBoxes
        }
      })

      await nextTick()
      userPhoto.value.forEach(photo => updateImageSize(photo.photo_id))
    } else {
      userPhoto.value = []
    }
  } catch (err) {
    console.error(err)
    userPhoto.value = []
  } finally {
    isLoading.value = false
  }
}

function onImageLoad(e: Event, photoId: string) {
  const img = e.target as HTMLImageElement
  imageRefs.set(photoId, img)
  updateImageSize(photoId)
}

function updateImageSize(photoId: string) {
  const img = imageRefs.get(photoId)
  if (img) {
    imageSizes.value[photoId] = {
      displayWidth: img.clientWidth,
      displayHeight: img.clientHeight,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    }
  }
}

function handleResize() {
  nextTick(() => {
    userPhoto.value.forEach(photo => updateImageSize(photo.photo_id))
  })
}

function getBoxStyle(box, size) {
  const scaleX = size.displayWidth / size.naturalWidth
  const scaleY = size.displayHeight / size.naturalHeight
  return {
    left: `${box.x * scaleX}px`,
    top: `${box.y * scaleY}px`,
    width: `${box.w * scaleX}px`,
    height: `${box.h * scaleY}px`
  }
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleString()
}

async function downloadPhoto(url: string) {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = blobUrl
    link.download = ''
    link.click()
    URL.revokeObjectURL(blobUrl)
  } catch (err) {
    console.error('Download failed:', err)
  }
}

function toggleDetail(id: string) {
  showDetail.value[id] = !showDetail.value[id]
}

function nextPage() {
  if (page.value < Math.ceil(total.value / limit)) {
    page.value++
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value--
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  fetchPhotos()
})

watch(page, fetchPhotos)

definePageMeta({
  layout: 'user'
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center" v-if="isLoading">
        <v-progress-circular indeterminate color="primary" />
      </v-col>

      <v-col
        v-else
        v-for="photo in userPhoto"
        :key="photo.photo_id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card elevation="6">
          <div class="relative">
            <img
              :src="photo.compressed_path"
              alt="Photo"
              class="photo-img"
              @load="e => onImageLoad(e, photo.photo_id)"
            />
            
            <div
              v-if="photo.bounding_box_db && imageSizes[photo.photo_id]"
              class="bounding-box"
              :style="getBoxStyle(photo.bounding_box_db, imageSizes[photo.photo_id])"
            />
          </div>

          <v-card-title>{{ photo.original_filename }}</v-card-title>
          <v-card-subtitle class="d-flex justify-space-between align-center">
            <small>{{ formatDate(photo.uploaded_at) }}</small>
            <div class="d-flex align-center font-weight-bold text-primary">
              <i class="bx bxs-wallet-alt mr-2"></i>
              <small>Rp. {{ photo.photo_price }}</small>
            </div>
          </v-card-subtitle>


          <v-card-actions>
            <v-btn prepend-icon="bx bxs-download" color="#4f545c" variant="flat" size="x-small" @click="() => downloadPhoto(photo.original_path)">              
          
              <span class="subheading me-2">Beli Sekarang</span>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="() => toggleDetail(photo.photo_id)">
              <i :class="showDetail[photo.photo_id] ? 'bx bx-chevron-up' : 'bx bx-chevron-down'"></i>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="showDetail[photo.photo_id]">
              <v-divider></v-divider>
              <v-card-text>
        
                <div class="d-flex align-center text-medium-emphasis">
                  <i class="bx bxs-map mr-2"></i> {{ photo.unit_name }}
                </div>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-6">
      <v-btn :disabled="page === 1" @click="prevPage">Prev</v-btn>

      <v-pagination
        v-model="page"
        :length="Math.ceil(total / limit)"
        :total-visible="5"
      />

      <v-btn :disabled="page >= Math.ceil(total / limit)" @click="nextPage">Next</v-btn>
    </v-row>
  </v-container>
</template>

<style scoped>
.relative {
  position: relative;
}
.photo-img {
  width: 100%;
  height: auto;
  display: block;
}
.bounding-box {
  position: absolute;
  border: 2px solid red;
  pointer-events: none;
  box-sizing: border-box;
}
</style>
