import { ref } from 'vue'

export interface PrintTemplateVersion {
  id: string
  print_template_id: string
  version_number: number
  orientation: string
  dpi: number
  width_px: number
  height_px: number
  margins: { top: number; right: number; bottom: number; left: number }
  slots: { id: number; x: number; y: number; w: number; h: number; rx: number }[]
  background_url: string | null
  frame_url: string | null
  logo_url: string | null
  watermark: any | null
  qr_config: any | null
  text_overlays: any[]
  published_at: string | null
  created_at: string
}

export interface PrintTemplate {
  id: string
  label: string
  paper_size: string
  // 'primary' = normal photo layout, 'secondary' = photo strip. Which of the
  // outlet's two print slots this template can fill.
  print_type: 'primary' | 'secondary'
  is_global: boolean
  is_active: boolean
  current_version: PrintTemplateVersion | null
  draft_version?: PrintTemplateVersion | null
  outlet_ids?: string[]
  created_at: string
}

export function usePrintTemplates() {
  const templates = ref<PrintTemplate[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getPrintTemplates = async (params?: Record<string, any>) => {
    loading.value = true
    error.value = null
    try {
      const res = await authFetch<{ data: PrintTemplate[] }>('/print-templates/', { params })
      templates.value = res.data ?? []
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Gagal mengambil print template.'
    } finally {
      loading.value = false
    }
  }

  const createPrintTemplate = async (form: FormData) => {
    loading.value = true
    error.value = null
    try {
      const res = await authFetch<{ data: PrintTemplate }>('/print-templates/', { method: 'POST', body: form })
      templates.value.unshift(res.data)
      return res.data
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal membuat print template.'
    } finally {
      loading.value = false
    }
  }

  const updatePrintTemplate = async (id: string, form: FormData) => {
    loading.value = true
    error.value = null
    try {
      const res = await authFetch<{ data: PrintTemplate }>(`/print-templates/${id}`, { method: 'PATCH', body: form })
      const idx = templates.value.findIndex(t => t.id === id)
      if (idx !== -1) templates.value[idx] = res.data
      return res.data
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal mengubah print template.'
    } finally {
      loading.value = false
    }
  }

  const publishPrintTemplate = async (id: string) => {
    error.value = null
    try {
      const res = await authFetch<{ data: PrintTemplate }>(`/print-templates/${id}/publish`, { method: 'POST' })
      const idx = templates.value.findIndex(t => t.id === id)
      if (idx !== -1) templates.value[idx] = res.data
      return res.data
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal mempublikasikan template.'
    }
  }

  const rollbackPrintTemplate = async (id: string, versionId: string) => {
    error.value = null
    try {
      const form = new FormData()
      form.append('version_id', versionId)
      const res = await authFetch<{ data: PrintTemplate }>(`/print-templates/${id}/rollback`, { method: 'POST', body: form })
      const idx = templates.value.findIndex(t => t.id === id)
      if (idx !== -1) templates.value[idx] = res.data
      return res.data
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal rollback template.'
    }
  }

  const getPrintTemplateVersions = async (id: string) => {
    error.value = null
    try {
      const res = await authFetch<{ data: PrintTemplateVersion[] }>(`/print-templates/${id}/versions`)
      return res.data ?? []
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal mengambil riwayat versi.'
      return []
    }
  }

  const assignOutlets = async (id: string, outletIds: string[]) => {
    error.value = null
    try {
      const form = new FormData()
      form.append('outlet_ids', outletIds.join(','))
      await authFetch(`/print-templates/${id}/assignments`, { method: 'POST', body: form })
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal mengubah assignment outlet.'
    }
  }

  const deletePrintTemplate = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await authFetch(`/print-templates/${id}`, { method: 'DELETE' })
      const idx = templates.value.findIndex(t => t.id === id)
      if (idx !== -1) templates.value[idx].is_active = false
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal menghapus print template.'
    } finally {
      loading.value = false
    }
  }

  return {
    templates, loading, error,
    getPrintTemplates, createPrintTemplate, updatePrintTemplate,
    publishPrintTemplate, rollbackPrintTemplate, getPrintTemplateVersions,
    assignOutlets, deletePrintTemplate,
  }
}
