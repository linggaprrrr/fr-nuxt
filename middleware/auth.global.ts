export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie<string | null>('access_token').value
  const user = useCookie<{ role: string } | null>('user').value

  if (accessToken && to.path === '/login') {
    if (user) {
      if (user.role === 'superadmin') {
        return navigateTo('/admin/dashboard')
      } else if (user.role === 'unit') {
        return navigateTo('/units/dashboard')
      } else if (user.role === 'outlet') {
        return navigateTo('/outlets/dashboard')
      } else {
        return navigateTo('/photos')
      }
    }
  }

  // Jika belum login dan mencoba akses halaman lain
  if (!accessToken && to.path !== '/login') {
    return navigateTo('/login')
  }
})
