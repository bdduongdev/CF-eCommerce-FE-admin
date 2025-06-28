export interface Banner {
  _id: string;
  title?: string;
  image_url: string;
  link_url?: string;
  position?: string;
  is_active: boolean;
  start_date?: string;
  end_date?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface BannerResponse {
  success: boolean;
  message: string;
  data: {
    banners: Banner[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface SingleBannerResponse {
  success: boolean;
  message: string;
  data: Banner;
}

export interface CreateBannerData {
  title?: string;
  image_url: string;
  link_url?: string;
  position?: string;
  is_active?: boolean;
  start_date?: string;
  end_date?: string;
}

export interface UpdateBannerData {
  title?: string;
  image_url?: string;
  link_url?: string;
  position?: string;
  is_active?: boolean;
  start_date?: string;
  end_date?: string;
}

export interface BannerFilters {
  page?: number;
  limit?: number;
  is_active?: boolean;
  search?: string;
}

export interface BannerStats {
  total_banners: number;
  active_banners: number;
  inactive_banners: number;
  deleted_banners: number;
  banners_this_month: number;
} 