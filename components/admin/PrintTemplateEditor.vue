<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted, onMounted } from 'vue'
import { usePrintTemplates } from '@/composables/usePrintTemplates'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SlotItem {
  id: number
  x: number  // px from canvas left
  y: number  // px from canvas top
  w: number  // px width
  h: number  // px height
}

type ResizeHandle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w'

interface DragState {
  type: 'move' | 'resize'
  slotId: number
  handle: ResizeHandle | null
  startMouseX: number
  startMouseY: number
  startSlot: SlotItem
}

// Same {top,bottom,left,right} in inches × 300dpi baseline as the backend's
// PAPER_SIZE_INCHES — kept in sync manually (small, fixed table on both ends).
const PAPER_SIZES = [
  { value: '4R', title: '4R (4×6 in)' },
  { value: '5R', title: '5R (5×7 in)' },
  { value: '6R', title: '6R (6×8 in)' },
  { value: '2x6', title: '2×6 Strip' },
  { value: 'passport', title: 'Passport' },
  { value: 'custom', title: 'Custom' },
]

// Which of the outlet's two print products this template is. Nothing renders
// differently — a strip is just N slots on a 2x6 canvas — but the outlet's
// print settings has one slot per type, and checkout refuses a mismatch.
const PRINT_TYPES = [
  { value: 'primary', title: 'Primary — Cetak Foto (layout biasa)' },
  { value: 'secondary', title: 'Secondary — Strip Foto' },
]

// Mirrors fr/app/routers/print_template.py's PAPER_SIZE_INCHES exactly — used
// to size the canvas from paper size alone when there's no background image.
const PAPER_SIZE_INCHES: Record<string, [number, number]> = {
  '4R': [4.0, 6.0], '5R': [5.0, 7.0], '6R': [6.0, 8.0], '2x6': [2.0, 6.0], passport: [1.4, 1.8],
}
const MAX_CANVAS_W = 1100  // matches .frame-image's CSS max-width
const MAX_CANVAS_H = 860   // matches .frame-image's CSS max-height

// ─── Props / Emits ────────────────────────────────────────────────────────────

const props = defineProps<{
  modelValue: boolean
  editingTemplate?: any | null
}>()

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
  'saved': []
}>()

const { createPrintTemplate, updatePrintTemplate, publishPrintTemplate, rollbackPrintTemplate, getPrintTemplateVersions, error: apiError } = usePrintTemplates()
const toast = useToast()

// ─── Basic fields ─────────────────────────────────────────────────────────────

const label       = ref('')
const isActive    = ref(true)
const price       = ref<number | null>(null)  // per-print price (IDR) — paper size drives cost
const isGlobal    = ref(false)
const outletIds   = ref<string[]>([])
const paperSize   = ref('4R')
const printType   = ref('primary')
const orientation = ref<'portrait' | 'landscape'>('portrait')
const dpi         = ref(300)
const customW     = ref<number | null>(null)
const customH     = ref<number | null>(null)
const margins     = ref({ top: 0, right: 0, bottom: 0, left: 0 })

const outlets = ref<any[]>([])
async function fetchOutlets() {
  const { getOutlets } = useOutlets()
  const res = await getOutlets({ page: 1, limit: 9999, is_kiosk: true })
  outlets.value = res?.data || []
}
const outletItems = computed(() => outlets.value.map(o => ({ title: o.name, value: o.id })))

// ─── Background / frame / logo uploads ───────────────────────────────────────
// Background is the slot-layout reference image (like the old single-image
// frame templates); frame/logo are optional full-canvas overlay PNGs drawn on
// top at print time, same "author it pre-positioned with transparency" convention.

const bgFile = ref<File | null>(null)
const bgUrl  = ref('')
const bgNatW = ref(0)
const bgNatH = ref(0)
const frameFile = ref<File | null>(null)
const frameUrl  = ref('')
const logoFile  = ref<File | null>(null)
const logoUrl   = ref('')

const bgFileInput = ref<HTMLInputElement | null>(null)
const frameFileInput = ref<HTMLInputElement | null>(null)
const logoFileInput = ref<HTMLInputElement | null>(null)

// ─── Slot editor state (engine reused verbatim from TemplateFrameEditor) ─────

const slots       = ref<SlotItem[]>([])
const selectedId  = ref<number | null>(null)
const snapEnabled = ref(true)
const SNAP_PX     = 2
const nextSlotId  = ref(0)
const baseW       = ref(0)
const baseH       = ref(0)
let drag: DragState | null = null

// Tracks "the template currently being edited" — starts from the prop but is
// reassigned locally after a save (props are readonly, can't mutate them; see
// handleSave). isEditMode/loadVersions/publish/rollback all key off this, not props.
const localTemplate = ref<any | null>(null)

