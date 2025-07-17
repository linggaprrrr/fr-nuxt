<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { VRow, VCol, VCard, VCardText, VTextField, VBtn, VSelect, VTable, VIcon } from 'vuetify/components'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

interface UnitTransactionData {
  unit_id: string
  unit: string
  outlet: string
  photo_type: string
  foto_terjual: number
  total_pendapatan: number
}

interface PerUnitReport {
  unit_id: string
  unit_name: string
  start_date: string
  end_date: string
  data: UnitTransactionData[]
}

const { getTransactionsReport, getPerUnitReports } = useReports()
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

// Computed properties untuk analysis
const totalTransactions = computed(() => {
  return report.value?.data.reduce((sum, item) => sum + item.foto_terjual, 0) || 0
})

const totalRevenue = computed(() => {
  return report.value?.data.reduce((sum, item) => sum + item.total_pendapatan, 0) || 0
})

const totalOutlets = computed(() => {
  if (!report.value?.data) return 0
  const uniqueOutlets = new Set(report.value.data.map(item => item.outlet))
  return uniqueOutlets.size
})

const totalPhotoTypes = computed(() => {
  if (!report.value?.data) return 0
  const uniquePhotoTypes = new Set(report.value.data.map(item => item.photo_type))
  return uniquePhotoTypes.size
})

const averagePerTransaction = computed(() => {
  if (totalTransactions.value === 0) return 0
  return Math.round(totalRevenue.value / totalTransactions.value)
})

// Computed property untuk date header
const dateHeader = computed(() => {
  const start = startDate.value.trim()
  const end = endDate.value.trim()
  console.log('Computed - Start:', start, 'End:', end, 'Equal?', start === end)
  
  return start === end 
    ? formatDateDisplay(start)
    : `${formatDateDisplay(start)} - ${formatDateDisplay(end)}`
})

// Format tanggal untuk display (DD/MM/YYYY)
function formatDateDisplay(dateString: string): string {
  const date = new Date(dateString)
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

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

// Enhanced export ke Excel
const exportToExcel = () => {
  if (!report.value) {
    alert('Tidak ada data untuk diexport!')
    return
  }

  // Header info
  const headerInfo = [
    ['LAPORAN TRANSAKSI PER UNIT'],
    [''],
    ['Unit:', report.value.unit_name],
    ['Periode:', dateHeader.value],
    ['Tanggal Export:', formatDateDisplay(new Date().toISOString().slice(0, 10))],
    [''],
    ['RINGKASAN:'],
    ['Total Penjualan:', totalTransactions.value],
    ['Total Pendapatan:', `Rp ${totalRevenue.value.toLocaleString()}`],
    ['Total Outlet:', totalOutlets.value],
    ['Total Jenis Foto:', totalPhotoTypes.value],
    
    [''],
    ['DETAIL PER OUTLET & JENIS FOTO:'],
    ['']
  ]

  // Data transaksi
  const transactionData = report.value.data.map((item, index) => ({
    'No': index + 1,
    'Outlet': item.outlet,
    'Jenis Foto': item.photo_type,
    'Jumlah Transaksi': item.foto_terjual,
    'Total Pendapatan': item.total_pendapatan
  }))

  // Row total
  const totalRow = {
    'No': '',
    'Outlet': 'TOTAL',
    'Jenis Foto': '',
    'Jumlah Transaksi': totalTransactions.value,
    'Total Pendapatan': totalRevenue.value
  }

  // Gabungkan semua data
  const allData = [
    ...headerInfo,
    ...XLSX.utils.sheet_to_json(XLSX.utils.json_to_sheet(transactionData), { header: 1 }),
    [''],
    Object.values(totalRow)
  ]

  const worksheet = XLSX.utils.aoa_to_sheet(allData)
  
  // Set column widths
  worksheet['!cols'] = [
    { width: 5 },   // No
    { width: 20 },  // Outlet
    { width: 15 },  // Jenis Foto
    { width: 15 },  // Jumlah Transaksi
    { width: 18 }   // Total Pendapatan
  ]

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Laporan Unit')

  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  
  const filename = `Laporan_Unit_${report.value.unit_name}_${startDate.value}_${endDate.value}.xlsx`
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename)
}

