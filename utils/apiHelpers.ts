export interface ApiErrorPayload {
  message: string
  status?: number
  data?: any
}

export const getApiErrorMessage = (error: any): string => {
  if (!error) return 'Unknown API error.'
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  if (error?.data?.message) return error.data.message
  if (error?.response?.data?.message) return error.response.data.message
  if (error?.statusText) return error.statusText
  return 'An unexpected API error occurred.'
}

export const createApiError = (payload: ApiErrorPayload): Error => {
  const error = new Error(payload.message)
  ;(error as any).status = payload.status
  ;(error as any).data = payload.data
  return error
}

export const validateApiResponse = <T>(response: T): T => {
  if (response && typeof response === 'object') {
    const resp: any = response
    if (resp.success === false) {
      throw createApiError({
        message: resp.message || 'Request failed.',
        status: resp.status_code ?? resp.status ?? undefined,
        data: resp
      })
    }

    if (typeof resp.status_code === 'number' && resp.status_code >= 400) {
      throw createApiError({
        message: resp.message || 'Request failed.',
        status: resp.status_code,
        data: resp
      })
    }

    if (typeof resp.status === 'string' && resp.status.toLowerCase() === 'error') {
      throw createApiError({
        message: resp.message || 'Request failed.',
        status: resp.status_code ?? undefined,
        data: resp
      })
    }
  }

  return response
}
