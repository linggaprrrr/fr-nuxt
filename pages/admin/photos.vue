<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { useDisplay } from 'vuetify'
import type { Photo } from '~/types/photo'
import type { Outlet } from '~/types/outlet'
import type { Event } from '~/types/event'

const { getPhotos, deletePhotoById } = usePhotos()
const { getOutlets } = useOutlets()
const { getEvents } = useEvents()
const toast = useToast()
const { confirm } = useConfirm()
const { smAndDown } = useDisplay()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)

const outlet = ref<string | null>(null)
const eventId = ref<string | null>(null)
const nameSearch = ref<string>('')

const todayStr = () => new Date().toISOString().slice(0, 10)
const dateFrom = ref<string>(todayStr())
const dateTo = ref<string>(todayStr())

const outlets = ref<Outlet[]>([])
const events = ref<Event[]>([])
const photos = ref<Photo[]>([])

const outletOptions = computed(() => [
  { title: 'Semua Outlet', value: null },
  ...outlets.value.map(o => ({ title: o.name, value: o.id })),
])
const eventOptions = computed(() => [
  { title: 'Semua Event', value: null },
  ...events.value.map(e => ({ title: `${e.name} — ${e.folder_code}`, value: e.id })),
])

const activeFilterCount = computed(() =>
  [outlet.value, eventId.value, nameSearch.value || null].filter(Boolean).length
  + (dateFrom.value !== todayStr() || dateTo.value !== todayStr() ? 1 : 0),
)

// ── Filter visibility ───────────────────────────────────────────────────────
// Collapsed by default on a phone, where the filter card costs most of the
// first screen. An explicit choice wins and survives a refresh; with no choice
// stored we follow the breakpoint. This has to stay a computed, not a one-shot
// read in onMounted: Vuetify's display starts at its SSR default and only
// settles after hydration, so reading smAndDown once gets the desktop answer
// on a phone and the filter opens anyway.
const filtersPref = ref<string | null>(null)   // '1' | '0' | null = no choice yet

const showFilters = computed(() =>
  filtersPref.value === null ? !smAndDown.value : filtersPref.value === '1',
)

function toggleFilters() {
  filtersPref.value = showFilters.value ? '0' : '1'
  localStorage.setItem('photos_filters_open', filtersPref.value)
}

// ── Auto refresh ────────────────────────────────────────────────────────────
// A photographer keeps this page open while photos are still uploading. The
// interval only fires a fetch when the tab is visible and nothing is already
// in flight — otherwise a slow request on a 10s timer stacks up requests.
const REFRESH_OPTIONS = [
  { title: 'Mati', value: 0 },
  { title: '10 detik', value: 10 },
  { title: '30 detik', value: 30 },
  { title: '60 detik', value: 60 },
]
const refreshSeconds = ref(0)
const lastRefreshed = ref<Date | null>(null)
const secondsSince = ref(0)
let refreshTimer: ReturnType<typeof setInterval> | null = null
let tickTimer: ReturnType<typeof setInterval> | null = null

function restartRefreshTimer() {
  if (refreshTimer) { clearInterval(refreshTimer); refreshTimer = null }
  localStorage.setItem('photos_refresh_seconds', String(refreshSeconds.value))
  if (!refreshSeconds.value) return
  refreshTimer = setInterval(() => {
    if (document.hidden || isLoading.value) return
    fetchPhotos({ silent: true })
  }, refreshSeconds.value * 1000)
}

const lastRefreshedLabel = computed(() => {
  if (!lastRefreshed.value) return ''
  const s = secondsSince.value
  if (s < 5) return 'baru saja'
  if (s < 60) return `${s} detik lalu`
  return `${Math.floor(s / 60)} menit lalu`
})

