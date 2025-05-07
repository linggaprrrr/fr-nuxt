export interface Photo {
    id: string
    filename: string
    original_path: string
    thumbnail_path: string
    is_public: boolean
    uploaded_at: string
    bounding_boxes: Array<any>  // Replace `any` with a proper type if needed
  }