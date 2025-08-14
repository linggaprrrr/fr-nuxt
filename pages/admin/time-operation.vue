
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Unit } from '@/types/unit'
import type { TimeOperation, TimeOperationCreate, TimeOperationUpdate, UnitStatus } from "@/types/time_operation" 

const { getUnits } = useUnits()
const { 
  getTimeOperations, 
  setUnitHours, 
  updateTimeOperation, 
  deleteTimeOperation,
  getUnitStatus
} = useTimeOperation()

// State
const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const timeOperations = ref<TimeOperation[]>([])
const units = ref<Unit[]>([])
const search = ref('')

// Modal state
const showCreate = ref(false)
const showEdit = ref(false)
const showStatus = ref(false)
const selectedUnit = ref<Unit | null>(null)
const unitStatus = ref<UnitStatus | null>(null)

// Forms
const createForm = ref<TimeOperationCreate>({
  unit_id: '',
  opening_time: '08:00',
  closing_time: '22:00',
  notes: '',
  is_active: true
})

const editForm = ref<TimeOperation>({
  id: '',
  unit_id: '',
  opening_time: '',
  closing_time: '',
  notes: '',
  is_active: true,
  created_at: ''
})

// Computed
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

// Functions
async function fetchTimeOperations() {
  isLoading.value = true
  try {
    const data = await getTimeOperations({
      is_active: true,
      skip: (page.value - 1) * limit,
      limit
    })
    timeOperations.value = data || []
    total.value = data?.length || 0
  } catch (error) {
    console.error('Failed to fetch time operations:', error)
    timeOperations.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
}

async function fetchUnits() {
  try {
    const res = await getUnits({ limit: 1000 })
    units.value = res?.data || []
  } catch (error) {
    console.error('Failed to fetch units:', error)
    units.value = []
  }
}

// Create/Update time operation
async function handleCreateTimeOperation() {
  try {
    await setUnitHours(createForm.value.unit_id, createForm.value)
    showCreate.value = false
    resetCreateForm()
    await fetchTimeOperations()
    
    // Show success notification
    
  } catch (error: any) {
    console.error('Failed to create time operation:', error)
    
  }
}

function openEditModal(timeOperation: TimeOperation) {
  editForm.value = { ...timeOperation }
  showEdit.value = true
}

async function handleUpdateTimeOperation() {
  try {
    await updateTimeOperation(editForm.value.id, {
      opening_time: editForm.value.opening_time,
      closing_time: editForm.value.closing_time,
      notes: editForm.value.notes,
      is_active: editForm.value.is_active
    })
    
    showEdit.value = false
    await fetchTimeOperations()
    
    
  } catch (error: any) {
    console.error('Failed to update time operation:', error)
    
  }
}

// Delete time operation
async function confirmDelete(id: string, unitName: string) {
  if (confirm(`Yakin ingin menonaktifkan jam operasional untuk ${unitName}?`)) {
    try {
      await deleteTimeOperation(id)
      await fetchTimeOperations()
      
    } catch (error: any) {
      console.error('Failed to delete time operation:', error)
      
    }
  }
}

// Check unit status
async function checkUnitStatus(unit: Unit) {
  try {
    selectedUnit.value = unit
    unitStatus.value = await getUnitStatus(unit.id)
    showStatus.value = true
  } catch (error) {
    console.error('Failed to get unit status:', error)
    
  }
}

function resetCreateForm() {
  createForm.value = {
    unit_id: '',
    opening_time: '08:00',
    closing_time: '22:00',
    notes: '',
    is_active: true
  }
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'open': return 'success'
    case 'closed': return 'error'
    case 'break time': return 'warning'
    case 'not yet open': return 'info'
    default: return 'default'
  }
}

// Watchers
watch([page, search], fetchTimeOperations)

// Lifecycle
onMounted(() => {
  fetchUnits()
  fetchTimeOperations()
})
</script>

