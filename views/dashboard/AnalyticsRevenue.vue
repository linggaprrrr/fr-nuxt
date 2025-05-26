<template>
  <VCard class="h-100 d-flex flex-column">
    <VCardText class="pb-0">
      <div class="text-base font-medium">Pendapatan Minggu ini</div>
      <h4 class="text-h4 font-weight-medium">
        Rp{{ totalPendapatan.toLocaleString() }}
      </h4>
    </VCardText>

    <VueApexCharts
      type="line"
      :height="350"
      :options="chartOptions"
      :series="series"
    />
  </VCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@core/utils/colorConverter'

const props = defineProps<{
  data: { tanggal: string; total: number }[]
}>()

function getNamaHari(tanggalStr: string) {
  const hariIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const tanggal = new Date(tanggalStr)
  return hariIndo[tanggal.getDay()]
}

const vuetifyTheme = useTheme()

const categories = computed(() => props.data.map(d => getNamaHari(d.tanggal)))
const values = computed(() => props.data.map(d => d.total))
const totalPendapatan = computed(() => values.value.reduce((a, b) => a + b, 0))

const currentTheme = computed(() => vuetifyTheme.current.value.colors)
const variableTheme = computed(() => vuetifyTheme.current.value.variables)
const disabledText = computed(() => {
  const isDark = vuetifyTheme.current.value.dark
  if (isDark) {
    return `rgba(255, 255, 255, 0.72)`
  } else {
    return `rgba(34, 34, 34, 0.72)`
  }
})
const series = computed(() => [
  {
    name: 'Pendapatan',
    data: values.value,
    // line smooth agar lebih menarik
    // type, color sudah di options
  }
])

const chartOptions = computed(() => ({
  chart: {
    id: 'line-pendapatan',
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: { enabled: true, delay: 150 },
      dynamicAnimation: { enabled: true, speed: 350 },
    },
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  markers: {
    size: 5,
    colors: [currentTheme.value.primary],
    strokeColors: currentTheme.value.surface,
    strokeWidth: 2,
    hover: { size: 7 },
  },
  tooltip: {
    enabled: true,
    theme: vuetifyTheme.current.value.dark ? 'dark' : 'light',
    y: {
      formatter: (val: number) => `Rp${val.toLocaleString()}`,
    },
  },
  xaxis: {
    categories: categories.value,
    labels: {
      style: {
        colors: disabledText.value,
        fontSize: '12px',
        fontFamily: 'Public Sans',
      },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: {
      formatter: (val: number) => `Rp${val.toLocaleString()}`,
      style: {
        colors: disabledText.value,
        fontSize: '12px',
        fontFamily: 'Public Sans',
      },
    },
  },
  grid: {
    borderColor: vuetifyTheme.current.value.dark
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(0, 0, 0, 0.12)',
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
  },
  colors: [currentTheme.value.primary],
  legend: { show: false },
}))

</script>
