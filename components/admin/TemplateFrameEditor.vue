<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'

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

// ─── Props / Emits ────────────────────────────────────────────────────────────

const props = defineProps<{
  modelValue: boolean          // dialog open
  editingTemplate?: any | null // pass existing template for edit mode
}>()

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
  'save': [payload: {
    label: string
    aspect_ratio: number
    slot_count: number
    slots: { id: number; x: number; y: number; w: number; h: number; rx: number }[]
    file: File | null
    is_active: boolean
  }]
}>()

// ─── State ────────────────────────────────────────────────────────────────────

const label        = ref('')
const isActive     = ref(true)
const outletId     = ref('')
const imageFile    = ref<File | null>(null)
const imageUrl     = ref<string>('')
const imageNatW    = ref(0)
const imageNatH    = ref(0)
const slots        = ref<SlotItem[]>([])
const selectedId   = ref<number | null>(null)
const snapEnabled  = ref(true)
const SNAP_PX      = 2   // snap grid size in px
const nextSlotId   = ref(0)

// Base display size of image (set after onImageLoad, used for normalization)
const baseW        = ref(0)
const baseH        = ref(0)

const fileInput = ref<HTMLInputElement | null>(null)

// Pointer interaction state (no reactivity needed — mutated directly for perf)
let drag: DragState | null = null

// ─── Derived ──────────────────────────────────────────────────────────────────

const isEditMode = computed(() => !!props.editingTemplate)

const aspectRatio = computed(() =>
  imageNatH.value > 0 ? +(imageNatW.value / imageNatH.value).toFixed(4) : 0
)

// ─── Init / Reset ─────────────────────────────────────────────────────────────

watch(() => props.modelValue, (open) => {
  if (!open) return
  if (props.editingTemplate) {
    loadFromTemplate(props.editingTemplate)
  } else {
    resetEditor()
  }
})

function resetEditor() {
  label.value      = ''
  isActive.value   = true
  outletId.value   = ''
  imageFile.value  = null
  imageUrl.value   = ''
  imageNatW.value  = 0
  imageNatH.value  = 0
  baseW.value      = 0
  baseH.value      = 0
  slots.value      = []
  selectedId.value = null
  nextSlotId.value = 0
}

function loadFromTemplate(t: any) {
  label.value    = t.label ?? ''
  isActive.value = t.is_active ?? true
  outletId.value = t.outlet_id ?? ''
  imageFile.value = null
  imageUrl.value  = t.src ?? ''
  imageNatW.value = 0
  imageNatH.value = 0
  selectedId.value = null
  nextSlotId.value = 0

  // Will restore slots after image loads and canvas size is known
  pendingSlots.value = t.slots ?? []
}

// Slots to restore after image load (edit mode)
const pendingSlots = ref<any[]>([])

// ─── Image Upload ─────────────────────────────────────────────────────────────

function triggerFileInput() { fileInput.value?.click() }

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  imageFile.value = file
  const url = URL.createObjectURL(file)
  imageUrl.value   = url
  slots.value      = []
  selectedId.value = null
  baseW.value      = 0
  baseH.value      = 0
}

function onImageLoad(e: Event) {
  const img = e.target as HTMLImageElement
  imageNatW.value = img.naturalWidth
  imageNatH.value = img.naturalHeight
  // Capture the CSS-rendered size at zoom=1 (CSS max-width/max-height applied)
  baseW.value = img.offsetWidth
  baseH.value = img.offsetHeight

  if (pendingSlots.value.length > 0) {
    nextTick(() => restoreSlots())
  }
}

async function restoreSlots() {
  await nextTick()
  if (baseW.value === 0) return

  slots.value = pendingSlots.value.map((s: any, i: number) => ({
    id: i,
    x: s.x * baseW.value,
    y: s.y * baseH.value,
    w: s.w * baseW.value,
    h: s.h * baseH.value,
  }))
  nextSlotId.value = slots.value.length
  pendingSlots.value = []
}

