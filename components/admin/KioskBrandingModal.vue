<script setup lang="ts">
import { ref, watch, computed, onBeforeUnmount } from 'vue'
import { getApiErrorMessage } from '@/utils/apiHelpers'

// Kiosk branding + Settings PIN for one outlet. Kiosks pick these up on their
// next boot (see useBranding.js in face-finder-desktop), so a rebrand lands the
// following morning rather than mid-session.
const props = defineProps<{
  modelValue: boolean
  outlet: { id: string, name: string } | null
}>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const { getOutletBranding, updateOutletBranding, setOutletSettingsPin } = useOutlets()
const toast = useToast()

const isSubmitting = ref(false)
const isLoading = ref(false)
const primaryColor = ref('#017DC5')
const banner = ref<File | null>(null)
const background = ref<File | null>(null)
const clearBanner = ref(false)
const clearBackground = ref(false)
const pin = ref('')
const pinConfirm = ref('')

// Keys match the kiosk's own SIDEBAR_TOOLS (face-finder-desktop
// PhotoEditor.jsx) — this list only decides which Indonesian label to show
// next to each toggle, not what's valid; the backend stores whatever keys
// are checked here without validating against a fixed set.
const EDITOR_TOOLS = [
  { key: 'stickers', label: 'Stiker' },
  { key: 'frames', label: 'Bingkai' },
  { key: 'text', label: 'Teks' },
  { key: 'upload', label: 'Foto Sendiri' },
  { key: 'filters', label: 'Filter' },
  { key: 'ai', label: 'AI' },
]
const toolEnabled = ref<Record<string, boolean>>(
  Object.fromEntries(EDITOR_TOOLS.map(t => [t.key, true]))
)

// What the outlet already has, so the preview can show the saved images when
// no new file has been picked.
const savedBannerUrl = ref<string | null>(null)
const savedBackgroundUrl = ref<string | null>(null)
const showPreview = ref(false)

// Where the splash's Start button sits, as one of nine anchors. Nine presets
// rather than free x/y: a percentage tuned to one banner lands badly when the
// artwork or the kiosk's screen ratio changes, and nobody is standing there
// to notice it covering the subject's face.
const CTA_POSITIONS = [
  ['top-left', 'top-center', 'top-right'],
  ['middle-left', 'middle-center', 'middle-right'],
  ['bottom-left', 'bottom-center', 'bottom-right'],
]
const bannerCtaPosition = ref('bottom-center')
// Empty = use the kiosk's own translated default, so the button still follows
// the customer's ID/EN toggle unless an outlet deliberately overrides it.
const bannerCtaLabel = ref('')

// Object URLs for files chosen but not yet uploaded — the whole point is to
// judge the branding *before* saving. Revoked on replacement and on close so
// the blobs don't accumulate over a session of trying images.
const bannerObjectUrl = ref<string | null>(null)
const backgroundObjectUrl = ref<string | null>(null)

function revokeObjectUrls() {
  if (bannerObjectUrl.value) URL.revokeObjectURL(bannerObjectUrl.value)
  if (backgroundObjectUrl.value) URL.revokeObjectURL(backgroundObjectUrl.value)
  bannerObjectUrl.value = null
  backgroundObjectUrl.value = null
}

watch(banner, (f) => {
  if (bannerObjectUrl.value) URL.revokeObjectURL(bannerObjectUrl.value)
  bannerObjectUrl.value = f ? URL.createObjectURL(f) : null
})
watch(background, (f) => {
  if (backgroundObjectUrl.value) URL.revokeObjectURL(backgroundObjectUrl.value)
  backgroundObjectUrl.value = f ? URL.createObjectURL(f) : null
})

// Pending state, in the order the backend applies it: a newly picked file
// wins, then the clear checkbox, then whatever is already saved.
const previewBannerUrl = computed(() => {
  if (bannerObjectUrl.value) return bannerObjectUrl.value
  return clearBanner.value ? null : savedBannerUrl.value
})
const previewBackgroundUrl = computed(() => {
  if (backgroundObjectUrl.value) return backgroundObjectUrl.value
  return clearBackground.value ? null : savedBackgroundUrl.value
})

onBeforeUnmount(revokeObjectUrls)

const dialog = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

watch(() => props.modelValue, async (open) => {
  // Closing: drop the blobs and collapse the preview so reopening starts clean
  // rather than showing the last outlet's images.
  if (!open) {
    revokeObjectUrls()
    showPreview.value = false
    return
  }
  if (!props.outlet) return
  // The PIN is write-only server-side, so there is nothing to prefill — an
  // empty box here means "leave the current PIN alone".
  primaryColor.value = '#017DC5'
  banner.value = null
  background.value = null
  savedBannerUrl.value = null
  savedBackgroundUrl.value = null
  clearBanner.value = false
  clearBackground.value = false
  pin.value = ''
  pinConfirm.value = ''
  EDITOR_TOOLS.forEach((t) => { toolEnabled.value[t.key] = true })

  // Prefill from the server. Every field here is submitted on save, so opening
  // on defaults would quietly rewrite the outlet's real settings — re-enabling
  // tools an admin had turned off, and resetting a custom colour.
  isLoading.value = true
  try {
    const res: any = await getOutletBranding(props.outlet.id)
    const data = res?.data ?? res ?? {}
    if (data.primary_color) primaryColor.value = data.primary_color
    savedBannerUrl.value = data.banner_url ?? null
    bannerCtaPosition.value = data.banner_cta_position ?? 'bottom-center'
    bannerCtaLabel.value = data.banner_cta_label ?? ''
    savedBackgroundUrl.value = data.background_url ?? null
    const disabled: string[] = data.disabled_tools ?? []
    EDITOR_TOOLS.forEach((t) => { toolEnabled.value[t.key] = !disabled.includes(t.key) })
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
    dialog.value = false  // saving now would overwrite with defaults
  } finally {
    isLoading.value = false
  }
}, { immediate: true })  // also covers a modal mounted already-open

