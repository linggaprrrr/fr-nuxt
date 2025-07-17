<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { VRow, VCol, VCard, VCardText, VTable, VTextField, VBtn, VIcon } from 'vuetify/components'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

interface FotoTerjualData {
  tanggal: string
  foto_terjual: number
  total_pendapatan: number
  unit: string
  outlet: string
  photo_type: string
}

interface FotoTerjualSummary {
  start_date: string
  end_date: string
  total_pendapatan: number
  total_foto_terjual: number
  data: FotoTerjualData[]
}

const fotoTerjualData = ref<FotoTerjualData[]>([])
const totalPendapatan = ref(0)
const totalFotoTerjual = ref(0)

// Format tanggal YYYY-MM-DD
function formatDateToYYYYMMDD(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

// Format tanggal untuk display (DD/MM/YYYY)
function formatDateDisplay(dateString: string): string {
  const date = new Date(dateString)
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

const today = new Date()
const startDate = ref(formatDateToYYYYMMDD(today))
const endDate = ref(formatDateToYYYYMMDD(today))

// Update fungsi untuk menggunakan endpoint foto terjual
const { getFotoTerjualReport } = useReports() // Pastikan ada fungsi ini di composable

// Computed properties untuk total dan analisis
const totalFotoTerjualFromData = computed(() => {
  return fotoTerjualData.value.reduce((sum, item) => sum + item.foto_terjual, 0)
})

const totalRevenue = computed(() => {
  return fotoTerjualData.value.reduce((sum, item) => sum + item.total_pendapatan, 0)
})

const averagePerDay = computed(() => {
  if (fotoTerjualData.value.length === 0) return 0
  return Math.round(totalRevenue.value / fotoTerjualData.value.length)
})

// Analisis per outlet
const outletSummary = computed(() => {
  const summary: Record<string, { foto_terjual: number, revenue: number }> = {}
  fotoTerjualData.value.forEach(item => {
    if (!summary[item.outlet]) {
      summary[item.outlet] = { foto_terjual: 0, revenue: 0 }
    }
    summary[item.outlet].foto_terjual += item.foto_terjual
    summary[item.outlet].revenue += item.total_pendapatan
  })
  return summary
})

// Analisis per jenis foto
const photoTypeSummary = computed(() => {
  const summary: Record<string, { foto_terjual: number, revenue: number }> = {}
  fotoTerjualData.value.forEach(item => {
    if (!summary[item.photo_type]) {
      summary[item.photo_type] = { foto_terjual: 0, revenue: 0 }
    }
    summary[item.photo_type].foto_terjual += item.foto_terjual
    summary[item.photo_type].revenue += item.total_pendapatan
  })
  return summary
})

const fetchFotoTerjual = async () => {
  const result: FotoTerjualSummary = await getFotoTerjualReport(startDate.value, endDate.value)
  fotoTerjualData.value = result.data
  totalPendapatan.value = result.total_pendapatan
  totalFotoTerjual.value = result.total_foto_terjual
  
  console.log(result) // Debugging output
}

onMounted(() => {
  fetchFotoTerjual()
})

// Fungsi export ke Excel dengan data lengkap
const exportToExcel = () => {
  if (fotoTerjualData.value.length === 0) {
    alert('Data foto terjual kosong, tidak bisa diexport!')
    return
  }

  // Check if it's a single day or date range
  const periodText = startDate.value === endDate.value 
    ? formatDateDisplay(startDate.value)
    : `${formatDateDisplay(startDate.value)} - ${formatDateDisplay(endDate.value)}`

  // Header info
  const headerInfo = [
    ['LAPORAN FOTO TERJUAL'],
    [''],
    ['Periode:', periodText],
    ['Tanggal Export:', formatDateDisplay(formatDateToYYYYMMDD(new Date()))],
    [''],
    ['RINGKASAN:'],
    ['Total Pendapatan:', `Rp ${totalPendapatan.value.toLocaleString()}`],
    ['Total Foto Terjual:', totalFotoTerjual.value],    
    [''],
    ['DETAIL FOTO TERJUAL:'],
    ['']
  ]

  // Data foto terjual
  const fotoTerjualDataForExcel = fotoTerjualData.value.map((item, index) => ({
    'No': index + 1,
    'Tanggal': formatDateDisplay(item.tanggal),
    'Outlet/Konter': item.outlet,
    'Jenis Foto': item.photo_type,
    'Foto Terjual': item.foto_terjual,
    'Total Pendapatan': item.total_pendapatan,
    'Rata-rata per Foto': item.foto_terjual > 0 ? Math.round(item.total_pendapatan / item.foto_terjual) : 0
  }))

  // Row total
  const totalRow = {
    'No': '',
    'Tanggal': 'TOTAL',
    'Outlet/Konter': '',
    'Jenis Foto': '',
    'Foto Terjual': totalFotoTerjualFromData.value,
    'Total Pendapatan': totalRevenue.value,
    'Rata-rata per Foto': totalFotoTerjualFromData.value > 0 ? Math.round(totalRevenue.value / totalFotoTerjualFromData.value) : 0
  }

  // Gabungkan semua data
  const allData = [
    ...headerInfo,
    ...XLSX.utils.sheet_to_json(XLSX.utils.json_to_sheet(fotoTerjualDataForExcel), { header: 1 }),
    [''],
    Object.values(totalRow)
  ]

  const worksheet = XLSX.utils.aoa_to_sheet(allData)
  
  // Set column widths
  worksheet['!cols'] = [
    { width: 5 },   // No
    { width: 12 },  // Tanggal
    { width: 15 },  // Outlet
    { width: 15 },  // Jenis Foto
    { width: 15 },  // Foto Terjual
    { width: 18 },  // Total Pendapatan
    { width: 20 }   // Rata-rata
  ]

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Laporan Foto Terjual')

  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  
  const filename = `Laporan_Foto_Terjual_${startDate.value}_${endDate.value}.xlsx`
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename)
}

const dateHeader = computed(() => {
  const start = startDate.value.trim()
  const end = endDate.value.trim()
  
  return start === end 
    ? formatDateDisplay(start)
    : `${formatDateDisplay(start)} - ${formatDateDisplay(end)}`
})

// Fungsi print untuk thermal printer dengan summary per outlet
const printReport = () => {
  if (fotoTerjualData.value.length === 0) {
    alert('Tidak ada data untuk diprint!')
    return
  }
  
  // Hitung summary per outlet
  const outletSummaryForPrint = fotoTerjualData.value.reduce((acc, item) => {
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
      LAPORAN FOTO TERJUAL
      <br>
      ${dateHeader.value}
    </div>

    <div class="divider"></div>
    
    <div class="row bold">
      <span>RINGKASAN:</span>
    </div>
    <div class="row">
      <span>Total Pendapatan:</span>
      <span>Rp${totalPendapatan.value.toLocaleString()}</span>
    </div>
    <div class="row">
      <span>Total Foto Terjual:</span>
      <span>${totalFotoTerjual.value}</span>
    </div>    
    
    <div class="divider"></div>
    
    <div class="row bold">
      <span>SUMMARY PER OUTLET:</span>
    </div>
    ${Object.entries(outletSummaryForPrint).map(([outlet, count]) => `
      <div class="row">
        <span>${outlet}:</span>
        <span>${count}</span>
      </div>
    `).join('')}

    <div class="divider"></div>
    
    <div class="row bold">
      <span>DETAIL:</span>
    </div>
    
    ${fotoTerjualData.value.map((item, index) => `
      <div class="detail">
        <div class="bold">${index + 1}. ${item.unit} - ${item.outlet} - ${item.photo_type}</div>
        <div>Tanggal: ${formatDateDisplay(item.tanggal)}</div>
        <div class="row">
          <span>Foto terjual: ${item.foto_terjual}</span>
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

definePageMeta({
  layout: 'default',
  title: 'Laporan Foto Terjual',
})
</script>

<template>
  <!-- 🔍 Filter Date Range -->
  <VCard class="mb-4" title="Filter Tanggal">
    <VCardText>
      <VRow dense>
        <VCol cols="12" md="3">
          <VTextField
            v-model="startDate"
            label="Start Date"
            type="date"            
            variant="outlined"
          />
        </VCol>
        <VCol cols="12" md="3">
          <VTextField
            v-model="endDate"
            label="End Date"
            type="date"            
            variant="outlined"
          />
        </VCol>
        <VCol cols="12" md="6" class="d-flex align-center gap-2">
          <VBtn color="primary" @click="fetchFotoTerjual">
            <i class="bx bx-search-alt mr-1"></i>
            Terapkan
          </VBtn>
          <VBtn color="success" @click="exportToExcel">
            <i class='bx bx-export mr-1'></i> 
            Export Excel
          </VBtn>
          <VBtn color="info" @click="printReport">
            <i class='bxr  bx-printer mr-1'></i> 
            <span>Print</span>
          </VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>

  <!-- 📊 Enhanced Summary Cards -->
  <VRow class="mb-4" dense>
    <VCol cols="12" md="6">
      <VCard>
        <VCardText>
          <div class="text-subtitle-1 text-grey">Total Pendapatan</div>
          <div class="text-h5 font-weight-bold text-primary">Rp {{ totalPendapatan.toLocaleString() }}</div>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="6">
      <VCard>
        <VCardText>
          <div class="text-subtitle-1 text-grey">Total Foto Terjual</div>
          <div class="text-h5 font-weight-bold text-success">{{ totalFotoTerjual }}</div>
        </VCardText>
      </VCard>
    </VCol>   
  </VRow>

  <!-- 📄 Enhanced Tabel Foto Terjual -->
  <VCard title="Daftar Foto Terjual Detail">
    <VTable density="compact">
      <thead>
        <tr>
          <th class="text-center">#</th>
          <th class="text-center">Tanggal</th>
          <th class="text-center">Outlet/Konter</th>
          <th class="text-center">Jenis Foto</th>
          <th class="text-center">Foto Terjual</th>
          <th class="text-center">Total Pendapatan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="fotoTerjualData.length === 0">
          <td colspan="6" class="text-center text-grey">Tidak ada data</td>
        </tr>
        <tr v-else v-for="(item, index) in fotoTerjualData" :key="index">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ formatDateDisplay(item.tanggal) }}</td>
          <td class="text-center">{{ item.outlet }}</td>
          <td class="text-center">{{ item.photo_type }}</td>
          <td class="text-center">{{ item.foto_terjual }}</td>
          <td class="text-center">Rp {{ item.total_pendapatan.toLocaleString() }}</td>
        </tr>
        <!-- Total Row -->
        <tr v-if="fotoTerjualData.length > 0" class="bg-blue-lighten-5">
          <td class="text-center font-weight-bold"></td>
          <td class="text-center font-weight-bold">TOTAL</td>
          <td class="text-center font-weight-bold"></td>
          <td class="text-center font-weight-bold"></td>
          <td class="text-center font-weight-bold">{{ totalFotoTerjualFromData }}</td>
          <td class="text-center font-weight-bold">Rp {{ totalRevenue.toLocaleString() }}</td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>