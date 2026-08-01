import { ref } from 'vue'

export interface PrintAnalytics {
  total_jobs: number
  by_status: Record<string, number>
  failure_rate: number
  avg_copies: number
  top_templates: { template_id: string; label: string; count: number }[]
}

export interface PrintJob {
  id: string
  transaction_id: string
  outlet_id: string
  status: string
  copies: number
  created_at: string
  printed_at: string | null
  reprint_of_id: string | null
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

  const jobs = ref<PrintJob[]>([])
  const getPrintJobs = async (params?: Record<string, any>) => {
    loading.value = true
    error.value = null
    try {
      const res = await authFetch<{ data: PrintJob[] }>('/print-jobs/', { params })
      jobs.value = res?.data ?? []
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal mengambil daftar job cetak.'
    } finally {
      loading.value = false
    }
  }

  // Staff recovery for a paid print the customer never received — the app died
  // mid-print, the power went, the spooler wedged. Distinct from the kiosk's
  // own one-tap retry, which only covers jobs that reported `failed`.
  const reprintJob = async (jobId: string) => {
    error.value = null
    try {
      return await authFetch<PrintJob>(`/print-jobs/${jobId}/admin-reprint`, { method: 'POST' })
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal mencetak ulang.'
      return null
    }
  }

  return { analytics, jobs, loading, error, getPrintAnalytics, getPrintJobs, reprintJob }
}
