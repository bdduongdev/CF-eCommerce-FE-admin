import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllVariants,
  getVariantById,
  createVariant,
  updateVariant,
  deleteVariant,
  restoreVariant
} from '../services/product/variantService';

export const variantKeys = {
  all: ['variants'] as const,
  lists: () => [...variantKeys.all, 'list'] as const,
  list: (productId: string) => [...variantKeys.lists(), productId] as const,
  details: () => [...variantKeys.all, 'detail'] as const,
  detail: (id: string) => [...variantKeys.details(), id] as const,
};

export const useVariants = (productId: string) => {
  return useQuery({
    queryKey: variantKeys.list(productId),
    queryFn: () => getAllVariants(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useVariant = (id: string) => {
  return useQuery({
    queryKey: variantKeys.detail(id),
    queryFn: () => getVariantById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVariant,
    onSuccess: (_data, variables) => {
      if (variables?.product_id) {
        queryClient.invalidateQueries({ queryKey: variantKeys.list(variables.product_id) });
      }
    },
  });
};

export const useUpdateVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateVariant(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: variantKeys.detail(variables.id) });
      if (variables?.data?.product_id) {
        queryClient.invalidateQueries({ queryKey: variantKeys.list(variables.data.product_id) });
      }
    },
  });
};

export const useDeleteVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVariant,
    onSuccess: (_data, id) => {
      // Invalidate all lists (could be improved if product_id is known)
      queryClient.invalidateQueries({ queryKey: variantKeys.lists() });
    },
  });
};

export const useRestoreVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restoreVariant,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: variantKeys.lists() });
    },
  });
}; 