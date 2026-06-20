export interface ContentUsageItem {
  id: string
  label: string
  uses: number
}

export interface ContentUsageResponse {
  ai_templates: ContentUsageItem[]
  templates: ContentUsageItem[]
  stickers: ContentUsageItem[]
}

export function useContentUsage() {
  const data = ref<ContentUsageResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getContentUsage = async (params: {
    outlet_id?: string
    start_date?: string | null
    end_date?: string | null
  } = {}) => {
    loading.value = true
    error.value = null
    try {
      const query: Record<string, string> = {}
      if (params.outlet_id) query.outlet_id = params.outlet_id
      if (params.start_date) query.start_date = params.start_date
      if (params.end_date) query.end_date = params.end_date

      data.value = await authFetch<ContentUsageResponse>('/statistics/content-usage', {
        method: 'GET',
        params: query,
      })
    } catch (e: any) {
      error.value = e?.message ?? 'Gagal memuat data.'
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, getContentUsage }
}