const isEditMode = computed(() => !!localTemplate.value)
const aspectRatio = computed(() => bgNatH.value > 0 ? +(bgNatW.value / bgNatH.value).toFixed(4) : 0)

// ─── Publish / version state ──────────────────────────────────────────────────

const currentVersion = ref<any | null>(null)
const draftVersion   = ref<any | null>(null)
const versions        = ref<any[]>([])
const isPublishing    = ref(false)
const showVersions    = ref(false)

async function loadVersions() {
  if (!localTemplate.value) return
  versions.value = await getPrintTemplateVersions(localTemplate.value.id)
}

async function handlePublish() {
  if (!localTemplate.value) return
  isPublishing.value = true
  const res = await publishPrintTemplate(localTemplate.value.id)
  isPublishing.value = false
  if (apiError.value) { toast.error(apiError.value); return }
  currentVersion.value = res?.current_version ?? currentVersion.value
  draftVersion.value = null
  toast.success('Template dipublikasikan — kiosk akan sinkron otomatis.')
  await loadVersions()
}

async function handleRollback(versionId: string) {
  if (!localTemplate.value) return
  const res = await rollbackPrintTemplate(localTemplate.value.id, versionId)
  if (apiError.value) { toast.error(apiError.value); return }
  currentVersion.value = res?.current_version ?? currentVersion.value
  toast.success('Rollback berhasil.')
  await loadVersions()
}

// ─── Init / Reset ─────────────────────────────────────────────────────────────

watch(() => props.modelValue, (open) => {
  if (!open) return
  localTemplate.value = props.editingTemplate ?? null
  if (localTemplate.value) loadFromTemplate(localTemplate.value)
  else resetEditor()
})

onMounted(fetchOutlets)

function resetEditor() {
  label.value = ''
  isActive.value = true
  price.value = null
  isGlobal.value = false
  outletIds.value = []
  paperSize.value = '4R'
  printType.value = 'primary'
  orientation.value = 'portrait'
  dpi.value = 300
  customW.value = null
  customH.value = null
  margins.value = { top: 0, right: 0, bottom: 0, left: 0 }
  bgFile.value = null; bgUrl.value = ''; bgNatW.value = 0; bgNatH.value = 0
  frameFile.value = null; frameUrl.value = ''
  logoFile.value = null; logoUrl.value = ''
  slots.value = []
  selectedId.value = null
  nextSlotId.value = 0
  baseW.value = 0; baseH.value = 0
  currentVersion.value = null
  draftVersion.value = null
  versions.value = []
  recomputeBaseFromPaper()
}

const pendingSlots = ref<any[]>([])

// Sizes the canvas from paper size × DPI alone when there's no background
// image — background stays optional (onBgLoad remains authoritative once one
// is uploaded, this only fills in for the "no background" case).
function resolvedPixelDims(): [number, number] | null {
  if (paperSize.value === 'custom') {
    return (customW.value && customH.value) ? [customW.value, customH.value] : null
  }
  const inches = PAPER_SIZE_INCHES[paperSize.value]
  return inches ? [Math.round(inches[0] * dpi.value), Math.round(inches[1] * dpi.value)] : null
}

function recomputeBaseFromPaper() {
  if (bgUrl.value) return  // an uploaded image is authoritative once one exists
  const dims = resolvedPixelDims()
  if (!dims) { baseW.value = 0; baseH.value = 0; return }
  const scale = Math.min(MAX_CANVAS_W / dims[0], MAX_CANVAS_H / dims[1], 1)
  const newW = Math.round(dims[0] * scale)
  const newH = Math.round(dims[1] * scale)

  if (pendingSlots.value.length > 0) {
    baseW.value = newW; baseH.value = newH
    nextTick(() => restoreSlots())
    return
  }
  // Rescale slots already placed on the blank canvas instead of dropping
  // them, so tweaking DPI/paper size after laying out slots isn't destructive.
  if (baseW.value && slots.value.length > 0 && (newW !== baseW.value || newH !== baseH.value)) {
    const rx = newW / baseW.value, ry = newH / baseH.value
    slots.value = slots.value.map(s => ({ ...s, x: s.x * rx, y: s.y * ry, w: s.w * rx, h: s.h * ry }))
  }
  baseW.value = newW; baseH.value = newH
}
watch([paperSize, dpi, customW, customH], recomputeBaseFromPaper)