// Vuetify's inputmode="numeric" only hints the on-screen keyboard — a physical
// keyboard can still type letters — so strip anything non-digit here instead
// of just flagging it after the fact.
function sanitizePin(v: string) {
  return v.replace(/\D/g, '').slice(0, 6)
}

// Blocking at keydown (rather than relying on sanitizePin alone) matters: when
// a rejected keystroke sanitizes back to the SAME string the field already
// held, Vue sees no change and skips re-patching the DOM, so the rejected
// character would otherwise stay visibly stuck in the box even though state
// is clean. Blocking here means it never reaches the DOM in the first place.
// ponytail: paste still goes through sanitizePin only, so a pasted letter can
// briefly show before being stripped — upgrade if that surfaces as an issue.
function blockNonDigitKey(e: KeyboardEvent) {
  if (e.ctrlKey || e.metaKey || e.altKey) return
  const allowed = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter']
  if (allowed.includes(e.key)) return
  if (!/^\d$/.test(e.key)) e.preventDefault()
}

// Mirrors the backend's own rule, so the obvious mistakes are caught before a
// round trip rather than coming back as a 400.
const pinFormatError = computed(() => {
  if (!pin.value) return ''
  if (!/^\d{6}$/.test(pin.value)) return 'PIN harus 6 angka'
  if (/^(\d)\1{5}$/.test(pin.value)) return 'PIN terlalu mudah ditebak'
  if ('01234567890'.includes(pin.value) || '09876543210'.includes(pin.value)) return 'PIN terlalu mudah ditebak'
  return ''
})
const pinMatchError = computed(() => {
  if (!pin.value || !pinConfirm.value) return ''
  return pin.value !== pinConfirm.value ? 'Konfirmasi PIN tidak cocok' : ''
})

