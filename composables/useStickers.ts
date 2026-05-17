import { ref } from 'vue'

export interface Sticker {
  id: string
  label: string
  type: 'image' | 'emoji'
  value?: string
  url?: string
  is_active: boolean
  outlet_id: string | null
  created_at: string
}

export function useStickers() {
  const stickers = ref<Sticker[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getStickers = async (params?: Record<string, any>) => {
    loading.value = true
    error.value = null
    try {
      const res = await authFetch<{ data: Sticker[] }>('/stickers/', { params })
      stickers.value = res.data ?? []
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Gagal mengambil sticker.'
    } finally {
      loading.value = false
    }
  }

  const createSticker = async (form: FormData) => {
    loading.value = true
    error.value = null
    try {
      const res = await authFetch<{ data: Sticker }>('/stickers/', { method: 'POST', body: form })
      stickers.value.push(res.data)
      return res.data
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal membuat sticker.'
    } finally {
      loading.value = false
    }
  }

  const updateSticker = async (id: string, form: FormData) => {
    loading.value = true
    error.value = null
    try {
      const res = await authFetch<{ data: Sticker }>(`/stickers/${id}`, { method: 'PATCH', body: form })
      const idx = stickers.value.findIndex(s => s.id === id)
      if (idx !== -1) stickers.value[idx] = res.data
      return res.data
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal mengubah sticker.'
    } finally {
      loading.value = false
    }
  }

  const deleteSticker = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await authFetch(`/stickers/${id}`, { method: 'DELETE' })
      stickers.value = stickers.value.filter(s => s.id !== id)
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal menghapus sticker.'
    } finally {
      loading.value = false
    }
  }

  return { stickers, loading, error, getStickers, createSticker, updateSticker, deleteSticker }
}
