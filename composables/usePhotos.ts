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
  }: { page?: number; limit?: number }): Promise<GetPhotosResponse> => {
    const response = await authFetch('/photos/', {        
      method: 'GET',        
      params: { page, limit }
    }) as GetPhotosResponse
    
    return response
  }

  const deletePhotoById = async (id: string) => {
    const response =  await authFetch(`photos/${id}`, {      
      method: 'DELETE',      
    })

    return response
  }

  return {
    getPhotos,
    deletePhotoById
  }
}
