export const useFaces = () => {
    const config = useRuntimeConfig()
    const router = useRouter()
    const uploadImages = async (files: File[], onProgress: (progress: number) => void) => {
      const token = import.meta.client ? localStorage.getItem('token') : null
      
      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file) // Use 'files' key to match expected backend field
      })
    
      try {
        const data = await $fetch('faces/upload', {
          baseURL: config.public.apiBase,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            // No need to set Content-Type when using FormData — browser will do it automatically
          },
          body: formData,
          onUploadProgress: (progressEvent: ProgressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              onProgress(progress) // Call the onProgress callback to update the UI
            }
          }
        })
    
        return data
      } catch (error: any) {
        if (error?.status_code === 401) {
          localStorage.removeItem('token')
          return navigateTo('/login')
        }
    
        console.error('Upload failed:', error)
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
        const token = import.meta.client ? localStorage.getItem('token') : null
        const userRaw = localStorage.getItem('user')
        const user = userRaw ? JSON.parse(userRaw) : null
        const userId = user?.id
      
        if (!userId || !token) {
          console.error('User or token missing')
          return navigateTo('/login')
        }
      
        // Bangun query params hanya jika ada startDate dan endDate
        const params: Record<string, any> = {
          user_id: userId,
          page,
          limit          
        }
      
        if (startDate) params.start_date = startDate
        if (endDate) params.end_date = endDate
      
        try {
          const data = await $fetch('/faces/search', {
            baseURL: config.public.apiBase,
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
            params,
          })
      
          return data
        } catch (error: any) {
          if (error?.status_code === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            return navigateTo('/login')
          }
          console.error('Fetch error:', error)
        }
      }
      

    return {
        uploadImages,
        fetchFaceSearch
    }
}