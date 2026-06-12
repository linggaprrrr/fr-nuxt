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
const props = defineProps<{
  data: { tanggal: string; total: number }[]
}>()

const series = computed(() => [
  {
    name: 'Pendapatan',
    data: props.data.map(d => d.total),
  }
])

const chartOptions = computed(() => ({
  chart: {
    id: 'pendapatan-harian'
  },
  xaxis: {
    categories: props.data.map(d => d.tanggal),
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