// ─── Slot CRUD ────────────────────────────────────────────────────────────────

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

// ─── Snap ─────────────────────────────────────────────────────────────────────

function snapVal(v: number) {
  return snapEnabled.value ? Math.round(v / SNAP_PX) * SNAP_PX : v
}

// ─── Drag / Resize ────────────────────────────────────────────────────────────

function onSlotPointerDown(e: PointerEvent, slotId: number) {
  e.stopPropagation()
  e.preventDefault()
  selectedId.value = slotId
  const slot = slots.value.find(s => s.id === slotId)!
  drag = {
    type: 'move',
    slotId,
    handle: null,
    startMouseX: e.clientX,
    startMouseY: e.clientY,
    startSlot: { ...slot },
  }
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
}

function onHandlePointerDown(e: PointerEvent, slotId: number, handle: ResizeHandle) {
  e.stopPropagation()
  e.preventDefault()
  selectedId.value = slotId
  const slot = slots.value.find(s => s.id === slotId)!
  drag = {
    type: 'resize',
    slotId,
    handle,
    startMouseX: e.clientX,
    startMouseY: e.clientY,
    startSlot: { ...slot },
  }
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!drag) return
  const dx   = e.clientX - drag.startMouseX
  const dy   = e.clientY - drag.startMouseY
  const slot = slots.value.find(s => s.id === drag!.slotId)
  if (!slot) return

  const MIN_SIZE = 20
  const bw = baseW.value
  const bh = baseH.value

  if (drag.type === 'move') {
    slot.x = snapVal(clamp(drag.startSlot.x + dx, 0, bw - drag.startSlot.w))
    slot.y = snapVal(clamp(drag.startSlot.y + dy, 0, bh - drag.startSlot.h))
  } else {
    const h = drag.handle!
    let { x, y, w, h: ht } = drag.startSlot

    if (h.includes('e')) { w  = Math.max(MIN_SIZE, snapVal(w  + dx)) }
    if (h.includes('s')) { ht = Math.max(MIN_SIZE, snapVal(ht + dy)) }
    if (h.includes('w')) {
      const newW = Math.max(MIN_SIZE, snapVal(w - dx))
      x = clamp(x + (w - newW), 0, bw)
      w = newW
    }
    if (h.includes('n')) {
      const newH = Math.max(MIN_SIZE, snapVal(ht - dy))
      y = clamp(y + (ht - newH), 0, bh)
      ht = newH
    }

    w  = Math.min(w,  bw - x)
    ht = Math.min(ht, bh - y)

    slot.x = x; slot.y = y; slot.w = w; slot.h = ht
  }
}

function onPointerUp() {
  drag = null
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

// ─── Keyboard shortcuts ───────────────────────────────────────────────────────

function onKeyDown(e: KeyboardEvent) {
  if (!selectedId.value && selectedId.value !== 0) return
  if (e.key === 'Delete' || e.key === 'Backspace') {
    // Only delete if focus is not on an input
    if ((e.target as HTMLElement).tagName !== 'INPUT') {
      deleteSlot(selectedId.value)
    }
  }
  // Arrow key nudge
  if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)) {
    e.preventDefault()
    const slot = slots.value.find(s => s.id === selectedId.value)
    if (!slot) return
    const step = e.shiftKey ? SNAP_PX * 8 : SNAP_PX
    if (e.key === 'ArrowLeft')  slot.x = clamp(slot.x - step, 0, baseW.value - slot.w)
    if (e.key === 'ArrowRight') slot.x = clamp(slot.x + step, 0, baseW.value - slot.w)
    if (e.key === 'ArrowUp')    slot.y = clamp(slot.y - step, 0, baseH.value - slot.h)
    if (e.key === 'ArrowDown')  slot.y = clamp(slot.y + step, 0, baseH.value - slot.h)
  }
}

// ─── Payload / Save ───────────────────────────────────────────────────────────

const saveError = ref('')

