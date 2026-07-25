<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { EventTicket } from '~/types/event_ticket'
import type { Unit } from '~/types/unit'
import type { DataTableHeader } from '@/components/AppDataTable.vue'
import { getApiErrorMessage } from '@/utils/apiHelpers'

const { getEventTickets, bulkCreateEventTickets, updateEventTicketById, deleteEventTicketById } = useEventTickets()
const { getUnits } = useUnits()
const toast = useToast()
const { confirm } = useConfirm()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const isSubmitting = ref(false)
const tickets = ref<EventTicket[]>([])
const units = ref<Unit[]>([])
const search = ref('')

function toLocalDatetimeInput(iso: string | null) {
  if (!iso) return ''
  return new Date(new Date(iso).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

// ── Bulk create dialog — the realistic organizer handoff: a list of
// pre-printed codes, not one-at-a-time entry. ─────────────────────────────
const createDialog = ref(false)
const blankCreateForm = () => ({
  ticket_codes_raw: '',
  event_name: '',
  unit_id: '' as string | '',
  valid_from: '',
  valid_until: '',
  is_active: true,
})
const createForm = ref(blankCreateForm())
const parsedCodeCount = computed(() =>
  createForm.value.ticket_codes_raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean).length
)

function openCreate() {
  createForm.value = blankCreateForm()
  createDialog.value = true
}

async function submitCreate() {
  if (!createForm.value.event_name) { toast.warning('Event name is required'); return }
  const codes = createForm.value.ticket_codes_raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
  if (codes.length === 0) { toast.warning('Paste at least one ticket code'); return }

  isSubmitting.value = true
  try {
    const res = await bulkCreateEventTickets({
      ticket_codes: codes,
      event_name: createForm.value.event_name,
      unit_id: createForm.value.unit_id || null,
      valid_from: createForm.value.valid_from ? new Date(createForm.value.valid_from).toISOString() : null,
      valid_until: createForm.value.valid_until ? new Date(createForm.value.valid_until).toISOString() : null,
      is_active: createForm.value.is_active,
    })
    const skipped = codes.length - (res?.total ?? 0)
    toast.success(skipped > 0 ? `${res?.total ?? 0} ticket(s) added, ${skipped} already existed` : `${res?.total ?? 0} ticket(s) added`)
    createDialog.value = false
    await fetchTickets()
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  } finally {
    isSubmitting.value = false
  }
}

// ── Edit dialog — event/window/status only, the code itself is immutable
// once printed. ────────────────────────────────────────────────────────────
const editDialog = ref(false)
const editingId = ref<string | null>(null)
const editForm = ref({ ticket_code: '', event_name: '', unit_id: '' as string | '', valid_from: '', valid_until: '', is_active: true })

function openEdit(ticket: EventTicket) {
  editingId.value = ticket.id
  editForm.value = {
    ticket_code: ticket.ticket_code,
    event_name: ticket.event_name,
    unit_id: ticket.unit_id ?? '',
    valid_from: toLocalDatetimeInput(ticket.valid_from),
    valid_until: toLocalDatetimeInput(ticket.valid_until),
    is_active: ticket.is_active,
  }
  editDialog.value = true
}

async function submitEdit() {
  isSubmitting.value = true
  try {
    await updateEventTicketById(editingId.value!, {
      event_name: editForm.value.event_name,
      unit_id: editForm.value.unit_id || null,
      valid_from: editForm.value.valid_from ? new Date(editForm.value.valid_from).toISOString() : null,
      valid_until: editForm.value.valid_until ? new Date(editForm.value.valid_until).toISOString() : null,
      is_active: editForm.value.is_active,
    } as any)
    toast.success('Ticket updated')
    editDialog.value = false
    await fetchTickets()
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  } finally {
    isSubmitting.value = false
  }
}

async function removeTicket(ticket: EventTicket) {
  const ok = await confirm({
    title: 'Delete ticket',
    message: `Delete ticket "${ticket.ticket_code}"? This action cannot be undone.`,
    tone: 'danger',
    confirmText: 'Delete',
  })
  if (!ok) return
  try {
    await deleteEventTicketById(ticket.id)
    toast.success('Ticket deleted')
    await fetchTickets()
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  }
}

function copyCode(code: string) {
  navigator.clipboard?.writeText(code)
  toast.success('Ticket code copied')
}

// ── List ────────────────────────────────────────────────────────────────────
const headers: DataTableHeader[] = [
  { key: 'ticket_code', title: 'Code' },
  { key: 'event_name', title: 'Event' },
  { key: 'unit_name', title: 'Unit' },
  { key: 'valid_from', title: 'Valid From', nowrap: true },
  { key: 'valid_until', title: 'Valid Until', nowrap: true },
  { key: 'status', title: 'Status' },
  { key: 'actions', title: '', align: 'end' },
]

function getStatus(ticket: EventTicket) {
  if (ticket.used_at) return 'used'
  if (!ticket.is_active) return 'inactive'
  if (ticket.valid_until && new Date(ticket.valid_until) < new Date()) return 'expired'
  return 'active'
}

function formatDate(iso: string | null) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

async function fetchTickets() {
  isLoading.value = true
  try {
    const res = await getEventTickets({ page: page.value, limit, search: search.value || null })
    tickets.value = res?.data || []
    total.value = res?.total || 0
  } catch (error) {
    console.error('Failed to fetch event tickets:', error)
    tickets.value = []
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

watch([page, search], fetchTickets)

onMounted(() => {
  fetchTickets()
  fetchUnits()
})
</script>

<template>
  <div>
    <PageHeader title="Event Tickets" subtitle="Manage ticket codes for the Event Ticket access method.">
      <template #actions>
        <VBtn color="primary" prepend-icon="bx-plus" @click="openCreate">
          Add Tickets
        </VBtn>
      </template>
    </PageHeader>

    <VCard rounded="lg">
      <AppDataTable
        :headers="headers"
        :items="tickets"
        :loading="isLoading"
        show-index
        :page="page"
        :items-per-page="limit"
        :total="total"
        empty-title="No event tickets yet"
        empty-text="Add your first batch of ticket codes to get started."
        @update:page="p => (page = p)"
      >
        <template #toolbar>
          <VRow dense>
            <VCol cols="12" md="6">
              <VTextField
                v-model="search"
                placeholder="Search by code or event name..."
                prepend-inner-icon="bx-search"
                clearable
              />
            </VCol>
          </VRow>
        </template>

        <template #item.ticket_code="{ item }">
          <div class="d-flex align-center" style="gap: 4px;">
            <span class="font-weight-medium font-mono">{{ item.ticket_code }}</span>
            <VBtn icon variant="text" size="x-small" color="default" @click="copyCode(item.ticket_code)">
              <VIcon icon="bx-copy" size="16" />
              <VTooltip activator="parent">Copy</VTooltip>
            </VBtn>
          </div>
        </template>

        <template #item.unit_name="{ item }">
          {{ item.unit_name || 'Any unit' }}
        </template>

        <template #item.valid_from="{ item }">
          {{ formatDate(item.valid_from) }}
        </template>

        <template #item.valid_until="{ item }">
          {{ formatDate(item.valid_until) }}
        </template>

        <template #item.status="{ item }">
          <StatusChip :status="getStatus(item)" :map="{ used: 'info' }" />
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end" style="gap: 4px;">
            <VBtn icon variant="text" size="small" color="default" :disabled="!!item.used_at" @click="openEdit(item)">
              <VIcon icon="bx-edit-alt" />
              <VTooltip activator="parent">Edit</VTooltip>
            </VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="removeTicket(item)">
              <VIcon icon="bx-trash-alt" />
              <VTooltip activator="parent">Delete</VTooltip>
            </VBtn>
          </div>
        </template>
      </AppDataTable>
    </VCard>

    <!-- Bulk add -->
    <AppModal
      v-model="createDialog"
      title="Add Tickets"
      icon="bx-ticket"
      max-width="760"
      :loading="isSubmitting"
      confirm-text="Add Tickets"
      @confirm="submitCreate"
    >
      <FormSection title="Event">
        <VCol cols="12" md="6">
          <VTextField v-model="createForm.event_name" label="Event Name" />
        </VCol>
        <VCol cols="12" md="6">
          <VSelect
            v-model="createForm.unit_id"
            :items="units"
            item-title="name"
            item-value="id"
            label="Unit (optional)"
            hint="Leave empty to allow at any unit"
            persistent-hint
            clearable
          />
        </VCol>
      </FormSection>

      <FormSection title="Ticket Codes">
        <VCol cols="12">
          <VTextarea
            v-model="createForm.ticket_codes_raw"
            label="Paste ticket codes, one per line"
            rows="6"
            :hint="`${parsedCodeCount} code(s) detected`"
            persistent-hint
          />
        </VCol>
      </FormSection>

      <FormSection title="Validity Window (optional)">
        <VCol cols="12" md="6">
          <VTextField v-model="createForm.valid_from" label="Valid From" type="datetime-local" />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField v-model="createForm.valid_until" label="Valid Until" type="datetime-local" />
        </VCol>
        <VCol cols="12">
          <VSwitch v-model="createForm.is_active" label="Active" color="primary" />
        </VCol>
      </FormSection>
    </AppModal>

    <!-- Edit -->
    <AppModal
      v-model="editDialog"
      title="Edit Ticket"
      icon="bx-ticket"
      max-width="640"
      :loading="isSubmitting"
      confirm-text="Update"
      @confirm="submitEdit"
    >
      <FormSection title="Details">
        <VCol cols="12">
          <VTextField :model-value="editForm.ticket_code" label="Ticket Code" readonly disabled />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField v-model="editForm.event_name" label="Event Name" />
        </VCol>
        <VCol cols="12" md="6">
          <VSelect
            v-model="editForm.unit_id"
            :items="units"
            item-title="name"
            item-value="id"
            label="Unit (optional)"
            clearable
          />
        </VCol>
      </FormSection>

      <FormSection title="Validity Window">
        <VCol cols="12" md="6">
          <VTextField v-model="editForm.valid_from" label="Valid From" type="datetime-local" />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField v-model="editForm.valid_until" label="Valid Until" type="datetime-local" />
        </VCol>
        <VCol cols="12">
          <VSwitch v-model="editForm.is_active" label="Active" color="primary" />
        </VCol>
      </FormSection>
    </AppModal>
  </div>
</template>
