<script setup lang="ts">
import { usePrintAnalytics } from '@/composables/usePrintAnalytics'
import { useOutlets } from '@/composables/useOutlets'

const { analytics, jobs, loading, error, getPrintAnalytics, getPrintJobs, reprintJob } = usePrintAnalytics()
const toast = useToast()
const { confirm } = useConfirm()

const outlets = ref<any[]>([])
const outletFilter = ref('')
const fromDate = ref('')
const toDate = ref('')

async function fetchOutlets() {
  const res = await useOutlets().getOutlets({ page: 1, limit: 9999, is_kiosk: true })
  outlets.value = res?.data || []
}

async function fetchAnalytics() {
  const params: Record<string, any> = {}
  if (outletFilter.value) params.outlet_id = outletFilter.value
  if (fromDate.value) params.from = fromDate.value
  if (toDate.value) params.to = toDate.value
  await getPrintAnalytics(params)
  if (error.value) toast.error(error.value)
  await getPrintJobs(params)
  if (error.value) toast.error(error.value)
}

// A job the customer paid for and never received: the app died mid-print, the
// power went, the spooler wedged. Those leave a job stuck on `queued`, which is
// why this isn't limited to `failed` the way the kiosk's own retry is.
const STALE_QUEUED_MS = 10 * 60 * 1000
function needsAttention(j: any) {
  if (j.status === 'failed') return true
  return j.status === 'queued' && Date.now() - new Date(j.created_at).getTime() > STALE_QUEUED_MS
}
const stuckJobs = computed(() => jobs.value.filter(needsAttention))

const JOB_STATUS_MAP = { printed: 'success', queued: 'warning', failed: 'error' }

async function handleReprint(job: any) {
  if (!await confirm({
    title: 'Cetak Ulang',
    message: 'Cetak ulang job ini? Pelanggan tidak dikenakan biaya lagi — template dan foto yang sama akan dikirim ke antrean kiosk.',
    confirmText: 'Cetak Ulang',
  })) return
  const res = await reprintJob(job.id)
  if (!res) { toast.error(error.value || 'Gagal mencetak ulang.'); return }
  toast.success('Job cetak ulang dibuat — kiosk mengambilnya pada sinkron berikutnya.')
  await fetchAnalytics()
}

onMounted(async () => { await fetchOutlets(); await fetchAnalytics() })
</script>

<template>
  <div>
    <PageHeader title="Print Analytics" subtitle="Statistik pekerjaan cetak foto." />

    <VCard flat border rounded="lg" class="mb-4">
      <VCardText class="py-3">
        <VRow dense>
          <VCol cols="12" md="3">
            <VSelect
              v-model="outletFilter"
              :items="[{ title: 'Semua Outlet', value: '' }, ...outlets.map(o => ({ title: o.name, value: o.id }))]"
              label="Outlet"
              hide-details
            />
          </VCol>
          <VCol cols="12" md="3">
            <VTextField v-model="fromDate" type="date" label="Dari" hide-details />
          </VCol>
          <VCol cols="12" md="3">
            <VTextField v-model="toDate" type="date" label="Sampai" hide-details />
          </VCol>
          <VCol cols="12" md="3" class="d-flex align-center">
            <VBtn color="primary" prepend-icon="bx-search-alt" @click="fetchAnalytics">Terapkan</VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VProgressLinear v-if="loading" indeterminate color="primary" class="mb-4" />

    <VRow class="mb-4" dense>
      <VCol cols="12" md="4">
        <VCard flat border rounded="lg">
          <VCardText>
            <div class="text-subtitle-2 text-grey">Total Print Jobs</div>
            <div class="text-h4 font-weight-bold text-primary">{{ analytics?.total_jobs ?? 0 }}</div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="4">
        <VCard flat border rounded="lg">
          <VCardText>
            <div class="text-subtitle-2 text-grey">Failure Rate</div>
            <div class="text-h4 font-weight-bold text-error">{{ ((analytics?.failure_rate ?? 0) * 100).toFixed(1) }}%</div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="4">
        <VCard flat border rounded="lg">
          <VCardText>
            <div class="text-subtitle-2 text-grey">Rata-rata Salinan</div>
            <div class="text-h4 font-weight-bold text-success">{{ (analytics?.avg_copies ?? 0).toFixed(1) }}</div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VCard flat border rounded="lg" class="mb-4">
      <VCardText>
        <p class="text-subtitle-2 font-weight-bold mb-2">Jobs per Status</p>
        <div class="d-flex flex-wrap gap-2">
          <VChip v-for="(count, status) in analytics?.by_status" :key="status" size="small">{{ status }}: {{ count }}</VChip>
          <span v-if="!analytics?.by_status || Object.keys(analytics.by_status).length === 0" class="text-caption text-medium-emphasis">Tidak ada data</span>
        </div>
      </VCardText>
    </VCard>

    <VCard flat border rounded="lg" class="mb-4">
      <VCardText>
        <div class="d-flex align-center justify-space-between mb-3">
          <p class="text-subtitle-2 font-weight-bold mb-0">Job Cetak Bermasalah</p>
          <VChip v-if="stuckJobs.length" size="small" color="error">{{ stuckJobs.length }} perlu perhatian</VChip>
        </div>
        <InlineAlert v-if="stuckJobs.length" tone="warning" class="mb-3">
          Job berikut sudah dibayar tapi belum tercetak. Cetak ulang tidak menagih pelanggan lagi.
        </InlineAlert>
        <VTable density="compact">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Status</th>
              <th>Salinan</th>
              <th class="text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!stuckJobs.length">
              <td colspan="4" class="text-center text-grey">Semua job cetak beres</td>
            </tr>
            <tr v-for="j in stuckJobs" :key="j.id">
              <td class="text-caption">{{ new Date(j.created_at).toLocaleString('id-ID') }}</td>
              <td><StatusChip :status="j.status" :map="JOB_STATUS_MAP" /></td>
              <td>{{ j.copies }}</td>
              <td class="text-right">
                <VBtn size="small" variant="tonal" color="primary" prepend-icon="bx-printer" class="text-none" @click="handleReprint(j)">
                  Cetak Ulang
                </VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCardText>
    </VCard>

    <VCard flat border rounded="lg">
      <VCardText>
        <p class="text-subtitle-2 font-weight-bold mb-3">Top Templates</p>
        <VTable density="compact">
          <thead>
            <tr>
              <th>Template</th>
              <th>Jumlah Dipakai</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!analytics?.top_templates?.length">
              <td colspan="2" class="text-center text-grey">Tidak ada data</td>
            </tr>
            <tr v-for="t in analytics?.top_templates" :key="t.template_id">
              <td>{{ t.label }}</td>
              <td>{{ t.count }}</td>
            </tr>
          </tbody>
        </VTable>
      </VCardText>
    </VCard>
  </div>
</template>