function buildPayload() {
  const cw = baseW.value
  const ch = baseH.value
  if (!cw || !ch) return null

  const ar = imageNatW.value > 0
    ? +(imageNatW.value / imageNatH.value).toFixed(4)
    : +(cw / ch).toFixed(4)

  return {
    label: label.value.trim(),
    aspect_ratio: ar,
    slot_count: slots.value.length,
    // Slots stored in base-px → normalize to 0-1 using base canvas size
    slots: slots.value.map((s, i) => ({
      id: i,
      x: +(s.x / cw).toFixed(4),
      y: +(s.y / ch).toFixed(4),
      w: +(s.w / cw).toFixed(4),
      h: +(s.h / ch).toFixed(4),
      rx: 0.008,
    })),
    file: imageFile.value,
    is_active: isActive.value,
  }
}

function handleSave() {
  saveError.value = ''
  if (!label.value.trim()) { saveError.value = 'Label wajib diisi.'; return }
  if (!imageUrl.value)      { saveError.value = 'Upload frame PNG terlebih dahulu.'; return }
  if (slots.value.length === 0) { saveError.value = 'Tambahkan minimal 1 slot.'; return }

  const payload = buildPayload()
  if (!payload) return
  emit('save', payload)
}

function close() { emit('update:modelValue', false) }

// ─── Sidebar tab ─────────────────────────────────────────────────────────────
const sidebarTab        = ref<'config' | 'preview'>('config')
const fullscreenPreview = ref(false)

// ─── Preview scaling ──────────────────────────────────────────────────────────
// Preview image renders at a smaller size — track its actual rendered size
// so slot overlays can be scaled to match.
const previewImgW = ref(0)
const previewImgH = ref(0)

const previewScaleX = computed(() =>
  baseW.value && previewImgW.value ? previewImgW.value / baseW.value : 1
)
const previewScaleY = computed(() =>
  baseH.value && previewImgH.value ? previewImgH.value / baseH.value : 1
)

function onPreviewImageLoad(e: Event) {
  const img = e.target as HTMLImageElement
  previewImgW.value = img.offsetWidth
  previewImgH.value = img.offsetHeight
}

// Re-measure when switching to preview tab (image may already be loaded)
watch(sidebarTab, async (tab) => {
  if (tab !== 'preview') return
  await nextTick()
  const img = document.querySelector('.preview-frame-img') as HTMLImageElement | null
  if (img && img.complete) {
    previewImgW.value = img.offsetWidth
    previewImgH.value = img.offsetHeight
  }
})

// ─── Fullscreen preview scaling ───────────────────────────────────────────────
const fullscreenImgW = ref(0)
const fullscreenImgH = ref(0)

const fullscreenScaleX = computed(() =>
  baseW.value && fullscreenImgW.value ? fullscreenImgW.value / baseW.value : 1
)
const fullscreenScaleY = computed(() =>
  baseH.value && fullscreenImgH.value ? fullscreenImgH.value / baseH.value : 1
)

function onFullscreenImageLoad(e: Event) {
  const img = e.target as HTMLImageElement
  fullscreenImgW.value = img.offsetWidth
  fullscreenImgH.value = img.offsetHeight
}

// Re-measure fullscreen when dialog opens
watch(fullscreenPreview, async (open) => {
  if (!open) return
  await nextTick()
  const img = document.querySelector('.fullscreen-frame-img') as HTMLImageElement | null
  if (img && img.complete) {
    fullscreenImgW.value = img.offsetWidth
    fullscreenImgH.value = img.offsetHeight
  }
})

const _kd = (e: KeyboardEvent) => onKeyDown(e)

watch(() => props.modelValue, (open) => {
  if (open) window.addEventListener('keydown', _kd)
  else      window.removeEventListener('keydown', _kd)
})

onUnmounted(() => window.removeEventListener('keydown', _kd))

// ─── Resize handles config ────────────────────────────────────────────────────

