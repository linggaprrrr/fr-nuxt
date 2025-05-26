<script setup lang="ts">

import AnalyticsRevenue from '@/views/dashboard/AnalyticsRevenue.vue'
import AnalyticsRevenuePerUnit from '@/views/dashboard/AnalyticsRevenuePerUnit.vue'

const {
  loading, 
  getDasboardStatistcs,  
} = useReports()

const stats = ref<ReportResponse | null>(null)

async function getDashboardData() {
  stats.value = await getDasboardStatistcs()
}

onMounted(async() => {
  await getDashboardData()
  console.log(stats.value) 
})

const incomeToday = computed(() =>
  (stats.value?.total_pendapatan_hari_ini ?? 0).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  })
)

const totalTransaction = computed(() => 
  (stats.value?.total_transaksi_hari_ini ?? 0).toString()
)

const chartData = computed(() => stats.value?.pendapatan_per_hari ?? [])
const unitsRevenue = computed(() => stats.value?.pendapatan_per_unit ?? [])

definePageMeta({
  layout: 'default'
})


</script>

<template>
  
  <VRow>    
    <VCol cols="12">
      <VRow>
        <!-- 👉 Profit -->
        <VCol cols="12" md="6">
          <CardStatisticsHorizontal
            :stats='incomeToday'
            icon='bx bx-wallet-alt'
            title='Pendapatan Hari ini'
          />                
        </VCol>

        <!-- 👉 Sales -->
        <VCol cols="12" md="6">
          <CardStatisticsHorizontal
            :stats='totalTransaction'
            icon='bx bx-cart'
            title='Total Transaksi Hari ini'
          />          
        </VCol>      
      </VRow>
    </VCol>    
  </VRow>
  <VRow>
    <VCol cols="12" md="8" order="2" order-md="1" class="h-100">
      <AnalyticsRevenue :data="chartData" />
    </VCol>
    <VCol cols="12" md="4" order="2" order-md="1" class="h-100">
      <AnalyticsRevenuePerUnit :data="unitsRevenue" />
    </VCol>
  </VRow>

</template>