// ── Data ────────────────────────────────────────────────────────────────────
async function fetchPhotos({ silent = false } = {}) {
  // Silent = an auto-refresh tick: don't blank the grid out from under someone
  // who is looking at it.
  if (!silent) isLoading.value = true
  try {
    const res = await getPhotos({
      page: page.value,
      limit,
      outlet_id: outlet.value,
      event_id: eventId.value,
      name: nameSearch.value || null,
      date_from: dateFrom.value || null,
      date_to: dateTo.value || null,
    })
    if (res?.status_code === 200) {
      photos.value = res.data
      total.value = res.total
      lastRefreshed.value = new Date()
      secondsSince.value = 0
    } else if (!silent) {
      photos.value = []
    }
  } catch {
    if (!silent) photos.value = []
  } finally {
    isLoading.value = false
  }
}

async function fetchLookups() {
  try {
    const [outletRes, eventRes] = await Promise.all([
      getOutlets({ page: 1, limit: 100 }),
      getEvents({ page: 1, limit: 100 }),
    ])
    outlets.value = outletRes?.data || []
    events.value = eventRes?.data || []
  } catch { /* filters just stay empty */ }
}

// ── Preview ─────────────────────────────────────────────────────────────────
const previewIndex = ref<number | null>(null)
const previewPhoto = computed(() =>
  previewIndex.value === null ? null : photos.value[previewIndex.value] ?? null,
)

function openPreview(idx: number) { previewIndex.value = idx }
function closePreview() { previewIndex.value = null }
function step(delta: number) {
  if (previewIndex.value === null) return
  const next = previewIndex.value + delta
  if (next >= 0 && next < photos.value.length) previewIndex.value = next
}

function onKey(e: KeyboardEvent) {
  if (previewIndex.value === null) return
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}

// ── Actions ─────────────────────────────────────────────────────────────────
async function downloadPhoto(url: string, filename?: string) {
  try {
    const blob = await (await fetch(url)).blob()
    const blobUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = filename || ''
    link.click()
    URL.revokeObjectURL(blobUrl)
  } catch { toast.error('Gagal mengunduh foto') }
}

async function handleDelete(photoId: string) {
  const ok = await confirm({
    title: 'Hapus Foto',
    message: 'Hapus foto ini? Tindakan tidak bisa dibatalkan.',
    tone: 'danger',
    confirmText: 'Hapus',
  })
  if (!ok) return
  try {
    if (await deletePhotoById(photoId)) {
      const idx = photos.value.findIndex(p => p.id === photoId)
      photos.value = photos.value.filter(p => p.id !== photoId)
      total.value -= 1
      toast.success('Foto dihapus')
      // Keep the preview on a real photo instead of a hole in the list.
      if (previewIndex.value !== null) {
        if (!photos.value.length) closePreview()
        else if (idx <= previewIndex.value) previewIndex.value = Math.max(0, previewIndex.value - 1)
      }
    } else {
      toast.error('Gagal menghapus foto')
    }
  } catch { toast.error('Gagal menghapus foto') }
}

function resetFilters() {
  outlet.value = null
  eventId.value = null
  nameSearch.value = ''
  dateFrom.value = todayStr()
  dateTo.value = todayStr()
}

const formatDate = (s: string) => new Date(s).toLocaleString('id-ID', {
  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
})

const debouncedSearch = useDebounceFn(() => { page.value = 1; fetchPhotos() }, 400)

onMounted(() => {
  filtersPref.value = localStorage.getItem('photos_filters_open')
  refreshSeconds.value = Number(localStorage.getItem('photos_refresh_seconds') || 0)
  restartRefreshTimer()
  tickTimer = setInterval(() => {
    if (lastRefreshed.value) secondsSince.value = Math.floor((Date.now() - lastRefreshed.value.getTime()) / 1000)
  }, 1000)
  window.addEventListener('keydown', onKey)
  fetchLookups()
  fetchPhotos()
})

onUnmounted(() => {
  if (refreshTimer) clearInterval(refreshTimer)
  if (tickTimer) clearInterval(tickTimer)
  window.removeEventListener('keydown', onKey)
})