const HANDLES: { handle: ResizeHandle; style: object; cursor: string }[] = [
  { handle: 'nw', style: { top: '-5px',  left: '-5px'  }, cursor: 'nw-resize' },
  { handle: 'n',  style: { top: '-5px',  left: '50%', transform: 'translateX(-50%)' }, cursor: 'n-resize'  },
  { handle: 'ne', style: { top: '-5px',  right: '-5px' }, cursor: 'ne-resize' },
  { handle: 'e',  style: { top: '50%',   right: '-5px', transform: 'translateY(-50%)' }, cursor: 'e-resize'  },
  { handle: 'se', style: { bottom: '-5px', right: '-5px' }, cursor: 'se-resize' },
  { handle: 's',  style: { bottom: '-5px', left: '50%', transform: 'translateX(-50%)' }, cursor: 's-resize'  },
  { handle: 'sw', style: { bottom: '-5px', left: '-5px' }, cursor: 'sw-resize' },
  { handle: 'w',  style: { top: '50%',   left: '-5px', transform: 'translateY(-50%)' }, cursor: 'w-resize'  },
]

const SLOT_COLORS = [
  '#4f46e5','#0891b2','#059669','#d97706','#dc2626','#7c3aed','#db2777','#ea580c',
]
function slotColor(i: number) { return SLOT_COLORS[i % SLOT_COLORS.length] }
</script>

