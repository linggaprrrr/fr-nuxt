<script setup lang="ts">
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import type { Outlet } from '~/types/outlet'

const toast = useToast()

interface OutletData { photo_type: string; foto_terjual: number; total_pendapatan: number }
interface PerOutletReport { outlet_id: string; outlet_name: string; start_date: string; end_date: string; data: OutletData[] }

const outletData = ref<OutletData[]>([])
const reportData = ref<PerOutletReport | null>(null)
const selectedOutlet = ref<string>('')

function formatDateToYYYYMMDD(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function formatDateDisplay(dateString: string): string {
  const date = new Date(dateString)
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
}

const today = new Date()
const startDate = ref(formatDateToYYYYMMDD(today))
const endDate = ref(formatDateToYYYYMMDD(today))

const { getOutlets } = useOutlets()
const { getPerOutletReports } = useReports()

const totalTransactions = computed(() => outletData.value.reduce((sum, item) => sum + item.foto_terjual, 0))
const totalRevenue = computed(() => outletData.value.reduce((sum, item) => sum + item.total_pendapatan, 0))
const totalPhotosSold = computed(() => totalTransactions.value)
const averagePerTransaction = computed(() => totalTransactions.value === 0 ? 0 : Math.round(totalRevenue.value / totalTransactions.value))
const dateHeader = computed(() => {
  const start = startDate.value.trim(); const end = endDate.value.trim()
  return start === end ? formatDateDisplay(start) : `${formatDateDisplay(start)} - ${formatDateDisplay(end)}`
})

const page = ref(1)
const limit = 24
const total = ref(0)
const isLoading = ref(false)
const outlets = ref<Outlet[]>([])

const outletItems = computed(() => outlets.value.map(outlet => ({
  title: `${outlet.name}${outlet.unit?.name ? ` - ${outlet.unit.name}` : ''}`,
  value: outlet.id,
})))

const selectedOutletInfo = computed(() => outlets.value.find(o => o.id === selectedOutlet.value))
const fullOutletName = computed(() => {
  if (!selectedOutletInfo.value) return 'Unknown'
  return selectedOutletInfo.value.unit?.name ? `${selectedOutletInfo.value.name} - ${selectedOutletInfo.value.unit.name}` : selectedOutletInfo.value.name
})

async function loadOutlets() {
  isLoading.value = true
  try {
    const res = await getOutlets({ page: page.value, limit })
    outlets.value = res?.data || []
    total.value = res?.total || 0
  } catch { outlets.value = []; total.value = 0 }
  finally { isLoading.value = false }
}

const fetchTransactionsByOutlet = async () => {
  if (!selectedOutlet.value) {
    toast.warning('Silakan pilih outlet terlebih dahulu!')
    return
  }
  try {
    const result: PerOutletReport = await getPerOutletReports(selectedOutlet.value, startDate.value, endDate.value)
    reportData.value = result
    outletData.value = result.data || []
  } catch {
    toast.error('Terjadi kesalahan saat mengambil data transaksi')
  }
}

const exportToExcel = () => {
  if (!reportData.value || outletData.value.length === 0) {
    toast.error('Data transaksi kosong, tidak bisa diexport!')
    return
  }
  const headerInfo = [
    ['LAPORAN TRANSAKSI PER OUTLET'], [''], ['Outlet:', fullOutletName.value], ['Periode:', dateHeader.value],
    ['Tanggal Export:', formatDateDisplay(formatDateToYYYYMMDD(new Date()))], [''], ['RINGKASAN:'],
    ['Total Pendapatan:', `Rp ${totalRevenue.value.toLocaleString()}`], ['Total Penjualan:', totalTransactions.value], [''], ['DETAIL PER JENIS FOTO:'], [''],
  ]
  const photoTypeData = outletData.value.map((item, index) => ({
    'No': index + 1, 'Jenis Foto': item.photo_type, 'Jumlah Foto Terjual': item.foto_terjual, 'Total Pendapatan': item.total_pendapatan,
    'Rata-rata per Transaksi': item.foto_terjual > 0 ? Math.round(item.total_pendapatan / item.foto_terjual) : 0,
  }))
  const totalRow = { 'No': '', 'Jenis Foto': 'TOTAL', 'Jumlah Transaksi': totalTransactions.value, 'Total Pendapatan': totalRevenue.value, 'Rata-rata per Transaksi': averagePerTransaction.value }
  const allData = [...headerInfo, ...XLSX.utils.sheet_to_json(XLSX.utils.json_to_sheet(photoTypeData), { header: 1 }), [''], Object.values(totalRow)]
  const worksheet = XLSX.utils.aoa_to_sheet(allData)
  worksheet['!cols'] = [{ width: 5 }, { width: 20 }, { width: 18 }, { width: 18 }, { width: 20 }]
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Laporan Per Outlet')
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `Laporan_Outlet_${selectedOutletInfo.value?.name?.replace(/\s+/g, '_') || 'Unknown'}_${startDate.value}_${endDate.value}.xlsx`)
}

