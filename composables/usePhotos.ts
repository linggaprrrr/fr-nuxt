// composables/usePhotos.ts
import type { Photo } from '~/types/photo'

interface GetPhotosResponse {
    status_code?: number,
    status: string,
    message: string,
    page: number,
    limit: number,
    total: number,
    data: Photo[]  
}

export const usePhotos = () => {
  const getPhotos = async ({
    page = 1,
    limit = 25,
    outlet_id = null,
    event_id = null,
    name = null,
    date_from = null,
    date_to = null,
  }: {
    page?: number
    limit?: number
    outlet_id?: string | null
    event_id?: string | null
    name?: string | null
    date_from?: string | null
    date_to?: string | null
  }): Promise<GetPhotosResponse> => {
    const params: any = { page, limit }
    if (outlet_id) params.outlet_id = outlet_id
    if (event_id) params.event_id = event_id
    if (name) params.name = name
    if (date_from) params.date_from = date_from
    if (date_to) params.date_to = date_to
    
    const response = await authFetch('/photos/', {        
      method: 'GET',        
      params
    }) as GetPhotosResponse
    return response
  }

  const deletePhotoById = async (id: string) => {
    const response = await authFetch(`photos/${id}`, {      
      method: 'DELETE',      
    })

    return response
  }

  return {
    getPhotos,
    deletePhotoById
  }
}