export interface AccessMethodConfig {
  method_key: string
  enabled: boolean
  sort_order: number
  is_default: boolean
  badge: string | null
  title_override: string | null
  description_override: string | null
  available_from: string | null
  available_until: string | null
  config: Record<string, any>
}

export function useOutletAccessMethods() {
  const error = ref<string | null>(null)

  const getOutletAccessMethods = async (outletId: string): Promise<AccessMethodConfig[]> => {
    error.value = null
    try {
      const res = await authFetch<{ data: AccessMethodConfig[] }>(`/outlets/${outletId}/access-methods`)
      return res.data ?? []
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Failed to load access methods.'
      return []
    }
  }

  const updateOutletAccessMethods = async (outletId: string, methods: AccessMethodConfig[]) => {
    error.value = null
    try {
      const res = await authFetch<{ data: AccessMethodConfig[] }>(`/outlets/${outletId}/access-methods`, {
        method: 'PATCH',
        body: { methods },
      })
      return res.data ?? []
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Failed to save access methods.'
      return null
    }
  }

  return { error, getOutletAccessMethods, updateOutletAccessMethods }
}
