<script setup lang="ts">
import type { Unit } from '@/types/unit'
import type { OutletList, GetOutletsByUnitResponse } from '@/types/outlet'
import type { Event } from '@/types/event'
import { getApiErrorMessage } from '@/utils/apiHelpers'

const { uploadImages } = useFaces()
const { getUnits } = useUnits()
const { getPhotoPricesByOutlet } = usePricings()
const { getOutletsByUnit } = useOutlets()
const { getEvents } = useEvents()
const toast = useToast()

// Two destinations, and they behave differently enough that a mode switch is
// clearer than one form with conditional meaning: regular photos are priced and
// sold, event photos are given away on the event's public page.
type Mode = 'regular' | 'event'
const mode = ref<Mode>('regular')

const files = ref<File[]>([])
const loading = ref(false)
const progress = ref(0)
const result = ref<{ ok: number; failed: number } | null>(null)

const photoParams = reactive({
  unit_id: '',
  outlet_id: '',
  photo_type_id: null as string | null,
})

const units = ref<Unit[]>([])
const outletList = ref<OutletList[]>([])
const photoPricesByOutlet = ref<any[]>([])
const events = ref<Event[]>([])
const selectedEventId = ref<string | null>(null)

const selectedUnit = computed(() => units.value.find(u => u.id === photoParams.unit_id) || null)
const selectedEvent = computed(() => events.value.find(e => e.id === selectedEventId.value) || null)

function eventState(e: Event) {
  if (!e.is_active) return 'inactive'
  const now = new Date()
  if (new Date(e.start_date) > now) return 'upcoming'
  if (new Date(e.end_date) < now) return 'expired'
  return 'live'
}

// An expired event still accepts uploads (photos often arrive late) but nobody
// can download them, so say so rather than letting it look like it worked.
const eventWarning = computed(() => {
  if (!selectedEvent.value) return ''
  const s = eventState(selectedEvent.value)
  if (s === 'expired') return 'Event ini sudah berakhir — foto tetap tersimpan, tapi tamu belum bisa mengunduhnya sampai tanggal berakhir diperpanjang.'
  if (s === 'upcoming') return 'Event ini belum dimulai — foto baru bisa diunduh setelah tanggal mulai.'
  if (s === 'inactive') return 'Event ini nonaktif — halaman publiknya tidak dapat diakses.'
  return ''
})

const eventItems = computed(() =>
  events.value.map(e => ({
    title: `${e.name} — ${e.folder_code}`,
    value: e.id,
    props: { subtitle: `${formatDate(e.start_date)} – ${formatDate(e.end_date)} · ${eventState(e)}` },
  })),
)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

const canUpload = computed(() => {
  if (loading.value || files.value.length === 0) return false
  // An event owns its photos outright — no outlet, no type, no price — so the
  // event is the only thing to choose.
  if (mode.value === 'event') return !!selectedEventId.value
  return !!(photoParams.unit_id && photoParams.outlet_id && photoParams.photo_type_id)
})

// ── Lookups ─────────────────────────────────────────────────────────────────
async function fetchUnits() {
  try {
    const res = await getUnits({ page: 1, limit: 9999 })
    units.value = res?.data || []
  } catch { units.value = [] }
}

async function fetchEvents() {
  try {
    const res = await getEvents({ page: 1, limit: 100, is_active: true })
    events.value = res?.data || []
  } catch { events.value = [] }
}

async function fetchOutletsByUnit(unitId: string) {
  const outletRes = await getOutletsByUnit(unitId) as GetOutletsByUnitResponse
  if (outletRes?.status_code === 200 && Array.isArray(outletRes.outlets)) {
    outletList.value = outletRes.outlets
    photoParams.outlet_id = outletRes.outlets[0]?.id || ''
    if (photoParams.outlet_id) await fetchPricesByOutlet(photoParams.outlet_id)
  } else {
    outletList.value = []
    photoParams.outlet_id = ''
  }
}

