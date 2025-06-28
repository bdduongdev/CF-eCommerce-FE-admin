import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAllDiscounts, 
  getDiscountById,
  createDiscount, 
  updateDiscount,
  deleteDiscount,
  toggleDiscountStatus,
  getDiscountStats 
} from '../services/discount/discountService';
import type { DiscountFilters, CreateDiscountData, UpdateDiscountData } from '../types/discount/discount.type';

// Get all discounts
export const useDiscounts = (filters: DiscountFilters = {}) => {
  return useQuery({
    queryKey: ['discounts', filters],
    queryFn: () => getAllDiscounts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get discount by ID
export const useDiscountById = (id: string) => {
  return useQuery({
    queryKey: ['discount', id],
    queryFn: () => getDiscountById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get discount statistics
export const useDiscountStats = () => {
  return useQuery({
    queryKey: ['discount-stats'],
    queryFn: () => getDiscountStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create discount
export const useCreateDiscount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateDiscountData) => createDiscount(data),
    onSuccess: () => {
      // Invalidate and refetch discounts
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      queryClient.invalidateQueries({ queryKey: ['discount-stats'] });
    },
  });
};

// Update discount
export const useUpdateDiscount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDiscountData }) => 
      updateDiscount(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate and refetch discounts
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      queryClient.invalidateQueries({ queryKey: ['discount', id] });
      queryClient.invalidateQueries({ queryKey: ['discount-stats'] });
    },
  });
};

// Delete discount
export const useDeleteDiscount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteDiscount(id),
    onSuccess: () => {
      // Invalidate and refetch discounts
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      queryClient.invalidateQueries({ queryKey: ['discount-stats'] });
    },
  });
};

// Toggle discount status
export const useToggleDiscountStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => toggleDiscountStatus(id),
    onSuccess: (_, id) => {
      // Invalidate and refetch discounts
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      queryClient.invalidateQueries({ queryKey: ['discount', id] });
      queryClient.invalidateQueries({ queryKey: ['discount-stats'] });
    },
  });
}; 