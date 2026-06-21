import { ref } from 'vue'
import { authFetch } from '~/utils/authFetch'

export interface AiCallLog {
  id: string
  source: 'kiosk' | 'admin_preview'
  model: string
  template_id: string | null
  template_label: string | null
  device_id: string | null
  prompt_text: string | null
  input_mime_type: string | null
  request_json: Record<string, unknown> | null
  image_generated: boolean
  output_image_url: string | null
  error_detail: string | null
  duration_ms: number | null
  created_at: string | null
}

export interface AiLogsResponse {
  total: number
  page: number
  per_page: number
  items: AiCallLog[]
}

export function useAiLogs() {
  const logs = ref<AiCallLog[]>([])
  const total = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchLogs(params: {
    page?: number
    per_page?: number
    source?: string
    template_id?: string
    image_generated?: boolean | null
  } = {}) {
    loading.value = true
    error.value = null
    try {
      const query = new URLSearchParams()
      if (params.page)       query.set('page', String(params.page))
      if (params.per_page)   query.set('per_page', String(params.per_page))
      if (params.source)     query.set('source', params.source)
      if (params.template_id) query.set('template_id', params.template_id)
      if (params.image_generated != null)
        query.set('image_generated', String(params.image_generated))

      const res = await authFetch(`/ai-templates/logs?${query}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: AiLogsResponse = await res.json()
      logs.value = data.items
      total.value = data.total
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Gagal memuat logs.'
    } finally {
      loading.value = false
    }
  }

  return { logs, total, loading, error, fetchLogs }
}
