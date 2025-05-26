import type { GetPhotoTypesResponse, GetPhotoPricesResponse} from "@/types/photo"
import { baseURL } from "process"



export const usePricings = () => {
  const config = useRuntimeConfig()
  const router = useRouter()


  const getPhotoTypes = async ({page=1, limit=25, search = null}: {
        page?: number
        limit?: number        
        search?: string | null
    }): Promise<GetPhotoTypesResponse> => {
    try {
       const params: Record<string, any> = { page, limit }
        if (search) {
            params.search = search
        }
      const data = await $fetch<GetPhotoTypesResponse>(`/photo_types/`, {
        baseURL: config.public.apiBase,
        method: 'GET',        
        params    
      })
      
      return data

    } catch (error) {
      throw error
    }
  }

  const getPhotoPrices = async ({page=1, limit=25, search=null}: {
    page?: number
    limit?: number
    search?: string | null
  }): Promise<GetPhotoPricesResponse> => {
    try {
       const params: Record<string, any> = { page, limit }
        if (search) {
            params.search = search
        }
      const data = await $fetch<GetPhotoPricesResponse>(`/photo_prices/`, {
        baseURL: config.public.apiBase,
        method: 'GET',        
        params    
      })
      
      return data

    } catch (error) {
      throw error
    }
  }

  const getPhotoPricesByUnit = async (unitId: string) => {
    try {
      const data = await $fetch(`/photo_prices/by-unit/${unitId}`, {
        baseURL: config.public.apiBase,
        method: 'GET',
        params: {
          unit_id: unitId,         
        },
      })
      return data
    } catch (error) {
      throw error
    }
  }

  const createPhotoPricing = async (data: any) => {
    try {
      const response = await $fetch(`/photo_prices/`, {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
      })
      
      return response
    } catch (error) {
      throw error
    }
  }

  const createPhotoType = async(data: any) => {
    try {
      const response = await $fetch(`/photo_types/`, {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
      })  
      return response
    } catch (error) {
      throw error
    }
  }

  const deletePhotoTypeById = async(id: string) => {
    try {
      const response = await $fetch(`/photo_types/${id}`, {
        baseURL: config.public.apiBase,
        method: 'DELETE'
      })
      return response
    } catch (error) {
      throw error
    }
  }

  const deletePhotoPriceById = async(id: string) => {
    try {
      const response = await $fetch(`/photo_prices/${id}`, {
        baseURL: config.public.apiBase,
        method: 'DELETE'
      })
      return response
    } catch (error) {
      throw error
    }
  }

  const getPhotoPriceById = async(id: string) => {
    try {
      const data = await $fetch(`/photo_prices/${id}`, {
        baseURL: config.public.apiBase,
        method: 'GET'
      })
      return data
    } catch (error) {
      throw error
    }
  }

  const updatePhotoPrice = async(id: string, data: any) => {
    try {
      const response = await $fetch(`/photo_prices/${id}`, {
        baseURL: config.public.apiBase,
        method: 'PUT',
        body: data
      })

      return response
    } catch (error) {
      throw error
    }
  }

  const getPhotoTypeById = async(id: string) => {
    try {
      const data = await $fetch(`/photo_types/${id}`, {
        baseURL: config.public.apiBase,
        method: 'GET'
      })
      return data
    } catch (error) {
      throw error      
    }
  }

   const updatePhotoType = async(id: string, data: any) => {
    try {
      const response = await $fetch(`/photo_types/${id}`, {
        baseURL: config.public.apiBase,
        method: 'PUT',
        body: data
      })
      return response
    } catch (error) {
      throw error
    }
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