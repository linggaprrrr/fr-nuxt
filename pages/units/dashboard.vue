<script setup lang="ts">
import AnalyticsRevenue from '@/views/dashboard/AnalyticsRevenue.vue'
import AnalyticsRevenuePerUnit from '@/views/dashboard/AnalyticsRevenuePerUnit.vue'
import AnalyticsRevenueMonthly from '@/views/dashboard/AnalyticsRevenueMonthly.vue'

const { getDasboardStatistcs } = useReports()

const stats = ref<ReportResponse | null>(null)
const isLoading = ref(true)

async function getDashboardData() {
  isLoading.value = true
  try { stats.value = await getDasboardStatistcs() }
  finally { isLoading.value = false }
}

onMounted(getDashboardData)

const formatCurrency = (amount: number) => amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })

const revenueCards = computed(() => [
  { title: 'Pendapatan Hari ini',   value: formatCurrency(stats.value?.total_pendapatan_hari_ini ?? 0),  icon: 'bx-wallet-alt',    color: 'primary' },
  { title: 'Pendapatan Minggu ini', value: formatCurrency(stats.value?.total_pendapatan_minggu_ini ?? 0), icon: 'bx-calendar-week', color: 'info' },
  { title: 'Pendapatan Bulan ini',  value: formatCurrency(stats.value?.total_pendapatan_bulan_ini ?? 0),  icon: 'bx-calendar',      color: 'success' },
  { title: 'Pendapatan Tahun ini',  value: formatCurrency(stats.value?.total_pendapatan_tahun_ini ?? 0),  icon: 'bx-calendar-alt',  color: 'warning' },
])

const transactionCards = computed(() => [
  { title: 'Transaksi Hari ini',   value: (stats.value?.total_transaksi_hari_ini ?? 0).toLocaleString('id-ID'),   icon: 'bx-cart',          color: 'primary' },
  { title: 'Transaksi Minggu ini', value: (stats.value?.total_transaksi_minggu_ini ?? 0).toLocaleString('id-ID'), icon: 'bx-cart-alt',      color: 'info' },
  { title: 'Transaksi Bulan ini',  value: (stats.value?.total_transaksi_bulan_ini ?? 0).toLocaleString('id-ID'),  icon: 'bx-cart-add',      color: 'success' },
  { title: 'Transaksi Tahun ini',  value: (stats.value?.total_transaksi_tahun_ini ?? 0).toLocaleString('id-ID'),  icon: 'bx-cart-download', color: 'warning' },
])

const chartData = computed(() => stats.value?.pendapatan_per_hari ?? [])
const unitsRevenue = computed(() => stats.value?.pendapatan_per_unit ?? [])
const monthlyRevenueChartData = computed(() =>
  stats.value?.pendapatan_per_bulan?.map(item => ({ name: item.bulan, total: item.total })) ?? []
)

definePageMeta({ layout: 'unit' })
</script>

<template>
  <div>
    <PageHeader title="Dashboard" subtitle="Ringkasan pendapatan dan transaksi." />

    <VRow>
      <VCol v-for="card in revenueCards" :key="card.title" cols="12" sm="6" lg="3">
        <StatCard :title="card.title" :value="card.value" :icon="card.icon" :color="card.color" />
      </VCol>
    </VRow>

    <VRow class="mt-1">
      <VCol v-for="card in transactionCards" :key="card.title" cols="12" sm="6" lg="3">
        <StatCard :title="card.title" :value="card.value" :icon="card.icon" :color="card.color" />
      </VCol>
    </VRow>

    <VRow class="mt-1">
      <VCol cols="12" md="8"><AnalyticsRevenue :data="chartData" /></VCol>
      <VCol cols="12" md="4"><AnalyticsRevenuePerUnit :data="unitsRevenue" /></VCol>
    </VRow>

    <VRow>
      <VCol cols="12"><AnalyticsRevenueMonthly :data="monthlyRevenueChartData" /></VCol>
    </VRow>
  </div>
</template>
