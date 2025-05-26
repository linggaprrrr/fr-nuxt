<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VRow, VCol, VCard, VCardText, VTextField, VBtn, VSelect, VTable } from 'vuetify/components'

import * as XLSX from 'xlsx' // ✅
import { saveAs } from 'file-saver' // ✅

const { getTransactionsReport, getPerUnitReports } = useReports()
const { getUnits } = useUnits()

const unitId = ref<string>('')
const startDate = ref<string>(new Date().toISOString().slice(0, 10))
const endDate = ref<string>(new Date().toISOString().slice(0, 10))

const loading = ref(false)
const error = ref<string | null>(null)

const report = ref<PerUnitReport | null>(null)

const units = ref<{ id: string; name: string }[]>([])
const unitsLoading = ref(false)
const unitsError = ref<string | null>(null)

async function loadUnits() {
  unitsLoading.value = true
  unitsError.value = null
  try {
    const response = await getUnits({ page: 1, limit: 100 })
    units.value = response.data.map(unit => ({
      id: unit.id,
      name: unit.name
    }))
    if (units.value.length > 0) {
      unitId.value = units.value[0].id
    }
  } catch (e: any) {
    unitsError.value = e.message || 'Gagal memuat data unit'
  } finally {
    unitsLoading.value = false
  }
}

async function fetchReport() {
  if (!unitId.value) {
    error.value = 'Pilih unit terlebih dahulu'
    report.value = null
    return
  }

  loading.value = true
  error.value = null
  report.value = null

  const data = await getPerUnitReports(unitId.value, startDate.value, endDate.value)
  if (data) {
    report.value = data
  } else {
    error.value = 'Gagal mengambil data'
  }
  loading.value = false
}

const formatTanggal = (tanggal: string) => {
  const date = new Date(tanggal)
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

// ✅ Fungsi export ke Excel
const exportToExcel = () => {
  if (!report.value) return

  const summarySheet = [
    {
      'Unit': report.value.unit_name,
      'Periode': `${report.value.start_date} - ${report.value.end_date}`,
      'Jumlah Transaksi': report.value.jumlah_transaksi,
      'Total Pendapatan': report.value.total_pendapatan
    }
  ]

  const detailSheet = report.value.data.map((trx, i) => ({
    '#': i + 1,
    'Tanggal': formatTanggal(trx.created_at),
    'User': trx.user,
    'Jumlah Transaksi': trx.final_price
  }))

  const wb = XLSX.utils.book_new()
  const summaryWs = XLSX.utils.json_to_sheet(summarySheet)
  const detailWs = XLSX.utils.json_to_sheet(detailSheet)

  XLSX.utils.book_append_sheet(wb, summaryWs, 'Ringkasan')
  XLSX.utils.book_append_sheet(wb, detailWs, 'Detail Transaksi')

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `Laporan-Unit-${report.value.unit_name}.xlsx`)
}

onMounted(() => {
  loadUnits()
})
</script>

<template>
  <VCard class="mb-4" title="Filter Laporan Per Unit">
    <VCardText>
      <VRow dense>
        <VCol cols="12" md="3">
          <VSelect
            v-model="unitId"
            :items="units"
            item-title="name"
            item-value="id"
            label="Pilih Unit"
            dense
            clearable
            outlined
            :loading="unitsLoading"
            :disabled="unitsLoading || unitsError !== null"
          />
        </VCol>

        <VCol cols="12" md="3">
          <VTextField
            v-model="startDate"
            label="Start Date"
            type="date"
            dense
            outlined
          />
        </VCol>

        <VCol cols="12" md="3">
          <VTextField
            v-model="endDate"
            label="End Date"
            type="date"
            dense
            outlined
          />
        </VCol>

        <VCol cols="12" md="3" class="d-flex align-center">
          <VBtn
            color="primary"
            :loading="loading"
            @click="fetchReport"
            :disabled="loading"
            class="mr-4"
          >
            Terapkan
          </VBtn>
          <VBtn color="success" @click="exportToExcel">
            Export
          </VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>

  <VCard v-if="error" color="error" class="mb-4" dark>
    <VCardText>{{ error }}</VCardText>
  </VCard>

  <VCard v-if="report" title="Ringkasan Laporan Per Unit" class="mb-4">
    <VCardText>
      <div><strong>Unit:</strong> {{ report.unit_name }}</div>
      <div><strong>Periode:</strong> {{ report.start_date }} - {{ report.end_date }}</div>
      <div><strong>Jumlah Transaksi:</strong> {{ report.jumlah_transaksi }}</div>
      <div><strong>Total Pendapatan:</strong> Rp {{ report.total_pendapatan.toLocaleString() }}</div>
    </VCardText>

  </VCard>

  <VCard v-if="report && report.data.length > 0" title="Detail Transaksi Per Unit">
    <VTable density="compact">
      <thead>
        <tr>
          <th class="text-center">#</th>
          <th class="text-center">Tanggal</th>
          <th class="text-center">User</th>
          <th class="text-center">Jumlah Transaksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(trx, index) in report.data" :key="trx.id">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ formatTanggal(trx.created_at) }}</td>
          <td class="text-center">{{ trx.user }}</td>
          <td class="text-center">Rp {{ trx.final_price.toLocaleString() }}</td>
        </tr>
      </tbody>
    </VTable>
  </VCard>

  <VCard v-else-if="report">
    <VCardText class="text-center text-subtitle-1">Tidak ada data transaksi untuk unit ini.</VCardText>
  </VCard>
</template>