// Fungsi print untuk thermal printer dengan summary per outlet
const printReport = () => {
  if (!report.value) {
    alert('Tidak ada data untuk diprint!')
    return
  }
  
  // Hitung summary per outlet
  const outletSummary = report.value.data.reduce((acc, item) => {
    if (!acc[item.outlet]) {
      acc[item.outlet] = 0
    }
    acc[item.outlet] += item.foto_terjual
    return acc
  }, {} as Record<string, number>)
  
  const printContent = `
    <style>
      body { 
        font-family: 'Courier New', monospace; 
        font-size: 8px; 
        margin: 2px; 
        line-height: 1.1;
        width: 58mm;
        max-width: 58mm;
      }
      .header { 
        text-align: center; 
        margin-bottom: 4px; 
        font-size: 9px;
        font-weight: bold;
      }
      .divider { 
        border-top: 1px dashed #000; 
        margin: 2px 0; 
      }
      .row { 
        display: flex; 
        justify-content: space-between; 
        margin: 1px 0;
        font-size: 7px;
      }
      .detail { 
        margin: 1px 0;
        font-size: 7px;
      }
      .bold { font-weight: bold; }
      .center { text-align: center; }
      .total-line { 
        border-top: 1px solid #000; 
        margin-top: 2px; 
        padding-top: 2px;
        font-weight: bold;
      }
      @media print {
        body { margin: 0; width: 58mm; }
        .no-print { display: none; }
      }
    </style>
    
    <div class="header">
      LAPORAN UNIT
      <br>
      ${report.value.unit_name}
      <br>
      ${dateHeader.value}
    </div>

    <div class="divider"></div>
    
    <div class="row bold">
      <span>RINGKASAN:</span>
    </div>
    <div class="row">
      <span>Total Pendapatan:</span>
      <span>Rp${totalRevenue.value.toLocaleString()}</span>
    </div>
    <div class="row">
      <span>Total Penjualan:</span>
      <span>${totalTransactions.value}</span>
    </div>
    <div class="row">
      <span>Total Outlet:</span>
      <span>${totalOutlets.value}</span>
    </div>
    
    <div class="divider"></div>
    
    <div class="row bold">
      <span>SUMMARY PER OUTLET:</span>
    </div>
    ${Object.entries(outletSummary).map(([outlet, count]) => `
      <div class="row">
        <span>${outlet}:</span>
        <span>${count}</span>
      </div>
    `).join('')}
    
    <div class="divider"></div>
    
    <div class="row bold">
      <span>DETAIL:</span>
    </div>
    
    ${report.value.data.map((item, index) => `
      <div class="detail">
        <div class="bold">${index + 1}. ${item.outlet}</div>
        <div>Jenis: ${item.photo_type}</div>
        <div class="row">
          <span>Foto Terjual: ${item.foto_terjual}</span>
          <span>Rp${item.total_pendapatan.toLocaleString()}</span>
        </div>
      </div>
    `).join('')}
    
    <div class="divider"></div>
    <div class="row bold total-line">
      <span>GRAND TOTAL:</span>
    </div>    
    <div class="row bold">
      <span>Total: Rp${totalRevenue.value.toLocaleString()}</span>
    </div>
    <div class="divider"></div>
    <div class="center" style="font-size: 6px; margin-top: 3px;">
      Terima Kasih
    </div>
  `

  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }
}

onMounted(() => {
  loadUnits()
})

definePageMeta({
  layout: 'default',
  title: 'Laporan Per Unit',
})
</script>

<template>
  <!-- 🔍 Filter Laporan Per Unit -->
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
            variant="outlined"
            clearable
            :loading="unitsLoading"
            :disabled="unitsLoading || unitsError !== null"
          />
        </VCol>

        <VCol cols="12" md="2">
          <VTextField
            v-model="startDate"
            label="Start Date"
            type="date"
            variant="outlined"
          />
        </VCol>

        <VCol cols="12" md="2">
          <VTextField
            v-model="endDate"
            label="End Date"
            type="date"
            variant="outlined"
          />
        </VCol>

        <VCol cols="12" md="5" class="d-flex align-center gap-2">
          <VBtn
            color="primary"
            :loading="loading"
            @click="fetchReport"
            :disabled="loading"
          >
            <i class="bx bx-search-alt mr-1"></i>
            Terapkan
          </VBtn>
          <VBtn 
            color="success" 
            @click="exportToExcel"
            :disabled="!report"
          >
            <i class='bx bx-export mr-1'></i> 
            Export Excel
          </VBtn>
          <VBtn 
            color="info" 
            @click="printReport"
            :disabled="!report"
          >
            <i class='bxr  bx-printer mr-1'></i>
            Print
          </VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>

  <!-- ❌ Error Card -->
  <VCard v-if="error" color="error" class="mb-4">
    <VCardText class="text-white">{{ error }}</VCardText>
  </VCard>

  <!-- 📊 Enhanced Summary Cards -->
  <VRow v-if="report" class="mb-4" dense>
    <VCol cols="12" md="3">
      <VCard>
        <VCardText>
          <div class="text-subtitle-1 text-grey">Total Pendapatan</div>
          <div class="text-h5 font-weight-bold text-primary">Rp {{ totalRevenue.toLocaleString() }}</div>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="3">
      <VCard>
        <VCardText>
          <div class="text-subtitle-1 text-grey">Total Penjualan</div>
          <div class="text-h5 font-weight-bold text-success">{{ totalTransactions }}</div>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="3">
      <VCard>
        <VCardText>
          <div class="text-subtitle-1 text-grey">Total Outlet</div>
          <div class="text-h5 font-weight-bold text-warning">{{ totalOutlets }}</div>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="3">
      <VCard>
        <VCardText>
          <div class="text-subtitle-1 text-grey">Rata-rata per Transaksi</div>
          <div class="text-h5 font-weight-bold text-info">Rp {{ averagePerTransaction.toLocaleString() }}</div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- 📄 Detail Transaksi Table -->
  <VCard v-if="report && report.data.length > 0" title="Detail Transaksi Per Unit (Berdasarkan Outlet & Jenis Foto)">
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
        <!-- Total Row -->
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

  <!-- 📋 Unit Summary (when report exists but no transactions) -->
  <VCard v-else-if="report" title="Ringkasan Unit">
    <VCardText>
      <div class="text-center mb-4">
        <div class="text-h6 font-weight-bold">{{ report.unit_name }}</div>
        <div class="text-subtitle-1">{{ formatDateDisplay(report.start_date) }} - {{ formatDateDisplay(report.end_date) }}</div>
      </div>
      <div class="text-center text-subtitle-1 text-grey">
        Tidak ada data transaksi untuk unit ini pada periode yang dipilih.
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>