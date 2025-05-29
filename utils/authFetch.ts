
import { useRuntimeConfig } from '#imports'

const { refreshAuth, logout } = useAuth()

export const authFetch = async <T>(
  url: string,
  options: Omit<Parameters<typeof $fetch<T>>[1], 'headers'> = {}
): Promise<T> => {
  const config = useRuntimeConfig()

  const getAccessToken = () => {
    return import.meta.client ? localStorage.getItem('access_token') : null
  }

  const getHeaders = (token: string | null) => ({
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  })

  const accessToken = getAccessToken()

  
  if (!accessToken) {
    logout() 
    throw new Error('No access token')
  }

  try {
    return await $fetch<T>(url, {
      ...options,
      baseURL: config.public.apiBase,
      headers: getHeaders(accessToken)
    })
  } catch (error: any) {
    if (error?.status === 401) {
      const refreshed = await refreshAuth()
      if (refreshed) {
        const newAccessToken = getAccessToken()
        return await $fetch<T>(url, {
          ...options,
          baseURL: config.public.apiBase,
          headers: getHeaders(newAccessToken)
        })
      } else {
        logout()
        throw new Error('Unauthorized - token refresh failed')
      }
    } else {
      throw error
    }
  }
}