function loadFromTemplate(t: any) {
  label.value = t.label ?? ''
  isActive.value = t.is_active ?? true
  price.value = t.price ?? null
  isGlobal.value = t.is_global ?? false
  outletIds.value = t.outlet_ids ?? []
  paperSize.value = t.paper_size ?? '4R'
  printType.value = t.print_type ?? 'primary'

  const v = t.draft_version ?? t.current_version
  currentVersion.value = t.current_version ?? null
  draftVersion.value = t.draft_version ?? null

  orientation.value = v?.orientation ?? 'portrait'
  dpi.value = v?.dpi ?? 300
  customW.value = paperSize.value === 'custom' ? (v?.width_px ?? null) : null
  customH.value = paperSize.value === 'custom' ? (v?.height_px ?? null) : null
  margins.value = v?.margins ?? { top: 0, right: 0, bottom: 0, left: 0 }
  bgFile.value = null; bgUrl.value = v?.background_url ?? ''
  frameFile.value = null; frameUrl.value = v?.frame_url ?? ''
  logoFile.value = null; logoUrl.value = v?.logo_url ?? ''
  bgNatW.value = 0; bgNatH.value = 0
  selectedId.value = null
  nextSlotId.value = 0
  baseW.value = 0; baseH.value = 0

  pendingSlots.value = v?.slots ?? []
  recomputeBaseFromPaper()
  loadVersions()
}

// ─── Background upload (slot-layout reference) ───────────────────────────────

function triggerBgInput() { bgFileInput.value?.click() }
function onBgChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  bgFile.value = file
  bgUrl.value = URL.createObjectURL(file)
  slots.value = []
  selectedId.value = null
  baseW.value = 0; baseH.value = 0
}
function onBgLoad(e: Event) {
  const img = e.target as HTMLImageElement
  bgNatW.value = img.naturalWidth
  bgNatH.value = img.naturalHeight
  baseW.value = img.offsetWidth
  baseH.value = img.offsetHeight
  if (pendingSlots.value.length > 0) nextTick(() => restoreSlots())
}

async function restoreSlots() {
  await nextTick()
  if (baseW.value === 0) return
  slots.value = pendingSlots.value.map((s: any, i: number) => ({
    id: i, x: s.x * baseW.value, y: s.y * baseH.value, w: s.w * baseW.value, h: s.h * baseH.value,
  }))
  nextSlotId.value = slots.value.length
  pendingSlots.value = []
}

function triggerFrameInput() { frameFileInput.value?.click() }
function onFrameChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  frameFile.value = file
  frameUrl.value = URL.createObjectURL(file)
}
function triggerLogoInput() { logoFileInput.value?.click() }
function onLogoChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  logoFile.value = file
  logoUrl.value = URL.createObjectURL(file)
}

// ─── Slot CRUD (unchanged from TemplateFrameEditor) ──────────────────────────

function addSlot() {
  if (!baseW.value) return
  const w = baseW.value * 0.35
  const h = baseH.value * 0.25
  const x = (baseW.value - w) / 2
  const y = (baseH.value - h) / 2
  const id = nextSlotId.value++
  slots.value.push({ id, x: snapVal(x), y: snapVal(y), w, h })
  selectedId.value = id
}
function deleteSlot(id: number) {
  slots.value = slots.value.filter(s => s.id !== id)
  if (selectedId.value === id) selectedId.value = null
}
function selectSlot(id: number) { selectedId.value = id }
function deselectAll() { selectedId.value = null }
function snapVal(v: number) { return snapEnabled.value ? Math.round(v / SNAP_PX) * SNAP_PX : v }

function onSlotPointerDown(e: PointerEvent, slotId: number) {
  e.stopPropagation(); e.preventDefault()
  selectedId.value = slotId
  const slot = slots.value.find(s => s.id === slotId)!
  drag = { type: 'move', slotId, handle: null, startMouseX: e.clientX, startMouseY: e.clientY, startSlot: { ...slot } }
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
}
function onHandlePointerDown(e: PointerEvent, slotId: number, handle: ResizeHandle) {
  e.stopPropagation(); e.preventDefault()
  selectedId.value = slotId
  const slot = slots.value.find(s => s.id === slotId)!
  drag = { type: 'resize', slotId, handle, startMouseX: e.clientX, startMouseY: e.clientY, startSlot: { ...slot } }
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
}
function onPointerMove(e: PointerEvent) {
  if (!drag) return
  const dx = e.clientX - drag.startMouseX
  const dy = e.clientY - drag.startMouseY
  const slot = slots.value.find(s => s.id === drag!.slotId)
  if (!slot) return
  const MIN_SIZE = 20
  const bw = baseW.value, bh = baseH.value
  if (drag.type === 'move') {
    slot.x = snapVal(clamp(drag.startSlot.x + dx, 0, bw - drag.startSlot.w))
    slot.y = snapVal(clamp(drag.startSlot.y + dy, 0, bh - drag.startSlot.h))
  } else {
    const h = drag.handle!
    let { x, y, w, h: ht } = drag.startSlot
    if (h.includes('e')) { w = Math.max(MIN_SIZE, snapVal(w + dx)) }
    if (h.includes('s')) { ht = Math.max(MIN_SIZE, snapVal(ht + dy)) }
    if (h.includes('w')) { const newW = Math.max(MIN_SIZE, snapVal(w - dx)); x = clamp(x + (w - newW), 0, bw); w = newW }
    if (h.includes('n')) { const newH = Math.max(MIN_SIZE, snapVal(ht - dy)); y = clamp(y + (ht - newH), 0, bh); ht = newH }
    w = Math.min(w, bw - x); ht = Math.min(ht, bh - y)
    slot.x = x; slot.y = y; slot.w = w; slot.h = ht
  }
}
function onPointerUp() { drag = null }
function clamp(v: number, min: number, max: number) { return Math.min(max, Math.max(min, v)) }

