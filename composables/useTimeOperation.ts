
import type { TimeOperation, TimeOperationCreate, TimeOperationUpdate, UnitStatus } from "@/types/time_operation" 

export const useTimeOperation = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase
  const { refreshAuth, logout } = useAuth()
  
  // Helper function untuk handle API calls dengan token
  const apiCall = async <T>(url: string, options: any = {}): Promise<T> => {
    const token = import.meta.client ? localStorage.getItem('access_token') : null
    
    // Cek apakah token ada
    if (!token) {
      await navigateTo('/login')
      throw new Error('No access token')
    }
    
    try {
      return await $fetch<T>(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
    } catch (error: any) {
      // Jika token expired atau invalid (401)
      if (error.status === 401) {
        try {
          // Coba refresh token
          await refreshAuth()
          const newToken = import.meta.client ? localStorage.getItem('access_token') : null
          
          // Retry request dengan token baru
          if (newToken) {
            return await $fetch<T>(url, {
              ...options,
              headers: {
                ...options.headers,
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
              }
            })
          } else {
            throw new Error('No new token after refresh')
          }
          
        } catch (refreshError: any) {
          // Clear localStorage dan redirect ke login
          if (import.meta.client) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')
          }
          
          await logout()
          await navigateTo('/login')
          throw refreshError
        }
      }
      
      throw error
    }
  }

  // Get all time operations
  const getTimeOperations = async ({
     
  }) => {
    try {
  
      const data = await apiCall<TimeOperation[]>(`${baseURL}/time_operation/`)
      return data
    } catch (error) {
      console.error('Failed to fetch time operations:', error)
      throw error
    }
  }

  // Get time operation by ID
  const getTimeOperationById = async (id: string) => {
    try {
      const data = await apiCall<TimeOperation>(`${baseURL}/time_operation/${id}`)
      return data
    } catch (error) {
      console.error('Failed to fetch time operation:', error)
      throw error
    }
  }

  // Get time operation by unit ID
  const getTimeOperationByUnit = async (unitId: string) => {
    try {
      const data = await apiCall<TimeOperation>(`${baseURL}/time_operation/unit/${unitId}`)
      return data
    } catch (error) {
      console.error('Failed to fetch time operation for unit:', error)
      throw error
    }
  }

  // Create time operation
  const createTimeOperation = async (timeOperation: TimeOperationCreate) => {
    try {
      const data = await apiCall<TimeOperation>(`${baseURL}/time_operation`, {
        method: 'POST',
        body: timeOperation
      })
      return data
    } catch (error) {
      console.error('Failed to create time operation:', error)
      throw error
    }
  }

  // Update time operation
  const updateTimeOperation = async (id: string, timeOperation: TimeOperationUpdate) => {
    try {
      const data = await apiCall<TimeOperation>(`${baseURL}/time_operation/${id}`, {
        method: 'PUT',
        body: timeOperation
      })
      return data
    } catch (error) {
      console.error('Failed to update time operation:', error)
      throw error
    }
  }



  // Set unit hours (upsert)
  const setUnitHours = async (unitId: string, timeOperation: TimeOperationCreate) => {
    try {
      const data = await apiCall<TimeOperation>(`${baseURL}/time_operation/unit/${unitId}/set-hours`, {
        method: 'POST',
        body: timeOperation
      })
      return data
    } catch (error) {
      console.error('Failed to set unit hours:', error)
      throw error
    }
  }

  // Delete time operation (soft delete)
  const deleteTimeOperation = async (id: string) => {
    try {
      await apiCall(`${baseURL}/time_operation/${id}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.error('Failed to delete time operation:', error)
      throw error
    }
  }

  // Get unit current status
  const getUnitStatus = async (unitId: string) => {
    try {
      const data = await apiCall<UnitStatus>(`${baseURL}/time_operation/unit/${unitId}/current-status`)
      return data
    } catch (error) {
      console.error('Failed to get unit status:', error)
      throw error
    }
  }

  return {
    getTimeOperations,
    getTimeOperationById,
    getTimeOperationByUnit,
    createTimeOperation,
    updateTimeOperation,
    setUnitHours,
    deleteTimeOperation,
    getUnitStatus
  }
}
