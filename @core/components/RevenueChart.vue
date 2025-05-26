<template>
  <div>
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'


const props = defineProps<{
  data: { tanggal: string; total: number }[]
}>()

const categories = computed(() => props.data.map(d => d.tanggal))
const values = computed(() => props.data.map(d => d.total))

const series = computed(() => [
  {
    name: 'Pendapatan',
    data: values.value,
  }
])

const chartOptions = computed(() => ({
  chart: {
    id: 'pendapatan-harian'
  },
  xaxis: {
    categories: categories.value,
  },
  yaxis: {
    labels: {
      formatter: (val: number) => `Rp${val.toLocaleString()}`
    }
  },
  tooltip: {
    y: {
      formatter: (val: number) => `Rp${val.toLocaleString()}`
    }
  },
  title: {
    text: 'Pendapatan per Hari',
    align: 'left'
  }
}))
</script>