async function fetchPricesByOutlet(outletId: string) {
  try {
    const res = await getPhotoPricesByOutlet(outletId)
    if (res?.status_code === 200) {
      photoPricesByOutlet.value = res.photo_prices || []
      photoParams.photo_type_id = photoPricesByOutlet.value[0]?.photo_type_id ?? null
    } else {
      photoPricesByOutlet.value = []
      photoParams.photo_type_id = null
    }
  } catch {
    photoPricesByOutlet.value = []
    photoParams.photo_type_id = null
  }
}

// ── Files ───────────────────────────────────────────────────────────────────
// Object URLs are revoked on replace/clear; leaking them holds the whole
// selection in memory, which matters when someone drops 200 photos.
const previews = ref<{ file: File; url: string }[]>([])

function setFiles(next: File[]) {
  previews.value.forEach(p => URL.revokeObjectURL(p.url))
  files.value = next
  previews.value = next.map(file => ({ file, url: URL.createObjectURL(file) }))
  result.value = null
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const dropped = [...(e.dataTransfer?.files || [])].filter(f => f.type.startsWith('image/'))
  if (dropped.length) setFiles([...files.value, ...dropped])
}

// globalThis.Event because the `Event` import above shadows the DOM type here.
function onPick(e: globalThis.Event) {
  const input = e.target as HTMLInputElement
  const picked = [...(input.files || [])]
  if (picked.length) setFiles([...files.value, ...picked])
  input.value = ''
}

function removeAt(idx: number) {
  const next = [...files.value]
  next.splice(idx, 1)
  setFiles(next)
}

const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const totalSize = computed(() => files.value.reduce((n, f) => n + f.size, 0))

function humanSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

onBeforeUnmount(() => previews.value.forEach(p => URL.revokeObjectURL(p.url)))

// ── Upload ──────────────────────────────────────────────────────────────────
async function handleUpload() {
  if (!canUpload.value) return
  loading.value = true
  progress.value = 0
  result.value = null
  const count = files.value.length
  try {
    const isEvent = mode.value === 'event'
    const res = await uploadImages(
      isEvent ? '' : photoParams.unit_id,
      isEvent ? '' : photoParams.outlet_id,
      isEvent ? '' : photoParams.photo_type_id!,
      files.value,
      (pct: number) => { progress.value = pct },
      isEvent ? selectedEventId.value : null,
    )
    // The API reports per-file outcomes; a partial failure used to surface as
    // a blanket success toast.
    const rows: any[] = res?.data ?? []
    const failed = rows.filter(r => r.error).length
    result.value = { ok: (rows.length || count) - failed, failed }
    if (failed) toast.warning(`${count - failed} foto terupload, ${failed} gagal`)
    else toast.success(`${count} foto berhasil diupload`)
    setFiles([])
  } catch (error: any) {
    toast.error(getApiErrorMessage(error) || 'Upload gagal. Silakan coba lagi.')
  } finally {
    loading.value = false
  }
}

// Switching mode changes what the destination means — clear the queue so
// nothing is uploaded to a target the admin didn't intend.
watch(mode, () => {
  setFiles([])
  selectedEventId.value = null
})

watch(() => photoParams.unit_id, async (newUnitId) => {
  if (newUnitId) await fetchOutletsByUnit(newUnitId)
  else { outletList.value = []; photoParams.outlet_id = ''; photoPricesByOutlet.value = [] }
}, { immediate: true })

watch(() => photoParams.outlet_id, async (outletId) => {
  if (outletId) await fetchPricesByOutlet(outletId)
})

onMounted(() => {
  fetchUnits()
  fetchEvents()
})
</script>

