<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VRow, VCol, VCard, VCardText, VTable, VTextField, VBtn } from 'vuetify/components'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

interface Transaction {
  tanggal: string
  total_transaksi: number
  total_pendapatan: number
}

interface TransactionSummary {
  start_date: string
  end_date: string
  total_pendapatan: number
  jumlah_transaksi: number
  data: Transaction[]
}

const transactions = ref<Transaction[]>([])
const totalPendapatan = ref(0)
const jumlahTransaksi = ref(0)

// Format tanggal YYYY-MM-DD
function formatDateToYYYYMMDD(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

const today = new Date()
const defaultStart = new Date('2025-05-10')
const startDate = ref(formatDateToYYYYMMDD(defaultStart))
const endDate = ref(formatDateToYYYYMMDD(today))

const { getTransactionsReport } = useReports()

const fetchTransactions = async () => {
  const result: TransactionSummary = await getTransactionsReport(startDate.value, endDate.value)
  transactions.value = result.data
  totalPendapatan.value = result.total_pendapatan
  jumlahTransaksi.value = result.jumlah_transaksi
}

onMounted(() => {
  fetchTransactions()
})


// Fungsi export ke Excel
const exportToExcel = () => {
  if (transactions.value.length === 0) {
    alert('Data transaksi kosong, tidak bisa diexport!')
    return
  }

  // Prepare data buat excel, misal array objek dengan properti yang mau diexport
  const exportData = transactions.value.map((trx, index) => ({
    No: index + 1,
    Tanggal: trx.tanggal,
    'Jumlah Transaksi': trx.total_transaksi,
    'Total Pendapatan': trx.total_pendapatan,
  }))

  
  const worksheet = XLSX.utils.json_to_sheet(exportData)

  
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transaksi')

  // Convert workbook ke buffer
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

  // Simpan file dengan nama misal transaksi.xlsx
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'transaksi.xlsx')
}
</script>

<template>
  <!-- 🔍 Filter Date Range -->
  <VCard class="mb-4" title="Filter Tanggal">
    <VCardText>
      <VRow dense>
        <VCol cols="12" md="4">
          <VTextField
            v-model="startDate"
            label="Start Date"
            type="date"            
            variant="outlined"
          />
        </VCol>
        <VCol cols="12" md="4">
          <VTextField
            v-model="endDate"
            label="End Date"
            type="date"            
            variant="outlined"
          />
        </VCol>
        <VCol cols="12" md="4" class="d-flex align-center">
          <VBtn color="primary" class="mr-4" @click="fetchTransactions">Terapkan</VBtn>
          <VBtn color="success" @click="exportToExcel">Export</VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>

  <!-- 📊 Summary Cards -->
  <VRow class="mb-4" dense>
    <VCol cols="12" md="6">
      <VCard>
        <VCardText>
          <div class="text-subtitle-1">Total Pendapatan</div>
          <div class="text-h5 font-weight-bold">Rp {{ totalPendapatan.toLocaleString() }}</div>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="6">
      <VCard>
        <VCardText>
          <div class="text-subtitle-1">Total Transaksi</div>
          <div class="text-h5 font-weight-bold">{{ jumlahTransaksi }}</div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- 📄 Tabel Transaksi -->
  <VCard title="Daftar Transaksi">
    <VTable density="compact">
      <thead>
        <tr>
          <th class="text-center">#</th>
          <th class="text-center">Tanggal</th>
          <th class="text-center">Jumlah Transaksi</th>
          <th class="text-center">Total Pendapatan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="transactions.length === 0">
          <td colspan="4" class="text-center">Tidak ada data</td>
        </tr>
        <tr v-else v-for="(trx, index) in transactions" :key="index">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ trx.tanggal }}</td>
          <td class="text-center">{{ trx.total_transaksi }}</td>
          <td class="text-center">Rp {{ trx.total_pendapatan.toLocaleString() }}</td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
