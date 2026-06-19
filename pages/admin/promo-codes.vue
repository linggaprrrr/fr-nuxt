<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Discount } from '~/types/promo_code'
import type { Unit } from '~/types/unit'
import type { DataTableHeader } from '@/components/AppDataTable.vue'
import { getApiErrorMessage } from '@/utils/apiHelpers'

const { getPromoCodes, createPromoCode, updatePromoCodeById, deletePromoCodeById } = usePromoCodes()
const { getUnits } = useUnits()
const toast = useToast()
const { confirm } = useConfirm()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const isSubmitting = ref(false)
const discounts = ref<Discount[]>([])
const units = ref<Unit[]>([])
const search = ref('')
const discountTypeFilter = ref('')

const dialog = ref(false)
const editingId = ref<string | null>(null)
const isEditing = computed(() => editingId.value !== null)

const discountTypeItems = [
  { title: 'Percentage', value: 'percentage' },
  { title: 'Fixed', value: 'fixed' },
]

function localDatetime(addDays: number) {
  const ms = Date.now() + addDays * 24 * 60 * 60 * 1000 - new Date().getTimezoneOffset() * 60000
  return new Date(ms).toISOString().slice(0, 16)
}

function toLocalDatetimeInput(iso: string) {
  if (!iso) return ''
  return new Date(new Date(iso).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

const blankForm = () => ({
  name: '',
  description: '',
  discount_type: 'percentage' as 'percentage' | 'fixed',
  promo_code: '',
  value: 0,
  start_date: localDatetime(0),
  end_date: localDatetime(31),
  is_active: true,
  unit_id: '',
})
const form = ref(blankForm())

const headers: DataTableHeader[] = [
  { key: 'name', title: 'Name' },
  { key: 'promo_code', title: 'Promo Code' },
  { key: 'discount_type', title: 'Type' },
  { key: 'value', title: 'Value' },
  { key: 'start_date', title: 'Start', nowrap: true },
  { key: 'end_date', title: 'End', nowrap: true },
  { key: 'status', title: 'Status' },
  { key: 'unit_name', title: 'Unit' },
  { key: 'actions', title: '', align: 'end' },
]

function getStatus(discount: Discount) {
  const ended = new Date(discount.end_date) < new Date()
  if (ended) return 'expired'
  return discount.is_active ? 'active' : 'inactive'
}

function formatDate(iso: string) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

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

function openCreate() {
  editingId.value = null
  form.value = blankForm()
  dialog.value = true
}

function openEdit(discount: Discount) {
  editingId.value = discount.id
  form.value = {
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
  dialog.value = true
}

function validate(): string | null {
  const f = form.value
  if (!f.name) return 'Name is required'
  if (!f.promo_code) return 'Promo code is required'
  if (!f.unit_id) return 'Unit is required'
  if (f.value <= 0) return 'Discount value must be greater than 0'
  if (f.discount_type === 'percentage' && f.value > 100) return 'Percentage discount cannot exceed 100'
  return null
}

async function submit() {
  const error = validate()
  if (error) {
    toast.warning(error)
    return
  }
  isSubmitting.value = true
  try {
    const payload = {
      ...form.value,
      start_date: new Date(form.value.start_date).toISOString(),
      end_date: new Date(form.value.end_date).toISOString(),
    }
    if (isEditing.value)
      await updatePromoCodeById(editingId.value!, payload)
    else
      await createPromoCode(payload)

    toast.success(isEditing.value ? 'Discount updated' : 'Discount created')
    dialog.value = false
    await fetchDiscounts()
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  } finally {
    isSubmitting.value = false
  }
}

async function removeDiscount(discount: Discount) {
  const ok = await confirm({
    title: 'Delete discount',
    message: `Delete "${discount.name}"? This action cannot be undone.`,
    tone: 'danger',
    confirmText: 'Delete',
  })
  if (!ok) return
  try {
    await deletePromoCodeById(discount.id)
    toast.success('Discount deleted')
    await fetchDiscounts()
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  }
}

function copyCode(code: string) {
  navigator.clipboard?.writeText(code)
  toast.success('Promo code copied')
}

watch([page, search, discountTypeFilter], fetchDiscounts)

onMounted(() => {
  fetchDiscounts()
  fetchUnits()
})
</script>

<template>
  <div>
    <PageHeader title="Discounts" subtitle="Create and manage promo codes per unit.">
      <template #actions>
        <VBtn color="primary" prepend-icon="bx-plus" @click="openCreate">
          Add Discount
        </VBtn>
      </template>
    </PageHeader>

    <VCard rounded="lg">
      <AppDataTable
        :headers="headers"
        :items="discounts"
        :loading="isLoading"
        show-index
        :page="page"
        :items-per-page="limit"
        :total="total"
        empty-title="No discounts yet"
        empty-text="Create your first promo code to get started."
        @update:page="p => (page = p)"
      >
        <template #toolbar>
          <VRow dense>
            <VCol cols="12" md="6">
              <VTextField
                v-model="search"
                placeholder="Search by name or promo code..."
                prepend-inner-icon="bx-search"
                clearable
              />
            </VCol>
            <VCol cols="12" md="6">
              <VSelect
                v-model="discountTypeFilter"
                :items="discountTypeItems"
                item-title="title"
                item-value="value"
                placeholder="Filter by type"
                clearable
              />
            </VCol>
          </VRow>
        </template>

        <template #item.promo_code="{ item }">
          <div class="d-flex align-center" style="gap: 4px;">
            <span class="font-weight-medium">{{ item.promo_code }}</span>
            <VBtn icon variant="text" size="x-small" color="default" @click="copyCode(item.promo_code)">
              <VIcon icon="bx-copy" size="16" />
              <VTooltip activator="parent">Copy</VTooltip>
            </VBtn>
          </div>
        </template>

        <template #item.discount_type="{ item }">
          <span class="text-capitalize">{{ item.discount_type }}</span>
        </template>

        <template #item.value="{ item }">
          {{ item.value }}{{ item.discount_type === 'percentage' ? '%' : '' }}
        </template>

        <template #item.start_date="{ item }">
          {{ formatDate(item.start_date) }}
        </template>

        <template #item.end_date="{ item }">
          {{ formatDate(item.end_date) }}
        </template>

        <template #item.status="{ item }">
          <StatusChip :status="getStatus(item)" />
        </template>

        <template #item.unit_name="{ item }">
          {{ item.unit_name || '-' }}
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end" style="gap: 4px;">
            <VBtn
              icon
              variant="text"
              size="small"
              color="default"
              :disabled="getStatus(item) === 'expired'"
              @click="openEdit(item)"
            >
              <VIcon icon="bx-edit-alt" />
              <VTooltip activator="parent">Edit</VTooltip>
            </VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="removeDiscount(item)">
              <VIcon icon="bx-trash-alt" />
              <VTooltip activator="parent">Delete</VTooltip>
            </VBtn>
          </div>
        </template>
      </AppDataTable>
    </VCard>

    <AppModal
      v-model="dialog"
      :title="isEditing ? 'Edit Discount' : 'Add Discount'"
      icon="bx-purchase-tag"
      max-width="760"
      :loading="isSubmitting"
      :confirm-text="isEditing ? 'Update' : 'Save'"
      @confirm="submit"
    >
      <FormSection title="Details">
        <VCol cols="12" md="6">
          <VTextField v-model="form.name" label="Name" />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField v-model="form.description" label="Description (optional)" />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            :model-value="form.promo_code"
            label="Promo Code"
            @update:model-value="val => (form.promo_code = val.toUpperCase())"
          />
        </VCol>
        <VCol cols="12" md="6">
          <VSelect
            v-model="form.unit_id"
            :items="units"
            item-title="name"
            item-value="id"
            label="Unit"
          />
        </VCol>
      </FormSection>

      <FormSection title="Discount">
        <VCol cols="12" md="6">
          <VSelect
            v-model="form.discount_type"
            :items="discountTypeItems"
            item-title="title"
            item-value="value"
            label="Discount Type"
          />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            v-model.number="form.value"
            label="Discount Value"
            type="number"
            :max="form.discount_type === 'percentage' ? 100 : undefined"
            :hint="form.discount_type === 'percentage' ? 'Maximum 100%' : ''"
            persistent-hint
          />
        </VCol>
      </FormSection>

      <FormSection title="Schedule">
        <VCol cols="12" md="6">
          <VTextField v-model="form.start_date" label="Start Date" type="datetime-local" />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField v-model="form.end_date" label="End Date" type="datetime-local" />
        </VCol>
        <VCol cols="12">
          <VSwitch v-model="form.is_active" label="Active" color="primary" />
        </VCol>
      </FormSection>
    </AppModal>
  </div>
</template>