watch(refreshSeconds, restartRefreshTimer)
watch(page, () => fetchPhotos())
watch([outlet, eventId], () => { page.value = 1; fetchPhotos() })
watch(nameSearch, debouncedSearch)
watch([dateFrom, dateTo], () => { page.value = 1; fetchPhotos() })
</script>

<template>
  <div>
    <!-- One compact bar: what you are looking at, and the two controls. On a
         phone the subtitle and button labels are dead weight, so they go. -->
    <PageHeader title="Foto" :subtitle="smAndDown ? undefined : 'Kelola foto yang diupload.'" />

    <div class="toolbar mb-4">
      <VChip color="primary" variant="tonal" size="small" label>{{ total }} foto</VChip>

      <VChip
        v-if="eventId" color="success" variant="tonal" size="small" label closable
        @click:close="eventId = null"
      >
        {{ events.find(e => e.id === eventId)?.name }}
      </VChip>
      <VChip
        v-if="outlet" variant="tonal" size="small" label closable
        @click:close="outlet = null"
      >
        {{ outlets.find(o => o.id === outlet)?.name }}
      </VChip>

      <VSpacer />

      <span
        v-if="refreshSeconds && lastRefreshedLabel && !smAndDown"
        class="text-caption text-medium-emphasis"
      >
        {{ lastRefreshedLabel }}
      </span>

      <!-- Auto refresh: a menu, not a select. Always states on/off in words —
           an icon alone left you guessing which state you were in. -->
      <VBtn
        variant="outlined"
        size="small"
        class="refresh-btn"
        :aria-label="`Auto refresh: ${refreshSeconds ? refreshSeconds + ' detik' : 'mati'}`"
      >
        <span v-if="refreshSeconds" class="refresh-dot" />
        <VIcon v-else icon="bx-refresh" size="16" class="me-1" />
        <span class="text-caption font-weight-bold">
          {{ refreshSeconds ? `${refreshSeconds}s` : 'Auto: Mati' }}
        </span>
        <VMenu activator="parent" location="bottom end">
          <VList density="compact" min-width="160">
            <VListSubheader>Auto refresh</VListSubheader>
            <VListItem
              v-for="opt in REFRESH_OPTIONS"
              :key="opt.value"
              :active="refreshSeconds === opt.value"
              @click="refreshSeconds = opt.value"
            >
              <template #prepend>
                <VIcon
                  :icon="refreshSeconds === opt.value ? 'bx-check' : 'bx-blank'"
                  size="16"
                  :color="refreshSeconds === opt.value ? 'success' : undefined"
                />
              </template>
              <VListItemTitle>{{ opt.title }}</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </VBtn>

      <VBtn
        :variant="showFilters ? 'tonal' : 'outlined'"
        color="default"
        size="small"
        aria-label="Filter"
        @click="toggleFilters"
      >
        <VIcon icon="bx-filter-alt" size="18" />
        <span class="d-none d-sm-inline ms-1">Filter</span>
        <VBadge v-if="activeFilterCount" :content="activeFilterCount" color="primary" inline />
      </VBtn>
    </div>

    <!-- Filters -->
    <VExpandTransition>
      <VCard v-show="showFilters" rounded="lg" class="mb-4" flat border>
        <VCardText class="py-3">
          <VRow dense>
            <VCol cols="12" sm="6" md="3">
              <VSelect
                v-model="outlet"
                :items="outletOptions"
                item-title="title"
                item-value="value"
                label="Outlet"
                clearable
                hide-details
              />
            </VCol>
            <VCol cols="12" sm="6" md="3">
              <VSelect
                v-model="eventId"
                :items="eventOptions"
                item-title="title"
                item-value="value"
                label="Event"
                clearable
                hide-details
              />
            </VCol>
            <VCol cols="12" sm="6" md="2">
              <VTextField
                v-model="nameSearch"
                placeholder="Cari nama file..."
                prepend-inner-icon="bx-search"
                clearable
                hide-details
              />
            </VCol>
            <VCol cols="6" sm="3" md="2">
              <VTextField v-model="dateFrom" label="Dari" type="date" hide-details />
            </VCol>
            <VCol cols="6" sm="3" md="2">
              <VTextField v-model="dateTo" label="Sampai" type="date" hide-details />
            </VCol>
          </VRow>
          <div v-if="activeFilterCount" class="d-flex justify-end mt-3">
            <VBtn variant="text" size="small" color="default" @click="resetFilters">
              Reset filter
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VExpandTransition>

    <!-- Loading (first load only — auto-refresh never blanks the grid) -->
    <div v-if="isLoading && !photos.length" class="text-center py-12">
      <VProgressCircular indeterminate color="primary" size="48" />
    </div>

    <div v-else-if="!photos.length" class="text-center py-12 text-medium-emphasis">
      <VIcon size="56" class="mb-3" color="grey-lighten-1">bx-image</VIcon>
      <p class="text-subtitle-1 mb-1">Tidak ada foto ditemukan</p>
      <p class="text-caption mb-0">Coba ubah filter atau rentang tanggal</p>
    </div>

    <!-- Grid: small square tiles, 2-up on a phone -->
    <div v-else class="photo-grid">
      <button
        v-for="(photo, idx) in photos"
        :key="photo.id"
        type="button"
        class="tile"
        @click="openPreview(idx)"
      >
        <img :src="photo.thumbnail_path" :alt="photo.filename" loading="lazy" />

        <VChip
          v-if="photo.event_name"
          size="x-small"
          color="success"
          variant="flat"
          class="tile__badge"
          label
        >
          Gratis
        </VChip>

        <span v-if="photo.face_count" class="tile__faces">
          <VIcon icon="bx-user" size="11" />{{ photo.face_count }}
        </span>

        <span class="tile__meta">
          <span class="tile__name">{{ photo.filename }}</span>
          <span class="tile__date">{{ formatDate(photo.uploaded_at) }}</span>
        </span>
      </button>
    </div>

    <div v-if="total > limit" class="d-flex justify-center mt-6">
      <VPagination v-model="page" :length="Math.ceil(total / limit)" :total-visible="smAndDown ? 3 : 5" />
    </div>

    <!-- Preview -->
    <VDialog
      :model-value="previewIndex !== null"
      max-width="920"
      :width="smAndDown ? '92vw' : undefined"
      scrim="black"
      @update:model-value="v => !v && closePreview()"
    >
      <VCard v-if="previewPhoto" class="preview-card">
        <VToolbar density="compact" color="surface">
          <VToolbarTitle class="text-body-1 text-truncate">{{ previewPhoto.filename }}</VToolbarTitle>
          <VBtn icon variant="text" size="small" @click="closePreview">
            <VIcon icon="bx-x" />
          </VBtn>
        </VToolbar>

        <div class="preview-stage" @click.self="closePreview">
          <VBtn
            v-if="previewIndex! > 0"
            icon variant="flat" size="small" class="preview-nav preview-nav--prev"
            @click="step(-1)"
          >
            <VIcon icon="bx-chevron-left" />
          </VBtn>

          <img :src="previewPhoto.original_path" :alt="previewPhoto.filename" @click="closePreview" />

          <VBtn
            v-if="previewIndex! < photos.length - 1"
            icon variant="flat" size="small" class="preview-nav preview-nav--next"
            @click="step(1)"
          >
            <VIcon icon="bx-chevron-right" />
          </VBtn>
        </div>

        <VCardText class="py-3">
          <div class="d-flex align-center flex-wrap" style="gap: 6px;">
            <VChip v-if="previewPhoto.event_name" size="small" color="success" variant="tonal" label>
              {{ previewPhoto.event_name }} · Gratis
            </VChip>
            <VChip v-else-if="previewPhoto.unit_price" size="small" variant="tonal" label>
              Rp {{ previewPhoto.unit_price.toLocaleString('id-ID') }}
            </VChip>
            <VChip size="small" variant="tonal" label>{{ previewPhoto.unit_name || '-' }}</VChip>
            <VChip v-if="previewPhoto.photo_type" size="small" variant="tonal" label>
              {{ previewPhoto.photo_type }}
            </VChip>
            <VChip v-if="previewPhoto.face_count" size="small" variant="tonal" label>
              {{ previewPhoto.face_count }} wajah
            </VChip>
          </div>
          <div class="text-caption text-medium-emphasis mt-2">
            {{ formatDate(previewPhoto.uploaded_at) }} · {{ previewIndex! + 1 }} dari {{ photos.length }}
          </div>
        </VCardText>

        <VCardActions class="px-4 pb-4">
          <VBtn
            variant="tonal" color="primary" prepend-icon="bx-download"
            @click="downloadPhoto(previewPhoto.original_path, previewPhoto.filename)"
          >
            Unduh
          </VBtn>
          <VSpacer />
          <VBtn variant="text" color="error" prepend-icon="bx-trash-alt" @click="handleDelete(previewPhoto.id)">
            Hapus
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped lang="scss">
.toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

