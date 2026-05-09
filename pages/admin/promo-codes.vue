<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Discount } from '~/types/promo_code'
import type { Unit } from '~/types/unit'
import { getApiErrorMessage } from '@/utils/apiHelpers'

const { getPromoCodes, createPromoCode, updatePromoCodeById, deletePromoCodeById } = usePromoCodes()
const { getUnits } = useUnits()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const discounts = ref<Discount[]>([])
const units = ref<Unit[]>([])
const search = ref('')
const discountTypeFilter = ref('')

// Modal
const showCreate = ref(false)
const showEdit = ref(false)
const showDelete = ref(false)
const deleteId = ref('')
const isSubmitting = ref(false)

const defaultCreateForm = () => ({
  name: '',
  description: '',
  discount_type: 'percentage' as 'percentage' | 'fixed',
  promo_code: '',
  value: 0,
  start_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16),
  end_date: new Date(Date.now() + 24 * 31 * 60 * 60 * 1000 - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16),
  is_active: true,
  unit_id: '',
})

const createForm = ref(defaultCreateForm())

const editForm = ref({
  id: '',
  name: '',
  description: '',
  discount_type: 'percentage' as 'percentage' | 'fixed',
  promo_code: '',
  value: 0,
  start_date: '',
  end_date: '',
  is_active: true,
  unit_id: '',
})

const discountTypeItems = [
  { title: 'Percentage', value: 'percentage' },
  { title: 'Fixed', value: 'fixed' },
]

