export interface User {
  id: string
  name: string
  email: string
  role: string
  phone?: string
  address?: string
  picture?: string
  created_at?: string
  email_verified?: boolean
  total_spent?: number
  is_active?: boolean
  unit_id?: string
}


export interface GetUsersResponse {
  data: User[]
  total: number
  page: number
  limit: number
}
