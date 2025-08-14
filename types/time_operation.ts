
export interface TimeOperation {
  id: string
  unit_id: string
  opening_time: string
  closing_time: string
  notes?: string
  is_active: boolean
  created_at: string
  unit_name?: string
  unit_code?: string
}

export interface TimeOperationCreate {
  unit_id: string
  opening_time: string
  closing_time: string
  notes?: string
  is_active?: boolean
}

export interface TimeOperationUpdate {
  opening_time?: string
  closing_time?: string
  notes?: string
  is_active?: boolean
}

export interface UnitStatus {
  unit_id: string
  unit_name: string
  is_open: boolean
  status: string
  current_time: string
  operating_hours: {
    opening_time: string
    closing_time: string
    notes?: string
  }
}

