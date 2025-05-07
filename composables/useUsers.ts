export const useUsers = () => {
    const config = useRuntimeConfig()
    const router = useRouter()
    

    const handleUnauthorized = () => {
      localStorage.removeItem('token')
      router.push('/login')
    }

    const getCurrentUser = async () => {                
        const token = import.meta.client ? localStorage.getItem('token') : null
        try {
            const data = await $fetch('users/me', {
            baseURL: config.public.apiBase,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            }
            })
        
            return data
        } catch (error: any) {
            if (error?.status_code === 401) handleUnauthorized()
            else throw error
        }
    }
      

    const getUsers = async ({
        page = 1, 
        limit = 25, 
        search = null
    }: {
        page?: number,
        limit?: number, 
        search?: string | null
    }) => {
        const token = import.meta.client ? localStorage.getItem('token') : null
        // queries
        const params: Record<string, any> = {           
            page,
            limit
        }

        if (search) {
            params.search = search
        }
        
        try {
            const data = await $fetch('users', {
                baseURL: config.public.apiBase,
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                params
            })

            if (data) {
                return data
            }
        } catch (error: any) {
            if (error?.status_code === 401) handleUnauthorized()
            else throw error         
        }
    }

    const getUserById = async (userId: string) => {    
        const token = import.meta.client ? localStorage.getItem('token') : null    
        try {
            const data = await $fetch(`users/${userId}`, {
                baseURL: config.public.apiBase,
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        
            return data
        } catch (error: any) {
            if (error?.status_code === 401) handleUnauthorized()
            else throw error
        }
      }
    
    const updateUserById = async (userId: string, payload: Record<string, any>) => {        
        const token = import.meta.client ? localStorage.getItem('token') : null
        try {
            const data = await $fetch(`users/${userId}`, {
                baseURL: config.public.apiBase,
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: payload
            })
        
            return data
        } catch (error: any) {
            if (error?.status_code === 401) handleUnauthorized()
            else throw error
        }
    }
      
    const deleteUserById = async (userId: string) => {        
        const token = import.meta.client ? localStorage.getItem('token') : null        
        try {
            const data = await $fetch(`users/${userId}`, {
                baseURL: config.public.apiBase,
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        
            return data
        } catch (error: any) {
            if (error?.status_code === 401) handleUnauthorized()
            else throw error
        }
    }
      
    return {
        getUsers,
        getUserById,
        updateUserById,
        deleteUserById,
        getCurrentUser
    }

}