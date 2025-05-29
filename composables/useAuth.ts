export const useAuth = () => {
  const config = useRuntimeConfig()
  


  const login = async (email: string, password: string) => {
    try {
      const data = await $fetch('/auth/login', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: { email, password }
      })

      if (isLoginResponse(data)) {
        const accessToken = data.access_token
        const refreshToken = data.refresh_token
        const user = data.user
        
        if (process.client && accessToken && user) {
          localStorage.setItem('access_token', accessToken)
          localStorage.setItem('refresh_token', refreshToken)
          localStorage.setItem('user', JSON.stringify(user))

          const userStr = JSON.stringify(user)
          if (userStr) {
            const parsedUser = JSON.parse(userStr) as { role: string }
    
            const path = parsedUser.role === 'superadmin' ? '/admin/dashboard' : '/photos'
            

            await navigateTo(path) 
          }
          
        }

      }
    } catch (err) {
      throw err
    }
  }

  const userRegister = async (fullname: string, email: string, password: string) => {
    try {
      const data = await $fetch('/auth/register', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: { fullname, email, password }
      })

      if (isLoginResponse(data)) {
        const accessToken = data.access_token
        const refreshToken = data.refresh_token
        const user = data.user        
        if (process.client && accessToken && user) {
        
          return navigateTo('/login')
        }
      }
    } catch (error) {
      
    }
  }

  const googleLogin = async (googleToken: string) => {
    try {
      const response = await $fetch('/auth/google-login', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: { token: googleToken }
      })
      
      if (isLoginResponse(response)) {
        const accessToken = response.access_token
        const refreshToken = response.refresh_token
        const user = response.user
        
        if (process.client && accessToken && user) {
          localStorage.setItem('access_token', accessToken)
          localStorage.setItem('refresh_token', refreshToken)
          localStorage.setItem('user', JSON.stringify(user))
          const userStr = JSON.stringify(user)
          if (userStr) {
            const user = JSON.parse(userStr) as { role: string };
    
            if (user.role === 'superadmin') {
              return navigateTo('/admin/dashboard')
            } else {
              return navigateTo('/photos')
            }
          }
          
        }

      }
    } catch (err) {
      console.error('Google login error:', err)
    }
  }
  
  const refreshAuth = async (): Promise<boolean> => {
    if (!import.meta.client) return false

    const refreshToken = localStorage.getItem('refresh_token')

    try {
      const response = await $fetch<{ access_token: string, refresh_token: string }>('/auth/refresh', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: {  'refresh_token': refreshToken }
      })

      if (response?.access_token && response?.refresh_token) {
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('refresh_token', response.refresh_token)
        return true
      }
      logout()
      return false
    } catch (error) {
      console.error('Failed to refresh token:', error)
      logout()
      return false
    }
  }
  
  function isLoginResponse(data: any): data is { access_token: string; refresh_token: string; user: { id: string; name: string; email: string } } {
    return typeof data.access_token === 'string' && typeof data.refresh_token === 'string' && typeof data.user === 'object'
  }

  const logout = () => {
    if (import.meta.client) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
      return navigateTo('/login')      
    }
  }

  const isAuthenticated = () => {
    if (process.client) {
      return !!localStorage.getItem('token')
    }
    return false
  }

  

  const getUser = () => {
    if (process.client) {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : null
    }
    return null
  }

  return {
    userRegister,
    login,
    logout,
    isAuthenticated,
    getUser,
    googleLogin,
    refreshAuth
  }
}
