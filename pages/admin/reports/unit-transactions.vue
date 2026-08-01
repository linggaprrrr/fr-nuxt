<script setup lang="ts">
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const toast = useToast()

interface UnitTransactionData { unit_id: string; unit: string; outlet: string; photo_type: string; foto_terjual: number; total_pendapatan: number }
interface PerUnitReport { unit_id: string; unit_name: string; start_date: string; end_date: string; data: UnitTransactionData[] }

const { getPerUnitReports } = useReports()
const { getUnits } = useUnits()

const unitId = ref<string>('')
const today = new Date()
const startDate = ref<string>(today.toISOString().slice(0, 10))
const endDate = ref<string>(today.toISOString().slice(0, 10))

const loading = ref(false)
const error = ref<string | null>(null)
const report = ref<PerUnitReport | null>(null)
const units = ref<{ id: string; name: string }[]>([])
const unitsLoading = ref(false)
const unitsError = ref<string | null>(null)

const totalTransactions = computed(() => report.value?.data.reduce((sum, item) => sum + item.foto_terjual, 0) || 0)
const totalRevenue = computed(() => report.value?.data.reduce((sum, item) => sum + item.total_pendapatan, 0) || 0)
const totalOutlets = computed(() => { if (!report.value?.data) return 0; return new Set(report.value.data.map(item => item.outlet)).size })
const totalPhotoTypes = computed(() => { if (!report.value?.data) return 0; return new Set(report.value.data.map(item => item.photo_type)).size })
const averagePerTransaction = computed(() => totalTransactions.value === 0 ? 0 : Math.round(totalRevenue.value / totalTransactions.value))

function formatDateDisplay(dateString: string): string {
  const date = new Date(dateString)
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
}

const dateHeader = computed(() => {
  const start = startDate.value.trim(); const end = endDate.value.trim()
  return start === end ? formatDateDisplay(start) : `${formatDateDisplay(start)} - ${formatDateDisplay(end)}`
})

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

const exportToExcel = () => {
  if (!report.value) { toast.error('Tidak ada data untuk diexport!'); return }
  const headerInfo = [
    ['LAPORAN TRANSAKSI PER UNIT'], [''], ['Unit:', report.value.unit_name], ['Periode:', dateHeader.value],
    ['Tanggal Export:', formatDateDisplay(new Date().toISOString().slice(0, 10))], [''], ['RINGKASAN:'],
    ['Total Penjualan:', totalTransactions.value], ['Total Pendapatan:', `Rp ${totalRevenue.value.toLocaleString()}`],
    ['Total Outlet:', totalOutlets.value], ['Total Jenis Foto:', totalPhotoTypes.value], [''], ['DETAIL PER OUTLET & JENIS FOTO:'], [''],
  ]
  const transactionData = report.value.data.map((item, index) => ({
    'No': index + 1, 'Outlet': item.outlet, 'Jenis Foto': item.photo_type, 'Jumlah Transaksi': item.foto_terjual, 'Total Pendapatan': item.total_pendapatan,
  }))
  const totalRow = { 'No': '', 'Outlet': 'TOTAL', 'Jenis Foto': '', 'Jumlah Transaksi': totalTransactions.value, 'Total Pendapatan': totalRevenue.value }
  const allData = [...headerInfo, ...XLSX.utils.sheet_to_json(XLSX.utils.json_to_sheet(transactionData), { header: 1 }), [''], Object.values(totalRow)]
  const worksheet = XLSX.utils.aoa_to_sheet(allData)
  worksheet['!cols'] = [{ width: 5 }, { width: 20 }, { width: 15 }, { width: 15 }, { width: 18 }]
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Laporan Unit')
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `Laporan_Unit_${report.value.unit_name}_${startDate.value}_${endDate.value}.xlsx`)
}

const printReport = () => {
  if (!report.value) { toast.error('Tidak ada data untuk diprint!'); return }
  const outletSummary = report.value.data.reduce((acc, item) => {
    if (!acc[item.outlet]) acc[item.outlet] = 0; acc[item.outlet] += item.foto_terjual; return acc
  }, {} as Record<string, number>)
  const printContent = `<style>body{font-family:'Courier New',monospace;font-size:8px;margin:2px;line-height:1.1;width:58mm;max-width:58mm}.header{text-align:center;margin-bottom:4px;font-size:9px;font-weight:bold}.divider{border-top:1px dashed #000;margin:2px 0}.row{display:flex;justify-content:space-between;margin:1px 0;font-size:7px}.detail{margin:1px 0;font-size:7px}.bold{font-weight:bold}.center{text-align:center}.total-line{border-top:1px solid #000;margin-top:2px;padding-top:2px;font-weight:bold}@media print{body{margin:0;width:58mm}}</style><div class="header">LAPORAN UNIT<br>${report.value.unit_name}<br>${dateHeader.value}</div><div class="divider"></div><div class="row bold"><span>RINGKASAN:</span></div><div class="row"><span>Total Pendapatan:</span><span>Rp${totalRevenue.value.toLocaleString()}</span></div><div class="row"><span>Total Penjualan:</span><span>${totalTransactions.value}</span></div><div class="row"><span>Total Outlet:</span><span>${totalOutlets.value}</span></div><div class="divider"></div><div class="row bold"><span>SUMMARY PER OUTLET:</span></div>${Object.entries(outletSummary).map(([o,c]) => `<div class="row"><span>${o}:</span><span>${c}</span></div>`).join('')}<div class="divider"></div><div class="row bold"><span>DETAIL:</span></div>${report.value.data.map((item,i) => `<div class="detail"><div class="bold">${i+1}. ${item.outlet}</div><div>Jenis: ${item.photo_type}</div><div class="row"><span>Foto Terjual: ${item.foto_terjual}</span><span>Rp${item.total_pendapatan.toLocaleString()}</span></div></div>`).join('')}<div class="divider"></div><div class="row bold total-line"><span>GRAND TOTAL:</span></div><div class="row bold"><span>Total: Rp${totalRevenue.value.toLocaleString()}</span></div><div class="divider"></div><div class="center" style="font-size:6px;margin-top:3px;">Terima Kasih</div>`
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => { printWindow.print(); printWindow.close() }, 250)
  }
}

