<script setup lang="ts">
import { ref, watch, computed } from 'vue'
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

const dialog = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

watch(() => props.modelValue, async (open) => {
  if (!open || !props.outlet) return
  // The PIN is write-only server-side, so there is nothing to prefill — an
  // empty box here means "leave the current PIN alone".
  primaryColor.value = '#017DC5'
  banner.value = null
  background.value = null
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
            density="compact"
            variant="outlined"
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
          accept="image/png,image/jpeg,image/webp"
          prepend-icon="bx-image"
          prepend-inner-icon=""
          density="compact"
          variant="outlined"
          :disabled="clearBanner"
        />
        <VCheckbox v-model="clearBanner" label="Hapus banner saat ini" density="compact" hide-details />
      </VCol>

      <VCol cols="12" md="6">
        <VFileInput
          v-model="background"
          label="Latar belakang (global)"
          accept="image/png,image/jpeg,image/webp"
          prepend-icon="bx-landscape"
          prepend-inner-icon=""
          density="compact"
          variant="outlined"
          :disabled="clearBackground"
        />
        <VCheckbox v-model="clearBackground" label="Hapus latar saat ini" density="compact" hide-details />
      </VCol>

      <VCol cols="12">
        <VAlert type="info" variant="tonal" density="compact" class="text-caption">
          Maksimal 5MB per gambar (PNG/JPEG/WebP). Kiosk memuat branding saat booting,
          jadi perubahan tampil setelah kiosk dinyalakan ulang.
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
              density="compact"
              variant="outlined"
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
              density="compact"
              variant="outlined"
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