function onKeyDown(e: KeyboardEvent) {
  if (!selectedId.value && selectedId.value !== 0) return
  if (e.key === 'Delete' || e.key === 'Backspace') {
    if ((e.target as HTMLElement).tagName !== 'INPUT') deleteSlot(selectedId.value)
  }
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
    e.preventDefault()
    const slot = slots.value.find(s => s.id === selectedId.value)
    if (!slot) return
    const step = e.shiftKey ? SNAP_PX * 8 : SNAP_PX
    if (e.key === 'ArrowLeft') slot.x = clamp(slot.x - step, 0, baseW.value - slot.w)
    if (e.key === 'ArrowRight') slot.x = clamp(slot.x + step, 0, baseW.value - slot.w)
    if (e.key === 'ArrowUp') slot.y = clamp(slot.y - step, 0, baseH.value - slot.h)
    if (e.key === 'ArrowDown') slot.y = clamp(slot.y + step, 0, baseH.value - slot.h)
  }
}

// ─── Payload / Save ───────────────────────────────────────────────────────────

const saveError = ref('')
const isSubmitting = ref(false)

function buildForm(): FormData | null {
  const form = new FormData()
  form.append('label', label.value.trim())
  form.append('paper_size', paperSize.value)
  form.append('print_type', printType.value)
  form.append('orientation', orientation.value)
  form.append('dpi', String(dpi.value))
  if (paperSize.value === 'custom') {
    if (!customW.value || !customH.value) { saveError.value = 'Lebar/tinggi wajib diisi untuk paper size custom.'; return null }
    form.append('width_px', String(customW.value))
    form.append('height_px', String(customH.value))
  }
  form.append('margins', JSON.stringify(margins.value))
  form.append('is_active', String(isActive.value))
  if (price.value != null) form.append('price', String(price.value))

  const cw = baseW.value, ch = baseH.value
  if (cw && ch) {
    form.append('slots', JSON.stringify(slots.value.map((s, i) => ({
      id: i, x: +(s.x / cw).toFixed(4), y: +(s.y / ch).toFixed(4), w: +(s.w / cw).toFixed(4), h: +(s.h / ch).toFixed(4), rx: 0.008,
    }))))
  }

  if (bgFile.value) form.append('background', bgFile.value)
  if (frameFile.value) form.append('frame', frameFile.value)
  if (logoFile.value) form.append('logo', logoFile.value)

  if (!isEditMode.value) {
    if (isGlobal.value) {
      form.append('is_global', 'true')
    } else {
      if (outletIds.value.length === 0) { saveError.value = 'Pilih minimal 1 outlet, atau tandai sebagai Global.'; return null }
      form.append('is_global', 'false')
      form.append('outlet_ids', outletIds.value.join(','))
    }
  }
  return form
}

async function handleSave() {
  saveError.value = ''
  if (!label.value.trim()) { saveError.value = 'Nama template wajib diisi.'; return }
  if (!baseW.value || !baseH.value) { saveError.value = 'Pilih ukuran kertas (atau isi lebar/tinggi custom).'; return }
  if (slots.value.length === 0) { saveError.value = 'Tambahkan minimal 1 slot.'; return }

  const form = buildForm()
  if (!form) return

  isSubmitting.value = true
  let saved
  if (isEditMode.value) {
    saved = await updatePrintTemplate(localTemplate.value.id, form)
  } else {
    saved = await createPrintTemplate(form)
  }
  isSubmitting.value = false

  if (apiError.value) { toast.error(apiError.value); return }
  toast.success('Draft tersimpan.')
  emit('saved')

  if (saved) {
    // Stay open in edit mode so "Publikasikan" is available right away.
    localTemplate.value = saved
    currentVersion.value = saved.current_version ?? currentVersion.value
    draftVersion.value = saved.draft_version ?? saved.current_version ?? draftVersion.value
    await loadVersions()
  }
}

