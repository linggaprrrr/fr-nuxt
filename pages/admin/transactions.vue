<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useTransactions } from '@/composables/useTransactions'
import dayjs from 'dayjs'

const {
  transactions,
  loading,
  error,
  getTransactions,
  updateTransactionStatus,
  deleteTransaction
} = useTransactions()


const page = ref(1)
const limit = 24
const total = ref(0)
const search = ref('')

onMounted(() => {
  fetchTransactions()
})

const fetchTransactions = async () => {
  await getTransactions({ page: page.value, limit, search: search.value })
  if (transactions.value) {
    total.value = transactions.value.total
  }
}

watch([page, search], fetchTransactions)

const handleDelete = async (id: string) => {
  if (confirm('Hapus transaksi ini?')) {
    await deleteTransaction(id)
    fetchTransactions()
  }
}

// Edit status modal
const editDialog = ref(false)
const editingTrxId = ref<string>('')
const editingStatus = ref<string>('')
const statusOptions = [
  { title: 'Pending', value: 'pending' },
  { title: 'Lunas', value: 'paid' },
  { title: 'Dibatalkan', value: 'cancelled' },
  { title: 'Kadaluarsa', value: 'expired' },
]

const openEditDialog = (trx: any) => {
  editingTrxId.value = trx.id
  editingStatus.value = trx.status
  editDialog.value = true
}

const handleUpdateStatus = async () => {
  await updateTransactionStatus(editingTrxId.value, editingStatus.value)
  if (!error.value) editDialog.value = false
}
</script>
<template>
  <VCard title="Daftar Transaksi" class="mb-4">
    <VCardText>
      <VTextField
        v-model="search"
        label="Search..."
        prepend-inner-icon="bx bx-search"
        clearable
        class="mb-4"
      />
    </VCardText>

    <VTable density="compact">
      <thead>
        <tr>
          <th>#</th>          
          <th>Kode Transaksi</th>                    
          <th>Email</th>                    
          <th>Jumlah Foto</th>    
          <th>Final Price</th>          
          <th>Status</th>
          <th>Waktu Bayar</th>          
          <th>Dibuat</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!loading && transactions?.data?.length === 0">
          <td colspan="13" class="text-center">Tidak ada data</td>
        </tr>
        <tr v-for="(trx, index) in transactions?.data" :key="trx.id">
          <td>{{ index + 1 + (page - 1) * limit }}</td>          
          <td>{{ trx.trx_code ?? '-' }}</td>                    
          <td>{{ trx.user?.email ?? '-' }}</td>                    
          <td class="text-center">{{ trx.photos.length }}</td>   
          <td>Rp {{ trx.final_price.toLocaleString('id-ID') }}</td>          
          <td>
            <VChip :color="trx.status === 'paid' ? 'success' : trx.status === 'cancelled' ? 'error' : trx.status === 'expired' ? 'grey' : 'warning'" size="small">
              {{ trx.status === 'paid' ? 'Lunas' : trx.status === 'cancelled' ? 'Dibatalkan' : trx.status === 'expired' ? 'Kadaluarsa' : 'Pending' }}
            </VChip>
          </td>          
          <td>{{ trx.paid_at ? new Date(trx.paid_at).toLocaleString('id-ID') : '-' }}</td>
          
          {{ dayjs(trx.created_at).format('DD/MM/YYYY HH:mm') }}
          <td>
            <VBtn icon variant="text" size="small" @click="openEditDialog(trx)">
              <VIcon color="primary">bx bx-edit-alt</VIcon>
            </VBtn>
            <VBtn icon variant="text" size="small" @click="handleDelete(trx.id)">
              <VIcon color="error">bx bx-trash-alt</VIcon>
            </VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>


    <VCardActions class="justify-center">
      <VPagination
        v-model="page"
        :length="Math.ceil(total / limit)"
        total-visible="5"
        prev-icon="bx bx-chevron-left"
        next-icon="bx bx-chevron-right"
      />
    </VCardActions>
  </VCard>

  <!-- Edit Status Dialog -->
  <VDialog v-model="editDialog" max-width="400">
    <VCard title="Edit Status Transaksi">
      <VCardText>
        <VAlert v-if="error" type="error" class="mb-4" density="compact">{{ error }}</VAlert>
        <VSelect
          v-model="editingStatus"
          :items="statusOptions"
          item-title="title"
          item-value="value"
          label="Status"
          variant="outlined"
        />
      </VCardText>
      <VCardActions class="justify-end">
        <VBtn variant="text" @click="editDialog = false">Batal</VBtn>
        <VBtn color="primary" :loading="loading" @click="handleUpdateStatus">Simpan</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
