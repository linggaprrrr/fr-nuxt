export interface EventTicket {
  id: string
  ticket_code: string
  event_name: string
  unit_id: string | null
  unit_name?: string
  valid_from: string | null
  valid_until: string | null
  is_active: boolean
  used_at: string | null
  created_at?: string
}

export interface GetEventTicketsResponse {
  data: EventTicket[]
  total: number
  page: number
  limit: number
}
