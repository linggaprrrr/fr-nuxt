
import { useRuntimeConfig } from '#imports'
import { createApiError, getApiErrorMessage, validateApiResponse } from '@/utils/apiHelpers'

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
    throw createApiError({ message: 'No access token available.', status: 401 })
  }

  const request = async (token: string | null) => {
    try {
      const response = await $fetch<T>(url, {
        ...options,
        baseURL: config.public.apiBase,
        headers: getHeaders(token)
      })

      return validateApiResponse(response)
    } catch (error: any) {
      if (error?.status === 401) {
        throw error
      }
      const errData = error?.data ?? error
      if (
        error?.status === 404 &&
        (errData?.message === 'User not found' || error?.data?.detail?.message === 'User not found')
      ) {
        logout()
        throw createApiError({ message: 'User not found. Session ended.', status: 404 })
      }
      throw createApiError({ message: getApiErrorMessage(error), status: error?.status, data: errData })
    }
  }

  try {
    return await request(accessToken)
  } catch (error: any) {
    if (error?.status === 401) {
      const refreshed = await refreshAuth()
      if (refreshed) {
        const newAccessToken = getAccessToken()
        return await request(newAccessToken)
      }
      logout()
      throw createApiError({ message: 'Unauthorized - token refresh failed.', status: 401 })
    }
    throw error
  }
}
