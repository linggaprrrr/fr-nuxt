import type { GetUnitsResponse } from "@/types/unit"

export const useUnits = () => { 
    
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
        if (search) params.search = search

        const response = await authFetch<GetUnitsResponse>('units/', {
            method: 'GET',
            params
        })

        return response
    }


    const createUnit = async (data: any) => {        
        const response = await authFetch('units/', {            
            method: 'POST',            
            body: data
        })        
        return response
    }

  

    const deleteUnitById = async (id: string) => {
        const response = await authFetch(`units/${id}`, {            
            method: 'DELETE',            
        })
        return response
    }
    const getUnitById = async (id: string) => {
        const response = await authFetch(`units/${id}`, {            
            method: 'GET',                    
        })
        return response
    }

    const updateUnitById = async (id: string, data: any) => {
        const response = await authFetch(`units/${id}`, {            
            method: 'PUT',            
            body: data
        })
        return response
    }



    return {
      getUnits,
      createUnit,
      deleteUnitById,
      getUnitById,
      updateUnitById
    }
  }
