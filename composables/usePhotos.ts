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
  }: { page?: number; limit?: number; outlet_id?: string | null }): Promise<GetPhotosResponse> => {
    const params: any = { page, limit }
    if (outlet_id) {
      params.outlet_id = outlet_id
    }
    
    const response = await authFetch('/photos/', {        
      method: 'GET',        
      params
    }) as GetPhotosResponse
    console.log('getPhotos response:', response)
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