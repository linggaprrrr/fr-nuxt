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
  const config = useRuntimeConfig()
  const router = useRouter()

  const handleUnauthorized = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  const getPhotos = async ({
    page = 1,
    limit = 25,
  }: { page?: number; limit?: number }): Promise<GetPhotosResponse> => {
    const token = import.meta.client ? localStorage.getItem('token') : null

    try {
      const response = await $fetch('/photos/', {
        baseURL: config.public.apiBase,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page, limit }
      }) as GetPhotosResponse
      
      return response
    } catch (error: any) {
      if (error?.response?.data?.detail?.status_code === 401) {
        localStorage.removeItem('token')
        router.push('/login') 
        return Promise.reject(error) 
      } 
      throw error
    
    }
  }

  const deletePhotoById = async (id: string) => {
    const token = import.meta.client ? localStorage.getItem('token') : null

    try {
      return await $fetch(`photos/${id}`, {
        baseURL: config.public.apiBase,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    } catch (error: any) {
      if (error?.response?.data?.detail?.status_code === 401) {
        localStorage.removeItem('token')
        router.push('/login') 
        return Promise.reject(error) 
      }
    }
  }

  return {
    getPhotos,
    deletePhotoById
  }
}
