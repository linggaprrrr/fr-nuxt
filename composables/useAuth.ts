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
          router.push('/dashboard')
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
  }
}
