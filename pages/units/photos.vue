<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'

import type { Photo } from '~/types/photo'
const { getPhotos, deletePhotoById } = usePhotos()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const show = ref(true)

const photos = ref<Photo[]>([])
const imageSizes = ref<Record<string, any>>({})
const imageRefs = new Map<string, HTMLImageElement>()

async function fetchPhotos() {
  isLoading.value = true
  try {
    const res = await getPhotos({ page: page.value, limit })
    if (res?.status_code === 200) {
      photos.value = JSON.parse(JSON.stringify(res.data))
      total.value = res.total

      const stored = localStorage.getItem('boundingBoxes')
      const boxesFromStorage = stored ? JSON.parse(stored) : []

      photos.value.forEach(photo => {
        const matched = boxesFromStorage.find(item => item.id === photo.id)
        if (matched) {
          photo.bounding_boxes = matched.boundingBoxes
        }
      })
      
      nextTick(() => {
        photos.value.forEach(photo => updateImageSize(photo.id))
      })
    } else {
      photos.value = []
    }
  } catch (e) {
    console.error(e)
    photos.value = []
  } finally {
    isLoading.value = false
  }
}

function onImageLoad(e: Event, photoId: string) {
  const img = e.target as HTMLImageElement
  if (img) {
    imageRefs.set(photoId, img)
    updateImageSize(photoId)
  }
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
    photos.value.forEach(photo => updateImageSize(photo.id))
  })
}

function getBoxStyle(box, size) {
  const scaleX = size.displayWidth / size.naturalWidth
  const scaleY = size.displayHeight / size.naturalHeight
  return {
    left: box.x * scaleX + 'px',
    top: box.y * scaleY + 'px',
    width: box.w * scaleX + 'px',
    height: box.h * scaleY + 'px'
  }
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
  localStorage.removeItem('boundingBoxes')
  window.addEventListener('resize', handleResize)
  fetchPhotos()
})

watch(page, fetchPhotos)

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleString()
}

async function downloadPhoto(url: string) {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = blobUrl
    link.download = '' // Let the browser decide the filename
    link.click()
    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    console.error('Download failed:', error)
  }
}

async function handleDelete(photoId: string) {
  if (confirm('Are you sure you want to delete this photo?')) {
    const success = await deletePhotoById(photoId)
    if (success) {
      photos.value = photos.value.filter(p => p.id !== photoId)
    } else {
      alert('Failed to delete the photo.')
    }
  }
}

definePageMeta({
  layout: 'unit'
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center my-4" v-if="isLoading">
        <v-progress-circular indeterminate color="primary" />
      </v-col>

      <template v-else>
        <v-col
          v-for="photo in photos"
          :key="photo.id"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card elevation="16">
            <div class="relative">
              <img
                :src="photo.thumbnail_path"
                alt="photo"
                class="w-full h-auto photo-img"
                :data-id="photo.id"
                @load="e => onImageLoad(e, photo.id)"
              />
              <div
                v-for="(box, index) in photo.bounding_boxes || []"
                :key="index"
                class="bounding-box"
                v-if="imageSizes[photo.id]"
                :style="getBoxStyle(box, imageSizes[photo.id])"
              ></div>
            </div>

            <v-card-title>              
              {{ photo.filename }}
            </v-card-title>
            <v-card-subtitle>
              <small><code>Uploaded at: {{ formatDate(photo.uploaded_at) }}</code></small>
            </v-card-subtitle>
          
            <div>              
              <v-card-actions>
                <v-btn
                  color="primary"                  
                  :icon="'bx bxs-download'"
                  @click="downloadPhoto(photo.original_path)">
                </v-btn>
         
                <v-btn
                  color="error"                  
                  :icon="'bx bxs-trash-alt'"
                  @click="handleDelete(photo.id)">
                </v-btn>

          
                <v-spacer></v-spacer>                
              <v-btn
                :icon="show ? 'bx bx-chevron-up' : 'bx bx-chevron-down'"
                @click="show = !show"
              ></v-btn>
              </v-card-actions>
            </div>
            <v-expand-transition>
                <div v-show="show">
                  <v-divider></v-divider>

                  <v-card-text>
                    <p class="d-flex align-center">
                      <i class='bx bxs-wallet-alt mr-2' ></i>
                      Rp {{ photo.unit_price.toLocaleString() }}
                    </p>

                    <div class="d-flex align-center text-medium-emphasis">
                      <i class="bx bxs-map mr-2"></i>
                      {{ photo.unit_name }}
                    </div>
                  </v-card-text>

                  
                </div>
              </v-expand-transition>
          </v-card>
        </v-col>
      </template>
    </v-row>

    <!-- Pagination Controls -->
    <v-row justify="center" class="mt-6">
      <v-btn :disabled="page === 1" @click="prevPage" class="mr-2">
        Prev
      </v-btn>

      <v-pagination
        v-model="page"
        :length="Math.ceil(total / limit)"
        :total-visible="5"
      ></v-pagination>

      <v-btn :disabled="page >= Math.ceil(total / limit)" @click="nextPage" class="ml-2">
        Next
      </v-btn>
    </v-row>
  </v-container>
</template>


<style scoped>
.bounding-box {
  position: absolute;
  border: 2px solid red;
  pointer-events: none;
}
.relative {
  position: relative;
}
.photo-img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
