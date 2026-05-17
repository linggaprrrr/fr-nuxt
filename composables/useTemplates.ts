import { ref } from 'vue'

export interface TemplateSlot {
  id: number
  x: number
  y: number
  w: number
  h: number
  rx: number
}

export interface Template {
  id: string
  label: string
  type: 'layout'
  src: string
  aspect_ratio: number
  slot_count: number
  slots: TemplateSlot[]
  is_active: boolean
  outlet_id: string | null
  created_at: string
}

export function useTemplates() {
  const templates = ref<Template[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getTemplates = async (params?: Record<string, any>) => {
    loading.value = true
    error.value = null
    try {
      const res = await authFetch<{ data: Template[] }>('/templates/', { params })
      templates.value = res.data ?? []
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Gagal mengambil template.'
    } finally {
      loading.value = false
    }
  }

  const createTemplate = async (form: FormData) => {
    loading.value = true
    error.value = null
    try {
      const res = await authFetch<{ data: Template }>('/templates/', { method: 'POST', body: form })
      templates.value.push(res.data)
      return res.data
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal membuat template.'
    } finally {
      loading.value = false
    }
  }

  const updateTemplate = async (id: string, form: FormData) => {
    loading.value = true
    error.value = null
    try {
      const res = await authFetch<{ data: Template }>(`/templates/${id}`, { method: 'PATCH', body: form })
      const idx = templates.value.findIndex(t => t.id === id)
      if (idx !== -1) templates.value[idx] = res.data
      return res.data
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal mengubah template.'
    } finally {
      loading.value = false
    }
  }

  const deleteTemplate = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await authFetch(`/templates/${id}`, { method: 'DELETE' })
      templates.value = templates.value.filter(t => t.id !== id)
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal menghapus template.'
    } finally {
      loading.value = false
    }
  }

  return { templates, loading, error, getTemplates, createTemplate, updateTemplate, deleteTemplate }
}
