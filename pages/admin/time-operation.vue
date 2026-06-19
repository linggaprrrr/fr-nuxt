<script setup lang="ts">
import type { Unit } from '@/types/unit'
import type { TimeOperation, TimeOperationCreate, UnitStatus } from '@/types/time_operation'
import type { DataTableHeader } from '@/components/AppDataTable.vue'

const { getUnits } = useUnits()
const { getTimeOperations, setUnitHours, updateTimeOperation, deleteTimeOperation, getUnitStatus } = useTimeOperation()
const toast = useToast()
const { confirm } = useConfirm()

const isLoading = ref(false)
const isSubmitting = ref(false)
const timeOperations = ref<TimeOperation[]>([])
const units = ref<Unit[]>([])
const search = ref('')

const createDialog = ref(false)
const editDialog = ref(false)
const statusDialog = ref(false)
const selectedUnit = ref<Unit | null>(null)
const unitStatus = ref<UnitStatus | null>(null)

const createForm = ref<TimeOperationCreate>({
  unit_id: '', opening_time: '08:00', closing_time: '22:00', notes: '', is_active: true,
})

const editForm = ref<TimeOperation>({
  id: '', unit_id: '', opening_time: '', closing_time: '', notes: '', is_active: true, created_at: '',
})

const filteredTimeOperations = computed(() => {
  if (!search.value) return timeOperations.value
  return timeOperations.value.filter(to =>
    to.unit_name?.toLowerCase().includes(search.value.toLowerCase()) ||
    to.unit_code?.toLowerCase().includes(search.value.toLowerCase())
  )
})

const availableUnits = computed(() => {
  const usedUnitIds = timeOperations.value.map(to => to.unit_id)
  return units.value.filter(unit => !usedUnitIds.includes(unit.id))
})

const headers: DataTableHeader[] = [
  { key: 'unit', title: 'Unit' },
  { key: 'location', title: 'Lokasi' },
  { key: 'opening_time', title: 'Jam Buka', nowrap: true },
  { key: 'closing_time', title: 'Jam Tutup', nowrap: true },
  { key: 'is_active', title: 'Status' },
  { key: 'notes', title: 'Catatan' },
  { key: 'created_at', title: 'Dibuat', nowrap: true },
  { key: 'actions', title: '', align: 'end', width: '80px' },
]

async function fetchTimeOperations() {
  isLoading.value = true
  try {
    const data = await getTimeOperations({})
    timeOperations.value = data || []
  } catch { timeOperations.value = [] }
  finally { isLoading.value = false }
}

async function fetchUnits() {
  try {
    const res = await getUnits({ limit: 1000 })
    units.value = res?.data || []
  } catch { units.value = [] }
}

async function handleCreate() {
  isSubmitting.value = true
  try {
    await setUnitHours(createForm.value.unit_id, createForm.value)
    toast.success('Jam operasional berhasil ditambahkan')
    createDialog.value = false
    resetCreateForm()
    await fetchTimeOperations()
  } catch (error: any) {
    toast.error(error?.message ?? 'Gagal menyimpan')
  } finally {
    isSubmitting.value = false
  }
}

function openEditModal(timeOperation: TimeOperation) {
  editForm.value = { ...timeOperation }
  editDialog.value = true
}

async function handleUpdate() {
  isSubmitting.value = true
  try {
    await updateTimeOperation(editForm.value.id, {
      opening_time: editForm.value.opening_time,
      closing_time: editForm.value.closing_time,
      notes: editForm.value.notes,
      is_active: editForm.value.is_active,
    })
    toast.success('Jam operasional diperbarui')
    editDialog.value = false
    await fetchTimeOperations()
  } catch (error: any) {
    toast.error(error?.message ?? 'Gagal memperbarui')
  } finally {
    isSubmitting.value = false
  }
}

async function confirmDelete(timeOperation: TimeOperation) {
  if (!await confirm({
    title: 'Hapus Jam Operasional',
    message: `Nonaktifkan jam operasional untuk ${timeOperation.unit_name}?`,
    tone: 'danger',
    confirmText: 'Hapus',
  })) return
  try {
    await deleteTimeOperation(timeOperation.id)
    toast.success('Jam operasional dihapus')
    await fetchTimeOperations()
  } catch (error: any) {
    toast.error(error?.message ?? 'Gagal menghapus')
  }
}

async function checkUnitStatus(unit: Unit) {
  try {
    selectedUnit.value = unit
    unitStatus.value = await getUnitStatus(unit.id)
    statusDialog.value = true
  } catch { toast.error('Gagal mengambil status unit') }
}

function resetCreateForm() {
  createForm.value = { unit_id: '', opening_time: '08:00', closing_time: '22:00', notes: '', is_active: true }
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'open': return 'success'
    case 'closed': return 'error'
    case 'break time': return 'warning'
    default: return 'info'
  }
}

onMounted(() => { fetchUnits(); fetchTimeOperations() })
</script>

