export interface ProductVariant {
  _id: string
  product: {
    _id: string
    product_name: string
    slug: string
    description?: string
    image_url?: string
    image_gallery?: string[]
    category: {
      _id: string
      category_name: string
    }
    created_at: string
    updated_at: string
  }
  color: {
    _id: string
    color_name: string
    price: number
  }
  storage: {
    _id: string
    storage_name: string
    price: number
  }
  price: number
  total_price?: number
  status: string
  is_deleted: boolean
  created_at: string
  updated_at: string
  sku?: string
  stock_quantity?: number
  image_url?: string
  image_gallery?: string[]
}

export interface TrashedProduct {
  _id: string
  product_name: string
  slug: string
  description?: string
  image_url?: string
  image_gallery?: string[]
  category_id: {
    _id: string
    category_name: string
  }
  color_id: {
    _id: string
    color_name: string
    price: number
  }
  storage_id: {
    _id: string
    storage_name: string
    price: number
  }
  price: number
  total_price?: number
  status: string
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export interface ProductListResponse {
  success: boolean
  message: string
  data: {
    products: ProductVariant[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }
}

export interface ProductDetailResponse {
  success: boolean
  message: string
  data: ProductVariant
}
