<script setup lang="ts">
import AnalyticsRevenue from '@/views/dashboard/AnalyticsRevenue.vue'
import AnalyticsRevenuePerUnit from '@/views/dashboard/AnalyticsRevenuePerUnit.vue'
import AnalyticsRevenueMonthly from '@/views/dashboard/AnalyticsRevenueMonthly.vue' // komponen baru

const { getDasboardStatistcs } = useReports()

const stats = ref<ReportResponse | null>(null)

async function getDashboardData() {
  stats.value = await getDasboardStatistcs()
}

onMounted(async () => {
  await getDashboardData()
})

// Format currency helper
const formatCurrency = (amount: number) => amount.toLocaleString('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0
})

// Card stats
const incomeToday = computed(() => formatCurrency(stats.value?.total_pendapatan_hari_ini ?? 0))
const incomeWeek = computed(() => formatCurrency(stats.value?.total_pendapatan_minggu_ini ?? 0))
const incomeMonth = computed(() => formatCurrency(stats.value?.total_pendapatan_bulan_ini ?? 0))
const incomeYear = computed(() => formatCurrency(stats.value?.total_pendapatan_tahun_ini ?? 0))

const totalTransaction = computed(() => (stats.value?.total_transaksi_hari_ini ?? 0).toString())
const totalTransactionWeek = computed(() => (stats.value?.total_transaksi_minggu_ini ?? 0).toString())
const totalTransactionMonth = computed(() => (stats.value?.total_transaksi_bulan_ini ?? 0).toString())
const totalTransactionYear = computed(() => (stats.value?.total_transaksi_tahun_ini ?? 0).toString())

// Chart data
const chartData = computed(() => stats.value?.pendapatan_per_hari ?? [])
const unitsRevenue = computed(() => stats.value?.pendapatan_per_unit ?? [])
const monthlyRevenueChartData = computed(() =>
  stats.value?.pendapatan_per_bulan?.map(item => ({
    name: item.bulan,
    total: item.total
  })) ?? []
)

definePageMeta({
  layout: 'outlet'
})
</script>
<template>
  <!-- Cards: Hari ini -->
  <VRow>
    <VCol cols="12">
      <VRow>
        <VCol cols="12" md="6" lg="3">
          <CardStatisticsHorizontal :stats="incomeToday" icon="bx bx-wallet-alt" title="Pendapatan Hari ini" />
        </VCol>
        <VCol cols="12" md="6" lg="3">
          <CardStatisticsHorizontal :stats="incomeWeek" icon="bx bx-calendar-week" title="Pendapatan Minggu ini" />
        </VCol>
        <VCol cols="12" md="6" lg="3">
          <CardStatisticsHorizontal :stats="incomeMonth" icon="bx bx-calendar" title="Pendapatan Bulan ini" />
        </VCol>
        <VCol cols="12" md="6" lg="3">
          <CardStatisticsHorizontal :stats="incomeYear" icon="bx bx-calendar-alt" title="Pendapatan Tahun ini" />
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12" md="6">
          <CardStatisticsHorizontal :stats="totalTransaction" icon="bx bx-cart" title="Transaksi Hari ini" />
        </VCol>
        <VCol cols="12" md="6">
          <CardStatisticsHorizontal :stats="totalTransactionWeek" icon="bx bx-cart-alt" title="Transaksi Minggu ini" />
        </VCol>
        <VCol cols="12" md="6">
          <CardStatisticsHorizontal :stats="totalTransactionMonth" icon="bx bx-cart-add" title="Transaksi Bulan ini" />
        </VCol>
        <VCol cols="12" md="6">
          <CardStatisticsHorizontal :stats="totalTransactionYear" icon="bx bx-cart-download" title="Transaksi Tahun ini" />
        </VCol>
      </VRow>
    </VCol>
  </VRow>

  <!-- Charts -->
  <VRow>
    <VCol cols="12" md="8" order="2" order-md="1" class="h-100">
      <AnalyticsRevenue :data="chartData" />
    </VCol>
    <VCol cols="12" md="4" order="2" order-md="1" class="h-100">
      <AnalyticsRevenuePerUnit :data="unitsRevenue" />
    </VCol>
  </VRow>

  <!-- Monthly Chart -->
  <VRow>
    <VCol cols="12">
      <AnalyticsRevenueMonthly :data="monthlyRevenueChartData" />
    </VCol>
  </VRow>
</template>
