<template>
  <VCard class="h-100 d-flex flex-column">
    <VCardText class="pb-0">
      <div class="text-base font-medium">Pendapatan Per Unit Bulan Ini</div>
    </VCardText>

    <VueApexCharts
      style="margin: 20px;"
      type="pie"
      :height="400"
      :options="chartOptions"
      :series="series"
    />
  </VCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps<{
  data: { unit: string; total: number }[]
}>()

const vuetifyTheme = useTheme()
const currentTheme = computed(() => vuetifyTheme.current.value.colors)

const labels = computed(() => props.data.map(d => d.unit))
const series = computed(() => props.data.map(d => d.total))

const chartOptions = computed(() => ({
  labels: labels.value,
  legend: {
    position: 'bottom',
    labels: {
      colors: vuetifyTheme.current.value.dark ? '#fff' : '#333',
    },
  },
  tooltip: {
    y: {
      formatter: (val: number) => `Rp${val.toLocaleString()}`,
    },
  },
  colors: [
    currentTheme.value.primary,
    currentTheme.value.secondary,
    '#00E396', '#FEB019', '#FF4560', '#775DD0', '#008FFB',
  ],
}))
</script>
