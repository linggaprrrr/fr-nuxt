<script setup lang="ts">
import type { Photo } from '~/types/photo'

const { getPhotos, deletePhotoById } = usePhotos()
const toast = useToast()
const { confirm } = useConfirm()

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
        const matched = boxesFromStorage.find((item: any) => item.id === photo.id)
        if (matched) photo.bounding_boxes = matched.boundingBoxes
      })

      nextTick(() => { photos.value.forEach(photo => updateImageSize(photo.id)) })
    } else {
      photos.value = []
    }
  } catch { photos.value = [] }
  finally { isLoading.value = false }
}

function onImageLoad(e: Event, photoId: string) {
  const img = e.target as HTMLImageElement
  if (img) { imageRefs.set(photoId, img); updateImageSize(photoId) }
}

function updateImageSize(photoId: string) {
  const img = imageRefs.get(photoId)
  if (img) {
    imageSizes.value[photoId] = {
      displayWidth: img.clientWidth,
      displayHeight: img.clientHeight,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }
  }
}

function handleResize() {
  nextTick(() => { photos.value.forEach(photo => updateImageSize(photo.id)) })
}

function getBoxStyle(box: any, size: any) {
  const scaleX = size.displayWidth / size.naturalWidth
  const scaleY = size.displayHeight / size.naturalHeight
  return { left: box.x * scaleX + 'px', top: box.y * scaleY + 'px', width: box.w * scaleX + 'px', height: box.h * scaleY + 'px' }
}

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString()

async function downloadPhoto(url: string) {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = ''
    link.click()
    window.URL.revokeObjectURL(blobUrl)
  } catch { toast.error('Gagal mengunduh foto') }
}

async function handleDelete(photoId: string) {
  if (!await confirm({ title: 'Hapus Foto', message: 'Hapus foto ini?', tone: 'danger', confirmText: 'Hapus' })) return
  const success = await deletePhotoById(photoId)
  if (success) {
    photos.value = photos.value.filter(p => p.id !== photoId)
    toast.success('Foto dihapus')
  } else {
    toast.error('Gagal menghapus foto')
  }
}

onMounted(() => {
  localStorage.removeItem('boundingBoxes')
  window.addEventListener('resize', handleResize)
  fetchPhotos()
})

onUnmounted(() => { window.removeEventListener('resize', handleResize) })

watch(page, fetchPhotos)

definePageMeta({ layout: 'outlet' })
</script>

<template>
  <div>
    <PageHeader title="Foto" subtitle="Kelola foto outlet." />

    <VRow v-if="isLoading">
      <VCol cols="12" class="text-center py-12">
        <VProgressCircular indeterminate color="primary" size="48" />
      </VCol>
    </VRow>

    <VRow v-else-if="photos.length === 0">
      <VCol cols="12" class="text-center py-12 text-medium-emphasis">
        <VIcon size="56" class="mb-3" color="grey-lighten-1">bx-image</VIcon>
        <p class="text-subtitle-1">Belum ada foto</p>
      </VCol>
    </VRow>

    <VRow v-else>
      <VCol v-for="photo in photos" :key="photo.id" cols="12" sm="6" md="3">
        <VCard rounded="lg" border flat>
          <div class="photo-wrap">
            <img
              :src="photo.thumbnail_path"
              alt="photo"
              class="photo-img"
              @load="e => onImageLoad(e, photo.id)"
            />
            <div
              v-for="(box, index) in photo.bounding_boxes || []"
              v-if="imageSizes[photo.id]"
              :key="index"
              class="bounding-box"
              :style="getBoxStyle(box, imageSizes[photo.id])"
            />
          </div>

          <VCardText class="pa-2">
            <div class="text-body-2 font-weight-medium text-truncate">{{ photo.filename }}</div>
            <code class="text-caption text-medium-emphasis">{{ formatDate(photo.uploaded_at) }}</code>
          </VCardText>

          <VCardActions class="pa-2 pt-0">
            <VBtn icon variant="text" size="small" color="primary" @click="downloadPhoto(photo.original_path)">
              <VIcon icon="bx-download" />
            </VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="handleDelete(photo.id)">
              <VIcon icon="bx-trash-alt" />
            </VBtn>
            <VSpacer />
            <VBtn icon variant="text" size="small" @click="show = !show">
              <VIcon :icon="show ? 'bx-chevron-up' : 'bx-chevron-down'" />
            </VBtn>
          </VCardActions>

          <VExpandTransition>
            <div v-show="show">
              <VDivider />
              <VCardText class="pa-2">
                <div class="d-flex align-center gap-2 text-body-2 mb-1">
                  <VIcon size="14" icon="bx-money" />
                  Rp {{ photo.unit_price?.toLocaleString() }}
                </div>
                <div class="d-flex align-center gap-2 text-caption text-medium-emphasis">
                  <VIcon size="12" icon="bx-map" />{{ photo.unit_name }}
                </div>
              </VCardText>
            </div>
          </VExpandTransition>
        </VCard>
      </VCol>
    </VRow>

    <div v-if="total > limit" class="d-flex justify-center mt-6">
      <VPagination v-model="page" :length="Math.ceil(total / limit)" :total-visible="5" />
    </div>
  </div>
</template>

<style scoped>
.photo-wrap { position: relative; }
.photo-img { width: 100%; height: auto; display: block; }
.bounding-box { position: absolute; border: 2px solid red; pointer-events: none; }
</style>
