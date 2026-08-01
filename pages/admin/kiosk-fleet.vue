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

// A stalled queue outranks low stock: the customer has already paid and their
// paper is not coming out. print_stalled is computed server-side so the
// threshold can be tuned without shipping a kiosk build.
const stalledKiosks = computed(() => kiosks.value.filter(k => k.print_stalled))
function queueAge(k: any) {
  const mins = Math.floor((k.print_queue_age_ms ?? 0) / 60000)
  return mins >= 60 ? `${Math.floor(mins / 60)} jam` : `${mins} menit`
}

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

// The warning only carries weight if it isn't always on screen — and != null
// (not !==) so it still fires when the value is undefined, not just null.
const stockChanged = computed(() =>
  stockInitial.value != null && stockInitial.value !== stockTarget.value?.stock?.initial,
)

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
      v-if="stalledKiosks.length"
      type="error"
      variant="tonal"
      class="mb-4"
      icon="bx-error-circle"
    >
      <p class="font-weight-bold mb-1">
        {{ stalledKiosks.length }} kiosk macet — antrean cetak tidak jalan
      </p>
      <p class="text-caption mb-0">
        {{ stalledKiosks.map(k => `${k.outlet_name} (${k.print_queue_count} job, tertua ${queueAge(k)})`).join(' · ') }}
        — biasanya print spooler Windows perlu di-restart.
      </p>
    </VAlert>

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
      title="Stok cetak"
      :description="stockTarget?.outlet_name"
      size="sm"
      :loading="stockSaving"
      confirm-text="Simpan"
      cancel-text="Batal"
      @confirm="saveStock"
    >
      <div v-if="stockTarget?.stock?.initial != null" class="stock-strip">
        <div class="stock-strip__item">
          <span class="stock-strip__value">{{ stockTarget.stock.printed }}</span>
          <span class="stock-strip__label">Tercetak</span>
        </div>
        <div class="stock-strip__item">
          <span class="stock-strip__value">{{ stockTarget.stock.remaining }}</span>
          <span class="stock-strip__label">Sisa</span>
        </div>
        <div class="stock-strip__item">
          <span class="stock-strip__value">{{ stockTarget.stock.initial }}</span>
          <span class="stock-strip__label">Kapasitas</span>
        </div>
      </div>

      <FormSection title="Stok">
        <FormField label="Jumlah kertas terpasang" helper="Isi setelah mengganti kertas atau ribbon." width="num">
          <template #default="{ id, describedBy }">
            <VTextField
              :id="id"
              v-model.number="stockInitial"
              type="number"
              inputmode="numeric"
              placeholder="cth: 1000"
              :aria-describedby="describedBy"
              clearable
            />
          </template>
        </FormField>

        <InlineAlert v-if="stockChanged" tone="warning">
          Menyimpan akan mereset hitungan tercetak ke 0.
        </InlineAlert>
      </FormSection>

      <FormSection title="Peringatan">
        <FormField
          label="Peringatan bila sisa kurang dari"
          helper="Kiosk dan dashboard menampilkan peringatan di bawah angka ini."
          width="num"
        >
          <template #default="{ id, describedBy }">
            <VTextField
              :id="id"
              v-model.number="stockThreshold"
              type="number"
              inputmode="numeric"
              :aria-describedby="describedBy"
            />
          </template>
        </FormField>
      </FormSection>
    </AppModal>
  </div>
</template>

<style scoped>
.stock-strip {
  display: flex;
  border: 1px solid var(--n-200);
  border-radius: var(--radius-lg);
  background: var(--n-50);
  overflow: hidden;
}

.stock-strip__item {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-1);
  padding: var(--sp-5) var(--sp-4);
}

.stock-strip__item + .stock-strip__item { border-left: 1px solid var(--n-200); }

.stock-strip__value {
  font-size: var(--fs-lg);
  font-weight: var(--fw-semibold);
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}

.stock-strip__label {
  font-size: var(--fs-2xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-tertiary);
}
</style>
