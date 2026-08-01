<script setup lang="ts">
import { useTransactions } from '@/composables/useTransactions'
import dayjs from 'dayjs'
import type { DataTableHeader } from '@/components/AppDataTable.vue'

const { transactions, loading, error, getTransactions, updateTransactionStatus, deleteTransaction } = useTransactions()
const toast = useToast()
const { confirm } = useConfirm()

const page = ref(1)
const limit = 24
const total = ref(0)
const search = ref('')

const statusOptions = [
  { title: 'Pending', value: 'pending' },
  { title: 'Lunas', value: 'paid' },
  { title: 'Dibatalkan', value: 'cancelled' },
  { title: 'Kadaluarsa', value: 'expired' },
]
const statusLabel: Record<string, string> = { paid: 'Lunas', cancelled: 'Dibatalkan', expired: 'Kadaluarsa', pending: 'Pending' }

const editDialog = ref(false)
const editingTrxId = ref('')
const editingStatus = ref('')

const headers: DataTableHeader[] = [
  { key: 'trx_code', title: 'Kode Transaksi', nowrap: true },
  { key: 'email', title: 'Email' },
  { key: 'photos', title: 'Foto', align: 'center', width: '80px' },
  { key: 'final_price', title: 'Harga', nowrap: true },
  { key: 'status', title: 'Status' },
  { key: 'paid_at', title: 'Waktu Bayar', nowrap: true },
  { key: 'created_at', title: 'Dibuat', nowrap: true },
  { key: 'actions', title: '', align: 'end', width: '80px' },
]

onMounted(fetchTransactions)

async function fetchTransactions() {
  await getTransactions({ page: page.value, limit, search: search.value })
  if (transactions.value) total.value = transactions.value.total
}

watch([page, search], fetchTransactions)

function openEditDialog(trx: any) {
  editingTrxId.value = trx.id
  editingStatus.value = trx.status
  editDialog.value = true
}

async function handleUpdateStatus() {
  await updateTransactionStatus(editingTrxId.value, editingStatus.value)
  if (!error.value) {
    editDialog.value = false
    toast.success('Status transaksi diperbarui')
    fetchTransactions()
  } else {
    toast.error(error.value)
  }
}

async function handleDelete(trx: any) {
  if (!await confirm({ title: 'Hapus Transaksi', message: `Hapus transaksi ${trx.trx_code}?`, tone: 'danger', confirmText: 'Hapus' })) return
  await deleteTransaction(trx.id)
  toast.success('Transaksi dihapus')
  fetchTransactions()
}
</script>

<template>
  <div>
    <PageHeader title="Transaksi" subtitle="Daftar semua transaksi." />

    <VCard rounded="lg">
      <AppDataTable
        :headers="headers"
        :items="transactions?.data ?? []"
        :loading="loading"
        show-index
        :page="page"
        :items-per-page="limit"
        :total="total"
        empty-title="Belum ada transaksi"
        @update:page="p => { page = p; fetchTransactions() }"
      >
        <template #toolbar>
          <VTextField v-model="search" placeholder="Cari email atau kode..." prepend-inner-icon="bx-search" clearable style="max-width:320px" />
        </template>

        <template #item.trx_code="{ item }">{{ item.trx_code ?? '-' }}</template>
        <template #item.email="{ item }">{{ item.user?.email ?? '-' }}</template>
        <template #item.photos="{ item }">{{ item.photos.length }}</template>
        <template #item.final_price="{ item }">Rp {{ item.final_price.toLocaleString('id-ID') }}</template>

        <template #item.status="{ item }">
          <StatusChip
            :status="item.status"
            :map="{ paid: 'success', cancelled: 'error', expired: 'secondary', pending: 'warning' }"
          >{{ statusLabel[item.status] ?? item.status }}</StatusChip>
        </template>

        <template #item.paid_at="{ item }">
          {{ item.paid_at ? dayjs(item.paid_at).format('DD/MM/YY HH:mm') : '-' }}
        </template>

        <template #item.created_at="{ item }">
          {{ dayjs(item.created_at).format('DD/MM/YY HH:mm') }}
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end" style="gap:4px">
            <VBtn icon variant="text" size="small" @click="openEditDialog(item)">
              <VIcon color="primary" icon="bx-edit-alt" />
            </VBtn>
            <VBtn icon variant="text" size="small" color="error" @click="handleDelete(item)">
              <VIcon icon="bx-trash-alt" />
            </VBtn>
          </div>
        </template>
      </AppDataTable>
    </VCard>

    <AppModal
      v-model="editDialog"
      title="Edit Status Transaksi"
      icon="bx-transfer"
      :loading="loading"
      confirm-text="Simpan"
      cancel-text="Batal"
      :max-width="400"
      @confirm="handleUpdateStatus"
    >
      <FormSection title="Status">
        <FormField label="Status">
          <template #default="{ id, describedBy }">
            <VSelect
              :id="id"
              v-model="editingStatus"
              :items="statusOptions"
              item-title="title"
              item-value="value"
              :aria-describedby="describedBy"
            />
          </template>
        </FormField>
      </FormSection>
    </AppModal>
  </div>
</template>
