<script setup lang="ts">
import type { PhotoPrice, PhotoType } from '@/types/photo'
import type { Unit } from '@/types/unit'
import type { OutletList, GetOutletsByUnitResponse } from '@/types/outlet'
import type { DataTableHeader } from '@/components/AppDataTable.vue'

const {
  getPhotoTypes, getPhotoPrices, createPhotoPricing, createPhotoType,
  deletePhotoTypeById, deletePhotoPriceById, getPhotoPriceById, getPhotoTypeById,
  updatePhotoType, updatePhotoPrice,
} = usePricings()
const { getUnits } = useUnits()
const { getOutlets, getOutletsByUnit } = useOutlets()
const toast = useToast()
const { confirm } = useConfirm()

// ── Photo Types ───────────────────────────────────────────────────────────────
const pagePhotoTypes = ref(1)
const totalPhotoTypes = ref(0)
const searchPhotoTypes = ref('')
const photoTypes = ref<PhotoType[]>([])
const isLoadingTypes = ref(false)
const isSubmittingType = ref(false)

const typeDialog = ref(false)
const editingTypeId = ref<string | null>(null)
const isEditingType = computed(() => editingTypeId.value !== null)
const blankTypeForm = () => ({ name: '', description: '', kode_folder: '' })
const typeForm = ref(blankTypeForm())

const typeHeaders: DataTableHeader[] = [
  { key: 'name', title: 'Nama' },
  { key: 'description', title: 'Deskripsi' },
  { key: 'kode_folder', title: 'Kode Folder', nowrap: true },
  { key: 'actions', title: '', align: 'end', width: '80px' },
]

// ── Photo Prices ──────────────────────────────────────────────────────────────
const pagePhotoPrices = ref(1)
const totalPhotoPrices = ref(0)
const searchPhotoPrices = ref('')
const photoPrices = ref<PhotoPrice[]>([])
const isLoadingPrices = ref(false)
const isSubmittingPrice = ref(false)

const priceDialog = ref(false)
const editingPriceId = ref<string | null>(null)
const isEditingPrice = computed(() => editingPriceId.value !== null)
const blankPriceForm = () => ({ unit_id: '', outlet_id: '', photo_type_id: '', price: 0 })
const priceForm = ref(blankPriceForm())

const units = ref<Unit[]>([])
const outletList = ref<OutletList[]>([])

const selectedUnit = computed(() => units.value.find(u => u.id === priceForm.value.unit_id) || null)

const priceHeaders: DataTableHeader[] = [
  { key: 'outlet_name', title: 'Outlet' },
  { key: 'unit_name', title: 'Unit' },
  { key: 'photo_type_name', title: 'Tipe Foto' },
  { key: 'price', title: 'Harga', nowrap: true },
  { key: 'actions', title: '', align: 'end', width: '80px' },
]

const limit = 24

// ── Fetch ─────────────────────────────────────────────────────────────────────
async function fetchPhotoTypes() {
  isLoadingTypes.value = true
  try {
    const res = await getPhotoTypes({ page: pagePhotoTypes.value, limit, search: searchPhotoTypes.value })
    photoTypes.value = res?.data || []
    totalPhotoTypes.value = res?.total || 0
    if (photoTypes.value.length > 0 && !priceForm.value.photo_type_id)
      priceForm.value.photo_type_id = photoTypes.value[0].id
  } catch { photoTypes.value = []; totalPhotoTypes.value = 0 }
  finally { isLoadingTypes.value = false }
}

async function fetchPhotoPrices() {
  isLoadingPrices.value = true
  try {
    const res = await getPhotoPrices({ page: pagePhotoPrices.value, limit, search: searchPhotoPrices.value })
    photoPrices.value = res?.photo_prices || []
    totalPhotoPrices.value = res?.total || 0
  } catch { photoPrices.value = []; totalPhotoPrices.value = 0 }
  finally { isLoadingPrices.value = false }
}

async function fetchUnitsAndOutlets() {
  try {
    const unitRes = await getUnits({ page: 1, limit: 9999 })
    units.value = unitRes?.data || []
  } catch { units.value = [] }
}

// ── Photo Type CRUD ───────────────────────────────────────────────────────────
function openCreateType() { editingTypeId.value = null; typeForm.value = blankTypeForm(); typeDialog.value = true }