function close() { emit('update:modelValue', false) }

const _kd = (e: KeyboardEvent) => onKeyDown(e)
watch(() => props.modelValue, (open) => {
  if (open) window.addEventListener('keydown', _kd)
  else window.removeEventListener('keydown', _kd)
})
onUnmounted(() => window.removeEventListener('keydown', _kd))

const HANDLES: { handle: ResizeHandle; style: object; cursor: string }[] = [
  { handle: 'nw', style: { top: '-5px', left: '-5px' }, cursor: 'nw-resize' },
  { handle: 'n', style: { top: '-5px', left: '50%', transform: 'translateX(-50%)' }, cursor: 'n-resize' },
  { handle: 'ne', style: { top: '-5px', right: '-5px' }, cursor: 'ne-resize' },
  { handle: 'e', style: { top: '50%', right: '-5px', transform: 'translateY(-50%)' }, cursor: 'e-resize' },
  { handle: 'se', style: { bottom: '-5px', right: '-5px' }, cursor: 'se-resize' },
  { handle: 's', style: { bottom: '-5px', left: '50%', transform: 'translateX(-50%)' }, cursor: 's-resize' },
  { handle: 'sw', style: { bottom: '-5px', left: '-5px' }, cursor: 'sw-resize' },
  { handle: 'w', style: { top: '50%', left: '-5px', transform: 'translateY(-50%)' }, cursor: 'w-resize' },
]
const SLOT_COLORS = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#dc2626', '#7c3aed', '#db2777', '#ea580c']
function slotColor(i: number) { return SLOT_COLORS[i % SLOT_COLORS.length] }
</script>

