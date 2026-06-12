import { ref } from 'vue';
import { a as authFetch } from './authFetch-5wQjlWwJ.mjs';

function useTransactions() {
  const transactions = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const getTransactions = async (params) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      transactions.value = await authFetch("/transactions/", {
        method: "GET",
        params
      });
      console.log("Fetched transactions:", transactions.value);
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Failed to fetch transactions.";
    } finally {
      loading.value = false;
    }
  };
  const updateTransactionStatus = async (id, status) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      await authFetch(`/transactions/${id}`, {
        method: "PATCH",
        body: { status }
      });
      if (transactions.value) {
        const trx = transactions.value.data.find((tx) => tx.id === id);
        if (trx) trx.status = status;
      }
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Failed to update transaction status.";
    } finally {
      loading.value = false;
    }
  };
  const deleteTransaction = async (id) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      await authFetch(`/transactions/${id}`, {
        method: "DELETE"
      });
      if (transactions.value) {
        transactions.value.data = transactions.value.data.filter((tx) => tx.id !== id);
        transactions.value.total--;
      }
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Failed to delete transaction.";
    } finally {
      loading.value = false;
    }
  };
  return {
    transactions,
    loading,
    error,
    getTransactions,
    updateTransactionStatus,
    deleteTransaction
  };
}

export { useTransactions as u };
