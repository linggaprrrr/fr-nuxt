import axios from 'axios'


export const useFaces = () => {
    const config = useRuntimeConfig()
    
    const { refreshAuth, logout } = useAuth()

    const uploadImages = async (
      unit_id: string,
      outlet_id: string,
      type_id: string,
      files: File[],
      onProgress: (progress: number) => void,
      // Set for "Foto Event": the photos become free downloads on that event's
      // public page and never enter the paid flow. Omitted for normal uploads.
      event_id: string | null = null
    ) => {
      const tryUpload = async (token: string | null) => {
        const formData = new FormData()
        files.forEach(file => {
          formData.append('files', file)
        })

        // Omit empties rather than sending '' — the API types these as UUIDs,
        // so a blank string is a 422, not "unset". In event mode all three are
        // blank and the API derives them from the event.
        const params: Record<string, any> = {}
        if (unit_id) params.unit_id = unit_id
        if (outlet_id) params.outlet_id = outlet_id
        if (type_id) params.photo_type_id = type_id
        if (event_id) params.event_id = event_id

        return await axios.post(`${config.public.apiBase}/faces/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          params,
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