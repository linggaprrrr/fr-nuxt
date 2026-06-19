export interface ConfirmOptions {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  tone?: 'danger' | 'primary'
  icon?: string
}

export interface ConfirmState extends Required<Omit<ConfirmOptions, 'icon'>> {
  open: boolean
  icon?: string
}

let _resolver: ((value: boolean) => void) | null = null

const DEFAULT_STATE = (): ConfirmState => ({
  open: false,
  title: 'Are you sure?',
  message: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  tone: 'primary',
})

/**
 * Promise-based confirmation dialog. Drop-in async replacement for window.confirm().
 *
 * Usage:
 *   const { confirm } = useConfirm()
 *   if (await confirm({ title: 'Delete outlet', message: 'This cannot be undone.', tone: 'danger' })) {
 *     // proceed
 *   }
 *
 * Requires <ConfirmDialog /> mounted once (app.vue).
 */
export function useConfirm() {
  const state = useState<ConfirmState>('app-confirm', DEFAULT_STATE)

  function confirm(options: ConfirmOptions | string): Promise<boolean> {
    const opts = typeof options === 'string' ? { message: options } : options
    state.value = {
      open: true,
      title: opts.title ?? 'Are you sure?',
      message: opts.message,
      confirmText: opts.confirmText ?? 'Confirm',
      cancelText: opts.cancelText ?? 'Cancel',
      tone: opts.tone ?? 'primary',
      icon: opts.icon,
    }
    return new Promise<boolean>((resolve) => {
      _resolver = resolve
    })
  }

  /** Internal: called by <ConfirmDialog /> to settle the promise. */
  function _close(result: boolean) {
    state.value = { ...state.value, open: false }
    _resolver?.(result)
    _resolver = null
  }

  return { state, confirm, _close }
}
