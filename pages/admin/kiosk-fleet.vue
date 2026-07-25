<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useKioskFleet } from '@/composables/useKioskFleet'

dayjs.extend(relativeTime)

const { kiosks, loading, error, getKioskFleet } = useKioskFleet()
const toast = useToast()

const STALE_MINUTES = 15

function statusColor(status: string) {
  return { online: 'success', offline: 'default', error: 'error' }[status] ?? 'default'
}

function isStale(lastSeenAt: string) {
  return dayjs().diff(dayjs(lastSeenAt), 'minute') > STALE_MINUTES
}

async function fetchAll() {
  await getKioskFleet()
  if (error.value) toast.error(error.value)
}

onMounted(fetchAll)
</script>

<template>
  <div>
    <PageHeader title="Kiosk Fleet" subtitle="Status printer dan konektivitas tiap kiosk." />

    <VCard flat border rounded="lg">
      <VCardText>
        <VProgressLinear v-if="loading" indeterminate color="primary" class="mb-4" />

        <div v-if="!loading && kiosks.length === 0" class="text-center pa-12 text-medium-emphasis">
          <VIcon size="56" class="mb-3" color="grey-lighten-1">bx-printer</VIcon>
          <p class="text-subtitle-1">Belum ada kiosk terdaftar</p>
        </div>

        <VTable v-else density="compact">
          <thead>
            <tr>
              <th>Outlet</th>
              <th>Printer</th>
              <th>Status</th>
              <th>App Version</th>
              <th>Terakhir Terlihat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="k in kiosks" :key="k.id">
              <td>{{ k.outlet_name }}</td>
              <td>{{ k.printer_name ?? '-' }}</td>
              <td><VChip size="small" :color="statusColor(k.printer_status)">{{ k.printer_status }}</VChip></td>
              <td>{{ k.app_version ?? '-' }}</td>
              <td>
                {{ dayjs(k.last_seen_at).fromNow() }}
                <VChip v-if="isStale(k.last_seen_at)" size="x-small" color="warning" class="ml-2">Stale</VChip>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCardText>
    </VCard>
  </div>
</template>
