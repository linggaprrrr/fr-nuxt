<script setup lang="ts">
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

interface PerUnitReportItem { id: string; created_at: string; trx_code: string; user: string; jumlah_foto: number; final_price: number }
interface PerUnitReport { unit_name: string; start_date: string; end_date: string; jumlah_transaksi: number; jumlah_foto_terjual: number; total_pendapatan: number; data: PerUnitReportItem[] }

const { getPerUnitReports } = useReports()
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
    units.value = response.data.map(unit => ({ id: unit.id, name: unit.name }))
    if (units.value.length > 0) unitId.value = units.value[0].id
  } catch (e: any) { unitsError.value = e.message || 'Gagal memuat data unit' }
  finally { unitsLoading.value = false }
}

async function fetchReport() {
  if (!unitId.value) { error.value = 'Pilih unit terlebih dahulu'; report.value = null; return }
  loading.value = true; error.value = null; report.value = null
  const data = await getPerUnitReports(unitId.value, startDate.value, endDate.value)
  if (data) { report.value = data } else { error.value = 'Gagal mengambil data' }
  loading.value = false
}

const formatTanggal = (tanggal: string) => {
  const date = new Date(tanggal)
  return date.toLocaleString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
}

const exportToExcel = () => {
  if (!report.value) return
  const summarySheet = [{
    'Unit': report.value.unit_name, 'Periode': `${report.value.start_date} - ${report.value.end_date}`,
    'Jumlah Transaksi': report.value.jumlah_transaksi, 'Jumlah Foto Terjual': report.value.jumlah_foto_terjual, 'Total Pendapatan': report.value.total_pendapatan,
  }]
  const detailSheet = report.value.data.map((trx, i) => ({ '#': i + 1, 'Tanggal': formatTanggal(trx.created_at), 'User': trx.user, 'Jumlah Transaksi': trx.final_price }))
  const wb = XLSX.utils.book_new()
  const summaryRows: (string | number | boolean | Date | null | undefined)[][] = XLSX.utils.sheet_to_json(XLSX.utils.json_to_sheet(summarySheet), { header: 1 })
  const detailRows: (string | number | boolean | Date | null | undefined)[][] = XLSX.utils.sheet_to_json(XLSX.utils.json_to_sheet(detailSheet), { header: 1 })
  summaryRows.push([], ['Detail Transaksi'])
  const ws = XLSX.utils.aoa_to_sheet([...summaryRows, ...detailRows])
  XLSX.utils.book_append_sheet(wb, ws, 'Ringkasan')
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `Laporan-Unit-${report.value.unit_name}.xlsx`)
}

onMounted(() => { loadUnits() })

definePageMeta({ layout: 'outlet' })
</script>

<template>
  <div>
    <PageHeader title="Laporan Per Unit" subtitle="Laporan transaksi berdasarkan unit dan periode." />

    <VCard class="mb-4" rounded="lg">
      <VCardText>
        <VRow dense>
          <VCol cols="12" md="3">
            <VSelect v-model="unitId" :items="units" item-title="name" item-value="id" label="Pilih Unit" variant="outlined" clearable :loading="unitsLoading" :disabled="unitsLoading || unitsError !== null" />
          </VCol>
          <VCol cols="12" md="3">
            <VTextField v-model="startDate" label="Start Date" type="date" variant="outlined" />
          </VCol>
          <VCol cols="12" md="3">
            <VTextField v-model="endDate" label="End Date" type="date" variant="outlined" />
          </VCol>
          <VCol cols="12" md="3" class="d-flex align-center gap-2">
            <VBtn color="primary" prepend-icon="bx-search-alt" :loading="loading" :disabled="loading" @click="fetchReport">Terapkan</VBtn>
            <VBtn color="success" prepend-icon="bx-export" :disabled="!report" @click="exportToExcel">Export</VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VCard v-if="error" color="error" class="mb-4" rounded="lg">
      <VCardText>{{ error }}</VCardText>
    </VCard>

    <VCard v-if="report" title="Ringkasan Laporan Per Unit" class="mb-4" rounded="lg">
      <VCardText>
        <div><strong>Unit:</strong> {{ report.unit_name }}</div>
        <div><strong>Periode:</strong> {{ report.start_date }} - {{ report.end_date }}</div>
        <div><strong>Jumlah Transaksi:</strong> {{ report.jumlah_transaksi }}</div>
        <div><strong>Jumlah Foto yang terjual:</strong> {{ report.jumlah_foto_terjual }}</div>
        <div><strong>Total Pendapatan:</strong> Rp {{ report.total_pendapatan.toLocaleString() }}</div>
      </VCardText>
    </VCard>

    <VCard v-if="report && report.data.length > 0" title="Detail Transaksi Per Unit" rounded="lg">
      <VTable density="compact">
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">Tanggal</th>
            <th class="text-center">Kode Transaksi</th>
            <th class="text-center">User</th>
            <th class="text-center">Foto Terjual</th>
            <th class="text-center">Jumlah Transaksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(trx, index) in report.data" :key="trx.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ formatTanggal(trx.created_at) }}</td>
            <td class="text-center">{{ trx.trx_code.toUpperCase() }}</td>
            <td class="text-center">{{ trx.user }}</td>
            <td class="text-center">{{ trx.jumlah_foto }}</td>
            <td class="text-center">Rp {{ trx.final_price.toLocaleString() }}</td>
          </tr>
        </tbody>
      </VTable>
    </VCard>

    <VCard v-else-if="report" rounded="lg">
      <VCardText class="text-center text-subtitle-1">Tidak ada data transaksi untuk unit ini.</VCardText>
    </VCard>
  </div>
</template>

<style scoped>
.gap-2 { gap: 8px; }
</style>
