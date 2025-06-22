import { ref } from 'vue'
import type { TransactionResponse } from '@/types/transaction'

export function useTransactions() {  
  const transactions = ref<TransactionResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getTransactions = async (params?: Record<string, any>) => {
    loading.value = true
    error.value = null
    try {      
      transactions.value = await authFetch<TransactionResponse>('/transactions/', {        
        method: 'GET',        
        params,
      })      
      console.log('Fetched transactions:', transactions.value)
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch transactions.'
    } finally {
      loading.value = false
    }
  }

  const deleteTransaction = async (id: string) => {
    loading.value = true
    error.value = null
    try {      
      await authFetch(`/transactions/${id}`, {        
        method: 'DELETE',        
      })
      
      if (transactions.value) {
        transactions.value.data = transactions.value.data.filter(tx => tx.id !== id)
        transactions.value.total--
      }
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to delete transaction.'
    } finally {
      loading.value = false
    }
  }

  return {
    transactions,
    loading,
    error,
    getTransactions,
    deleteTransaction
  }
}
