export type ToastColor = 'success' | 'error' | 'warning' | 'info'

export interface ToastItem {
  id: number
  message: string
  color: ToastColor
  timeout: number
}

let _id = 0

/**
 * App-wide toast/notification system.
 * Replaces native alert() with consistent, non-blocking feedback.
 *
 * Usage:
 *   const toast = useToast()
 *   toast.success('Saved successfully')
 *   toast.error(getApiErrorMessage(error))
 */
export function useToast() {
  const toasts = useState<ToastItem[]>('app-toasts', () => [])

  function remove(id: number) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  function show(message: string, color: ToastColor = 'info', timeout = 4000) {
    const id = ++_id
    toasts.value = [...toasts.value, { id, message, color, timeout }]
    if (import.meta.client && timeout > 0)
      window.setTimeout(() => remove(id), timeout)

    return id
  }

  return {
    toasts,
    show,
    remove,
    success: (message: string, timeout?: number) => show(message, 'success', timeout),
    error: (message: string, timeout = 6000) => show(message, 'error', timeout),
    warning: (message: string, timeout?: number) => show(message, 'warning', timeout),
    info: (message: string, timeout?: number) => show(message, 'info', timeout),
  }
}
