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
  // Skip the selection step entirely when there's only one possible choice.
  if (outlets.value.length === 1) outletId.value = outlets.value[0].id
}

watch(outletId, loadOutlet)
onMounted(fetchOutlets)
</script>

<template>
  <div>
    <PageHeader title="Access Methods" subtitle="Configure which checkout methods a kiosk offers, per outlet." />

    <div v-if="outlets.length > 1" class="outlet-picker mb-6">
      <button
        v-for="o in outlets"
        :key="o.id"
        type="button"
        class="outlet-picker__item"
        :class="{ 'outlet-picker__item--active': o.id === outletId }"
        @click="outletId = o.id"
      >
        {{ o.name }}
      </button>
    </div>

    <VProgressLinear v-if="loading" indeterminate color="primary" class="mb-4" />

    <EmptyState
      v-if="!outletId && !loading && outlets.length"
      icon="bx-store"
      title="Pilih outlet"
      description="Pilih outlet di atas untuk mengatur metode checkout kiosk-nya."
    />
    <EmptyState
      v-else-if="!loading && !outlets.length"
      icon="bx-store-alt"
      title="Belum ada outlet kiosk"
      description="Tandai sebuah outlet sebagai kiosk terlebih dahulu di halaman Outlets."
    />

    <template v-if="outletId && !loading">
      <VCard v-for="m in KNOWN_METHODS" :key="m.key" flat border rounded="lg" class="mb-4">
        <VCardText>
          <SettingsCard :title="m.label" :description="m.key">
            <div class="d-flex align-center gap-2">
              <span class="text-caption text-medium-emphasis">Default</span>
              <VSwitch
                :model-value="rows[m.key]?.is_default"
                color="primary"
                hide-details
                :disabled="!rows[m.key]?.enabled"
                @update:model-value="setDefault(m.key)"
              />
            </div>
            <div class="d-flex align-center gap-2">
              <span class="text-caption text-medium-emphasis">Enabled</span>
              <VSwitch v-model="rows[m.key].enabled" color="success" hide-details />
            </div>
          </SettingsCard>

          <FormSection v-if="rows[m.key]?.enabled" title="Tampilan">
            <VRow dense>
              <VCol cols="6" md="2">
                <FormField label="Order">
                  <template #default="{ id, describedBy }">
                    <VTextField :id="id" v-model.number="rows[m.key].sort_order" type="number" :aria-describedby="describedBy" />
                  </template>
                </FormField>
              </VCol>
              <VCol cols="6" md="3">
                <FormField label="Badge" optional>
                  <template #default="{ id, describedBy }">
                    <VSelect :id="id" v-model="rows[m.key].badge" :items="BADGE_ITEMS" :aria-describedby="describedBy" />
                  </template>
                </FormField>
              </VCol>
              <VCol cols="12" md="3">
                <FormField label="Title override" optional>
                  <template #default="{ id, describedBy }">
                    <VTextField :id="id" v-model="rows[m.key].title_override" :aria-describedby="describedBy" />
                  </template>
                </FormField>
              </VCol>
              <VCol cols="12" md="4">
                <FormField label="Description override" optional>
                  <template #default="{ id, describedBy }">
                    <VTextField :id="id" v-model="rows[m.key].description_override" :aria-describedby="describedBy" />
                  </template>
                </FormField>
              </VCol>
            </VRow>
          </FormSection>

          <FormSection v-if="rows[m.key]?.enabled" title="Jadwal kampanye" subtitle="Opsional — kosongkan untuk selalu aktif.">
            <VRow dense>
              <VCol cols="12" md="6">
                <FormField label="Mulai" optional>
                  <template #default="{ id, describedBy }">
                    <VTextField :id="id" v-model="rows[m.key].available_from" type="datetime-local" :aria-describedby="describedBy" />
                  </template>
                </FormField>
              </VCol>
              <VCol cols="12" md="6">
                <FormField label="Berakhir" optional>
                  <template #default="{ id, describedBy }">
                    <VTextField :id="id" v-model="rows[m.key].available_until" type="datetime-local" :aria-describedby="describedBy" />
                  </template>
                </FormField>
              </VCol>
            </VRow>
          </FormSection>

          <FormSection v-if="rows[m.key]?.enabled && m.hasTicketConfig" title="Validasi Tiket">
            <VRow dense>
              <VCol cols="12" md="6">
                <FormField label="Strategi Validasi">
                  <template #default="{ id, describedBy }">
                    <VSelect :id="id" v-model="rows[m.key].config.strategy" :items="STRATEGY_ITEMS" :aria-describedby="describedBy" />
                  </template>
                </FormField>
              </VCol>
              <VCol v-if="rows[m.key].config.strategy === 'external'" cols="12" md="6">
                <FormField label="URL validasi organizer" helper="Sent {ticket_code}, expects {valid: bool, reason?: string}">
                  <template #default="{ id, describedBy }">
                    <VTextField :id="id" v-model="rows[m.key].config.external_url" :aria-describedby="describedBy" />
                  </template>
                </FormField>
              </VCol>
            </VRow>
          </FormSection>
        </VCardText>
      </VCard>
    </template>

    <div v-if="outletId && !loading" class="d-flex justify-end">
      <VBtn color="primary" :loading="saving" prepend-icon="bx-save" @click="save">Save Access Methods</VBtn>
    </div>
  </div>
</template>

<style scoped>
.outlet-picker {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-4);
}

.outlet-picker__item {
  padding: var(--sp-3) var(--sp-6);
  border-radius: var(--radius-md);
  border: var(--border-default);
  background: var(--n-0);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  color: var(--text-secondary);
  cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease-in-out), color var(--dur-fast) var(--ease-in-out);
}

.outlet-picker__item:hover { border-color: var(--n-300); }

.outlet-picker__item--active {
  border-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-primary));
  background: rgb(var(--v-theme-primary) / 6%);
}
</style>
