<script setup lang="ts">
import { usePrintAnalytics } from '@/composables/usePrintAnalytics'
import { useOutlets } from '@/composables/useOutlets'

const { analytics, loading, error, getPrintAnalytics } = usePrintAnalytics()
const toast = useToast()

const outlets = ref<any[]>([])
const outletFilter = ref('')
const fromDate = ref('')
const toDate = ref('')

async function fetchOutlets() {
  const res = await useOutlets().getOutlets({ page: 1, limit: 9999 })
  outlets.value = res?.data || []
}

async function fetchAnalytics() {
  const params: Record<string, any> = {}
  if (outletFilter.value) params.outlet_id = outletFilter.value
  if (fromDate.value) params.from = fromDate.value
  if (toDate.value) params.to = toDate.value
  await getPrintAnalytics(params)
  if (error.value) toast.error(error.value)
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
              density="compact"
              variant="outlined"
              hide-details
            />
          </VCol>
          <VCol cols="12" md="3">
            <VTextField v-model="fromDate" type="date" label="Dari" density="compact" variant="outlined" hide-details />
          </VCol>
          <VCol cols="12" md="3">
            <VTextField v-model="toDate" type="date" label="Sampai" density="compact" variant="outlined" hide-details />
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
