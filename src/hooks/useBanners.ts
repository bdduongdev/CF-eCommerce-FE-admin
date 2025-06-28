import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAllBanners, 
  getTrashedBanners,
  getBannerById, 
  createBanner, 
  updateBanner, 
  deleteBanner, 
  restoreBanner, 
  toggleBannerStatus,
  getBannerStats 
} from '../services/banner/bannerService';
import type { BannerFilters, CreateBannerData, UpdateBannerData } from '../types/banner/banner.type';

// Get all banners
export const useBanners = (filters: BannerFilters = {}) => {
  return useQuery({
    queryKey: ['banners', filters],
    queryFn: () => getAllBanners(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get trashed banners
export const useTrashedBanners = (filters: BannerFilters = {}) => {
  return useQuery({
    queryKey: ['trashed-banners', filters],
    queryFn: () => getTrashedBanners(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get banner by ID
export const useBanner = (id: string) => {
  return useQuery({
    queryKey: ['banner', id],
    queryFn: () => getBannerById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get banner statistics
export const useBannerStats = () => {
  return useQuery({
    queryKey: ['banner-stats'],
    queryFn: () => getBannerStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create banner
export const useCreateBanner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateBannerData) => createBanner(data),
    onSuccess: () => {
      // Invalidate and refetch banners
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      queryClient.invalidateQueries({ queryKey: ['banner-stats'] });
    },
  });
};

// Update banner
export const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBannerData }) => 
      updateBanner(id, data),
    onSuccess: () => {
      // Invalidate and refetch banners
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      queryClient.invalidateQueries({ queryKey: ['banner-stats'] });
    },
  });
};

// Delete banner
export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteBanner(id),
    onSuccess: () => {
      // Invalidate and refetch banners
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      queryClient.invalidateQueries({ queryKey: ['trashed-banners'] });
      queryClient.invalidateQueries({ queryKey: ['banner-stats'] });
    },
  });
};

// Restore banner
export const useRestoreBanner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => restoreBanner(id),
    onSuccess: () => {
      // Invalidate and refetch banners
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      queryClient.invalidateQueries({ queryKey: ['trashed-banners'] });
      queryClient.invalidateQueries({ queryKey: ['banner-stats'] });
    },
  });
};

// Toggle banner status
export const useToggleBannerStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => toggleBannerStatus(id),
    onSuccess: () => {
      // Invalidate and refetch banners
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      queryClient.invalidateQueries({ queryKey: ['banner-stats'] });
    },
  });
}; 