<template>
  <VDialog :model-value="modelValue" max-width="1600" :persistent="true" scrollable @update:model-value="close">
    <VCard style="display: flex; flex-direction: column; max-height: 96vh;">
      <VCardTitle class="d-flex align-center gap-3 pa-4 pb-2" style="flex-shrink: 0;">
        <VIcon color="primary">bx bx-image-alt</VIcon>
        <span>{{ isEditMode ? 'Edit Print Template' : 'Tambah Print Template Baru' }}</span>
        <VChip v-if="isEditMode" size="small" :color="currentVersion ? 'success' : 'default'">
          {{ currentVersion ? `Published v${currentVersion.version_number}` : 'Belum publish' }}
        </VChip>
        <VChip v-if="isEditMode && draftVersion && draftVersion.id !== currentVersion?.id" size="small" color="warning">
          Draft v{{ draftVersion.version_number }} belum dipublikasikan
        </VChip>
        <VSpacer />
        <VBtn icon variant="text" @click="close"><VIcon>bx bx-x</VIcon></VBtn>
      </VCardTitle>

      <VDivider />

      <div class="d-flex" style="flex: 1; overflow: hidden; min-height: 0;">
        <!-- Left: Canvas -->
        <div class="d-flex flex-column pa-4" style="flex: 1; overflow: hidden; min-width: 0; min-height: 0;">
          <div v-if="!baseW || !baseH" class="upload-zone d-flex flex-column align-center justify-center rounded-xl mb-4">
            <VIcon size="48" color="primary" class="mb-3">bx bx-image-add</VIcon>
            <p class="font-weight-bold mb-1">Pilih Ukuran Kertas</p>
            <p class="text-caption text-medium-emphasis">Isi lebar/tinggi (px) custom di panel kanan untuk memulai kanvas</p>
          </div>

          <template v-else>
            <div class="d-flex align-center gap-2 mb-3 flex-wrap">
              <VBtn color="primary" variant="tonal" size="small" prepend-icon="bx bx-plus" @click="addSlot">Tambah Slot</VBtn>
              <VBtn :color="snapEnabled ? 'success' : 'default'" variant="tonal" size="small" @click="snapEnabled = !snapEnabled">
                Snap {{ snapEnabled ? 'ON' : 'OFF' }}
              </VBtn>
              <VBtn variant="tonal" size="small" color="warning" prepend-icon="bx bx-image" @click="triggerBgInput">
                {{ bgUrl ? 'Ganti Background' : 'Upload Background (opsional)' }}
              </VBtn>
              <input ref="bgFileInput" type="file" accept="image/png,image/jpeg,image/webp" style="display:none" @change="onBgChange" >
              <VSpacer />
              <span v-if="bgNatW" class="text-caption text-medium-emphasis">{{ bgNatW }}×{{ bgNatH }}px · AR {{ aspectRatio }}</span>
            </div>
            <p class="text-caption text-medium-emphasis mb-2">
              Klik "Tambah Slot" → drag untuk pindah · drag sudut/tepi untuk resize · Delete untuk hapus · ↑↓←→ untuk nudge
            </p>

            <div class="canvas-scroll-wrapper">
              <div class="canvas-container" @pointerup="onPointerUp" @pointermove="onPointerMove" @click.self="deselectAll">
                <div v-if="snapEnabled" class="snap-grid" />
                <img v-if="bgUrl" :src="bgUrl" class="frame-image" draggable="false" @load="onBgLoad" >
                <div v-else class="frame-placeholder" :style="{ width: baseW + 'px', height: baseH + 'px' }">
                  <VIcon size="32" color="grey-lighten-1">bx bx-image</VIcon>
                  <span class="text-caption text-medium-emphasis">Tanpa background — slot dicetak di atas kanvas kosong</span>
                </div>
                <img v-if="frameUrl" :src="frameUrl" class="frame-image frame-overlay-preview" draggable="false" >
                <div
                  v-for="(slot, idx) in slots" :key="slot.id" class="slot-overlay" :class="{ 'slot-selected': selectedId === slot.id }"
                  :style="{ left: slot.x + 'px', top: slot.y + 'px', width: slot.w + 'px', height: slot.h + 'px', '--slot-color': slotColor(idx) }"
                  @pointerdown="onSlotPointerDown($event, slot.id)" @click.stop="selectSlot(slot.id)"
                >
                  <div class="slot-badge">{{ idx + 1 }}</div>
                  <div v-if="selectedId === slot.id" class="slot-size-tip">{{ Math.round(slot.w) }}×{{ Math.round(slot.h) }}</div>
                  <template v-if="selectedId === slot.id">
                    <div v-for="hd in HANDLES" :key="hd.handle" class="resize-handle" :style="{ ...hd.style, cursor: hd.cursor }" @pointerdown.stop="onHandlePointerDown($event, slot.id, hd.handle)" />
                  </template>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Right: Config sidebar -->
        <VDivider vertical />
        <div class="pa-4 d-flex flex-column gap-4" style="width: 340px; flex-shrink: 0; overflow-y: auto;">

          <div>
            <p class="text-caption font-weight-bold text-uppercase mb-1" style="color:#888;">Nama Template</p>
            <VTextField v-model="label" density="compact" variant="outlined" placeholder="cth: 4R Standard" hide-details />
          </div>

          <div>
            <p class="text-caption font-weight-bold text-uppercase mb-1" style="color:#888;">Harga per Cetak</p>
            <VTextField
              v-model.number="price"
              type="number"
              prefix="Rp"
              density="compact"
              variant="outlined"
              placeholder="cth: 50000"
              hint="Harga dibayar pelanggan per lembar — beda ukuran kertas bisa beda harga"
              persistent-hint
            />
          </div>

          <div class="d-flex align-center justify-space-between">
            <span class="text-caption font-weight-bold text-uppercase" style="color:#888;">Status Aktif</span>
            <VSwitch v-model="isActive" color="success" hide-details density="compact" />
          </div>

          <VDivider />

          <div>
            <p class="text-caption font-weight-bold text-uppercase mb-1" style="color:#888;">Jenis Cetak</p>
            <VSelect
              v-model="printType"
              :items="PRINT_TYPES"
              item-title="title"
              item-value="value"
              density="compact"
              variant="outlined"
              hint="Menentukan slot mana yang bisa dipakai di Pengaturan Cetak per Outlet"
              persistent-hint
            />
          </div>

          <div>
            <p class="text-caption font-weight-bold text-uppercase mb-1" style="color:#888;">Ukuran Kertas</p>
            <VSelect v-model="paperSize" :items="PAPER_SIZES" item-title="title" item-value="value" density="compact" variant="outlined" hide-details />
          </div>
          <div v-if="paperSize === 'custom'" class="d-flex gap-2">
            <VTextField v-model.number="customW" type="number" label="Lebar (px)" density="compact" variant="outlined" hide-details />
            <VTextField v-model.number="customH" type="number" label="Tinggi (px)" density="compact" variant="outlined" hide-details />
          </div>
          <div class="d-flex gap-2">
            <VBtnToggle v-model="orientation" density="compact" color="primary" mandatory divided>
              <VBtn value="portrait" size="small">Portrait</VBtn>
              <VBtn value="landscape" size="small">Landscape</VBtn>
            </VBtnToggle>
            <VTextField v-model.number="dpi" type="number" label="DPI" density="compact" variant="outlined" hide-details style="max-width:100px" />
          </div>

          <div>
            <p class="text-caption font-weight-bold text-uppercase mb-1" style="color:#888;">Margin (px)</p>
            <div class="d-flex gap-2 flex-wrap">
              <VTextField v-model.number="margins.top" type="number" label="Atas" density="compact" variant="outlined" hide-details style="width:75px" />
              <VTextField v-model.number="margins.right" type="number" label="Kanan" density="compact" variant="outlined" hide-details style="width:75px" />
              <VTextField v-model.number="margins.bottom" type="number" label="Bawah" density="compact" variant="outlined" hide-details style="width:75px" />
              <VTextField v-model.number="margins.left" type="number" label="Kiri" density="compact" variant="outlined" hide-details style="width:75px" />
            </div>
          </div>

          <VDivider />

          <div>
            <p class="text-caption font-weight-bold text-uppercase mb-1" style="color:#888;">Frame Overlay (opsional)</p>
            <div class="small-upload d-flex align-center gap-2" @click="triggerFrameInput">
              <img v-if="frameUrl" :src="frameUrl" class="small-upload-thumb" >
              <VIcon v-else color="primary">bx bx-image-add</VIcon>
              <span class="text-caption">{{ frameUrl ? 'Ganti frame PNG' : 'Upload frame PNG (full-canvas, transparan)' }}</span>
            </div>
            <input ref="frameFileInput" type="file" accept="image/png" style="display:none" @change="onFrameChange" >
          </div>

          <div>
            <p class="text-caption font-weight-bold text-uppercase mb-1" style="color:#888;">Logo Outlet (opsional)</p>
            <div class="small-upload d-flex align-center gap-2" @click="triggerLogoInput">
              <img v-if="logoUrl" :src="logoUrl" class="small-upload-thumb" >
              <VIcon v-else color="primary">bx bx-image-add</VIcon>
              <span class="text-caption">{{ logoUrl ? 'Ganti logo PNG' : 'Upload logo PNG (full-canvas, transparan)' }}</span>
            </div>
            <input ref="logoFileInput" type="file" accept="image/png" style="display:none" @change="onLogoChange" >
          </div>

          <VDivider />

          <div>
            <p class="text-caption font-weight-bold text-uppercase mb-2" style="color:#888;">Daftar Slot ({{ slots.length }})</p>
            <div v-if="slots.length === 0" class="text-center pa-4 rounded-lg" style="background:#f9f9f9;border:1px dashed #ddd;">
              <VIcon color="grey-lighten-1" size="28">bx bx-layer</VIcon>
              <p class="text-caption text-medium-emphasis mt-1">Belum ada slot.</p>
            </div>
            <div class="d-flex flex-column gap-1">
              <div v-for="(slot, idx) in slots" :key="slot.id" class="slot-list-item d-flex align-center gap-2 px-2 py-2 rounded-lg" :class="{ 'slot-list-selected': selectedId === slot.id }" :style="{ '--slot-color': slotColor(idx) }" @click="selectSlot(slot.id)">
                <div class="slot-list-dot" />
                <span class="text-caption font-weight-medium flex-1">Slot {{ idx + 1 }}</span>
                <span class="text-caption text-medium-emphasis">{{ Math.round(slot.w) }}×{{ Math.round(slot.h) }}</span>
                <VBtn icon variant="text" size="x-small" @click.stop="deleteSlot(slot.id)"><VIcon size="14" color="error">bx bx-trash</VIcon></VBtn>
              </div>
            </div>
          </div>

          <VDivider />

          <div>
            <div class="d-flex align-center justify-space-between mb-1">
              <span class="text-caption font-weight-bold text-uppercase" style="color:#888;">Global (semua outlet)</span>
              <VSwitch v-model="isGlobal" color="primary" hide-details density="compact" :disabled="isEditMode" />
            </div>
            <VSelect
              v-if="!isGlobal"
              v-model="outletIds"
              :items="outletItems"
              label="Outlet"
              multiple
              chips
              density="compact"
              variant="outlined"
              :disabled="isEditMode"
              :hint="isEditMode ? 'Ubah assignment lewat tombol Kelola Outlet di daftar template' : 'Pilih satu atau lebih outlet'"
              persistent-hint
            />
          </div>

          <VDivider v-if="isEditMode" />

          <div v-if="isEditMode">
            <div class="d-flex align-center justify-space-between mb-2">
              <span class="text-caption font-weight-bold text-uppercase" style="color:#888;">Riwayat Versi</span>
              <VBtn size="x-small" variant="text" @click="showVersions = !showVersions">{{ showVersions ? 'Sembunyikan' : 'Lihat' }}</VBtn>
            </div>
            <div v-if="showVersions" class="d-flex flex-column gap-1">
              <div v-for="v in versions" :key="v.id" class="d-flex align-center justify-space-between px-2 py-1 rounded-lg" style="background:#f9f9f9;">
                <span class="text-caption">
                  v{{ v.version_number }}
                  <VChip v-if="v.id === currentVersion?.id" size="x-small" color="success" class="ml-1">live</VChip>
                  <VChip v-else-if="!v.published_at" size="x-small" color="warning" class="ml-1">draft</VChip>
                </span>
                <VBtn v-if="v.published_at && v.id !== currentVersion?.id" size="x-small" variant="tonal" color="primary" @click="handleRollback(v.id)">Rollback</VBtn>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VDivider />

      <VCardActions class="pa-4" style="flex-shrink: 0;">
        <VAlert v-if="saveError" type="error" density="compact" variant="tonal" class="text-caption flex-1" style="padding:6px 12px;">{{ saveError }}</VAlert>
        <VSpacer v-else />
        <VBtn variant="text" @click="close">Tutup</VBtn>
        <VBtn color="secondary" variant="tonal" :loading="isSubmitting" prepend-icon="bx bx-save" @click="handleSave">Simpan Draft</VBtn>
        <VBtn v-if="isEditMode" color="primary" variant="elevated" :loading="isPublishing" prepend-icon="bx bx-upload" @click="handlePublish">Publikasikan</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>
