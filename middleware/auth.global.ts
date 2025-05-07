export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('token')

    // Jika ada token, arahkan langsung ke halaman dashboard
    if (token && to.path === '/login') {
      return navigateTo('/dashboard')
    }

    // Jika tidak ada token dan bukan ke halaman login, arahkan ke halaman login
    if (!token && to.path !== '/login') {
      return navigateTo('/login')
    }
  }
})
