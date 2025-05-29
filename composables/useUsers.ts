import type { GetUsersResponse } from '@/types/user'

export const useUsers = () => {    
    const getCurrentUser = async () => {                
        const data = await authFetch('users/me', {        
            method: 'GET',        
        })    
        return data
    }

    const getUsers = async ({
        page = 1,
        limit = 25,
        search = null
    }: {
        page?: number
        limit?: number
        search?: string | null
    }): Promise<GetUsersResponse> => {        
        const params: Record<string, any> = { page, limit }
        if (search) {
            params.search = search
        }

        const data = await authFetch<GetUsersResponse>('users/', {            
            method: 'GET',            
            params
        })

        return data
    }

    
    const getUserById = async (userId: string) => {    
        const data = await authFetch(`users/${userId}`, {            
            method: 'GET',            
        })

        return data
      }
    
    const updateUserById = async (userId: string, payload: Record<string, any>) => {        
        const data = await authFetch(`users/${userId}`, {            
            method: 'PUT',            
            body: payload
        })    
        return data
    }
      
    const deleteUserById = async (userId: string) => {        
        const data = await authFetch(`users/${userId}`, {            
            method: 'DELETE',            
        })
    
        return data
    }
      
    return {
        getUsers,
        getUserById,
        updateUserById,
        deleteUserById,
        getCurrentUser
    }

}