<template>
  <VDialog
    :model-value="modelValue"
    @update:model-value="close"
    max-width="1500"
    :persistent="true"
    scrollable
  >
    <VCard style="display: flex; flex-direction: column; max-height: 96vh;">

      <!-- ── Header ─────────────────────────────────────────────────── -->
      <VCardTitle class="d-flex align-center gap-3 pa-4 pb-2" style="flex-shrink: 0;">
        <VIcon color="primary">bx bx-layout</VIcon>
        <span>{{ isEditMode ? 'Edit Template Frame' : 'Tambah Template Frame Baru' }}</span>
        <VSpacer />
        <VBtn icon variant="text" @click="close"><VIcon>bx bx-x</VIcon></VBtn>
      </VCardTitle>

      <VDivider />

      <!-- ── Body ───────────────────────────────────────────────────── -->
      <div class="d-flex" style="flex: 1; overflow: hidden; min-height: 0;">

        <!-- Left: Canvas Area -->
        <div class="d-flex flex-column pa-4" style="flex: 1; overflow: hidden; min-width: 0; min-height: 0;">

          <!-- Upload zone (shown when no image) -->
          <div
            v-if="!imageUrl"
            class="upload-zone d-flex flex-column align-center justify-center rounded-xl mb-4"
            @click="triggerFileInput"
          >
            <VIcon size="48" color="primary" class="mb-3">bx bx-image-add</VIcon>
            <p class="font-weight-bold mb-1">Upload Frame PNG</p>
            <p class="text-caption text-medium-emphasis">Klik untuk pilih file (PNG, JPG, WebP)</p>
            <input ref="fileInput" type="file" accept="image/png,image/jpeg,image/webp" style="display:none" @change="onFileChange" />
          </div>

          <!-- Image uploaded: show canvas editor -->
          <template v-else>
            <!-- Toolbar above canvas -->
            <div class="d-flex align-center gap-2 mb-3 flex-wrap">
              <VBtn
                color="primary"
                variant="tonal"
                size="small"
                prepend-icon="bx bx-plus"
                @click="addSlot"
              >
                Tambah Slot
              </VBtn>

              <VBtn
                :color="snapEnabled ? 'success' : 'default'"
                variant="tonal"
                size="small"
                :prepend-icon="snapEnabled ? 'bx bx-grid-small' : 'bx bx-move-horizontal'"
                @click="snapEnabled = !snapEnabled"
              >
                Snap {{ snapEnabled ? 'ON' : 'OFF' }}
              </VBtn>

              <VBtn
                variant="tonal"
                size="small"
                color="warning"
                prepend-icon="bx bx-image"
                @click="triggerFileInput"
              >
                Ganti Gambar
              </VBtn>
              <input ref="fileInput" type="file" accept="image/png,image/jpeg,image/webp" style="display:none" @change="onFileChange" />

              <VSpacer />

              <span
                v-if="imageNatW"
                class="text-caption text-medium-emphasis"
              >
                {{ imageNatW }}×{{ imageNatH }}px · AR {{ aspectRatio }}
              </span>
            </div>

            <!-- Hint text -->
            <p class="text-caption text-medium-emphasis mb-2">
              Klik "Tambah Slot" → drag untuk pindah · drag sudut/tepi untuk resize · Delete untuk hapus · ↑↓←→ untuk nudge
            </p>

            <!-- Scrollable wrapper — gambar besar bisa discroll tanpa terpotong -->
            <div class="canvas-scroll-wrapper">
            <!-- Canvas: frame image + slot overlays -->
            <div
              class="canvas-container"
              @pointerup="onPointerUp"
              @pointermove="onPointerMove"
              @click.self="deselectAll"
            >
              <!-- Snap grid overlay (visual only) -->
              <div v-if="snapEnabled" class="snap-grid" />

              <!-- Frame image -->
              <img
                :src="imageUrl"
                class="frame-image"
                draggable="false"
                @load="onImageLoad"
              />

              <!-- Slot overlays -->
              <div
                v-for="(slot, idx) in slots"
                :key="slot.id"
                class="slot-overlay"
                :class="{ 'slot-selected': selectedId === slot.id }"
                :style="{
                  left:   slot.x + 'px',
                  top:    slot.y + 'px',
                  width:  slot.w + 'px',
                  height: slot.h + 'px',
                  '--slot-color': slotColor(idx),
                }"
                @pointerdown="onSlotPointerDown($event, slot.id)"
                @click.stop="selectSlot(slot.id)"
              >
                <!-- Slot number badge -->
                <div class="slot-badge">{{ idx + 1 }}</div>

                <!-- Size tooltip (shown on selected) -->
                <div v-if="selectedId === slot.id" class="slot-size-tip">
                  {{ Math.round(slot.w) }}×{{ Math.round(slot.h) }}
                </div>

                <!-- Resize handles (only when selected) -->
                <template v-if="selectedId === slot.id">
                  <div
                    v-for="hd in HANDLES"
                    :key="hd.handle"
                    class="resize-handle"
                    :style="{ ...hd.style, cursor: hd.cursor }"
                    @pointerdown.stop="onHandlePointerDown($event, slot.id, hd.handle)"
                  />
                </template>
              </div>
            </div>
            </div> <!-- /canvas-scroll-wrapper -->
          </template>
        </div>

        <!-- Right: Config sidebar -->
        <VDivider vertical />
        <div class="d-flex flex-column" style="width: 300px; flex-shrink: 0; overflow: hidden;">

          <!-- Tab bar -->
          <div class="d-flex" style="flex-shrink: 0; border-bottom: 1px solid #e5e7eb;">
            <button
              class="sidebar-tab"
              :class="{ 'sidebar-tab-active': sidebarTab === 'config' }"
              @click="sidebarTab = 'config'"
            >Konfigurasi</button>
            <button
              class="sidebar-tab"
              :class="{ 'sidebar-tab-active': sidebarTab === 'preview' }"
              @click="sidebarTab = 'preview'"
            >Preview</button>
          </div>

          <!-- Config tab -->
          <div v-if="sidebarTab === 'config'" class="pa-4 d-flex flex-column gap-4" style="overflow-y: auto; flex: 1;">

          <!-- Template label -->
          <div>
            <p class="text-caption font-weight-bold text-uppercase mb-1" style="color: #888;">Nama Template</p>
            <VTextField
              v-model="label"
              density="compact"
              variant="outlined"
              placeholder="cth: Lotso 6 Foto"
              hide-details
            />
          </div>

          <!-- Status -->
          <div class="d-flex align-center justify-space-between">
            <span class="text-caption font-weight-bold text-uppercase" style="color: #888;">Status Aktif</span>
            <VSwitch v-model="isActive" color="success" hide-details density="compact" />
          </div>

          <VDivider />

          <!-- Slot list -->
          <div>
            <p class="text-caption font-weight-bold text-uppercase mb-2" style="color: #888;">
              Daftar Slot ({{ slots.length }})
            </p>

            <div v-if="slots.length === 0" class="text-center pa-4 rounded-lg" style="background:#f9f9f9; border: 1px dashed #ddd;">
              <VIcon color="grey-lighten-1" size="28">bx bx-layer</VIcon>
              <p class="text-caption text-medium-emphasis mt-1">Belum ada slot.<br>Klik "Tambah Slot" di atas.</p>
            </div>

            <div class="d-flex flex-column gap-1">
              <div
                v-for="(slot, idx) in slots"
                :key="slot.id"
                class="slot-list-item d-flex align-center gap-2 px-2 py-2 rounded-lg"
                :class="{ 'slot-list-selected': selectedId === slot.id }"
                :style="{ '--slot-color': slotColor(idx) }"
                @click="selectSlot(slot.id)"
              >
                <div class="slot-list-dot" />
                <span class="text-caption font-weight-medium flex-1">Slot {{ idx + 1 }}</span>
                <span class="text-caption text-medium-emphasis">
                  {{ Math.round(slot.w) }}×{{ Math.round(slot.h) }}
                </span>
                <VBtn
                  icon
                  variant="text"
                  size="x-small"
                  @click.stop="deleteSlot(slot.id)"
                >
                  <VIcon size="14" color="error">bx bx-trash</VIcon>
                </VBtn>
              </div>
            </div>
          </div>

          <VDivider />

          <!-- Stats -->
          <div class="d-flex flex-column gap-1" v-if="imageUrl">
            <div class="d-flex justify-space-between text-caption">
              <span class="text-medium-emphasis">Aspect Ratio</span>
              <span class="font-weight-bold">{{ aspectRatio || '—' }}</span>
            </div>
            <div class="d-flex justify-space-between text-caption">
              <span class="text-medium-emphasis">Jumlah Slot</span>
              <span class="font-weight-bold">{{ slots.length }}</span>
            </div>
            <div class="d-flex justify-space-between text-caption">
              <span class="text-medium-emphasis">Resolusi</span>
              <span class="font-weight-bold">{{ imageNatW }}×{{ imageNatH }}</span>
            </div>
          </div>

          <!-- Tips -->
          <div class="pa-3 rounded-lg" style="background:#f0f4ff; border: 1px solid #c7d7ff;">
            <p class="text-caption font-weight-bold mb-1" style="color:#4f46e5;">Tips</p>
            <ul class="text-caption" style="color:#555; padding-left: 16px; line-height: 1.7;">
              <li>Drag slot untuk pindah posisi</li>
              <li>Drag sudut/tepi untuk resize</li>
              <li>Tombol Delete untuk hapus slot</li>
              <li>Arrow key untuk nudge 2px</li>
              <li>Shift+Arrow untuk nudge 16px</li>
              <li>Snap Grid menjaga slot rapi</li>
            </ul>
          </div>
          </div> <!-- /config tab -->

          <!-- Preview tab -->
          <div v-if="sidebarTab === 'preview'" class="pa-3 d-flex flex-column gap-3" style="overflow-y: auto; flex: 1;">
            <!-- Header row -->
            <div class="d-flex align-center justify-space-between">
              <p class="text-caption font-weight-bold text-uppercase" style="color: #888; margin: 0;">
                Preview dengan foto sample
              </p>
              <VBtn
                v-if="imageUrl && slots.length > 0"
                icon
                variant="tonal"
                size="x-small"
                color="primary"
                title="Lihat fullscreen"
                @click="fullscreenPreview = true"
              >
                <VIcon size="16">bx bx-expand-alt</VIcon>
              </VBtn>
            </div>

            <div v-if="!imageUrl || slots.length === 0" class="text-center pa-6 text-medium-emphasis">
              <VIcon size="36" class="mb-2">bx bx-image</VIcon>
              <p class="text-caption">Upload frame dan tambahkan slot untuk melihat preview.</p>
            </div>

            <!-- Preview canvas: photos behind, frame on top -->
            <div v-else class="preview-canvas-wrapper">
              <div class="preview-canvas">
                <!-- 1) Photos rendered first (behind frame) -->
                <div
                  v-for="(slot, idx) in slots"
                  :key="slot.id"
                  class="preview-slot"
                  :style="{
                    left:   slot.x * previewScaleX + 'px',
                    top:    slot.y * previewScaleY + 'px',
                    width:  slot.w * previewScaleX + 'px',
                    height: slot.h * previewScaleY + 'px',
                  }"
                >
                  <img
                    :src="`https://picsum.photos/seed/${idx + 1}/400/600`"
                    :alt="`Sample ${idx + 1}`"
                    class="preview-slot-img"
                  />
                  <div class="preview-slot-label">{{ idx + 1 }}</div>
                </div>

                <!-- 2) Frame image on top (acts as overlay) -->
                <img
                  :src="imageUrl"
                  class="preview-frame-img"
                  draggable="false"
                  @load="onPreviewImageLoad"
                />
              </div>
            </div>

            <p class="text-caption text-medium-emphasis text-center" v-if="imageUrl && slots.length > 0">
              Foto sample dari picsum.photos
            </p>
          </div>

        </div> <!-- /sidebar -->
      </div>

      <VDivider />

      <!-- ── Footer ─────────────────────────────────────────────────── -->
      <VCardActions class="pa-4" style="flex-shrink: 0;">
        <VAlert
          v-if="saveError"
          type="error"
          density="compact"
          variant="tonal"
          class="text-caption flex-1"
          style="padding: 6px 12px;"
        >
          {{ saveError }}
        </VAlert>
        <VSpacer v-else />
        <VBtn variant="text" @click="close">Batal</VBtn>
        <VBtn color="primary" variant="elevated" prepend-icon="bx bx-save" @click="handleSave">
          {{ isEditMode ? 'Update Template' : 'Simpan Template' }}
        </VBtn>
      </VCardActions>

    </VCard>
  </VDialog>

  <!-- ── Fullscreen Preview Dialog ─────────────────────────────────────────── -->
  <VDialog v-model="fullscreenPreview" max-width="1200" scrollable>
    <VCard>
      <VCardTitle class="d-flex align-center gap-2 pa-4 pb-2" style="flex-shrink:0;">
        <VIcon color="primary">bx bx-image</VIcon>
        <span>Preview Fullscreen</span>
        <VSpacer />
        <VBtn icon variant="text" @click="fullscreenPreview = false">
          <VIcon>bx bx-x</VIcon>
        </VBtn>
      </VCardTitle>
      <VDivider />
      <VCardText class="d-flex justify-center align-center pa-6" style="overflow: auto;">
        <div class="fullscreen-preview-canvas">
          <!-- Photos behind frame -->
          <div
            v-for="(slot, idx) in slots"
            :key="slot.id"
            class="preview-slot"
            :style="{
              left:   slot.x * fullscreenScaleX + 'px',
              top:    slot.y * fullscreenScaleY + 'px',
              width:  slot.w * fullscreenScaleX + 'px',
              height: slot.h * fullscreenScaleY + 'px',
            }"
          >
            <img
              :src="`https://picsum.photos/seed/${idx + 1}/400/600`"
              :alt="`Sample ${idx + 1}`"
              class="preview-slot-img"
            />
            <div class="preview-slot-label">{{ idx + 1 }}</div>
          </div>
          <!-- Frame on top -->
          <img
            :src="imageUrl"
            class="fullscreen-frame-img"
            draggable="false"
            @load="onFullscreenImageLoad"
          />
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
/* ── Upload zone ──────────────────────────────────────────────────────────── */
.upload-zone {
  min-height: 260px;
  border: 2px dashed #c7d2fe;
  background: #f5f3ff;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.upload-zone:hover {
  background: #ede9fe;
  border-color: #818cf8;
}