async function openEditType(id: string) {
  const data = await getPhotoTypeById(id)
  if (data?.photo_type) {
    editingTypeId.value = id
    typeForm.value = { name: data.photo_type.name, description: data.photo_type.description, kode_folder: data.photo_type.kode_folder }
    typeDialog.value = true
  }
}

async function submitType() {
  isSubmittingType.value = true
  try {
    if (isEditingType.value) {
      await updatePhotoType(editingTypeId.value!, typeForm.value)
      toast.success('Tipe foto diperbarui')
    } else {
      await createPhotoType(typeForm.value)
      toast.success('Tipe foto ditambahkan')
    }
    typeDialog.value = false
    await fetchPhotoTypes()
  } catch (e: any) { toast.error(e?.message ?? 'Gagal menyimpan') }
  finally { isSubmittingType.value = false }
}

async function deleteType(id: string) {
  if (!await confirm({ title: 'Hapus Tipe Foto', message: 'Hapus tipe foto ini?', tone: 'danger', confirmText: 'Hapus' })) return
  await deletePhotoTypeById(id)
  toast.success('Tipe foto dihapus')
  await fetchPhotoTypes()
}

// ── Photo Price CRUD ──────────────────────────────────────────────────────────
function openCreatePrice() { editingPriceId.value = null; priceForm.value = blankPriceForm(); outletList.value = []; priceDialog.value = true }

async function openEditPrice(id: string) {
  const data = await getPhotoPriceById(id)
  if (data?.photo_price) {
    editingPriceId.value = id
    priceForm.value = { ...data.photo_price }
    if (priceForm.value.unit_id) await fetchOutletsByUnit(priceForm.value.unit_id)
    priceDialog.value = true
  }
}

async function fetchOutletsByUnit(unitId: string) {
  const outletRes = await getOutletsByUnit(unitId) as GetOutletsByUnitResponse
  if (outletRes?.status_code === 200 && Array.isArray(outletRes.outlets)) {
    outletList.value = outletRes.outlets
    if (!outletList.value.some(o => o.id === priceForm.value.outlet_id))
      priceForm.value.outlet_id = outletRes.outlets[0]?.id || ''
  } else {
    outletList.value = []
    priceForm.value.outlet_id = ''
  }
}

async function submitPrice() {
  isSubmittingPrice.value = true
  try {
    if (isEditingPrice.value) {
      const payload = { unit_id: priceForm.value.unit_id, outlet_id: priceForm.value.outlet_id, photo_type_id: priceForm.value.photo_type_id, price: Number(priceForm.value.price) }
      await updatePhotoPrice(editingPriceId.value!, payload)
      toast.success('Pricing diperbarui')
    } else {
      await createPhotoPricing(priceForm.value)
      toast.success('Pricing ditambahkan')
    }
    priceDialog.value = false
    await fetchPhotoPrices()
  } catch { toast.error('Pricing untuk unit dan tipe foto ini sudah ada') }
  finally { isSubmittingPrice.value = false }
}

async function deletePrice(id: string) {
  if (!await confirm({ title: 'Hapus Pricing', message: 'Hapus pricing ini?', tone: 'danger', confirmText: 'Hapus' })) return
  await deletePhotoPriceById(id)
  toast.success('Pricing dihapus')
  await fetchPhotoPrices()
}

watch([pagePhotoTypes, searchPhotoTypes], fetchPhotoTypes)
watch([pagePhotoPrices, searchPhotoPrices], fetchPhotoPrices)
watch(() => priceForm.value.unit_id, async (newUnitId) => {
  if (newUnitId) await fetchOutletsByUnit(newUnitId)
  else { outletList.value = []; priceForm.value.outlet_id = '' }
})

onMounted(() => { fetchPhotoTypes(); fetchPhotoPrices(); fetchUnitsAndOutlets() })
</script>

