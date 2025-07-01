import axios from '../../lib/axios';
import type { 
  BannerResponse, 
  SingleBannerResponse, 
  CreateBannerData, 
  UpdateBannerData, 
  BannerFilters 
} from '../../types/banner/banner.type';

// Get all banners with filters
export const getAllBanners = async (filters: BannerFilters = {}): Promise<BannerResponse> => {
  const params = new URLSearchParams();
  
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.is_active !== undefined) params.append('is_active', filters.is_active.toString());

  const res = await axios.get(`/banners?${params.toString()}`);
  return res.data;
};

// Get trashed banners
export const getTrashedBanners = async (filters: BannerFilters = {}): Promise<BannerResponse> => {
  const params = new URLSearchParams();
  
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());

  const res = await axios.get(`/banners/trashed/all?${params.toString()}`);
  return res.data;
};

// Get banner by ID
export const getBannerById = async (id: string): Promise<SingleBannerResponse> => {
  const res = await axios.get(`/banners/${id}`);
  return res.data;
};

// Create new banner
export const createBanner = async (formData: FormData) => {
  const res = await axios.post('/banners', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

// Update banner
export const updateBanner = async (id: string, data: UpdateBannerData): Promise<SingleBannerResponse> => {
  const res = await axios.put(`/banners/${id}`, data);
  return res.data;
};

// Delete banner
export const deleteBanner = async (id: string): Promise<{ success: boolean; message: string }> => {
  const res = await axios.delete(`/banners/${id}`);
  return res.data;
};

// Restore banner
export const restoreBanner = async (id: string): Promise<{ success: boolean; message: string }> => {
  const res = await axios.patch(`/banners/${id}/restore`);
  return res.data;
};

// Toggle banner status
export const toggleBannerStatus = async (id: string): Promise<{ success: boolean; message: string }> => {
  const res = await axios.patch(`/banners/${id}/toggle-status`);
  return res.data;
};

// Mock banner statistics (vì không có API stats)
export const getBannerStats = async (): Promise<{
  success: boolean;
  message: string;
  data: {
    total_banners: number;
    active_banners: number;
    inactive_banners: number;
    deleted_banners: number;
    banners_this_month: number;
  };
}> => {
  // Mock data cho demo
  return {
    success: true,
    message: 'Lấy thống kê banner thành công',
    data: {
      total_banners: 25,
      active_banners: 18,
      inactive_banners: 7,
      deleted_banners: 5,
      banners_this_month: 8
    }
  };
}; 