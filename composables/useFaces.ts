import axios from 'axios'


export const useFaces = () => {
    const config = useRuntimeConfig()
    const router = useRouter()


    const uploadImages = async (
      unit_id: string,
      type_id: string,
      files: File[],
      onProgress: (progress: number) => void
    ) => {
      const token = import.meta.client ? localStorage.getItem('token') : null

      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file)
      })

      try {
        const response = await axios.post(`${config.public.apiBase}/faces/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
           params: {
            unit_id: unit_id,
            photo_type_id: type_id,
            
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              onProgress(progress)
            }
          }
        })

        return response.data
      } catch (error: any) {
        if (error?.response?.status === 401) {
          localStorage.removeItem('token')
          router.push('/login')
        }
        console.error('Upload failed:', error)
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
          console.log('Fetched face search data:', data)
          
          return data
        } catch (error: any) {
          if (error?.response?.status === 401) {
                        
            localStorage.removeItem('token')
            router.push('/login') 
            return Promise.reject(error) 
          }
          console.error('Fetch error:', error?.response?.status)
        }
      }
      

    return {
        uploadImages,
        fetchFaceSearch
    }
}