async function fetchDiscounts() {
  isLoading.value = true
  try {
    const res = await getPromoCodes({
      page: page.value,
      limit,
      search: search.value || null,
      discount_type: discountTypeFilter.value || null,
    })
    discounts.value = res?.data || []
    total.value = res?.total || 0
  } catch (error) {
    console.error('Failed to fetch discounts:', error)
    discounts.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
}

async function fetchUnits() {
  try {
    const res = await getUnits({ limit: 100 })
    units.value = res?.data || []
  } catch (error) {
    console.error('Failed to fetch units:', error)
  }
}

function getStatus(discount: Discount) {
  const now = new Date()
  const ended = new Date(discount.end_date) < now
  if (ended) return 'expired'
  return discount.is_active ? 'active' : 'inactive'
}

function getStatusColor(status: string) {
  switch (status) {
    case 'active': return 'success'
    case 'inactive': return 'grey'
    case 'expired': return 'error'
    default: return 'grey'
  }
}

function toLocalDatetimeInput(iso: string) {
  if (!iso) return ''
  return new Date(new Date(iso).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

function validateForm(form: typeof createForm.value | typeof editForm.value) {
  if (!form.name) { alert('Name is required'); return false }
  if (!form.promo_code) { alert('Promo code is required'); return false }
  if (!form.unit_id) { alert('Unit is required'); return false }
  if (form.value <= 0) { alert('Discount value must be greater than 0'); return false }
  if (form.discount_type === 'percentage' && form.value > 100) { alert('Percentage discount cannot exceed 100'); return false }
  return true
}

async function handleCreate() {
  if (!validateForm(createForm.value)) return
  isSubmitting.value = true
  try {
    await createPromoCode({
      ...createForm.value,
      start_date: new Date(createForm.value.start_date).toISOString(),
      end_date: new Date(createForm.value.end_date).toISOString(),
    })
    showCreate.value = false
    createForm.value = defaultCreateForm()
    await fetchDiscounts()
  } catch (error: any) {
    console.error('Failed to create discount:', error)
    alert(getApiErrorMessage(error))
  } finally {
    isSubmitting.value = false
  }
}

function openEditModal(discount: Discount) {
  editForm.value = {
    id: discount.id,
    name: discount.name,
    description: discount.description,
    discount_type: discount.discount_type,
    promo_code: discount.promo_code,
    value: discount.value,
    start_date: toLocalDatetimeInput(discount.start_date),
    end_date: toLocalDatetimeInput(discount.end_date),
    is_active: discount.is_active,
    unit_id: discount.unit_id,
  }
  showEdit.value = true
}

async function handleEdit() {
  if (!validateForm(editForm.value)) return
  isSubmitting.value = true
  try {
    await updatePromoCodeById(editForm.value.id, {
      name: editForm.value.name,
      description: editForm.value.description,
      discount_type: editForm.value.discount_type,
      promo_code: editForm.value.promo_code,
      value: editForm.value.value,
      start_date: new Date(editForm.value.start_date).toISOString(),
      end_date: new Date(editForm.value.end_date).toISOString(),
      is_active: editForm.value.is_active,
      unit_id: editForm.value.unit_id,
    })
    showEdit.value = false
    await fetchDiscounts()
  } catch (error: any) {
    console.error('Failed to update discount:', error)
    alert(getApiErrorMessage(error))
  } finally {
    isSubmitting.value = false
  }
}

function openDeleteModal(id: string) {
  deleteId.value = id
  showDelete.value = true
}

async function handleDelete() {
  isSubmitting.value = true
  try {
    await deletePromoCodeById(deleteId.value)
    showDelete.value = false
    await fetchDiscounts()
  } catch (error: any) {
    console.error('Failed to delete discount:', error)
    alert(getApiErrorMessage(error))
  } finally {
    isSubmitting.value = false
  }
}

watch([page, search, discountTypeFilter], () => {
  fetchDiscounts()
})

onMounted(() => {
  fetchDiscounts()
  fetchUnits()
})
</script>

<template>
  <VCard title="Discounts" class="mb-4">
    <template v-slot:append>
      <VBtn
        class="text-none"
        color="primary"
        text="Add Discount"
        variant="tonal"
        slim
        @click="showCreate = true"
      />
    </template>

    <VCardText>
      <VRow>
        <VCol cols="12" md="6">
          <VTextField
            v-model="search"
            label="Search by name or promo code..."
            prepend-inner-icon="bx bx-search"
            clearable
            class="mb-4"
          />
        </VCol>
        <VCol cols="12" md="6">
          <VSelect
            v-model="discountTypeFilter"
            :items="discountTypeItems"
            item-title="title"
            item-value="value"
            label="Filter by discount type"
            clearable
            class="mb-4"
          />
        </VCol>
      </VRow>
    </VCardText>

    <VTable density="compact">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Promo Code</th>
          <th>Type</th>
          <th>Value</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Unit</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td colspan="10" class="text-center">Loading...</td>
        </tr>
        <tr v-else-if="discounts.length === 0">
          <td colspan="10" class="text-center">No data</td>
        </tr>
        <tr v-for="(discount, index) in discounts" :key="discount.id">
          <td>{{ index + 1 + (page - 1) * limit }}</td>
          <td>{{ discount.name }}</td>
          <td>
            {{ discount.promo_code }}
            <VBtn icon variant="text" size="small" @click="navigator.clipboard.writeText(discount.promo_code)">
              <VIcon>bx bx-copy</VIcon>
            </VBtn>
          </td>
          <td>{{ discount.discount_type }}</td>
          <td>{{ discount.value }}{{ discount.discount_type === 'percentage' ? '%' : '' }}</td>
          <td>
            {{ new Date(discount.start_date).toLocaleDateString('id-ID', {
              day: '2-digit', month: 'long', year: 'numeric'
            }) }}
          </td>
          <td>
            {{ new Date(discount.end_date).toLocaleDateString('id-ID', {
              day: '2-digit', month: 'long', year: 'numeric'
            }) }}
          </td>
          <td>
            <VChip :color="getStatusColor(getStatus(discount))" size="small">
              {{ getStatus(discount) }}
            </VChip>
          </td>
          <td>{{ discount.unit_name }}</td>
          <td>
            <VBtn icon variant="text" size="small" @click="openEditModal(discount)" :disabled="getStatus(discount) === 'expired'">
              <VIcon color="warning">bx bx-edit-alt</VIcon>
            </VBtn>
            <VBtn icon variant="text" size="small" @click="openDeleteModal(discount.id)">
              <VIcon color="error">bx bx-trash-alt</VIcon>
            </VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>

    <VCardActions class="justify-center">
      <VPagination
        v-model="page"
        :length="Math.ceil(total / limit)"
        total-visible="5"
        prev-icon="bx bx-chevron-left"
        next-icon="bx bx-chevron-right"
      />
    </VCardActions>
  </VCard>

  <!-- Create Modal -->
  <VDialog v-model="showCreate" max-width="800">
    <VCard>
      <VCardTitle>Add Discount</VCardTitle>
      <VCardText>
        <VContainer fluid>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                v-model="createForm.name"
                label="Name"
                placeholder="e.g. Diskon Akhir Tahun"
                required
              />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="createForm.description"
                label="Description (optional)"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                :model-value="createForm.promo_code"
                label="Promo Code"
                required
                @update:model-value="val => createForm.promo_code = val.toUpperCase()"
              />
            </VCol>
            <VCol cols="12" md="6">
              <VSelect
                v-model="createForm.unit_id"
                :items="units"
                item-title="name"
                item-value="id"
                label="Unit"
                required
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VSelect
                v-model="createForm.discount_type"
                :items="discountTypeItems"
                item-title="title"
                item-value="value"
                label="Discount Type"
                required
              />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model.number="createForm.value"
                label="Discount Value"
                type="number"
                :max="createForm.discount_type === 'percentage' ? 100 : undefined"
                :hint="createForm.discount_type === 'percentage' ? 'Maximum 100%' : ''"
                persistent-hint
                :rules="[
                  v => v > 0 || 'Must be greater than 0',
                  v => createForm.discount_type !== 'percentage' || v <= 100 || 'Percentage cannot exceed 100%'
                ]"
                required
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                v-model="createForm.start_date"
                label="Start Date"
                type="datetime-local"
                required
              />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="createForm.end_date"
                label="End Date"
                type="datetime-local"
                required
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VSwitch
                v-model="createForm.is_active"
                label="Active"
              />
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn text="Cancel" @click="showCreate = false" :disabled="isSubmitting" />
        <VBtn color="primary" @click="handleCreate" :loading="isSubmitting" :disabled="isSubmitting">Save</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- Edit Modal -->
  <VDialog v-model="showEdit" max-width="800">
    <VCard>
      <VCardTitle>Edit Discount</VCardTitle>
      <VCardText>
        <VContainer fluid>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                v-model="editForm.name"
                label="Name"
                required
              />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="editForm.description"
                label="Description (optional)"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                :model-value="editForm.promo_code"
                label="Promo Code"
                required
                @update:model-value="val => editForm.promo_code = val.toUpperCase()"
              />
            </VCol>
            <VCol cols="12" md="6">
              <VSelect
                v-model="editForm.unit_id"
                :items="units"
                item-title="name"
                item-value="id"
                label="Unit"
                required
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VSelect
                v-model="editForm.discount_type"
                :items="discountTypeItems"
                item-title="title"
                item-value="value"
                label="Discount Type"
                required
              />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model.number="editForm.value"
                label="Discount Value"
                type="number"
                :max="editForm.discount_type === 'percentage' ? 100 : undefined"
                :hint="editForm.discount_type === 'percentage' ? 'Maximum 100%' : ''"
                persistent-hint
                :rules="[
                  v => v > 0 || 'Must be greater than 0',
                  v => editForm.discount_type !== 'percentage' || v <= 100 || 'Percentage cannot exceed 100%'
                ]"
                required
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                v-model="editForm.start_date"
                label="Start Date"
                type="datetime-local"
                required
              />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="editForm.end_date"
                label="End Date"
                type="datetime-local"
                required
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="6">
              <VSwitch
                v-model="editForm.is_active"
                label="Active"
              />
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn text="Cancel" @click="showEdit = false" :disabled="isSubmitting" />
        <VBtn color="primary" @click="handleEdit" :loading="isSubmitting" :disabled="isSubmitting">Update</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- Delete Modal -->
  <VDialog v-model="showDelete" max-width="400">
    <VCard>
      <VCardTitle>Delete Discount</VCardTitle>
      <VCardText>Are you sure you want to delete this discount?</VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn text="Cancel" @click="showDelete = false" :disabled="isSubmitting" />
        <VBtn color="error" @click="handleDelete" :loading="isSubmitting" :disabled="isSubmitting">Delete</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