async function submit() {
  if (!props.outlet) return
  if (pin.value && (pinFormatError.value || pin.value !== pinConfirm.value)) {
    toast.warning(pinFormatError.value || 'Konfirmasi PIN tidak cocok')
    return
  }

  isSubmitting.value = true
  try {
    await updateOutletBranding(props.outlet.id, {
      primaryColor: primaryColor.value,
      banner: banner.value,
      background: background.value,
      clearBanner: clearBanner.value,
      clearBackground: clearBackground.value,
      bannerCtaPosition: bannerCtaPosition.value,
      bannerCtaLabel: bannerCtaLabel.value,
      disabledTools: EDITOR_TOOLS.filter(t => !toolEnabled.value[t.key]).map(t => t.key),
    })
    // Separate call on purpose: branding is cosmetic and the PIN is a
    // credential, so a failed upload must never half-apply a new PIN.
    if (pin.value) await setOutletSettingsPin(props.outlet.id, pin.value)

    toast.success('Branding kiosk tersimpan')
    dialog.value = false
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <AppModal
    v-model="dialog"
    :title="`Branding Kiosk — ${outlet?.name ?? ''}`"
    icon="bx-palette"
    max-width="640"
    :loading="isSubmitting || isLoading"
    :confirm-disabled="isLoading"
    confirm-text="Simpan"
    cancel-text="Batal"
    @confirm="submit"
  >
    <VRow>
      <VCol cols="12">
        <label class="text-body-2 font-weight-medium d-block mb-2">Warna Utama</label>
        <div class="d-flex align-center" style="gap: 12px;">
          <input v-model="primaryColor" type="color" style="width: 44px; height: 40px; border: none; background: none; cursor: pointer; padding: 0;" >
          <VTextField
            v-model="primaryColor"
            hide-details
            placeholder="#017DC5"
            style="max-width: 160px;"
          />
        </div>
        <span class="text-caption text-medium-emphasis d-block mt-1">
          Tombol, progres, sorotan, dan halaman QR mengikuti warna ini.
        </span>
      </VCol>

      <VCol cols="12" md="6">
        <VFileInput
          v-model="banner"
          label="Banner (layar sambutan)"
          accept="image/png,image/jpeg,image/webp,image/gif"
          prepend-icon="bx-image"
          prepend-inner-icon=""
          :disabled="clearBanner"
        />
        <VCheckbox v-model="clearBanner" label="Hapus banner saat ini" density="compact" hide-details />

        <!-- Only meaningful when a banner exists to sit the button on. -->
        <div v-if="previewBannerUrl" class="mt-3">
          <VTextField
            v-model="bannerCtaLabel"
            label="Teks tombol"
            placeholder="Mulai"
            maxlength="40"
            counter="40"
            density="compact"
            hint="Kosongkan untuk memakai teks bawaan (mengikuti bahasa ID/EN)."
            persistent-hint
            class="mb-3"
          />
          <div class="text-caption font-weight-medium mb-1">Posisi tombol</div>
          <div class="text-caption text-medium-emphasis mb-2">
            Pilih sudut yang tidak menutupi bagian penting banner.
          </div>
          <div class="cta-grid">
            <button
              v-for="pos in CTA_POSITIONS.flat()"
              :key="pos"
              type="button"
              class="cta-cell"
              :class="{ 'cta-cell--on': bannerCtaPosition === pos }"
              :aria-label="pos"
              @click="bannerCtaPosition = pos"
            />
          </div>
        </div>
      </VCol>

      <VCol cols="12" md="6">
        <VFileInput
          v-model="background"
          label="Latar belakang (global)"
          accept="image/png,image/jpeg,image/webp"
          prepend-icon="bx-landscape"
          prepend-inner-icon=""
          :disabled="clearBackground"
        />
        <VCheckbox v-model="clearBackground" label="Hapus latar saat ini" density="compact" hide-details />
      </VCol>

      <VCol cols="12">
        <VBtn
          variant="tonal"
          color="primary"
          size="small"
          :prepend-icon="showPreview ? 'bx-chevron-up' : 'bx-show'"
          @click="showPreview = !showPreview"
        >
          {{ showPreview ? 'Sembunyikan pratinjau' : 'Lihat pratinjau kiosk' }}
        </VBtn>
      </VCol>

      <!-- Shows the pending state, including files not yet uploaded, so the
           branding can be judged before saving and restarting a kiosk. -->
      <VCol v-if="showPreview" cols="12">
        <KioskBrandingPreview
          :banner-url="previewBannerUrl"
          :background-url="previewBackgroundUrl"
          :primary-color="primaryColor"
          :cta-position="bannerCtaPosition"
          :cta-label="bannerCtaLabel"
          :outlet-name="outlet?.name ?? ''"
        />
      </VCol>

      <VCol cols="12">
        <VAlert type="info" variant="tonal" density="compact" class="text-caption">
          Maksimal 12MB per gambar. Banner: PNG/JPEG/WebP/GIF (GIF bisa bergerak). Latar: PNG/JPEG/WebP. Setelah disimpan, tekan "Sinkronkan" di Pengaturan kiosk agar perubahan langsung tampil — tidak perlu menyalakan ulang.
        </VAlert>
      </VCol>

      <VCol cols="12">
        <VDivider class="mb-4" />
        <label class="text-body-2 font-weight-medium d-block mb-1">Alat Edit Kiosk</label>
        <p class="text-caption text-medium-emphasis mb-3">
          Alat yang tersedia saat pelanggan mengedit foto di kiosk. Nonaktifkan yang tidak
          ingin ditawarkan di outlet ini.
        </p>
        <VRow dense>
          <VCol v-for="tool in EDITOR_TOOLS" :key="tool.key" cols="6" md="4">
            <VCheckbox v-model="toolEnabled[tool.key]" :label="tool.label" density="compact" hide-details />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VDivider class="mb-4" />
        <label class="text-body-2 font-weight-medium d-block mb-1">PIN Pengaturan Kiosk</label>
        <p class="text-caption text-medium-emphasis mb-3">
          6 angka, untuk membuka Pengaturan Perangkat &amp; Printer di kiosk.
          Kosongkan bila tidak ingin mengubah. PIN tidak bisa dilihat kembali — hanya diganti.
        </p>
        <VRow>
          <VCol cols="12" md="6">
            <VTextField
              :model-value="pin"
              label="PIN baru"
              type="password"
              inputmode="numeric"
              maxlength="6"
              :error-messages="pinFormatError ? [pinFormatError] : []"
              @keydown="blockNonDigitKey"
              @update:model-value="pin = sanitizePin($event)"
            />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField
              :model-value="pinConfirm"
              label="Ulangi PIN"
              type="password"
              inputmode="numeric"
              maxlength="6"
              :error-messages="pinMatchError ? [pinMatchError] : []"
              @keydown="blockNonDigitKey"
              @update:model-value="pinConfirm = sanitizePin($event)"
            />
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </AppModal>
</template>

<style scoped>
/* Nine anchors laid out as they appear on screen, so the control is a map of
   the kiosk rather than a dropdown of names nobody can picture. */
.cta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  width: 132px;
  aspect-ratio: 16 / 10;
  padding: 4px;
  border: 1px solid rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.03);
}

.cta-cell {
  border: 1px dashed rgba(0, 0, 0, 0.22);
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s;
}
.cta-cell:hover { background: rgba(0, 0, 0, 0.06); }
.cta-cell--on {
  background: rgb(var(--v-theme-primary));
  border-style: solid;
  border-color: rgb(var(--v-theme-primary));
}
</style>
