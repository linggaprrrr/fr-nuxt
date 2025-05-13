import type { GetUnitsResponse } from "@/types/unit"

export const useUnits = () => {
    const config = useRuntimeConfig()
    const router = useRouter()
    
    const handleUnauthorized = () => {
      localStorage.removeItem('token')
      router.push('/login')
    }

    const getUnits = async ({
        page = 1,
        limit = 25,
        search = null
    }: {
        page?: number
        limit?: number
        search?: string | null
    }): Promise<GetUnitsResponse> => {
        const params: Record<string, any> = { page, limit }
        if (search) {
            params.search = search
        }

        try {
            const data = await $fetch<GetUnitsResponse>('units/', {
            baseURL: config.public.apiBase,
            method: 'GET',
            params
            })
            return data
        } catch (error: any) {
            if (error?.status_code === 401) {
            handleUnauthorized()
            throw new Error('Unauthorized') // atau return Promise.reject('Unauthorized')
            } else {
                throw error
            }
        }
    }

    const createUnit = async (data: any) => {
        const token = import.meta.client ? localStorage.getItem('token') : null
        try {
            const response = await $fetch('units/', {
                baseURL: config.public.apiBase,
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                query: {
                    name: data.name,
                    location: data.location,
                }
            })
            console.log('Unit created:', response)
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

  

    const deleteUnitById = async (id: string) => {
        const token = import.meta.client ? localStorage.getItem('token') : null
        try {
            const response = await $fetch(`units/${id}`, {
                baseURL: config.public.apiBase,
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
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
    const getUnitById = async (id: string) => {
        const token = import.meta.client ? localStorage.getItem('token') : null
        try {
            const response = await $fetch(`units/${id}`, {
                baseURL: config.public.apiBase,
                method: 'GET',        
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
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

    const updateUnitById = async (id: string, data: any) => {
        const token = import.meta.client ? localStorage.getItem('token') : null
        try {
            const response = await $fetch(`units/${id}`, {
                baseURL: config.public.apiBase,
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: data
            })
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



    return {
      getUnits,
      createUnit,
      deleteUnitById,
      getUnitById,
      updateUnitById
    }
  }