/* ── Canvas scroll wrapper ────────────────────────────────────────────────── */
.canvas-scroll-wrapper {
  overflow: auto;
  flex: 1;
  min-height: 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

/* ── Canvas container ─────────────────────────────────────────────────────── */
.canvas-container {
  position: relative;
  display: inline-block;
  cursor: default;
  user-select: none;
  overflow: visible;
}

/* ── Snap grid ────────────────────────────────────────────────────────────── */
.snap-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right,  rgba(99,102,241,0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(99,102,241,0.08) 1px, transparent 1px);
  background-size: 2px 2px;
  pointer-events: none;
  z-index: 1;
}

/* ── Frame image ──────────────────────────────────────────────────────────── */
.frame-image {
  display: block;
  max-width: 1100px;
  max-height: 860px;
  width: auto;
  height: auto;
  pointer-events: none;
  position: relative;
  z-index: 0;
}

/* ── Slot overlay ─────────────────────────────────────────────────────────── */
.slot-overlay {
  position: absolute;
  border: 2px dashed var(--slot-color, #4f46e5);
  background: rgba(79, 70, 229, 0.12);
  border-radius: 4px;
  cursor: move;
  z-index: 10;
  touch-action: none;
  transition: background 0.1s;
}
.slot-overlay:hover {
  background: rgba(79, 70, 229, 0.2);
}
.slot-selected {
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.35);
}

