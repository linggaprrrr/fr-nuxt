<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import type { Photo } from '~/types/photo'
import type { Outlet } from '~/types/outlet'

const { getPhotos, deletePhotoById } = usePhotos()
const { getOutlets } = useOutlets()
const toast = useToast()
const { confirm } = useConfirm()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const show = ref(true)
const outlet = ref<string | null>(null)
const nameSearch = ref<string>('')

const todayStr = () => new Date().toISOString().slice(0, 10)
const dateFrom = ref<string>(todayStr())
const dateTo = ref<string>(todayStr())

const outlets = ref<Outlet[]>([])
const isLoadingOutlets = ref(false)

const photos = ref<Photo[]>([])
const imageSizes = ref<Record<string, any>>({})
const imageRefs = new Map<string, HTMLImageElement>()

const outletOptions = computed(() => [
  { title: 'All Outlets', value: null },
  ...outlets.value.map(o => ({ title: o.name, value: o.id })),
])

async function fetchPhotos() {
  isLoading.value = true
  try {
    const res = await getPhotos({
      page: page.value,
      limit,
      outlet_id: outlet.value,
      name: nameSearch.value || null,
      date_from: dateFrom.value || null,
      date_to: dateTo.value || null,
    })
    if (res?.status_code === 200) {
      photos.value = JSON.parse(JSON.stringify(res.data))
      total.value = res.total
      nextTick(() => { photos.value.forEach(photo => updateImageSize(photo.id)) })
    } else {
      photos.value = []
    }
  } catch { photos.value = [] }
  finally { isLoading.value = false }
}

async function fetchOutlets() {
  isLoadingOutlets.value = true
  try {
    const res = await getOutlets({ page: 1, limit: 100 })
    outlets.value = res?.data || []
  } catch { outlets.value = [] }
  finally { isLoadingOutlets.value = false }
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
  return {
    left: box.x * scaleX + 'px',
    top: box.y * scaleY + 'px',
    width: box.w * scaleX + 'px',
    height: box.h * scaleY + 'px',
  }
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
  if (!await confirm({ title: 'Hapus Foto', message: 'Hapus foto ini? Tindakan tidak bisa dibatalkan.', tone: 'danger', confirmText: 'Hapus' })) return
  try {
    const success = await deletePhotoById(photoId)
    if (success) {
      photos.value = photos.value.filter(p => p.id !== photoId)
      total.value = total.value - 1
      toast.success('Foto dihapus')
    } else {
      toast.error('Gagal menghapus foto')
    }
  } catch { toast.error('Gagal menghapus foto') }
}

const debouncedSearch = useDebounceFn(() => { page.value = 1; fetchPhotos() }, 400)

onMounted(() => { window.addEventListener('resize', handleResize); fetchOutlets(); fetchPhotos() })
onUnmounted(() => { window.removeEventListener('resize', handleResize) })

watch(page, fetchPhotos)
watch(outlet, () => { page.value = 1; fetchPhotos() })
watch(nameSearch, debouncedSearch)
watch([dateFrom, dateTo], () => { page.value = 1; fetchPhotos() })
</script>

<template>
  <div>
    <PageHeader title="Foto" subtitle="Kelola foto yang diupload." />

    <!-- Filters -->
    <VCard rounded="lg" class="mb-4" flat border>
      <VCardText class="py-3">
        <VRow dense>
          <VCol cols="12" md="4">
            <VSelect
              v-model="outlet"
              :items="outletOptions"
              item-title="title"
              item-value="value"
              label="Filter Outlet"
              :loading="isLoadingOutlets"
              clearable
              hide-details
            />
          </VCol>
          <VCol cols="12" md="3">
            <VTextField
              v-model="nameSearch"
              placeholder="Cari nama file..."
              prepend-inner-icon="bx-search"
              clearable
              hide-details
            />
          </VCol>
          <VCol cols="12" md="2">
            <VTextField v-model="dateFrom" label="Dari Tanggal" type="date" hide-details />
          </VCol>
          <VCol cols="12" md="2">
            <VTextField v-model="dateTo" label="Sampai Tanggal" type="date" hide-details />
          </VCol>
          <VCol cols="12" md="1" class="d-flex align-center">
            <VChip color="primary" variant="tonal" size="small">{{ total }} foto</VChip>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- Grid -->
    <VRow v-if="isLoading">
      <VCol cols="12" class="text-center py-12">
        <VProgressCircular indeterminate color="primary" size="48" />
      </VCol>
    </VRow>

    <VRow v-else-if="photos.length === 0">
      <VCol cols="12" class="text-center py-12 text-medium-emphasis">
        <VIcon size="56" class="mb-3" color="grey-lighten-1">bx-image</VIcon>
        <p class="text-subtitle-1">Tidak ada foto ditemukan</p>
        <p class="text-caption">Coba ubah filter atau tanggal</p>
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
                  Rp {{ photo.unit_price?.toLocaleString() || 'N/A' }}
                </div>
                <div class="d-flex align-center gap-2 text-caption text-medium-emphasis mb-1">
                  <VIcon size="12" icon="bx-map" />{{ photo.unit_name || 'N/A' }}
                </div>
                <div class="d-flex align-center gap-2 text-caption text-medium-emphasis">
                  <VIcon size="12" icon="bx-category" />{{ photo.photo_type || 'N/A' }}
                </div>
              </VCardText>
            </div>
          </VExpandTransition>
        </VCard>
      </VCol>
    </VRow>

    <!-- Pagination -->
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