<template>
  <div>
    <PageHeader
      title="Upload Foto"
      subtitle="Upload foto ke sistem — sebagai foto reguler yang dijual, atau foto event yang digratiskan."
    />

    <VRow>
      <VCol cols="12" md="7">
        <VCard rounded="lg" class="mb-6">
          <VCardText>
            <VBtnToggle
              v-model="mode"
              mandatory
              color="primary"
              variant="outlined"
              divided
              class="mode-toggle mb-6"
            >
              <VBtn value="regular" prepend-icon="bx-purchase-tag">Foto Reguler</VBtn>
              <VBtn value="event" prepend-icon="bx-calendar-event">Foto Event</VBtn>
            </VBtnToggle>

            <!-- Event mode: the event fixes unit + outlet, so those become
                 read-only context rather than three more things to get right. -->
            <template v-if="mode === 'event'">
              <FormField label="Event" helper="Semua foto di event ini gratis — tanpa harga, tanpa checkout.">
                <template #default="{ id, describedBy }">
                  <VSelect
                    :id="id"
                    v-model="selectedEventId"
                    :items="eventItems"
                    placeholder="Pilih event"
                    :aria-describedby="describedBy"
                    :no-data-text="'Belum ada event aktif — buat dulu di menu Events.'"
                  />
                </template>
              </FormField>

              <VAlert v-if="eventWarning" type="warning" variant="tonal" density="compact" class="mb-4">
                {{ eventWarning }}
              </VAlert>

              <VAlert v-else-if="selectedEvent" type="info" variant="tonal" density="compact" class="mb-4">
                Folder <strong>{{ selectedEvent.folder_code }}</strong> ·
                {{ formatDate(selectedEvent.start_date) }} – {{ formatDate(selectedEvent.end_date) }} ·
                {{ selectedEvent.photo_count }} foto
              </VAlert>
            </template>

            <VRow v-if="mode === 'regular'" dense>
              <VCol cols="12" md="4">
                <FormField label="Unit">
                  <template #default="{ id, describedBy }">
                    <VSelect
                      :id="id"
                      v-model="photoParams.unit_id"
                      :items="units"
                      item-value="id"
                      item-title="name"
                      :hint="selectedUnit?.location"
                      persistent-hint
                      :aria-describedby="describedBy"
                    />
                  </template>
                </FormField>
              </VCol>
              <VCol cols="12" md="4">
                <FormField label="Outlet">
                  <template #default="{ id, describedBy }">
                    <VSelect
                      :id="id"
                      v-model="photoParams.outlet_id"
                      :items="outletList"
                      item-value="id"
                      item-title="name"
                      :aria-describedby="describedBy"
                    />
                  </template>
                </FormField>
              </VCol>
              <VCol cols="12" md="4">
                <FormField label="Tipe Foto">
                  <template #default="{ id, describedBy }">
                    <VSelect
                      :id="id"
                      v-model="photoParams.photo_type_id"
                      :items="photoPricesByOutlet"
                      item-value="photo_type_id"
                      :item-title="(item: any) => `${item.photo_type_name ?? '-'} — ${item.price?.toLocaleString('id-ID') ?? 0} IDR`"
                      :aria-describedby="describedBy"
                    />
                  </template>
                </FormField>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>

        <!-- Dropzone -->
        <VCard rounded="lg">
          <VCardText>
            <div
              class="dropzone"
              :class="{ 'dropzone--active': isDragging, 'dropzone--disabled': loading }"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="onDrop"
              @click="!loading && fileInput?.click()"
            >
              <VIcon icon="bx-cloud-upload" size="40" class="mb-3" />
              <p class="text-body-1 font-weight-medium mb-1">Tarik foto ke sini</p>
              <p class="text-body-2 text-medium-emphasis mb-0">atau klik untuk memilih dari perangkat</p>
              <input ref="fileInput" type="file" accept="image/*" multiple hidden @change="onPick" />
            </div>

            <template v-if="previews.length">
              <div class="d-flex align-center justify-space-between mt-5 mb-3">
                <span class="text-body-2 font-weight-medium">
                  {{ previews.length }} foto dipilih · {{ humanSize(totalSize) }}
                </span>
                <VBtn variant="text" size="small" color="default" :disabled="loading" @click="setFiles([])">
                  Kosongkan
                </VBtn>
              </div>

              <div class="preview-grid">
                <div v-for="(p, i) in previews" :key="p.url" class="preview">
                  <img :src="p.url" :alt="p.file.name" />
                  <VBtn
                    icon size="x-small" variant="flat" color="surface"
                    class="preview__remove" :disabled="loading" @click.stop="removeAt(i)"
                  >
                    <VIcon icon="bx-x" size="14" />
                  </VBtn>
                </div>
              </div>
            </template>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Summary rail -->
      <VCol cols="12" md="5">
        <VCard rounded="lg">
          <VCardText>
            <h3 class="text-h6 mb-4">Ringkasan</h3>

            <div class="summary-row">
              <span>Tujuan</span>
              <VChip size="small" :color="mode === 'event' ? 'success' : 'primary'" label>
                {{ mode === 'event' ? 'Event (gratis)' : 'Reguler (dijual)' }}
              </VChip>
            </div>
            <div v-if="mode === 'event'" class="summary-row">
              <span>Event</span>
              <strong>{{ selectedEvent?.name || '-' }}</strong>
            </div>
            <div v-if="mode === 'regular'" class="summary-row">
              <span>Outlet</span>
              <strong>{{ outletList.find(o => o.id === photoParams.outlet_id)?.name || '-' }}</strong>
            </div>
            <div v-else class="summary-row">
              <span>Folder</span>
              <strong>{{ selectedEvent?.folder_code || '-' }}</strong>
            </div>
            <div class="summary-row">
              <span>Foto</span>
              <strong>{{ previews.length }}</strong>
            </div>

            <VProgressLinear
              v-if="loading"
              :model-value="progress"
              color="primary"
              height="8"
              rounded
              class="my-4"
            />

            <VBtn
              block color="primary" size="large" class="mt-4"
              :loading="loading" :disabled="!canUpload" @click="handleUpload"
            >
              Upload {{ previews.length || '' }} Foto
            </VBtn>

            <p v-if="!canUpload && !loading && previews.length" class="text-caption text-medium-emphasis mt-3 mb-0">
              {{ mode === 'event' ? 'Pilih event terlebih dahulu.' : 'Lengkapi tujuan upload di atas terlebih dahulu.' }}
            </p>

            <VAlert
              v-if="result"
              :type="result.failed ? 'warning' : 'success'"
              variant="tonal" density="compact" class="mt-4"
            >
              {{ result.ok }} foto terupload{{ result.failed ? `, ${result.failed} gagal` : '' }}.
              <template v-if="mode === 'event'">
                Tamu bisa langsung mencarinya di halaman event.
              </template>
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped lang="scss">
// The theme pins .v-btn-toggle buttons to a fixed min-width, so a label longer
// than that overflows onto its neighbour instead of the button growing. Let
// them share the row and shrink to fit.
.mode-toggle {
  display: flex;
  width: 100%;

  :deep(.v-btn) {
    flex: 1 1 0;
    min-width: 0;
  }
}

.dropzone {
  border: 2px dashed rgba(var(--v-border-color), 0.28);
  border-radius: 14px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;

  &:hover,
  &--active {
    border-color: rgb(var(--v-theme-primary));
    background-color: rgba(var(--v-theme-primary), 0.04);
  }

  &--disabled {
    opacity: 0.6;
    cursor: default;
  }
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
  gap: 8px;
}

.preview {
  position: relative;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(var(--v-border-color), 0.08);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__remove {
    position: absolute;
    top: 3px;
    inset-inline-end: 3px;
  }
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(var(--v-border-color), 0.12);
  font-size: 0.875rem;

  > span { color: rgba(var(--v-theme-on-surface), 0.6); }
  &:last-of-type { border-bottom: 0; }
}
</style>
