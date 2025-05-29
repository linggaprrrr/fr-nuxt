import axios from 'axios'


export const useFaces = () => {
    const config = useRuntimeConfig()
    
    const { refreshAuth, logout } = useAuth()

    const uploadImages = async (
      unit_id: string,
      type_id: string,
      files: File[],
      onProgress: (progress: number) => void
    ) => {
      const tryUpload = async (token: string | null) => {
        const formData = new FormData()
        files.forEach(file => {
          formData.append('files', file)
        })

        return await axios.post(`${config.public.apiBase}/faces/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          params: {
            unit_id,
            photo_type_id: type_id
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              onProgress(progress)
            }
          }
        })
      }

      let accessToken = import.meta.client ? localStorage.getItem('access_token') : null

      try {
        const response = await tryUpload(accessToken)
        return response.data
      } catch (error: any) {
        if (error?.response?.status === 401) {
          const refreshed = await refreshAuth()
          if (refreshed) {
            // Ambil token baru setelah refresh
            accessToken = localStorage.getItem('access_token')
            try {
              const response = await tryUpload(accessToken)
              return response.data
            } catch (err) {
              return Promise.reject(err)
            }
          } else {
            logout()
          }
        }
        return Promise.reject(error)
      }
    }
    
    const fetchFaceSearch = async ({
        page = 1,
        limit = 25,
        startDate = null,
        endDate = null, 
    }: {
        page?: number | null
        limit?: number | null
        startDate?: string | null
        endDate?: string | null
    }) => {        
        const userRaw = localStorage.getItem('user')
        const user = userRaw ? JSON.parse(userRaw) : null
        const userId = user?.id
            
        const params: Record<string, any> = {
          user_id: userId,
          page,
          limit          
        }
      
        if (startDate) params.start_date = startDate
        if (endDate) params.end_date = endDate
      
        const data = await authFetch('/faces/search', {            
          method: 'GET',            
          params,
        })        
        return data
      }
      

    return {
        uploadImages,
        fetchFaceSearch
    }
}