onMounted(() => { loadUnits() })

definePageMeta({ layout: 'default', title: 'Laporan Per Unit' })
</script>

<template>
  <div>
    <PageHeader title="Laporan Transaksi Per Unit" subtitle="Laporan transaksi berdasarkan unit dan periode." />

    <VCard class="mb-4" rounded="lg">
      <VCardText>
        <VRow dense>
          <VCol cols="12" md="3">
            <VSelect v-model="unitId" :items="units" item-title="name" item-value="id" label="Pilih Unit" clearable :loading="unitsLoading" :disabled="unitsLoading || unitsError !== null" />
          </VCol>
          <VCol cols="12" md="2">
            <VTextField v-model="startDate" label="Start Date" type="date" />
          </VCol>
          <VCol cols="12" md="2">
            <VTextField v-model="endDate" label="End Date" type="date" />
          </VCol>
          <VCol cols="12" md="5" class="d-flex align-center gap-2">
            <VBtn color="primary" prepend-icon="bx-search-alt" :loading="loading" :disabled="loading" @click="fetchReport">Terapkan</VBtn>
            <VBtn color="success" prepend-icon="bx-export" :disabled="!report" @click="exportToExcel">Export Excel</VBtn>
            <VBtn color="info" prepend-icon="bx-printer" :disabled="!report" @click="printReport">Print</VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VCard v-if="error" color="error" class="mb-4" rounded="lg">
      <VCardText class="text-white">{{ error }}</VCardText>
    </VCard>

    <VRow v-if="report" class="mb-4" dense>
      <VCol cols="12" md="3"><VCard rounded="lg"><VCardText>
        <div class="text-subtitle-1 text-grey">Total Pendapatan</div>
        <div class="text-h5 font-weight-bold text-primary">Rp {{ totalRevenue.toLocaleString() }}</div>
      </VCardText></VCard></VCol>
      <VCol cols="12" md="3"><VCard rounded="lg"><VCardText>
        <div class="text-subtitle-1 text-grey">Total Penjualan</div>
        <div class="text-h5 font-weight-bold text-success">{{ totalTransactions }}</div>
      </VCardText></VCard></VCol>
      <VCol cols="12" md="3"><VCard rounded="lg"><VCardText>
        <div class="text-subtitle-1 text-grey">Total Outlet</div>
        <div class="text-h5 font-weight-bold text-warning">{{ totalOutlets }}</div>
      </VCardText></VCard></VCol>
      <VCol cols="12" md="3"><VCard rounded="lg"><VCardText>
        <div class="text-subtitle-1 text-grey">Rata-rata per Transaksi</div>
        <div class="text-h5 font-weight-bold text-info">Rp {{ averagePerTransaction.toLocaleString() }}</div>
      </VCardText></VCard></VCol>
    </VRow>

    <VCard v-if="report && report.data.length > 0" title="Detail Transaksi Per Unit (Berdasarkan Outlet & Jenis Foto)" rounded="lg">
      <VTable density="compact">
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">Outlet</th>
            <th class="text-center">Jenis Foto</th>
            <th class="text-center">Total Penjualan</th>
            <th class="text-center">Total Pendapatan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in report.data" :key="`${item.outlet}-${item.photo_type}`">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ item.outlet }}</td>
            <td class="text-center">{{ item.photo_type }}</td>
            <td class="text-center">{{ item.foto_terjual }}</td>
            <td class="text-center">Rp {{ item.total_pendapatan.toLocaleString() }}</td>
          </tr>
          <tr class="bg-blue-lighten-5">
            <td class="text-center font-weight-bold"></td>
            <td class="text-center font-weight-bold">TOTAL</td>
            <td class="text-center font-weight-bold"></td>
            <td class="text-center font-weight-bold">{{ totalTransactions }}</td>
            <td class="text-center font-weight-bold">Rp {{ totalRevenue.toLocaleString() }}</td>
          </tr>
        </tbody>
      </VTable>
    </VCard>

    <VCard v-else-if="report" title="Ringkasan Unit" rounded="lg">
      <VCardText>
        <div class="text-center mb-4">
          <div class="text-h6 font-weight-bold">{{ report.unit_name }}</div>
          <div class="text-subtitle-1">{{ formatDateDisplay(report.start_date) }} - {{ formatDateDisplay(report.end_date) }}</div>
        </div>
        <div class="text-center text-subtitle-1 text-grey">Tidak ada data transaksi untuk unit ini pada periode yang dipilih.</div>
      </VCardText>
    </VCard>
  </div>
</template>

<style scoped>
.gap-2 { gap: 8px; }
</style>