<template>
  <div>
    <PageHeader title="Photo Pricing" subtitle="Kelola tipe foto dan harga per outlet." />

    <!-- Photo Types -->
    <VCard rounded="lg" class="mb-6">
      <AppDataTable
        :headers="typeHeaders"
        :items="photoTypes"
        :loading="isLoadingTypes"
        show-index
        :page="pagePhotoTypes"
        :items-per-page="limit"
        :total="totalPhotoTypes"
        empty-title="Belum ada tipe foto"
        @update:page="p => { pagePhotoTypes = p; fetchPhotoTypes() }"
      >
        <template #toolbar>
          <span class="text-subtitle-2 font-weight-bold">Tipe Foto</span>
          <VSpacer />
          <VTextField v-model="searchPhotoTypes" placeholder="Cari tipe foto..." prepend-inner-icon="bx-search" clearable style="max-width:260px" />
          <VBtn color="primary" prepend-icon="bx-plus" class="ml-3" @click="openCreateType">Tambah</VBtn>
        </template>

        <template #item.kode_folder="{ item }">
          <VChip color="error" size="small" variant="tonal">{{ item.kode_folder }}</VChip>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end" style="gap:4px">
            <VBtn icon variant="text" size="small" @click="openEditType(item.id)"><VIcon color="warning" icon="bx-edit-alt" /></VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="deleteType(item.id)"><VIcon icon="bx-trash-alt" /></VBtn>
          </div>
        </template>
      </AppDataTable>
    </VCard>

    <!-- Photo Prices -->
    <VCard rounded="lg">
      <AppDataTable
        :headers="priceHeaders"
        :items="photoPrices"
        :loading="isLoadingPrices"
        show-index
        :page="pagePhotoPrices"
        :items-per-page="limit"
        :total="totalPhotoPrices"
        empty-title="Belum ada pricing"
        @update:page="p => { pagePhotoPrices = p; fetchPhotoPrices() }"
      >
        <template #toolbar>
          <span class="text-subtitle-2 font-weight-bold">Pricing</span>
          <VSpacer />
          <VTextField v-model="searchPhotoPrices" placeholder="Cari pricing..." prepend-inner-icon="bx-search" clearable style="max-width:260px" />
          <VBtn color="primary" prepend-icon="bx-plus" class="ml-3" @click="openCreatePrice">Tambah</VBtn>
        </template>

        <template #item.price="{ item }">Rp {{ item.price.toLocaleString() }}</template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end" style="gap:4px">
            <VBtn icon variant="text" size="small" @click="openEditPrice(item.id)"><VIcon color="warning" icon="bx-edit-alt" /></VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="deletePrice(item.id)"><VIcon icon="bx-trash-alt" /></VBtn>
          </div>
        </template>
      </AppDataTable>
    </VCard>

    <!-- Type modal -->
    <AppModal
      v-model="typeDialog"
      :title="isEditingType ? 'Edit Tipe Foto' : 'Tambah Tipe Foto'"
      icon="bx-category"
      :loading="isSubmittingType"
      :confirm-text="isEditingType ? 'Update' : 'Simpan'"
      cancel-text="Batal"
      @confirm="submitType"
    >
      <VRow>
        <VCol cols="12" md="6">
          <VTextField v-model="typeForm.name" label="Nama Tipe Foto" />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField v-model="typeForm.kode_folder" label="Kode Folder" />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="typeForm.description" label="Deskripsi" />
        </VCol>
      </VRow>
    </AppModal>

    <!-- Price modal -->
    <AppModal
      v-model="priceDialog"
      :title="isEditingPrice ? 'Edit Pricing' : 'Tambah Pricing'"
      icon="bx-purchase-tag"
      :loading="isSubmittingPrice"
      :confirm-text="isEditingPrice ? 'Update' : 'Simpan'"
      cancel-text="Batal"
      @confirm="submitPrice"
    >
      <VRow>
        <VCol cols="12" md="6">
          <VSelect
            v-model="priceForm.unit_id"
            :items="units"
            item-value="id"
            item-title="name"
            label="Unit"
            :hint="selectedUnit?.location"
            persistent-hint
          />
        </VCol>
        <VCol cols="12" md="6">
          <VSelect
            v-model="priceForm.outlet_id"
            :items="outletList"
            item-value="id"
            item-title="name"
            label="Outlet"
          />
        </VCol>
        <VCol cols="12" md="6">
          <VSelect
            v-model="priceForm.photo_type_id"
            :items="photoTypes"
            item-value="id"
            item-title="name"
            label="Tipe Foto"
          />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            v-model="priceForm.price"
            label="Harga"
            prefix="Rp"
            hint="Rp 0 jika foto gratis"
            persistent-hint
          />
        </VCol>
      </VRow>
    </AppModal>
  </div>
</template>