<template>
  <VCard title="Jam Operasional Unit" class="mb-4">
    <template v-slot:append>
      <VBtn
        class="text-none"
        color="primary"
        text="Tambah Jam Operasional"
        variant="tonal"
        slim
        @click="showCreate = true"
        :disabled="availableUnits.length === 0"
      />
    </template>

    <!-- Create Modal -->
    <VDialog v-model="showCreate" max-width="600">
      <VCard>
        <VCardTitle>Tambah Jam Operasional</VCardTitle>
        <VContainer fluid>
          <VRow>
            <VCol cols="3">
              <VListSubheader>Unit</VListSubheader>
            </VCol>
            <VCol cols="9">
              <VSelect
                v-model="createForm.unit_id"
                :items="availableUnits"
                item-title="name"
                item-value="id"
                label="Pilih Unit"
                required
              >
                <template v-slot:item="{ props, item }">
                  <VListItem v-bind="props">
                    <template v-slot:title>
                      {{ item.raw.name }}
                    </template>
                    <template v-slot:subtitle>
                      {{ item.raw.location }}
                    </template>
                  </VListItem>
                </template>
              </VSelect>
            </VCol>
          </VRow>

          <VRow>
            <VCol cols="3">
              <VListSubheader>Jam Buka</VListSubheader>
            </VCol>
            <VCol cols="9">
              <VTextField
                v-model="createForm.opening_time"
                type="time"
                required
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol cols="3">
              <VListSubheader>Jam Tutup</VListSubheader>
            </VCol>
            <VCol cols="9">
              <VTextField
                v-model="createForm.closing_time"
                type="time"
                required
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol cols="3">
              <VListSubheader>Catatan</VListSubheader>
            </VCol>
            <VCol cols="9">
              <VTextarea
                v-model="createForm.notes"
                placeholder="Catatan tambahan (opsional)"
                rows="2"
              />
            </VCol>
          </VRow>
        </VContainer>

        <VCardActions>
          <VSpacer />
          <VBtn text="Batal" @click="showCreate = false" />
          <VBtn 
            color="primary" 
            @click="handleCreateTimeOperation"
            :disabled="!createForm.unit_id || !createForm.opening_time || !createForm.closing_time"
          >
            Simpan
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Edit Modal -->
    <VDialog v-model="showEdit" max-width="600">
      <VCard>
        <VCardTitle>Edit Jam Operasional</VCardTitle>
        <VContainer fluid>
          <VRow>
            <VCol cols="3">
              <VListSubheader>Unit</VListSubheader>
            </VCol>
            <VCol cols="9">
              <VTextField
                :value="editForm.unit_name"
                readonly
                variant="outlined"
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol cols="3">
              <VListSubheader>Jam Buka</VListSubheader>
            </VCol>
            <VCol cols="9">
              <VTextField
                v-model="editForm.opening_time"
                type="time"
                required
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol cols="3">
              <VListSubheader>Jam Tutup</VListSubheader>
            </VCol>
            <VCol cols="9">
              <VTextField
                v-model="editForm.closing_time"
                type="time"
                required
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol cols="3">
              <VListSubheader>Catatan</VListSubheader>
            </VCol>
            <VCol cols="9">
              <VTextarea
                v-model="editForm.notes"
                placeholder="Catatan tambahan (opsional)"
                rows="2"
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol cols="3">
              <VListSubheader>Status</VListSubheader>
            </VCol>
            <VCol cols="9">
              <VSwitch
                v-model="editForm.is_active"
                label="Aktif"
                color="primary"
              />
            </VCol>
          </VRow>
        </VContainer>

        <VCardActions>
          <VSpacer />
          <VBtn text="Batal" @click="showEdit = false" />
          <VBtn color="primary" @click="handleUpdateTimeOperation">
            Update
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Status Modal -->
    <VDialog v-model="showStatus" max-width="500">
      <VCard v-if="unitStatus">
        <VCardTitle>
          <VIcon :color="unitStatus.is_open ? 'success' : 'error'" class="me-2">
            {{ unitStatus.is_open ? 'mdi-store-check' : 'mdi-store-remove' }}
          </VIcon>
          Status {{ selectedUnit?.name }}
        </VCardTitle>
        
        <VCardText>
          <VRow>
            <VCol cols="6">
              <VListSubheader>Status Saat Ini</VListSubheader>
              <VChip 
                :color="getStatusColor(unitStatus.status)"
                variant="tonal"
                size="large"
              >
                {{ unitStatus.status }}
              </VChip>
            </VCol>
            <VCol cols="6">
              <VListSubheader>Waktu Sekarang</VListSubheader>
              <div class="text-h6">{{ unitStatus.current_time }}</div>
            </VCol>
          </VRow>

          <VDivider class="my-4" />

          <VRow>
            <VCol cols="6">
              <VListSubheader>Jam Buka</VListSubheader>
              <div class="text-body-1">{{ unitStatus.operating_hours.opening_time }}</div>
            </VCol>
            <VCol cols="6">
              <VListSubheader>Jam Tutup</VListSubheader>
              <div class="text-body-1">{{ unitStatus.operating_hours.closing_time }}</div>
            </VCol>
          </VRow>

          <VRow v-if="unitStatus.operating_hours.notes">
            <VCol cols="12">
              <VListSubheader>Catatan</VListSubheader>
              <div class="text-body-2">{{ unitStatus.operating_hours.notes }}</div>
            </VCol>
          </VRow>
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn text="Tutup" @click="showStatus = false" />
        </VCardActions>
      </VCard>
    </VDialog>

    <VCardText>
      <VTextField
        v-model="search"
        label="Cari unit..."
        prepend-inner-icon="mdi-magnify"
        clearable
        class="mb-4"
      />
    </VCardText>

    <VTable density="compact">
      <thead>
        <tr>
          <th>#</th>
          <th>Unit</th>
          <th>Lokasi</th>
          <th>Jam Buka</th>
          <th>Jam Tutup</th>
          <th>Status</th>
          <th>Catatan</th>
          <th>Dibuat</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!isLoading && filteredTimeOperations.length === 0">
          <td colspan="9" class="text-center py-4">
            {{ search ? 'Tidak ada data yang sesuai' : 'Belum ada jam operasional' }}
          </td>
        </tr>
        <tr v-for="(timeOperation, index) in filteredTimeOperations" :key="timeOperation.id">
          <td>{{ index + 1 + (page - 1) * limit }}</td>
          <td>
            <div class="font-weight-medium">{{ timeOperation.unit_name }}</div>
            <div class="text-caption text-medium-emphasis">{{ timeOperation.unit_code }}</div>
          </td>
          <td>{{ units.find(u => u.id === timeOperation.unit_id)?.location || '-' }}</td>
          <td>
            <VChip color="primary" variant="tonal" size="small">
              {{ timeOperation.opening_time }}
            </VChip>
          </td>
          <td>
            <VChip color="primary" variant="tonal" size="small">
              {{ timeOperation.closing_time }}
            </VChip>
          </td>
          <td>
            <VChip 
              :color="timeOperation.is_active ? 'success' : 'error'"
              variant="tonal" 
              size="small"
            >
              {{ timeOperation.is_active ? 'Aktif' : 'Non-aktif' }}
            </VChip>
          </td>
          <td>
            <div class="text-caption" style="max-width: 150px;">
              {{ timeOperation.notes || '-' }}
            </div>
          </td>
          <td>{{ new Date(timeOperation.created_at).toLocaleDateString('id-ID') }}</td>
          <td>
           
            <VBtn 
              icon 
              variant="text" 
              size="small" 
              @click="openEditModal(timeOperation)"
              title="Edit"
            >
              <VIcon color="warning">bx bx-edit-alt</VIcon>
            </VBtn>
            <VBtn   
              icon 
              variant="text" 
              size="small" 
              @click="confirmDelete(timeOperation.id, timeOperation.unit_name || '')"
              title="Hapus"
            >
              <VIcon color="error">bx bx-x</VIcon>
            </VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>

    <VCardActions class="justify-center" v-if="total > limit">
      <VPagination
        v-model="page"
        :length="Math.ceil(total / limit)"
        total-visible="5"
        prev-icon="bx bx-chevron-left"
        next-icon="bx bx-chevron-right"
      />
    </VCardActions>
  </VCard>
</template>