const printReport = () => {
  if (!reportData.value) {
    toast.error('Tidak ada data untuk di-print!')
    return
  }
  const printContent = `<style>body{font-family:'Courier New',monospace;font-size:8px;margin:2px;line-height:1.1;width:58mm;max-width:58mm}.header{text-align:center;margin-bottom:4px;font-size:9px;font-weight:bold}.divider{border-top:1px dashed #000;margin:2px 0}.row{display:flex;justify-content:space-between;margin:1px 0;font-size:7px}.detail{margin:1px 0;font-size:7px}.bold{font-weight:bold}.center{text-align:center}.total-line{border-top:1px solid #000;margin-top:2px;padding-top:2px;font-weight:bold}@media print{body{margin:0;width:58mm}}</style><div class="header">LAPORAN TRANSAKSI OUTLET<br>${fullOutletName.value}<br>${dateHeader.value}</div><div class="divider"></div><div class="row bold"><span>RINGKASAN:</span></div><div class="row"><span>Total Pendapatan:</span><span>Rp${totalRevenue.value.toLocaleString()}</span></div><div class="row"><span>Total Penjualan:</span><span>${totalTransactions.value}</span></div><div class="divider"></div><div class="row bold"><span>DETAIL PER JENIS:</span></div>${outletData.value.map((item,i) => `<div class="detail"><div class="bold">${i+1}. ${item.photo_type}</div><div class="row"><span>Foto terjual: ${item.foto_terjual}</span><span>Rp${item.total_pendapatan.toLocaleString()}</span></div></div>`).join('')}<div class="divider"></div><div class="row bold total-line"><span>GRAND TOTAL:</span></div><div class="row bold"><span>Total: Rp${totalRevenue.value.toLocaleString()}</span></div><div class="divider"></div><div class="center" style="font-size:6px;margin-top:3px;">Terima Kasih</div>`
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => { printWindow.print(); printWindow.close() }, 250)
  }
}

onMounted(() => { loadOutlets() })

definePageMeta({ layout: 'default', title: 'Laporan Transaksi Per Outlet' })
</script>

<template>
  <div>
    <PageHeader title="Laporan Transaksi Per Outlet" subtitle="Laporan transaksi berdasarkan outlet dan periode." />

    <VCard class="mb-4" rounded="lg">
      <VCardText>
        <VRow dense>
          <VCol cols="12" md="3">
            <VSelect v-model="selectedOutlet" :items="outletItems" label="Pilih Outlet" clearable :loading="outlets.length === 0" />
          </VCol>
          <VCol cols="12" md="3">
            <VTextField v-model="startDate" label="Start Date" type="date" />
          </VCol>
          <VCol cols="12" md="3">
            <VTextField v-model="endDate" label="End Date" type="date" />
          </VCol>
          <VCol cols="12" md="3" class="d-flex align-center gap-2">
            <VBtn color="primary" prepend-icon="bx-search-alt" :disabled="!selectedOutlet" @click="fetchTransactionsByOutlet">Terapkan</VBtn>
          </VCol>
        </VRow>
        <VRow v-if="reportData" class="mt-2" dense>
          <VCol cols="12" class="d-flex align-center gap-2">
            <VBtn color="success" prepend-icon="bx-export" @click="exportToExcel">Export Excel</VBtn>
            <VBtn color="info" prepend-icon="bx-printer" @click="printReport">Print</VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VRow v-if="reportData" class="mb-4" dense>
      <VCol cols="12" md="6">
        <VCard rounded="lg"><VCardText>
          <div class="text-subtitle-1 text-grey">Total Pendapatan</div>
          <div class="text-h5 font-weight-bold text-primary">Rp {{ totalRevenue.toLocaleString() }}</div>
        </VCardText></VCard>
      </VCol>
      <VCol cols="12" md="6">
        <VCard rounded="lg"><VCardText>
          <div class="text-subtitle-1 text-grey">Foto Terjual</div>
          <div class="text-h5 font-weight-bold text-info">{{ totalPhotosSold }}</div>
        </VCardText></VCard>
      </VCol>
    </VRow>

    <VCard v-if="reportData" :title="`Detail Transaksi - ${fullOutletName}`" rounded="lg">
      <VTable density="compact">
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">Jenis Foto</th>
            <th class="text-center">Total Penjualan</th>
            <th class="text-center">Total Pendapatan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="outletData.length === 0"><td colspan="5" class="text-center text-grey">Tidak ada data</td></tr>
          <tr v-else v-for="(item, index) in outletData" :key="index">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ item.photo_type }}</td>
            <td class="text-center">{{ item.foto_terjual }}</td>
            <td class="text-center">Rp {{ item.total_pendapatan.toLocaleString() }}</td>
          </tr>
          <tr v-if="outletData.length > 0" class="bg-blue-lighten-5">
            <td class="text-center font-weight-bold"></td>
            <td class="text-center font-weight-bold">TOTAL</td>
            <td class="text-center font-weight-bold">{{ totalTransactions }}</td>
            <td class="text-center font-weight-bold">Rp {{ totalRevenue.toLocaleString() }}</td>
          </tr>
        </tbody>
      </VTable>
    </VCard>

    <VCard v-else class="text-center pa-8" rounded="lg">
      <VCardText>
        <VIcon size="64" color="grey-lighten-1">bx-store-search</VIcon>
        <div class="text-h6 mt-4 text-grey">Pilih outlet untuk melihat laporan transaksi</div>
      </VCardText>
    </VCard>
  </div>
</template>

<style scoped>
.gap-2 { gap: 8px; }
</style>
