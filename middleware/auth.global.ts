export default defineNuxtRouteMiddleware((to, from) => {
  
  if (import.meta.client) {

    
    const accessToken = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')
    const userStr = localStorage.getItem('user')
    
    if (accessToken && to.path === '/login') {
      if (userStr) {
        const user = JSON.parse(userStr) as { role: string }

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
  }
})
