<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  data: { name: string; total: number }[]
}>()

const chartData = computed(() => ({
  labels: props.data.map(d => d.name),
  datasets: [
    {
      label: 'Pendapatan per Bulan',
      backgroundColor: '#4caf50',
      data: props.data.map(d => d.total),
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value: number) {
          return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(value)
        },
      },
    },
  },
}
</script>

<template>
  <VCard class="h-100 d-flex flex-column">
    <VCardText class="pb-0">
      <div class="text-base font-medium">Pendapatan Per Bulan</div>
    </VCardText>
    <div style="height: 400px; margin: 20px;">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </VCard>
  
</template>