/* ── Slot number badge ────────────────────────────────────────────────────── */
.slot-badge {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 22px;
  height: 22px;
  background: var(--slot-color, #4f46e5);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 20;
}

/* ── Size tooltip ─────────────────────────────────────────────────────────── */
.slot-size-tip {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 3px;
  pointer-events: none;
  z-index: 20;
  white-space: nowrap;
}

/* ── Resize handles ───────────────────────────────────────────────────────── */
.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  border: 2px solid var(--slot-color, #4f46e5);
  border-radius: 2px;
  z-index: 30;
  touch-action: none;
}

/* ── Slot list sidebar items ─────────────────────────────────────────────── */
.slot-list-item {
  cursor: pointer;
  transition: background 0.15s;
  border: 1px solid transparent;
}
.slot-list-item:hover {
  background: #f5f5f5;
}
.slot-list-selected {
  background: rgba(79, 70, 229, 0.08);
  border-color: rgba(79, 70, 229, 0.4) !important;
}
.slot-list-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--slot-color, #4f46e5);
  flex-shrink: 0;
}

/* ── Sidebar tabs ─────────────────────────────────────────────────────────── */
.sidebar-tab {
  flex: 1;
  padding: 10px 8px;
  font-size: 12px;
  font-weight: 600;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  color: #888;
  transition: color 0.15s, border-color 0.15s;
}
.sidebar-tab:hover { color: #4f46e5; }
.sidebar-tab-active {
  color: #4f46e5;
  border-bottom-color: #4f46e5;
}

/* ── Preview canvas ───────────────────────────────────────────────────────── */
.preview-canvas-wrapper {
  overflow: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}
.preview-canvas {
  position: relative;
  display: inline-block;
}
.preview-frame-img {
  display: block;
  max-width: 260px;
  height: auto;
  pointer-events: none;
  position: relative;
  z-index: 1;
}
.preview-slot {
  position: absolute;
  overflow: hidden;
  border-radius: 3px;
}
.preview-slot-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.preview-slot-label {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  background: rgba(0,0,0,0.55);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Fullscreen preview canvas ────────────────────────────────────────────── */
.fullscreen-preview-canvas {
  position: relative;
  display: inline-block;
}
.fullscreen-frame-img {
  display: block;
  max-width: min(80vmin, 900px);
  max-height: 80vh;
  width: auto;
  height: auto;
  pointer-events: none;
  position: relative;
  z-index: 1;
}
</style>
