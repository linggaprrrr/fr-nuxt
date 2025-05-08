export interface BoundingBox {
    x: number;
    y: number;
    w: number;
    h: number;
  }
  
  export interface UserPhoto {
    id: number;
    score: number;
    is_reference: boolean;
    photo_face_id: string;
    photo_id: string;
    original_path: string;
    compressed_path: string;
    original_filename: string;
    bounding_box_db: BoundingBox;
    uploaded_at: string; // ISO date string
    is_choosen: boolean | null;
  }
  