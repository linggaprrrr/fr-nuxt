<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useOutletAccessMethods } from '@/composables/useOutletAccessMethods'
import type { AccessMethodConfig } from '@/composables/useOutletAccessMethods'

const { getOutletAccessMethods, updateOutletAccessMethods, error } = useOutletAccessMethods()
const toast = useToast()

const outlets = ref<any[]>([])
const outletId = ref('')
const loading = ref(false)
const saving = ref(false)

// Must stay in sync with the kiosk's src/access/registry.js — a method
// configured here that a not-yet-updated kiosk build doesn't recognize is
// just silently ignored there, never a crash, so drift is safe but leaves
// the row functionally dead until the kiosk build catches up.
const KNOWN_METHODS = [
  { key: 'qris', label: 'QRIS Payment', hasTicketConfig: false },
  { key: 'event_ticket', label: 'Event Ticket', hasTicketConfig: true },
  { key: 'promo_voucher', label: 'Promo Voucher', hasTicketConfig: false },
]

const BADGE_ITEMS = [
  { title: 'None', value: null },
  { title: 'Recommended', value: 'recommended' },
  { title: 'Free', value: 'free' },
  { title: 'Popular', value: 'popular' },
]

const STRATEGY_ITEMS = [
  { title: 'Internal (this dashboard\'s Event Tickets list)', value: 'internal' },
  { title: 'External (organizer\'s own validation API)', value: 'external' },
]

function blankRow(key: string, order: number): AccessMethodConfig {
  return {
    method_key: key,
    enabled: false,
    sort_order: order,
    is_default: false,
    badge: null,
    title_override: '',
    description_override: '',
    available_from: '',
    available_until: '',
    config: key === 'event_ticket' ? { strategy: 'internal', external_url: '' } : {},
  }
}

const rows = ref<Record<string, AccessMethodConfig>>({})

function toLocalDatetimeInput(iso: string | null) {
  if (!iso) return ''
  return new Date(new Date(iso).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

async function loadOutlet() {
  if (!outletId.value) { rows.value = {}; return }
  loading.value = true
  const configs = await getOutletAccessMethods(outletId.value)
  if (error.value) toast.error(error.value)

  const byKey: Record<string, AccessMethodConfig> = {}
  KNOWN_METHODS.forEach((m, i) => { byKey[m.key] = blankRow(m.key, i) })
  configs.forEach((c) => {
    byKey[c.method_key] = {
      ...blankRow(c.method_key, c.sort_order),
      ...c,
      title_override: c.title_override ?? '',
      description_override: c.description_override ?? '',
      available_from: toLocalDatetimeInput(c.available_from),
      available_until: toLocalDatetimeInput(c.available_until),
      config: { strategy: 'internal', external_url: '', ...(c.config ?? {}) },
    }
  })
  rows.value = byKey
  loading.value = false
}

function setDefault(key: string) {
  Object.keys(rows.value).forEach((k) => { rows.value[k].is_default = k === key })
}

async function save() {
  saving.value = true
  const methods = Object.values(rows.value).map((r) => ({
    ...r,
    available_from: r.available_from ? new Date(r.available_from).toISOString() : null,
    available_until: r.available_until ? new Date(r.available_until).toISOString() : null,
  }))
  await updateOutletAccessMethods(outletId.value, methods)
  saving.value = false
  if (error.value) { toast.error(error.value); return }
  toast.success('Access methods saved — the kiosk picks this up on its next sync (ETag-based, usually within a session).')
}

async function fetchOutlets() {
  const res = await useOutlets().getOutlets({ page: 1, limit: 9999, is_kiosk: true })
  outlets.value = res?.data || []
}

watch(outletId, loadOutlet)
onMounted(fetchOutlets)
</script>

<template>
  <div>
    <PageHeader title="Access Methods" subtitle="Configure which checkout methods a kiosk offers, per outlet." />

    <VCard flat border rounded="lg" class="mb-4">
      <VCardText>
        <VSelect
          v-model="outletId"
          :items="outlets.map(o => ({ title: o.name, value: o.id }))"
          label="Select Outlet"
          density="compact"
          variant="outlined"
          hide-details
          style="max-width:320px"
        />
      </VCardText>
    </VCard>

    <VProgressLinear v-if="loading" indeterminate color="primary" class="mb-4" />

    <template v-if="outletId && !loading">
      <VCard v-for="m in KNOWN_METHODS" :key="m.key" flat border rounded="lg" class="mb-4">
        <VCardText class="d-flex flex-column gap-4">
          <div class="d-flex align-center justify-space-between">
            <div>
              <p class="text-subtitle-1 font-weight-bold">{{ m.label }}</p>
              <p class="text-caption text-medium-emphasis">{{ m.key }}</p>
            </div>
            <div class="d-flex align-center gap-4">
              <div class="d-flex align-center gap-2">
                <span class="text-caption">Default</span>
                <VSwitch
                  :model-value="rows[m.key]?.is_default"
                  color="primary"
                  hide-details
                  density="compact"
                  :disabled="!rows[m.key]?.enabled"
                  @update:model-value="setDefault(m.key)"
                />
              </div>
              <div class="d-flex align-center gap-2">
                <span class="text-caption">Enabled</span>
                <VSwitch v-model="rows[m.key].enabled" color="success" hide-details density="compact" />
              </div>
            </div>
          </div>

          <VRow v-if="rows[m.key]?.enabled" dense>
            <VCol cols="6" md="2">
              <VTextField v-model.number="rows[m.key].sort_order" type="number" label="Order" density="compact" variant="outlined" hide-details />
            </VCol>
            <VCol cols="6" md="3">
              <VSelect v-model="rows[m.key].badge" :items="BADGE_ITEMS" label="Badge" density="compact" variant="outlined" hide-details />
            </VCol>
            <VCol cols="12" md="3">
              <VTextField v-model="rows[m.key].title_override" label="Title override (optional)" density="compact" variant="outlined" hide-details />
            </VCol>
            <VCol cols="12" md="4">
              <VTextField v-model="rows[m.key].description_override" label="Description override (optional)" density="compact" variant="outlined" hide-details />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField v-model="rows[m.key].available_from" label="Campaign start (optional)" type="datetime-local" density="compact" variant="outlined" hide-details />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="rows[m.key].available_until" label="Campaign end (optional)" type="datetime-local" density="compact" variant="outlined" hide-details />
            </VCol>

            <template v-if="m.hasTicketConfig">
              <VCol cols="12"><VDivider class="my-1" /><p class="text-caption font-weight-bold text-uppercase" style="color:#888;">Ticket Validation</p></VCol>
              <VCol cols="12" md="6">
                <VSelect v-model="rows[m.key].config.strategy" :items="STRATEGY_ITEMS" label="Validation Strategy" density="compact" variant="outlined" hide-details />
              </VCol>
              <VCol v-if="rows[m.key].config.strategy === 'external'" cols="12" md="6">
                <VTextField
                  v-model="rows[m.key].config.external_url"
                  label="Organizer's validation URL"
                  hint="Sent {ticket_code}, expects {valid: bool, reason?: string}"
                  persistent-hint
                  density="compact"
                  variant="outlined"
                />
              </VCol>
            </template>
          </VRow>
        </VCardText>
      </VCard>
    </template>

    <div v-if="outletId && !loading" class="d-flex justify-end">
      <VBtn color="primary" :loading="saving" prepend-icon="bx-save" @click="save">Save Access Methods</VBtn>
    </div>
  </div>
</template>
