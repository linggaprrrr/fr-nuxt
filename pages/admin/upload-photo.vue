<script setup lang="ts">
import type { Unit } from '@/types/unit'
import type { OutletList, GetOutletsByUnitResponse } from '@/types/outlet'

const { uploadImages } = useFaces()
const { getUnits } = useUnits()
const { getPhotoPricesByOutlet } = usePricings()
const { getOutletsByUnit } = useOutlets()
const toast = useToast()

const files = ref<File[]>([])
const loading = ref(false)
const progress = ref(0)

const photoParams = reactive({
  unit_id: '',
  outlet_id: '',
  photo_type_id: null as string | null,
})

const units = ref<Unit[]>([])
const outletList = ref<OutletList[]>([])
const photoPricesByOutlet = ref<any[]>([])

const selectedUnit = computed(() => units.value.find(u => u.id === photoParams.unit_id) || null)

async function fetchUnits() {
  try {
    const res = await getUnits({ page: 1, limit: 9999 })
    units.value = res?.data || []
  } catch { units.value = [] }
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
      photoParams.photo_type_id = photoPricesByOutlet.value.length > 0
        ? photoPricesByOutlet.value[0].photo_type_id
        : null
    } else {
      photoPricesByOutlet.value = []
      photoParams.photo_type_id = null
    }
  } catch {
    photoPricesByOutlet.value = []
    photoParams.photo_type_id = null
  }
}

const handleUpload = async () => {
  if (!photoParams.unit_id || !photoParams.photo_type_id) {
    toast.error('Pilih Unit dan Tipe Foto terlebih dahulu.')
    files.value = []
    return
  }
  if (files.value.length === 0 || loading.value) return
  loading.value = true
  try {
    await uploadImages(
      photoParams.unit_id,
      photoParams.outlet_id,
      photoParams.photo_type_id,
      files.value,
      (uploadedPercentage: number) => { progress.value = uploadedPercentage },
    )
    toast.success('Files uploaded successfully!')
    files.value = []
  } catch {
    toast.error('Upload failed. Please try again.')
  } finally {
    loading.value = false
  }
}

watch(() => photoParams.unit_id, async (newUnitId) => {
  if (newUnitId) await fetchOutletsByUnit(newUnitId)
  else { outletList.value = []; photoParams.outlet_id = ''; photoPricesByOutlet.value = [] }
}, { immediate: true })

watch(() => photoParams.outlet_id, async (outletId) => {
  if (outletId) await fetchPricesByOutlet(outletId)
})

watch(files, async (newFiles) => {
  if (newFiles && newFiles.length > 0) await handleUpload()
})

onMounted(fetchUnits)
</script>

<template>
  <div>
    <PageHeader title="Upload Foto" subtitle="Upload foto ke sistem dari perangkat kiosk." />

    <VCard rounded="lg">
      <VCardText>
        <VForm>
          <VRow>
            <VCol cols="12" md="4">
              <VSelect
                v-model="photoParams.unit_id"
                :items="units"
                item-value="id"
                item-title="name"
                label="1. Pilih Unit"
                :hint="selectedUnit?.location"
                persistent-hint
              />
            </VCol>
            <VCol cols="12" md="4">
              <VSelect
                v-model="photoParams.outlet_id"
                :items="outletList"
                item-value="id"
                item-title="name"
                label="2. Pilih Outlet"
              />
            </VCol>
            <VCol cols="12" md="4">
              <VSelect
                v-model="photoParams.photo_type_id"
                :items="photoPricesByOutlet"
                item-value="photo_type_id"
                :item-title="(item: any) => `${item.photo_type_name ?? 'Select first'} - ${item.price?.toLocaleString() ?? '0'} IDR`"
                label="3. Pilih Tipe Foto"
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol cols="12">
              <VFileUpload
                v-model="files"
                accept="image/*"
                clearable
                prepend-icon="bx-upload"
                multiple
                :disabled="loading"
                class="mb-4"
              />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VProgressLinear
      v-if="loading"
      :model-value="progress"
      color="primary"
      height="16"
      striped
      class="mt-6 rounded-pill"
    >
      <strong class="ms-4 text-white">Uploading...</strong>
    </VProgressLinear>
  </div>
</template>
