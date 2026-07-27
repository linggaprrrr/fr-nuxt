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

const { updateOutletBranding, setOutletSettingsPin } = useOutlets()
const toast = useToast()

const isSubmitting = ref(false)
const primaryColor = ref('#017DC5')
const banner = ref<File | null>(null)
const background = ref<File | null>(null)
const clearBanner = ref(false)
const clearBackground = ref(false)
const pin = ref('')
const pinConfirm = ref('')

const dialog = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

watch(() => props.modelValue, (open) => {
  if (!open) return
  // The PIN is write-only server-side, so there is nothing to prefill — an
  // empty box here means "leave the current PIN alone".
  primaryColor.value = '#017DC5'
  banner.value = null
  background.value = null
  clearBanner.value = false
  clearBackground.value = false
  pin.value = ''
  pinConfirm.value = ''
})

// Mirrors the backend's own rule, so the obvious mistakes are caught before a
// round trip rather than coming back as a 400.
const pinError = computed(() => {
  if (!pin.value) return ''
  if (!/^\d{6}$/.test(pin.value)) return 'PIN harus 6 angka'
  if (/^(\d)\1{5}$/.test(pin.value)) return 'PIN terlalu mudah ditebak'
  if ('01234567890'.includes(pin.value) || '09876543210'.includes(pin.value)) return 'PIN terlalu mudah ditebak'
  if (pinConfirm.value && pin.value !== pinConfirm.value) return 'Konfirmasi PIN tidak cocok'
  return ''
})

async function submit() {
  if (!props.outlet) return
  if (pin.value && pinError.value) {
    toast.warning(pinError.value)
    return
  }
  if (pin.value && pin.value !== pinConfirm.value) {
    toast.warning('Konfirmasi PIN tidak cocok')
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
    :loading="isSubmitting"
    confirm-text="Simpan"
    cancel-text="Batal"
    @confirm="submit"
  >
    <VRow>
      <VCol cols="12">
        <label class="text-body-2 font-weight-medium d-block mb-2">Warna Utama</label>
        <div class="d-flex align-center" style="gap: 12px;">
          <input v-model="primaryColor" type="color" style="width: 52px; height: 40px; border: none; background: none; cursor: pointer;" >
          <VTextField
            v-model="primaryColor"
            density="compact"
            variant="outlined"
            hide-details
            placeholder="#017DC5"
            style="max-width: 160px;"
          />
          <span class="text-caption text-medium-emphasis">
            Tombol, progres, sorotan, dan halaman QR mengikuti warna ini.
          </span>
        </div>
      </VCol>

      <VCol cols="12" md="6">
        <VFileInput
          v-model="banner"
          label="Banner (layar sambutan)"
          accept="image/png,image/jpeg,image/webp"
          prepend-icon="bx-image"
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
        <label class="text-body-2 font-weight-medium d-block mb-1">PIN Pengaturan Kiosk</label>
        <p class="text-caption text-medium-emphasis mb-3">
          6 angka, untuk membuka Pengaturan Perangkat &amp; Printer di kiosk.
          Kosongkan bila tidak ingin mengubah. PIN tidak bisa dilihat kembali — hanya diganti.
        </p>
        <VRow>
          <VCol cols="12" md="6">
            <VTextField
              v-model="pin"
              label="PIN baru"
              type="password"
              inputmode="numeric"
              maxlength="6"
              density="compact"
              variant="outlined"
              :error-messages="pinError ? [pinError] : []"
            />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField
              v-model="pinConfirm"
              label="Ulangi PIN"
              type="password"
              inputmode="numeric"
              maxlength="6"
              density="compact"
              variant="outlined"
            />
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </AppModal>
</template>
