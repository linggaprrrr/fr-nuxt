<script setup lang="ts">
import type { OperationalAlert } from '@/composables/useReports'

// The dashboard's "what is broken right now" strip. Renders nothing at all
// when everything is healthy — an always-visible panel that usually says
// "no problems" is how people stop reading it, and then miss the one day it
// says something.
const { getOperationalAlerts } = useReports()

const alerts = ref<OperationalAlert[]>([])
const loaded = ref(false)

// Kiosk state changes on a 5-minute heartbeat, so anything faster than that
// polls the API for data that cannot have changed.
const POLL_MS = 60_000
let timer: ReturnType<typeof setInterval> | null = null

async function load() {
  try {
    const res = await getOperationalAlerts()
    alerts.value = res?.data ?? []
  } catch {
    // A failed alerts call must not blank the dashboard: keep whatever was
    // last known rather than implying everything is suddenly fine.
  } finally {
    loaded.value = true
  }
}

onMounted(() => {
  load()
  timer = setInterval(load, POLL_MS)
})
onBeforeUnmount(() => { if (timer) clearInterval(timer) })

const ICON: Record<string, string> = {
  kiosk_offline: 'bx-wifi-off',
  printer_down: 'bx-printer',
  media_low: 'bx-file-blank',
  print_failed: 'bx-error',
  txn_stuck: 'bx-time-five',
}
const COLOR: Record<string, string> = { high: 'error', medium: 'warning', low: 'info' }

const highCount = computed(() => alerts.value.filter(a => a.severity === 'high').length)
</script>

<template>
  <VCard
    v-if="loaded && alerts.length"
    flat
    border
    rounded="lg"
    class="mb-4"
    :style="{ borderColor: highCount ? 'rgb(var(--v-theme-error))' : undefined }"
  >
    <VCardText class="py-3">
      <div class="d-flex align-center mb-2" style="gap: 8px;">
        <VIcon icon="bx-bell" size="18" :color="highCount ? 'error' : 'warning'" />
        <span class="text-subtitle-2 font-weight-bold">
          Perlu Perhatian ({{ alerts.length }})
        </span>
      </div>

      <div class="d-flex flex-column" style="gap: 6px;">
        <div
          v-for="(a, i) in alerts"
          :key="`${a.kind}-${i}`"
          class="d-flex align-center"
          style="gap: 8px;"
        >
          <VIcon :icon="ICON[a.kind] ?? 'bx-error-circle'" size="16" :color="COLOR[a.severity]" />
          <span class="text-body-2">{{ a.message }}</span>
          <!-- Which outlet matters more than which alert: it is the first
               thing anyone asks. Omitted when the alert is fleet-wide. -->
          <VChip v-if="a.outlet_name" size="x-small" label>{{ a.outlet_name }}</VChip>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>
