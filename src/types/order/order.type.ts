export interface ShippingAddress {
  fullname: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  country?: string;
}

export interface ProductInfo {
  product_name: string;
  color_name: string;
  storage_name: string;
  sku: string;
  image_url: string;
}

export interface OrderDetail {
  _id: string;
  order_id: string;
  product_variant_id: string;
  product_info: ProductInfo;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
}

export interface Coupon {
  _id: string;
  code: string;
  discount_value: number;
  discount_type: 'percentage' | 'fixed';
}

export interface Order {
  _id: string;
  user_id: User;
  coupon_id?: Coupon;
  order_number: string;
  order_date: string;
  shipping_address: ShippingAddress;
  payment_method: 'cod' | 'bank_transfer' | 'credit_card' | 'momo' | 'vnpay';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  subtotal: number;
  discount_amount: number;
  shipping_fee: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  note?: string;
  tracking_number?: string;
  estimated_delivery?: string;
  delivered_at?: string;
  cancelled_at?: string;
  cancelled_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    orders: Order[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface SingleOrderResponse {
  success: boolean;
  message: string;
  data: {
    order: Order;
    order_details: OrderDetail[];
  };
}

export interface UpdateOrderStatusData {
  status: Order['status'];
  tracking_number?: string;
  estimated_delivery?: string;
  note?: string;
}

export interface OrderFilters {
  page?: number;
  limit?: number;
  status?: Order['status'];
  payment_status?: Order['payment_status'];
  payment_method?: Order['payment_method'];
  search?: string;
  start_date?: string;
  end_date?: string;
} 