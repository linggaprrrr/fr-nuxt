export const useAuth = () => {
  const config = useRuntimeConfig()
  const router = useRouter()


  const login = async (email: string, password: string) => {
    try {
      const data = await $fetch('/auth/login', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: { email, password }
      })

      if (isLoginResponse(data)) {
        const token = data.access_token
        const user = data.user
        
        if (process.client && token && user) {
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          const userStr = JSON.stringify(user)
          if (userStr) {
            const user = JSON.parse(userStr) as { role: string };
    
            if (user.role === 'superadmin') {
              router.push('/admin/dashboard')
            } else {
              router.push('/photos')
            }
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
        const token = data.access_token
        const user = data.user        
        if (process.client && token && user) {
        
          router.push('/login')
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

      const { user, access_token } = response

      if (!user.email_verified) {
        // Handle email not verified case (optional)
        return
      }
      console.log(response)
      if (process.client && access_token && user) {
        localStorage.setItem('token', access_token)
        localStorage.setItem('user', JSON.stringify(user))
        console.log(user)  
        const userStr = JSON.stringify(user)
          if (userStr) {
            const user = JSON.parse(userStr) as { role: string };
    
            if (user.role === 'superadmin') {
              router.push('/admin/dashboard')
            } else {
              router.push('/photos')
            }
          }
      }
    } catch (err) {
      console.error('Google login error:', err)
    }
  }


  
  function isLoginResponse(data: any): data is { access_token: string; user: { id: string; name: string; email: string } } {
    return typeof data.access_token === 'string' && typeof data.user === 'object'
  }

  const logout = () => {
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
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
    googleLogin
  }
}