.upload-zone { min-height: 260px; border: 2px dashed #c7d2fe; background: #f5f3ff; cursor: pointer; transition: background 0.2s, border-color 0.2s; }
.upload-zone:hover { background: #ede9fe; border-color: #818cf8; }
.small-upload { padding: 8px; border: 1.5px dashed #ddd; border-radius: 8px; cursor: pointer; }
.small-upload:hover { background: #f9f9f9; }
.small-upload-thumb { width: 32px; height: 32px; object-fit: contain; background: repeating-conic-gradient(#eee 0% 25%, #fff 0% 50%) 50% / 8px 8px; border-radius: 4px; }
.canvas-scroll-wrapper { overflow: auto; flex: 1; min-height: 0; border: 1px solid #e5e7eb; border-radius: 8px; background: #fafafa; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
.canvas-container { position: relative; display: inline-block; cursor: default; user-select: none; overflow: visible; }
.snap-grid { position: absolute; inset: 0; background-image: linear-gradient(to right, rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.08) 1px, transparent 1px); background-size: 2px 2px; pointer-events: none; z-index: 1; }
.frame-image { display: block; max-width: 1100px; max-height: 860px; width: auto; height: auto; pointer-events: none; position: relative; z-index: 0; }
.frame-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; background: #fafafa; border: 2px dashed #ddd; box-sizing: border-box; position: relative; z-index: 0; }
.frame-overlay-preview { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 15; }
.slot-overlay { position: absolute; border: 2px dashed var(--slot-color, #4f46e5); background: rgba(79,70,229,0.12); border-radius: 4px; cursor: move; z-index: 10; touch-action: none; transition: background 0.1s; }
.slot-overlay:hover { background: rgba(79,70,229,0.2); }
.slot-selected { border-style: solid; border-width: 2px; box-shadow: 0 0 0 3px rgba(79,70,229,0.35); }
.slot-badge { position: absolute; top: 4px; left: 4px; width: 22px; height: 22px; background: var(--slot-color, #4f46e5); color: #fff; font-size: 11px; font-weight: 700; border-radius: 50%; display: flex; align-items: center; justify-content: center; pointer-events: none; z-index: 20; }
.slot-size-tip { position: absolute; bottom: 4px; right: 4px; background: rgba(0,0,0,0.6); color: #fff; font-size: 10px; padding: 1px 5px; border-radius: 3px; pointer-events: none; z-index: 20; white-space: nowrap; }
.resize-handle { position: absolute; width: 10px; height: 10px; background: #fff; border: 2px solid var(--slot-color, #4f46e5); border-radius: 2px; z-index: 30; touch-action: none; }
.slot-list-item { cursor: pointer; transition: background 0.15s; border: 1px solid transparent; }
.slot-list-item:hover { background: #f5f5f5; }
.slot-list-selected { background: rgba(79,70,229,0.08); border-color: rgba(79,70,229,0.4) !important; }
.slot-list-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--slot-color, #4f46e5); flex-shrink: 0; }
</style>
