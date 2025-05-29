import type { GetPhotoTypesResponse, GetPhotoPricesResponse} from "@/types/photo"



export const usePricings = () => {
  const getPhotoTypes = async ({page=1, limit=25, search = null}: {
        page?: number
        limit?: number        
        search?: string | null
  }): Promise<GetPhotoTypesResponse> => {
    const params: Record<string, any> = { page, limit }
    if (search) {
        params.search = search
    }
    const data = await authFetch<GetPhotoTypesResponse>(`/photo_types/`, {      
      method: 'GET',
      params    
    })

    return data
  }

  const getPhotoPrices = async ({page=1, limit=25, search=null}: {
    page?: number
    limit?: number
    search?: string | null
  }): Promise<GetPhotoPricesResponse> => {
    const params: Record<string, any> = { page, limit }
    if (search) {
        params.search = search
    }
    const data = await authFetch<GetPhotoPricesResponse>(`/photo_prices/`, {      
      method: 'GET',         
      params    
    })

    return data
  }

  const getPhotoPricesByUnit = async (unitId: string) => {
    const data = await authFetch(`/photo_prices/by-unit/${unitId}`, {        
        method: 'GET',
        params: {
          unit_id: unitId,         
        },
    })
    return data
  }

  const createPhotoPricing = async (data: any) => {
    const response = await authFetch(`/photo_prices/`, {        
        method: 'POST',
        body: data
      })
      
      return response
  }

  const createPhotoType = async(data: any) => {
    const response = await authFetch(`/photo_types/`, {        
        method: 'POST',        
        body: data
    })  
    return response
  }

  const deletePhotoTypeById = async(id: string) => {
    const response = await authFetch(`/photo_types/${id}`, {      
      method: 'DELETE',
    })
    return response
  }

  const deletePhotoPriceById = async(id: string) => {
    const response = await authFetch(`/photo_prices/${id}`, {      
      method: 'DELETE',      
    })
    return response
  }

  const getPhotoPriceById = async(id: string) => {
    const data = await authFetch(`/photo_prices/${id}`, {      
      method: 'GET',      
    })
    return data
  }

  const updatePhotoPrice = async(id: string, data: any) => {
    const response = await authFetch(`/photo_prices/${id}`, {      
      method: 'PUT',      
      body: data
    })

    return response
  }

  const getPhotoTypeById = async(id: string) => {
    const data = await authFetch(`/photo_types/${id}`, {      
      method: 'GET',      
    })
    return data
  }

  const updatePhotoType = async(id: string, data: any) => {
    const response = await authFetch(`/photo_types/${id}`, {        
        method: 'PUT',        
        body: data
      })
      return response
  }

  return {
    getPhotoTypes,
    getPhotoPrices,
    createPhotoPricing,
    createPhotoType,
    deletePhotoTypeById,
    deletePhotoPriceById,
    getPhotoPriceById,
    getPhotoTypeById,
    updatePhotoType,
    updatePhotoPrice,
    getPhotoPricesByUnit

  }
}