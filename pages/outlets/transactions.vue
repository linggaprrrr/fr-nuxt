<script setup lang="ts">
import { useTransactions } from '@/composables/useTransactions'
import type { DataTableHeader } from '@/components/AppDataTable.vue'

const { transactions, loading, getTransactions, deleteTransaction } = useTransactions()
const toast = useToast()
const { confirm } = useConfirm()

const page = ref(1)
const limit = 24
const total = ref(0)
const search = ref('')

const headers: DataTableHeader[] = [
  { key: 'trx_code', title: 'Kode Transaksi', nowrap: true },
  { key: 'email', title: 'Email' },
  { key: 'photos', title: 'Foto', align: 'center', width: '80px' },
  { key: 'final_price', title: 'Harga', nowrap: true },
  { key: 'paid', title: 'Status' },
  { key: 'paid_at', title: 'Waktu Bayar', nowrap: true },
  { key: 'created_at', title: 'Dibuat', nowrap: true },
  { key: 'actions', title: '', align: 'end', width: '60px' },
]

onMounted(fetchTransactions)

async function fetchTransactions() {
  await getTransactions({ page: page.value, limit, search: search.value })
  if (transactions.value) total.value = transactions.value.total
}

watch([page, search], fetchTransactions)

async function handleDelete(trx: any) {
  if (!await confirm({ title: 'Hapus Transaksi', message: `Hapus transaksi ${trx.trx_code}?`, tone: 'danger', confirmText: 'Hapus' })) return
  await deleteTransaction(trx.id)
  toast.success('Transaksi dihapus')
  fetchTransactions()
}

definePageMeta({ layout: 'outlet' })
</script>

<template>
  <div>
    <PageHeader title="Transaksi" subtitle="Daftar transaksi outlet." />

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
          <VTextField v-model="search" placeholder="Cari email..." prepend-inner-icon="bx-search" clearable style="max-width:320px" />
        </template>

        <template #item.trx_code="{ item }">{{ item.trx_code ?? '-' }}</template>
        <template #item.email="{ item }">{{ item.user?.email ?? '-' }}</template>
        <template #item.photos="{ item }">{{ item.photos.length }}</template>
        <template #item.final_price="{ item }">Rp {{ item.final_price.toLocaleString('id-ID') }}</template>

        <template #item.paid="{ item }">
          <StatusChip :status="item.paid ? 'paid' : 'pending'" :map="{ paid: 'success', pending: 'warning' }">
            {{ item.paid ? 'Lunas' : 'Pending' }}
          </StatusChip>
        </template>

        <template #item.paid_at="{ item }">
          {{ item.paid_at ? new Date(item.paid_at).toLocaleString('id-ID') : '-' }}
        </template>

        <template #item.created_at="{ item }">
          {{ new Date(item.created_at).toLocaleString('id-ID') }}
        </template>

        <template #item.actions="{ item }">
          <VBtn icon variant="text" size="small" color="error" @click="handleDelete(item)">
            <VIcon icon="bx-trash-alt" />
          </VBtn>
        </template>
      </AppDataTable>
    </VCard>
  </div>
</template>
