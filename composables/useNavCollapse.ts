const STORAGE_KEY = 'nav_collapsed'

/**
 * Collapsed (icon-rail) state for the vertical nav.
 *
 * The theme already ships the styling — `.layout-vertical-nav-collapsed`
 * narrows the nav to $layout-vertical-nav-collapsed-width and pads the content
 * to match, and `.hovered` on the nav temporarily expands it. This only owns
 * the state: which class is on, and remembering it across reloads.
 */
export const useNavCollapse = () => {
  // useState so the navbar's toggle button, the layout wrapper and the nav
  // itself all read the same value — they live in three different components.
  const isNavCollapsed = useState<boolean>('nav-collapsed', () => false)

  // Client-only restore: the server has no localStorage, and guessing here
  // would render one width then snap to the other after hydration.
  onMounted(() => {
    isNavCollapsed.value = localStorage.getItem(STORAGE_KEY) === '1'
  })

  const toggleNavCollapse = () => {
    isNavCollapsed.value = !isNavCollapsed.value
    localStorage.setItem(STORAGE_KEY, isNavCollapsed.value ? '1' : '0')
  }

  return { isNavCollapsed, toggleNavCollapse }
}