// On/off has to be readable without squinting, so it is carried by the label
// ("Auto: Mati" vs "30s") and this dot — not by the button's background. A
// project-level .v-btn override wins the cascade over Vuetify's bg-* utility,
// so a background-coloured pill silently renders transparent; the dot is a
// plain element we own outright and always paints.
.refresh-btn { min-inline-size: 0; }

.refresh-dot {
  inline-size: 7px;
  block-size: 7px;
  border-radius: 50%;
  background: rgb(var(--v-theme-success));
  margin-inline-end: 6px;
  animation: refresh-pulse 1.6s ease-in-out infinite;
}

@keyframes refresh-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}

@media (prefers-reduced-motion: reduce) {
  .refresh-dot { animation: none; }
}

// Square tiles that fill the row at any width — 2-up on a phone, more as space
// allows. No breakpoint list to keep in sync.
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

@media (max-width: 599px) {
  .photo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
}

.tile {
  position: relative;
  display: block;
  padding: 0;
  border: 0;
  inline-size: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(var(--v-border-color), 0.08);
  cursor: pointer;

  img {
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.25s ease;
  }

  &:hover img,
  &:focus-visible img { transform: scale(1.04); }

  &:focus-visible {
    outline: 2px solid rgb(var(--v-theme-primary));
    outline-offset: 2px;
  }

  &__badge {
    position: absolute;
    inset-block-start: 6px;
    inset-inline-start: 6px;
  }

  &__faces {
    position: absolute;
    inset-block-start: 6px;
    inset-inline-end: 6px;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.55);
    color: #fff;
    font-size: 11px;
    line-height: 1.6;
  }

  // Caption sits on the image so the tile stays square and the grid stays even.
  &__meta {
    position: absolute;
    inset-inline: 0;
    inset-block-end: 0;
    display: flex;
    flex-direction: column;
    padding: 16px 8px 6px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.72));
    color: #fff;
    text-align: start;
  }

  &__name {
    font-size: 11px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__date { font-size: 10px; opacity: 0.8; }
}

.preview-stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0e1116;
  min-block-size: 220px;
  cursor: zoom-out; // tapping anywhere on the stage — or the photo — closes

  img {
    max-inline-size: 100%;
    max-block-size: 70dvh;
    object-fit: contain;
    display: block;
    cursor: zoom-out;
  }
}

.preview-nav {
  position: absolute;
  inset-block-start: 50%;
  transform: translateY(-50%);
  opacity: 0.9;

  &--prev { inset-inline-start: 8px; }
  &--next { inset-inline-end: 8px; }
}

.preview-card { display: flex; flex-direction: column; }
</style>
