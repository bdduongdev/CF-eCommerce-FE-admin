export interface OrderFilters {
  page?: number;
  limit?: number;
  status?: string;
  payment_status?: string;
  payment_method?: string;
  search?: string;
  start_date?: string;
  end_date?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    orders: Array<{
      _id: string;
      user_id: {
        _id: string;
        fullname: string;
        email: string;
        phone: string;
      };
      order_number: string;
      shipping_address: {
        fullname: string;
        phone: string;
        city: string;
        // Thêm các trường địa chỉ khác nếu cần
      };
      payment_method: string;
      subtotal: number;
      discount_amount: number;
      shipping_fee: number;
      total_amount: number;
      status: string;
      note?: string;
      coupon_id?: {
        _id: string;
        code: string;
        discount_value: number;
        discount_type: string;
      };
      created_at: string;
      updated_at?: string;
      delivered_at?: string;
      cancelled_at?: string;
      cancelled_reason?: string;
      tracking_number?: string;
      estimated_delivery?: string;
    }>;
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    stats?: {
      totalRevenue: number;
      totalOrders: number;
      averageOrderValue: number;
    };
  };
}

export interface SingleOrderResponse {
  success: boolean;
  message: string;
  data: {
    order: {
      _id: string;
      user_id: {
        _id: string;
        fullname: string;
        email: string;
        phone: string;
      };
      order_number: string;
      shipping_address: {
        fullname: string;
        phone: string;
        city: string;
        // Thêm các trường địa chỉ khác nếu cần
      };
      payment_method: string;
      subtotal: number;
      discount_amount: number;
      shipping_fee: number;
      total_amount: number;
      status: string;
      note?: string;
      coupon_id?: {
        _id: string;
        code: string;
        discount_value: number;
        discount_type: string;
      };
      created_at: string;
      updated_at?: string;
      delivered_at?: string;
      cancelled_at?: string;
      cancelled_reason?: string;
      tracking_number?: string;
      estimated_delivery?: string;
    };
    order_details: Array<{
      _id: string;
      order_id: string;
      product_variant_id: {
        _id: string;
        sku: string;
      };
      product_info: {
        product_name: string;
        color_name: string;
        storage_name: string;
        sku: string;
        image_url: string;
      };
      quantity: number;
      unit_price: number;
      total_price: number;
    }>;
  };
}

export interface UpdateOrderStatusData {
  status: string;
  note?: string;
  tracking_number?: string;
  estimated_delivery?: string;
  cancelled_reason?: string;
}

// Add Order type for FE usage (for admin order table, list, etc.)
export interface Order {
  _id: string;
  user_id: {
    _id: string;
    fullname: string;
    email: string;
    phone: string;
  };
  order_number: string;
  shipping_address: {
    fullname: string;
    phone: string;
    city: string;
    // Add more fields if needed
  };
  payment_method: string;
  payment_status?: string;
  subtotal: number;
  discount_amount: number;
  shipping_fee: number;
  total_amount: number;
  status: string;
  note?: string;
  coupon_id?: {
    _id: string;
    code: string;
    discount_value: number;
    discount_type: string;
  };
  created_at: string;
  updated_at?: string;
  delivered_at?: string;
  cancelled_at?: string;
  cancelled_reason?: string;
  tracking_number?: string;
  estimated_delivery?: string;
}