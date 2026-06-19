import { ref } from 'vue'

export interface AiTemplate {
  id: string
  label: string
  prompt?: string
  before_url: string | null
  after_url: string | null
  sort_order: number
  outlet_id: string | null
  is_active: boolean
  created_at: string
}

export function useAiTemplates() {
  const templates = ref<AiTemplate[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getAiTemplates = async (params?: Record<string, any>) => {
    loading.value = true
    error.value = null
    try {
      const res = await authFetch<{ data: AiTemplate[] }>('/ai-templates/', { params })
      templates.value = res.data ?? []
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal mengambil AI template.'
    } finally {
      loading.value = false
    }
  }

  const createAiTemplate = async (form: FormData) => {
    loading.value = true
    error.value = null
    try {
      const res = await authFetch<{ data: AiTemplate }>('/ai-templates/', { method: 'POST', body: form })
      templates.value.push(res.data)
      return res.data
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal membuat AI template.'
    } finally {
      loading.value = false
    }
  }

  const updateAiTemplate = async (id: string, form: FormData) => {
    loading.value = true
    error.value = null
    try {
      const res = await authFetch<{ data: AiTemplate }>(`/ai-templates/${id}`, { method: 'PATCH', body: form })
      const idx = templates.value.findIndex(t => t.id === id)
      if (idx !== -1) templates.value[idx] = res.data
      return res.data
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal mengubah AI template.'
    } finally {
      loading.value = false
    }
  }

  const deleteAiTemplate = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await authFetch(`/ai-templates/${id}`, { method: 'DELETE' })
      templates.value = templates.value.filter(t => t.id !== id)
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal menghapus AI template.'
    } finally {
      loading.value = false
    }
  }

  const tryAiTemplate = async (id: string, imageFile: File): Promise<string | null> => {
    loading.value = true
    error.value = null
    try {
      const form = new FormData()
      form.append('image', imageFile)
      const res = await authFetch<{ image_url: string }>(`/ai-templates/${id}/preview`, { method: 'POST', body: form })
      return res.image_url ?? null
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal menjalankan prompt.'
      return null
    } finally {
      loading.value = false
    }
  }

  const reorderAiTemplates = async (ordered: AiTemplate[]) => {
    error.value = null
    try {
      await authFetch('/ai-templates/reorder', {
        method: 'POST',
        body: JSON.stringify(ordered.map((t, i) => ({ id: t.id, sort_order: i }))),
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal menyimpan urutan.'
    }
  }

  return { templates, loading, error, getAiTemplates, createAiTemplate, updateAiTemplate, deleteAiTemplate, reorderAiTemplates, tryAiTemplate }
}
