import type { GetOutletsResponse } from "@/types/outlet"

export const useOutlets = () => { 
    
    const getOutlets = async ({
        page = 1,
        limit = 25,
        search = null,
        is_kiosk = null
    }: {
        page?: number
        limit?: number
        search?: string | null
        is_kiosk?: boolean | null
    }): Promise<GetOutletsResponse> => {
        const params: Record<string, any> = { page, limit }
        if (search) params.search = search
        if (is_kiosk !== null) params.is_kiosk = is_kiosk

        const response = await authFetch<GetOutletsResponse>('outlets/', {
            method: 'GET',
            params
        })

        return response
    }


    const createOutlet = async (data: any) => {        
        const response = await authFetch('outlets/', {            
            method: 'POST',            
            body: data
        })        
        return response
    }

  

    const deleteOutletById = async (id: string) => {
        const response = await authFetch(`outlets/${id}`, {            
            method: 'DELETE',            
        })
        return response
    }
    const getOutletById = async (id: string) => {
        const response = await authFetch(`outlets/${id}`, {            
            method: 'GET',                    
        })
        return response
    }

    const getOutletsByUnit = async (id: string) => {
        const response = await authFetch(`/outlets/get-outlets-by-unit/${id}`, {            
            method: 'GET',                    
        })
        return response
    }

    const updateOutletById = async (id: string, data: any) => {
        const response = await authFetch(`outlets/${id}`, {            
            method: 'PUT',            
            body: data
        })
        return response
    }



    // Kiosk branding. Multipart because banner/background are file uploads;
    // an omitted file means "keep", so removing one needs the clear_* flag
    // rather than sending an empty part.
    const updateOutletBranding = async (
        id: string,
        { primaryColor, banner, background, clearBanner, clearBackground }: {
            primaryColor?: string | null
            banner?: File | null
            background?: File | null
            clearBanner?: boolean
            clearBackground?: boolean
        }
    ) => {
        const form = new FormData()
        if (primaryColor !== undefined) form.append('primary_color', primaryColor ?? '')
        if (banner) form.append('banner', banner)
        if (background) form.append('background', background)
        if (clearBanner) form.append('clear_banner', 'true')
        if (clearBackground) form.append('clear_background', 'true')

        const response = await authFetch(`outlets/${id}/branding`, {
            method: 'PUT',
            body: form
        })
        return response
    }

    // Write-only: the backend hashes it and no endpoint reads it back, so a
    // forgotten kiosk PIN is reset here, never recovered.
    const setOutletSettingsPin = async (id: string, pin: string) => {
        const response = await authFetch(`outlets/${id}/settings-pin`, {
            method: 'PUT',
            body: { pin }
        })
        return response
    }

    return {
      getOutlets,
      createOutlet,
      deleteOutletById,
      getOutletById,
      getOutletsByUnit,
      updateOutletById,
      updateOutletBranding,
      setOutletSettingsPin
    }
  }
