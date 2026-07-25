import { ref } from 'vue'

export interface PrintAnalytics {
  total_jobs: number
  by_status: Record<string, number>
  failure_rate: number
  avg_copies: number
  top_templates: { template_id: string; label: string; count: number }[]
}

export function usePrintAnalytics() {
  const analytics = ref<PrintAnalytics | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getPrintAnalytics = async (params?: Record<string, any>) => {
    loading.value = true
    error.value = null
    try {
      analytics.value = await authFetch<PrintAnalytics>('/print-jobs/analytics', { params })
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal mengambil data analitik cetak.'
    } finally {
      loading.value = false
    }
  }

  return { analytics, loading, error, getPrintAnalytics }
}
