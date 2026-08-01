import { ref } from 'vue'

export interface KioskPrintStock {
  // null = stock tracking not configured for this kiosk, which is different
  // from 0 (configured and exhausted). The UI hides the whole column on null.
  initial: number | null
  printed: number
  remaining: number | null
  threshold: number
  low: boolean
}

export interface KioskPrinter {
  id: string
  kiosk_id: string
  outlet_id: string
  outlet_name: string
  printer_name: string | null
  printer_status: string
  app_version: string | null
  stock: KioskPrintStock
  last_seen_at: string
  created_at: string
}

export function useKioskFleet() {
  const kiosks = ref<KioskPrinter[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getKioskFleet = async (params?: Record<string, any>) => {
    loading.value = true
    error.value = null
    try {
      const res = await authFetch<{ data: KioskPrinter[] }>('/kiosk-printers/', { params })
      kiosks.value = res.data ?? []
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal mengambil data kiosk.'
    } finally {
      loading.value = false
    }
  }

  // Staff load fresh media then set the new capacity; the backend re-zeros
  // printed_count in the same call, so "restock" is one action, not two.
  const updateKioskStock = async (
    kioskPrinterId: string,
    payload: { initial_print_count?: number | null, low_stock_threshold?: number, reset_only?: boolean },
  ) => {
    error.value = null
    try {
      return await authFetch(`/kiosk-printers/${kioskPrinterId}/stock`, { method: 'PATCH', body: payload })
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal menyimpan stok cetak.'
      return null
    }
  }

  return { kiosks, loading, error, getKioskFleet, updateKioskStock }
}
