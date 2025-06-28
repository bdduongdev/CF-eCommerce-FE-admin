export interface Discount {
  _id: string;
  product_id: {
    _id: string;
    product_name: string;
  };
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  start_date: string;
  end_date: string;
  description?: string;
  created_at: string;
  is_active?: boolean;
}

export interface DiscountResponse {
  success: boolean;
  message: string;
  data: {
    discounts: Discount[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface SingleDiscountResponse {
  success: boolean;
  message: string;
  data: Discount;
}

export interface CreateDiscountData {
  product_id: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  start_date: string;
  end_date: string;
  description?: string;
}

export interface UpdateDiscountData extends Partial<CreateDiscountData> {
  is_active?: boolean;
}

export interface DiscountFilters {
  page?: number;
  limit?: number;
  product_id?: string;
  discount_type?: 'percentage' | 'fixed';
  is_active?: boolean;
  sort?: string;
}

export interface DiscountStats {
  total_discounts: number;
  active_discounts: number;
  percentage_discounts: number;
  fixed_discounts: number;
  total_savings: number;
  discounts_this_month: number;
} 