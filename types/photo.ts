export interface Photo {
    id: string
    filename: string
    original_path: string
    thumbnail_path: string
    is_public: boolean
    uploaded_at: string
    bounding_boxes: Array<any>
    unit_price: number
    unit_name: string
    photo_type: string
  }

export interface PhotoType {
  id: string
  name: string
  description: string 
}
export interface GetPhotoTypesResponse {
  data: PhotoType[]
  total: number
  page: number
  limit: number
}




export interface PhotoPrice {
  id: string
  unit_name: string
  photo_type_name: string
  price: number
}

export interface GetPhotoPricesResponse {
  photo_prices: PhotoPrice[]
  total: number
  page: number
  limit: number
}