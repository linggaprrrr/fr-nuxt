export interface Unit {
  id: string
  name: string
  location: string
  created_at: string
}

export interface GetUnitsResponse {
  data: Unit[]
  total: number
  page: number
  limit: number
}