<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Event } from '~/types/event'
import type { Unit } from '~/types/unit'
import type { Outlet } from '~/types/outlet'
import type { DataTableHeader } from '@/components/AppDataTable.vue'
import { getApiErrorMessage } from '@/utils/apiHelpers'
import { useDisplay } from 'vuetify'

const { getEvents, createEvent, updateEventById, deleteEventById } = useEvents()
const { getUnits } = useUnits()
const { getOutlets } = useOutlets()
const toast = useToast()
const { confirm } = useConfirm()
const config = useRuntimeConfig()
const { smAndDown } = useDisplay()

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const isSubmitting = ref(false)
const events = ref<Event[]>([])
const units = ref<Unit[]>([])
const outlets = ref<Outlet[]>([])
const search = ref('')

function toLocalDatetimeInput(iso: string | null) {
  if (!iso) return ''
  return new Date(new Date(iso).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

// ── Create / edit — one dialog, since an Event has no immutable field the way
// a printed ticket code does. ───────────────────────────────────────────────
const formDialog = ref(false)
const editingId = ref<string | null>(null)
const blankForm = () => ({
  name: '',
  folder_code: '',
  start_date: '',
  end_date: '',
  unit_id: '' as string | '',
  outlet_id: '' as string | '',
  is_active: true,
})
const form = ref(blankForm())

// Codes already taken by an outlet — the API rejects those, because one folder
// segment must not mean both "sell this" and "give this away".
const takenCodes = computed(() =>
  outlets.value.map(o => (o.kode_folder || '').toUpperCase()).filter(Boolean),
)
const folderCodeTaken = computed(() =>
  takenCodes.value.includes((form.value.folder_code || '').trim().toUpperCase()),
)

function openCreate() {
  editingId.value = null
  form.value = blankForm()
  formDialog.value = true
}

function openEdit(event: Event) {
  editingId.value = event.id
  form.value = {
    name: event.name,
    folder_code: event.folder_code,
    start_date: toLocalDatetimeInput(event.start_date),
    end_date: toLocalDatetimeInput(event.end_date),
    unit_id: event.unit_id ?? '',
    outlet_id: event.outlet_id ?? '',
    is_active: event.is_active,
  }
  formDialog.value = true
}

async function submitForm() {
  const f = form.value
  if (!f.name) { toast.warning('Event name is required'); return }
  if (!f.folder_code) { toast.warning('Folder code is required'); return }
  if (folderCodeTaken.value) { toast.warning('Folder code sudah dipakai outlet — pilih kode lain'); return }
  if (!f.unit_id) { toast.warning('Unit is required'); return }
  if (!f.start_date || !f.end_date) { toast.warning('Start and expiration dates are required'); return }
  if (new Date(f.end_date) <= new Date(f.start_date)) {
    toast.warning('Expiration date must be after the start date'); return
  }

  const payload = {
    name: f.name,
    folder_code: f.folder_code,
    start_date: new Date(f.start_date).toISOString(),
    end_date: new Date(f.end_date).toISOString(),
    unit_id: f.unit_id || null,
    outlet_id: f.outlet_id || null,
    is_active: f.is_active,
  } as Partial<Event>

  isSubmitting.value = true
  try {
    if (editingId.value) {
      await updateEventById(editingId.value, payload)
      toast.success('Event updated')
    } else {
      const created = await createEvent(payload)
      toast.success('Event created')
      formDialog.value = false
      await fetchEvents()
      if (created) openShare(created)
      return
    }
    formDialog.value = false
    await fetchEvents()
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  } finally {
    isSubmitting.value = false
  }
}

async function removeEvent(event: Event) {
  const ok = await confirm({
    title: 'Delete event',
    message: `Delete "${event.name}"? The QR link stops working. Photos are kept, but they return to the paid flow.`,
    tone: 'danger',
    confirmText: 'Delete',
  })
  if (!ok) return
  try {
    await deleteEventById(event.id)
    toast.success('Event deleted')
    await fetchEvents()
  } catch (error: any) {
    toast.error(getApiErrorMessage(error))
  }
}

// ── Share — the QR is the whole point: it gets printed and put on a table. ──
const shareDialog = ref(false)
const shareEvent = ref<Event | null>(null)

// The QR endpoint takes no auth, so it can be an <img> src directly.
// apiBase carries no trailing slash and qr_url leads with one.
const qrSrc = computed(() =>
  shareEvent.value ? `${config.public.apiBase}${shareEvent.value.qr_url}` : '',
)

function openShare(event: Event) {
  shareEvent.value = event
  shareDialog.value = true
}

function copyUrl(url: string) {
  navigator.clipboard?.writeText(url)
  toast.success('Event link copied')
}

// ── List ────────────────────────────────────────────────────────────────────
// On a phone the full table overflows and pushes the actions column — which
// holds the QR button, the whole point of this page — off-screen behind a
// horizontal scroll. Drop the columns you can look up elsewhere instead.
const headers = computed<DataTableHeader[]>(() => smAndDown.value
  ? [
      { key: 'name', title: 'Event' },
      { key: 'status', title: 'Status' },
      { key: 'actions', title: '', align: 'end' },
    ]
  : [
      { key: 'name', title: 'Event' },
      { key: 'folder_code', title: 'Folder Code' },
      { key: 'start_date', title: 'Start', nowrap: true },
      { key: 'end_date', title: 'Expires', nowrap: true },
      { key: 'photo_count', title: 'Photos', align: 'end' },
      { key: 'status', title: 'Status' },
      { key: 'actions', title: '', align: 'end' },
    ])

function getStatus(event: Event) {
  if (!event.is_active) return 'inactive'
  const now = new Date()
  if (new Date(event.start_date) > now) return 'upcoming'
  if (new Date(event.end_date) < now) return 'expired'
  return 'live'
}

function formatDate(iso: string | null) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

async function fetchEvents() {
  isLoading.value = true
  try {
    const res = await getEvents({ page: page.value, limit, search: search.value || null })
    events.value = res?.data || []
    total.value = res?.total || 0
  } catch (error) {
    console.error('Failed to fetch events:', error)
    events.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
}

async function fetchLookups() {
  try {
    const [unitRes, outletRes] = await Promise.all([getUnits({ limit: 100 }), getOutlets({ limit: 100 })])
    units.value = unitRes?.data || []
    outlets.value = outletRes?.data || []
  } catch (error) {
    console.error('Failed to fetch lookups:', error)
  }
}

watch([page, search], fetchEvents)

onMounted(() => {
  fetchEvents()
  fetchLookups()
})
</script>

<template>
  <div>
    <PageHeader
      title="Events"
      subtitle="Free photo collections. Guests scan the QR, scan their face, and download — no price, no checkout."
    >
      <template #actions>
        <VBtn color="primary" prepend-icon="bx-plus" @click="openCreate">
          Add Event
        </VBtn>
      </template>
    </PageHeader>

    <VCard rounded="lg">
      <AppDataTable
        :headers="headers"
        :items="events"
        :loading="isLoading"
        :show-index="!smAndDown"
        :page="page"
        :items-per-page="limit"
        :total="total"
        empty-title="No events yet"
        empty-text="Create an event to hand out a free-download QR."
        @update:page="p => (page = p)"
      >
        <template #toolbar>
          <VRow dense>
            <VCol cols="12" md="6">
              <VTextField
                v-model="search"
                placeholder="Search by event name or folder code..."
                prepend-inner-icon="bx-search"
                clearable
              />
            </VCol>
          </VRow>
        </template>

        <template #item.name="{ item }">
          <div class="font-weight-medium">{{ item.name }}</div>
          <div v-if="smAndDown" class="text-caption text-medium-emphasis">
            {{ item.folder_code }} · {{ formatDate(item.end_date) }} · {{ item.photo_count }} foto
          </div>
        </template>

        <template #item.folder_code="{ item }">
          <span class="font-mono">{{ item.folder_code }}</span>
        </template>

        <template #item.start_date="{ item }">
          {{ formatDate(item.start_date) }}
        </template>

        <template #item.end_date="{ item }">
          {{ formatDate(item.end_date) }}
        </template>

        <template #item.photo_count="{ item }">
          {{ item.photo_count }}
        </template>

        <template #item.status="{ item }">
          <StatusChip :status="getStatus(item)" :map="{ live: 'success', upcoming: 'info' }" />
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end" style="gap: 4px;">
            <VBtn icon variant="text" size="small" color="default" @click="openShare(item)">
              <VIcon icon="bx-qr" />
              <VTooltip activator="parent">Share / QR</VTooltip>
            </VBtn>
            <VBtn icon variant="text" size="small" color="default" @click="openEdit(item)">
              <VIcon icon="bx-edit-alt" />
              <VTooltip activator="parent">Edit</VTooltip>
            </VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="removeEvent(item)">
              <VIcon icon="bx-trash-alt" />
              <VTooltip activator="parent">Delete</VTooltip>
            </VBtn>
          </div>
        </template>
      </AppDataTable>
    </VCard>

    <!-- Create / edit -->
    <AppModal
      v-model="formDialog"
      :title="editingId ? 'Edit Event' : 'Add Event'"
      icon="bx-calendar-event"
      max-width="760"
      :loading="isSubmitting"
      :confirm-text="editingId ? 'Update' : 'Create Event'"
      @confirm="submitForm"
    >
      <FormSection title="Event">
        <VRow dense>
          <VCol cols="12">
            <FormField label="Event Name">
              <template #default="{ id, describedBy }">
                <VTextField :id="id" v-model="form.name" placeholder="Purple Forest Wedding" :aria-describedby="describedBy" />
              </template>
            </FormField>
          </VCol>
        </VRow>
        <FormField
          label="Folder Code"
          helper="The event's own folder name. The photographer uploads into {unit}/{tipe}/{folder code}/ — photos landing there during the event window become free event photos."
        >
          <template #default="{ id, describedBy }">
            <VTextField
              :id="id"
              v-model="form.folder_code"
              placeholder="PURPLE01"
              :error="folderCodeTaken"
              :error-messages="folderCodeTaken ? 'Kode ini sudah dipakai sebuah outlet. Pilih kode khusus untuk event ini.' : []"
              :aria-describedby="describedBy"
            />
          </template>
        </FormField>
      </FormSection>

      <FormSection title="Window">
        <VRow dense>
          <VCol cols="12" md="6">
            <FormField label="Start Date">
              <template #default="{ id, describedBy }">
                <VTextField :id="id" v-model="form.start_date" type="datetime-local" :aria-describedby="describedBy" />
              </template>
            </FormField>
          </VCol>
          <VCol cols="12" md="6">
            <FormField label="Expiration Date" helper="After this, the page stops searching and downloading.">
              <template #default="{ id, describedBy }">
                <VTextField :id="id" v-model="form.end_date" type="datetime-local" :aria-describedby="describedBy" />
              </template>
            </FormField>
          </VCol>
        </VRow>
      </FormSection>

      <FormSection title="Kepemilikan">
        <VRow dense>
          <VCol cols="12" md="6">
            <FormField label="Unit" helper="Event photos carry no outlet, so the unit is what keeps them inside your tenant.">
              <template #default="{ id, describedBy }">
                <VSelect
                  :id="id"
                  v-model="form.unit_id"
                  :items="units"
                  item-title="name"
                  item-value="id"
                  clearable
                  :aria-describedby="describedBy"
                />
              </template>
            </FormField>
          </VCol>
        </VRow>
        <SettingsCard title="Active">
          <VSwitch v-model="form.is_active" color="primary" hide-details />
        </SettingsCard>
      </FormSection>
    </AppModal>

    <!-- Share -->
    <AppModal
      v-model="shareDialog"
      title="Share Event"
      icon="bx-qr"
      max-width="480"
    >
      <template #footer>
        <VBtn variant="text" color="default" @click="shareDialog = false">Close</VBtn>
      </template>

      <div v-if="shareEvent" class="text-center">
        <p class="text-body-2 text-medium-emphasis mb-4">
          Print this QR or send the link. Guests scan their face and download for free.
        </p>
        <VSheet rounded="lg" class="pa-4 d-inline-block mb-4" color="white">
          <img :src="qrSrc" :alt="`QR for ${shareEvent.name}`" width="220" height="220" style="display: block;" />
        </VSheet>
        <VTextField :model-value="shareEvent.event_url" readonly density="compact">
          <template #append-inner>
            <VBtn icon variant="text" size="x-small" color="default" @click="copyUrl(shareEvent!.event_url)">
              <VIcon icon="bx-copy" size="16" />
              <VTooltip activator="parent">Copy</VTooltip>
            </VBtn>
          </template>
        </VTextField>
        <div class="d-flex justify-center mt-3" style="gap: 8px;">
          <!-- New tab: the admin is mid-task here, and the event page is a
               customer-facing site, not a step in the admin flow. -->
          <VBtn
            variant="tonal" size="small" prepend-icon="bx-link-external"
            :href="shareEvent.event_url" target="_blank" rel="noopener noreferrer"
          >
            Open page
          </VBtn>
          <VBtn variant="tonal" size="small" prepend-icon="bx-download" :href="qrSrc" :download="`${shareEvent.folder_code}-qr.png`">
            Download QR
          </VBtn>
        </div>
      </div>
    </AppModal>
  </div>
</template>
