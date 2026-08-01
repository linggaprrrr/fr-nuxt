<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useKioskFleet } from '@/composables/useKioskFleet'

dayjs.extend(relativeTime)

const { kiosks, loading, error, getKioskFleet, updateKioskStock } = useKioskFleet()
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

// Kiosks needing media, surfaced above the table — the point of the counter is
// to be noticed without reading every row.
const lowStockKiosks = computed(() => kiosks.value.filter(k => k.stock?.low))

const stockDialog = ref(false)
const stockTarget = ref<any>(null)
const stockInitial = ref<number | null>(null)
const stockThreshold = ref(100)
const stockSaving = ref(false)

function openStock(kiosk: any) {
  stockTarget.value = kiosk
  stockInitial.value = kiosk.stock?.initial ?? null
  stockThreshold.value = kiosk.stock?.threshold ?? 100
  stockDialog.value = true
}

async function saveStock() {
  if (!stockTarget.value) return
  stockSaving.value = true
  const res = await updateKioskStock(stockTarget.value.id, {
    initial_print_count: stockInitial.value,
    low_stock_threshold: stockThreshold.value,
  })
  stockSaving.value = false
  if (!res) { toast.error(error.value ?? 'Gagal menyimpan stok cetak.'); return }
  toast.success('Stok cetak diperbarui — hitungan tercetak direset ke 0')
  stockDialog.value = false
  await fetchAll()
}

onMounted(fetchAll)
</script>

<template>
  <div>
    <PageHeader title="Kiosk Fleet" subtitle="Status printer dan konektivitas tiap kiosk." />

    <VAlert
      v-if="lowStockKiosks.length"
      type="warning"
      variant="tonal"
      class="mb-4"
      icon="bx-error"
    >
      <p class="font-weight-bold mb-1">
        {{ lowStockKiosks.length }} kiosk hampir kehabisan kertas
      </p>
      <p class="text-caption mb-0">
        {{ lowStockKiosks.map(k => `${k.outlet_name} (sisa ${k.stock.remaining})`).join(' · ') }}
      </p>
    </VAlert>

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
              <th>Printer Foto</th>
              <th>Status</th>
              <th>Printer Strip</th>
              <th>Status Strip</th>
              <th>Printer Struk</th>
              <th>Status Struk</th>
              <th>Sisa Cetak</th>
              <th>App Version</th>
              <th>Terakhir Terlihat</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr v-for="k in kiosks" :key="k.id">
              <td>{{ k.outlet_name }}</td>
              <td>{{ k.printer_name ?? '-' }}</td>
              <td>
                <!-- No photo printer paired yet (receipt-only kiosk, or still
                     being set up). printer_status is NOT NULL server-side so it
                     still says "offline"; a red chip for a device that was
                     never configured reads as a fault it isn't. -->
                <VChip v-if="k.printer_name" size="small" :color="statusColor(k.printer_status)">
                  {{ k.printer_status }}
                </VChip>
                <span v-else class="text-medium-emphasis">—</span>
              </td>
              <td>{{ k.secondary_printer_name ?? '-' }}</td>
              <td>
                <!-- Unset means strips go to the primary printer, a normal
                     single-printer setup — not a fault. -->
                <VChip
                  v-if="k.secondary_printer_status"
                  size="small"
                  :color="statusColor(k.secondary_printer_status)"
                >
                  {{ k.secondary_printer_status }}
                </VChip>
                <span v-else class="text-medium-emphasis">—</span>
              </td>
              <td>{{ k.receipt_printer_name ?? '-' }}</td>
              <td>
                <!-- No receipt printer configured is not a fault, so it reads
                     as an em dash rather than a red "offline" chip. -->
                <VChip
                  v-if="k.receipt_printer_status"
                  size="small"
                  :color="statusColor(k.receipt_printer_status)"
                >
                  {{ k.receipt_printer_status }}
                </VChip>
                <span v-else class="text-medium-emphasis">—</span>
              </td>
              <td>
                <!-- null initial = tracking never configured; an em dash says
                     that plainly instead of implying a real count of zero. -->
                <template v-if="k.stock?.initial === null">
                  <span class="text-medium-emphasis">—</span>
                </template>
                <template v-else>
                  <VChip size="small" :color="k.stock.low ? 'warning' : 'default'">
                    {{ k.stock.remaining }} / {{ k.stock.initial }}
                  </VChip>
                </template>
              </td>
              <td>{{ k.app_version ?? '-' }}</td>
              <td>
                {{ dayjs(k.last_seen_at).fromNow() }}
                <VChip v-if="isStale(k.last_seen_at)" size="x-small" color="warning" class="ml-2">Stale</VChip>
              </td>
              <td class="text-end">
                <VBtn icon variant="text" size="small" @click="openStock(k)">
                  <VIcon icon="bx-layer" />
                  <VTooltip activator="parent">Atur stok cetak</VTooltip>
                </VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCardText>
    </VCard>

    <AppModal
      v-model="stockDialog"
      :title="`Stok Cetak — ${stockTarget?.outlet_name ?? ''}`"
      icon="bx-layer"
      max-width="480"
      :loading="stockSaving"
      confirm-text="Simpan"
      cancel-text="Batal"
      @confirm="saveStock"
    >
      <VRow>
        <VCol cols="12">
          <VTextField
            v-model.number="stockInitial"
            type="number"
            label="Jumlah Kertas Terpasang"
            placeholder="cth: 1000"
            density="compact"
            variant="outlined"
            hint="Isi setelah mengganti kertas/ribbon — hitungan tercetak otomatis kembali ke 0"
            persistent-hint
            clearable
          />
        </VCol>
        <VCol cols="12">
          <VTextField
            v-model.number="stockThreshold"
            type="number"
            label="Peringatan bila sisa kurang dari"
            density="compact"
            variant="outlined"
            hint="Kiosk dan dashboard menampilkan peringatan di bawah angka ini"
            persistent-hint
          />
        </VCol>
        <VCol v-if="stockTarget?.stock?.initial !== null" cols="12">
          <VAlert type="info" variant="tonal" density="compact" class="text-caption">
            Saat ini: {{ stockTarget?.stock?.printed }} tercetak,
            sisa {{ stockTarget?.stock?.remaining }} dari {{ stockTarget?.stock?.initial }}.
          </VAlert>
        </VCol>
      </VRow>
    </AppModal>
  </div>
</template>
