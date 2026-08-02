<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { DataTableHeader } from '@/components/AppDataTable.vue'
import { useKioskFleet } from '@/composables/useKioskFleet'

dayjs.extend(relativeTime)

const { kiosks, loading, error, getKioskFleet, updateKioskStock, deleteKioskPrinter } = useKioskFleet()
const toast = useToast()
const { confirm } = useConfirm()

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

// The banners above scan the whole fleet, so search/sort/paging stay
// client-side over the full list rather than round-tripping to the server —
// a fleet is tens of kiosks per tenant, not thousands.
const search = ref('')
const sortBy = ref<'outlet_name' | 'last_seen_at' | 'app_version'>('last_seen_at')
const sortDir = ref<'asc' | 'desc'>('desc')
const page = ref(1)
const limit = 10

const sortOptions = [
  { title: 'Terakhir Terlihat', value: 'last_seen_at' },
  { title: 'Outlet', value: 'outlet_name' },
  { title: 'App Version', value: 'app_version' },
]

const filteredKiosks = computed(() => {
  const q = search.value.trim().toLowerCase()
  let list = kiosks.value
  if (q) {
    list = list.filter(k =>
      [k.outlet_name, k.printer_name, k.secondary_printer_name, k.receipt_printer_name]
        .some(v => v?.toLowerCase().includes(q)),
    )
  }

  const dir = sortDir.value === 'asc' ? 1 : -1
  return [...list].sort((a, b) => {
    const av = a[sortBy.value] ?? ''
    const bv = b[sortBy.value] ?? ''
    return av < bv ? -dir : av > bv ? dir : 0
  })
})

const total = computed(() => filteredKiosks.value.length)
const pagedKiosks = computed(() => filteredKiosks.value.slice((page.value - 1) * limit, page.value * limit))

watch([search, sortBy, sortDir], () => { page.value = 1 })

const headers: DataTableHeader[] = [
  { key: 'outlet_name', title: 'Outlet' },
  { key: 'foto', title: 'Printer Foto' },
  { key: 'strip', title: 'Printer Strip' },
  { key: 'struk', title: 'Printer Struk' },
  { key: 'stock', title: 'Sisa Cetak' },
  { key: 'app_version', title: 'App Version' },
  { key: 'last_seen_at', title: 'Terakhir Terlihat', nowrap: true },
  { key: 'actions', title: '', align: 'end' },
]

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

async function removeKiosk(kiosk: any) {
  const ok = await confirm({
    title: 'Hapus kiosk',
    message: `Yakin ingin menghapus kiosk "${kiosk.outlet_name}" dari fleet? Kiosk yang masih aktif akan muncul lagi di heartbeat berikutnya.`,
    tone: 'danger',
    confirmText: 'Hapus',
    cancelText: 'Batal',
  })
  if (!ok) return
  const ok2 = await deleteKioskPrinter(kiosk.id)
  if (!ok2) { toast.error(error.value ?? 'Gagal menghapus kiosk.'); return }
  toast.success('Kiosk berhasil dihapus')
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
      <AppDataTable
        :headers="headers"
        :items="pagedKiosks"
        :loading="loading"
        :page="page"
        :items-per-page="limit"
        :total="total"
        empty-title="Belum ada kiosk terdaftar"
        empty-icon="bx-printer"
        @update:page="p => (page = p)"
      >
        <template #toolbar>
          <VTextField
            v-model="search"
            placeholder="Cari outlet atau printer..."
            prepend-inner-icon="bx-search"
            clearable
            style="max-width: 280px;"
          />
          <VSelect
            v-model="sortBy"
            :items="sortOptions"
            label="Urutkan"
            density="compact"
            style="max-width: 200px;"
            hide-details
          />
          <VBtn
            icon
            variant="text"
            :aria-label="sortDir === 'asc' ? 'Ascending' : 'Descending'"
            @click="sortDir = sortDir === 'asc' ? 'desc' : 'asc'"
          >
            <VIcon :icon="sortDir === 'asc' ? 'bx-sort-up' : 'bx-sort-down'" />
            <VTooltip activator="parent">{{ sortDir === 'asc' ? 'Naik' : 'Turun' }}</VTooltip>
          </VBtn>
        </template>

        <template #item.foto="{ item }">
          <template v-if="item.printer_name">
            <div class="text-body-2">{{ item.printer_name }}</div>
            <VChip size="x-small" :color="statusColor(item.printer_status)">{{ item.printer_status }}</VChip>
          </template>
          <!-- No photo printer paired yet (receipt-only kiosk, or still being
               set up) reads as an em dash rather than a red "offline" chip
               for a device that was never configured. -->
          <span v-else class="text-medium-emphasis">—</span>
        </template>

        <template #item.strip="{ item }">
          <template v-if="item.secondary_printer_name">
            <div class="text-body-2">{{ item.secondary_printer_name }}</div>
            <!-- Unset means strips go to the primary printer, a normal
                 single-printer setup — not a fault. -->
            <VChip v-if="item.secondary_printer_status" size="x-small" :color="statusColor(item.secondary_printer_status)">
              {{ item.secondary_printer_status }}
            </VChip>
          </template>
          <span v-else class="text-medium-emphasis">—</span>
        </template>

        <template #item.struk="{ item }">
          <template v-if="item.receipt_printer_name">
            <div class="text-body-2">{{ item.receipt_printer_name }}</div>
            <!-- No receipt printer configured is not a fault either. -->
            <VChip v-if="item.receipt_printer_status" size="x-small" :color="statusColor(item.receipt_printer_status)">
              {{ item.receipt_printer_status }}
            </VChip>
          </template>
          <span v-else class="text-medium-emphasis">—</span>
        </template>

        <template #item.stock="{ item }">
          <!-- null initial = tracking never configured; an em dash says that
               plainly instead of implying a real count of zero. -->
          <span v-if="item.stock?.initial === null" class="text-medium-emphasis">—</span>
          <VChip v-else size="small" :color="item.stock.low ? 'warning' : 'default'">
            {{ item.stock.remaining }} / {{ item.stock.initial }}
          </VChip>
        </template>

        <template #item.app_version="{ item }">
          {{ item.app_version ?? '-' }}
        </template>

        <template #item.last_seen_at="{ item }">
          {{ dayjs(item.last_seen_at).fromNow() }}
          <VChip v-if="isStale(item.last_seen_at)" size="x-small" color="warning" class="ml-2">Stale</VChip>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end" style="gap: 4px;">
            <VBtn icon variant="text" size="small" @click="openStock(item)">
              <VIcon icon="bx-layer" />
              <VTooltip activator="parent">Atur stok cetak</VTooltip>
            </VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="removeKiosk(item)">
              <VIcon icon="bx-trash-alt" />
              <VTooltip activator="parent">Hapus</VTooltip>
            </VBtn>
          </div>
        </template>
      </AppDataTable>
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
