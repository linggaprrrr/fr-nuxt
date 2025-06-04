import type { GetOutletsResponse } from "@/types/outlet"

export const useOutlets = () => { 
    
    const getOutlets = async ({
        page = 1,
        limit = 25,
        search = null
    }: {
        page?: number
        limit?: number
        search?: string | null
    }): Promise<GetOutletsResponse> => {
        const params: Record<string, any> = { page, limit }
        if (search) params.search = search

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



    return {
      getOutlets,
      createOutlet,
      deleteOutletById,
      getOutletById,
      getOutletsByUnit,
      updateOutletById
    }
  }
