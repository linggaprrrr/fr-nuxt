export interface TransactionResponse {
  total: number
  page: number
  limit: number
  data: Transaction[]
}

export interface Transaction {
  id: string
  trx_code: string
  user: User
  photos: Photo[]
  unit: Unit
  price: number
  paid: boolean
  paid_at: string // ISO 8601 date string
  discount_id: string
  discount_amount: number
  promo_code_used: string
  final_price: number
  status: string
  created_at: string // ISO 8601 date string
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Photo {
  id: string
  filename: string
  original_url: string
}

export interface Unit {
  id: string
  name: string
  location: string
}