<template>
  <div>
    <PageHeader title="Jam Operasional" subtitle="Kelola jam buka/tutup setiap unit.">
      <template #actions>
        <VBtn color="primary" prepend-icon="bx-plus" :disabled="availableUnits.length === 0" @click="createDialog = true">
          Tambah Jam Operasional
        </VBtn>
      </template>
    </PageHeader>

    <VCard rounded="lg">
      <AppDataTable
        :headers="headers"
        :items="filteredTimeOperations"
        :loading="isLoading"
        show-index
        :total="filteredTimeOperations.length"
        empty-title="Belum ada jam operasional"
        empty-text="Klik 'Tambah Jam Operasional' untuk memulai."
      >
        <template #toolbar>
          <VTextField v-model="search" placeholder="Cari unit..." prepend-inner-icon="bx-search" clearable style="max-width:320px" />
        </template>

        <template #item.unit="{ item }">
          <div class="font-weight-medium">{{ item.unit_name }}</div>
          <div class="text-caption text-medium-emphasis">{{ item.unit_code }}</div>
        </template>

        <template #item.location="{ item }">
          {{ units.find(u => u.id === item.unit_id)?.location || '-' }}
        </template>

        <template #item.opening_time="{ item }">
          <VChip color="primary" variant="tonal" size="small">{{ item.opening_time }}</VChip>
        </template>

        <template #item.closing_time="{ item }">
          <VChip color="primary" variant="tonal" size="small">{{ item.closing_time }}</VChip>
        </template>

        <template #item.is_active="{ item }">
          <StatusChip :status="item.is_active ? 'active' : 'inactive'" />
        </template>

        <template #item.notes="{ item }">
          <span class="text-caption" style="max-width:150px; display:inline-block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
            {{ item.notes || '-' }}
          </span>
        </template>

        <template #item.created_at="{ item }">
          {{ new Date(item.created_at).toLocaleDateString('id-ID') }}
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end" style="gap:4px">
            <VBtn icon variant="text" size="small" @click="openEditModal(item)">
              <VIcon color="warning" icon="bx-edit-alt" />
            </VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="confirmDelete(item)">
              <VIcon icon="bx-trash-alt" />
            </VBtn>
          </div>
        </template>
      </AppDataTable>
    </VCard>

    <!-- Create modal -->
    <AppModal
      v-model="createDialog"
      title="Tambah Jam Operasional"
      icon="bx-time-five"
      :loading="isSubmitting"
      confirm-text="Simpan"
      cancel-text="Batal"
      :confirm-disabled="!createForm.unit_id || !createForm.opening_time || !createForm.closing_time"
      @confirm="handleCreate"
    >
      <VRow>
        <VCol cols="12">
          <VSelect
            v-model="createForm.unit_id"
            :items="availableUnits"
            item-title="name"
            item-value="id"
            label="Unit"
          >
            <template #item="{ props, item }">
              <VListItem v-bind="props">
                <template #subtitle>{{ item.raw.location }}</template>
              </VListItem>
            </template>
          </VSelect>
        </VCol>
        <VCol cols="6">
          <VTextField v-model="createForm.opening_time" label="Jam Buka" type="time" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="createForm.closing_time" label="Jam Tutup" type="time" />
        </VCol>
        <VCol cols="12">
          <VTextarea v-model="createForm.notes" label="Catatan (opsional)" rows="2" />
        </VCol>
      </VRow>
    </AppModal>

    <!-- Edit modal -->
    <AppModal
      v-model="editDialog"
      title="Edit Jam Operasional"
      icon="bx-edit-alt"
      :loading="isSubmitting"
      confirm-text="Update"
      cancel-text="Batal"
      @confirm="handleUpdate"
    >
      <VRow>
        <VCol cols="12">
          <VTextField :model-value="editForm.unit_name" label="Unit" readonly />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="editForm.opening_time" label="Jam Buka" type="time" />
        </VCol>
        <VCol cols="6">
          <VTextField v-model="editForm.closing_time" label="Jam Tutup" type="time" />
        </VCol>
        <VCol cols="12">
          <VTextarea v-model="editForm.notes" label="Catatan (opsional)" rows="2" />
        </VCol>
        <VCol cols="12">
          <VSwitch v-model="editForm.is_active" label="Aktif" color="primary" />
        </VCol>
      </VRow>
    </AppModal>

    <!-- Status info dialog -->
    <AppModal
      v-model="statusDialog"
      :title="`Status ${selectedUnit?.name}`"
      icon="bx-store"
      hide-footer
      :max-width="480"
    >
      <template v-if="unitStatus">
        <VRow>
          <VCol cols="6">
            <div class="text-caption text-medium-emphasis mb-1">Status Saat Ini</div>
            <VChip :color="getStatusColor(unitStatus.status)" variant="tonal">{{ unitStatus.status }}</VChip>
          </VCol>
          <VCol cols="6">
            <div class="text-caption text-medium-emphasis mb-1">Waktu Sekarang</div>
            <div class="text-h6">{{ unitStatus.current_time }}</div>
          </VCol>
        </VRow>
        <VDivider class="my-4" />
        <VRow>
          <VCol cols="6">
            <div class="text-caption text-medium-emphasis mb-1">Jam Buka</div>
            <div>{{ unitStatus.operating_hours.opening_time }}</div>
          </VCol>
          <VCol cols="6">
            <div class="text-caption text-medium-emphasis mb-1">Jam Tutup</div>
            <div>{{ unitStatus.operating_hours.closing_time }}</div>
          </VCol>
          <VCol v-if="unitStatus.operating_hours.notes" cols="12">
            <div class="text-caption text-medium-emphasis mb-1">Catatan</div>
            <div class="text-body-2">{{ unitStatus.operating_hours.notes }}</div>
          </VCol>
        </VRow>
      </template>
    </AppModal>
  </div>
</template>
