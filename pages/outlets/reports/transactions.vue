<script setup lang="ts">
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const toast = useToast()

interface Transaction { tanggal: string; total_transaksi: number; total_pendapatan: number }
interface TransactionSummary { start_date: string; end_date: string; total_pendapatan: number; jumlah_transaksi: number; data: Transaction[] }

const transactions = ref<Transaction[]>([])
const totalPendapatan = ref(0)
const jumlahTransaksi = ref(0)

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

onMounted(() => { fetchTransactions() })

const exportToExcel = () => {
  if (transactions.value.length === 0) {
    toast.error('Data transaksi kosong, tidak bisa diexport!')
    return
  }
  const exportData = transactions.value.map((trx, index) => ({
    No: index + 1, Tanggal: trx.tanggal, 'Jumlah Transaksi': trx.total_transaksi, 'Total Pendapatan': trx.total_pendapatan,
  }))
  const worksheet = XLSX.utils.json_to_sheet(exportData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transaksi')
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'transaksi.xlsx')
}

definePageMeta({ layout: 'outlet' })
</script>

<template>
  <div>
    <PageHeader title="Laporan Transaksi" subtitle="Laporan transaksi outlet berdasarkan periode." />

    <VCard class="mb-4" rounded="lg">
      <VCardText>
        <VRow dense>
          <VCol cols="12" md="4">
            <VTextField v-model="startDate" label="Start Date" type="date" variant="outlined" />
          </VCol>
          <VCol cols="12" md="4">
            <VTextField v-model="endDate" label="End Date" type="date" variant="outlined" />
          </VCol>
          <VCol cols="12" md="4" class="d-flex align-center gap-2">
            <VBtn color="primary" prepend-icon="bx-search-alt" @click="fetchTransactions">Terapkan</VBtn>
            <VBtn color="success" prepend-icon="bx-export" @click="exportToExcel">Export</VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VRow class="mb-4" dense>
      <VCol cols="12" md="6">
        <VCard rounded="lg"><VCardText>
          <div class="text-subtitle-1 text-grey">Total Pendapatan</div>
          <div class="text-h5 font-weight-bold text-primary">Rp {{ totalPendapatan.toLocaleString() }}</div>
        </VCardText></VCard>
      </VCol>
      <VCol cols="12" md="6">
        <VCard rounded="lg"><VCardText>
          <div class="text-subtitle-1 text-grey">Total Transaksi</div>
          <div class="text-h5 font-weight-bold text-success">{{ jumlahTransaksi }}</div>
        </VCardText></VCard>
      </VCol>
    </VRow>

    <VCard title="Daftar Transaksi" rounded="lg">
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
            <td colspan="4" class="text-center text-grey">Tidak ada data</td>
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
  </div>
</template>

<style scoped>
.gap-2 { gap: 8px; }
</style>
