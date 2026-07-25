export interface Discount {
  id: string
  name: string
  description: string
  discount_type: 'percentage' | 'fixed'
  promo_code: string
  value: number
  start_date: string
  end_date: string
  is_active: boolean
  unit_id: string
  unit_name?: string
  max_uses?: number | null
  used_count?: number
  created_at?: string
}

export interface GetDiscountsResponse {
  data: Discount[]
  total: number
  page: number
  limit: number
}
