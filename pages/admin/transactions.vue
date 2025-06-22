<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useTransactions } from '@/composables/useTransactions'
import dayjs from 'dayjs'

const {
  transactions,
  loading,
  error,
  getTransactions,
  deleteTransaction
} = useTransactions()


const page = ref(1)
const limit = 24
const total = ref(0)
const search = ref('')

// Ambil data saat komponen dimuat
onMounted(() => {
  fetchTransactions()
  console.log(transactions.value)
})

// Fungsi ambil data
const fetchTransactions = async () => {
  await getTransactions({ page: page.value, limit, search: search.value })
  if (transactions.value) {
    total.value = transactions.value.total
  }
}

// Watch perubahan pada page dan search
watch([page, search], fetchTransactions)


const handleDelete = async (id: string) => {
  if (confirm('Hapus transaksi ini?')) {
    await deleteTransaction(id)
    fetchTransactions() // refresh data setelah hapus
  }
}
</script>
<template>
  <VCard title="Daftar Transaksi" class="mb-4">
    <VCardText>
      <VTextField
        v-model="search"
        label="Cari email..."
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
</template>
