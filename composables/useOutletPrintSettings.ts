export interface OutletPrintSetting {
  outlet_id: string
  printing_enabled: boolean
  // default_template_id = the Primary print (normal photo layout);
  // secondary_template_id = the Secondary print (photo strip). Null secondary
  // means the kiosk hides the strip option entirely rather than offering
  // something it can't fulfil. Send an explicit null to withdraw it.
  default_template_id: string | null
  secondary_template_id: string | null
  print_price: number | null
  max_copies_per_order: number | null
}

export function useOutletPrintSettings() {
  const error = ref<string | null>(null)

  const getOutletPrintSetting = async (outletId: string): Promise<OutletPrintSetting | null> => {
    error.value = null
    try {
      return await authFetch<OutletPrintSetting>(`/outlets/${outletId}/printing`)
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal mengambil pengaturan cetak outlet.'
      return null
    }
  }

  const updateOutletPrintSetting = async (outletId: string, data: Partial<Omit<OutletPrintSetting, 'outlet_id'>>) => {
    error.value = null
    try {
      return await authFetch<OutletPrintSetting>(`/outlets/${outletId}/printing`, { method: 'PATCH', body: data })
    } catch (err: any) {
      error.value = err.data?.detail || err.message || 'Gagal mengubah pengaturan cetak outlet.'
      return null
    }
  }

  return { error, getOutletPrintSetting, updateOutletPrintSetting }
}
