export interface Unit {
  id: string
  name: string
}

export interface Outlet {
  id: string
  name: string
  phone: string
  address: string
  kode_folder: string
  unit: Unit  
  created_at: string
}

export interface OutletList {
    id: string
    name: string
    address: string
    phone: string
    kode_folder: string
    unit: string
    created_at: string
}

export interface GetOutletsResponse {
  data: Outlet[]
  total: number
  page: number
  limit: number
}

export interface GetOutletsByUnitResponse {
  status_code: number
  status: string
  message: string
  outlets: OutletList[]
}