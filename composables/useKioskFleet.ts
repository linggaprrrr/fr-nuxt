import { ref } from 'vue'

export interface KioskPrinter {
  id: string
  kiosk_id: string
  outlet_id: string
  outlet_name: string
  printer_name: string | null
  printer_status: string
  app_version: string | null
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

  return { kiosks, loading, error, getKioskFleet }
}
