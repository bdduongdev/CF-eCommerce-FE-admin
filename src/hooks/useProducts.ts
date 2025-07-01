import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTrashedProducts,
  restoreProduct
} from '../services/product/productService'
import type { ProductListResponse, ProductDetailResponse } from '../types/product/product.type'

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: any) => [...productKeys.lists(), filters] as const,
  trashed: (filters: any) => [...productKeys.all, 'trashed', filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
}

export const useProducts = (params?: any) => {
  return useQuery<ProductListResponse, Error>({
    queryKey: productKeys.list(params || {}),
    queryFn: () => getAllProducts(params),
    staleTime: 5 * 60 * 1000,
  })
}

export const useProduct = (id: string) => {
  return useQuery<ProductDetailResponse, Error>({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => updateProduct(id, formData),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) })
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}

export const useTrashedProducts = (params?: any) => {
  return useQuery<ProductListResponse, Error>({
    queryKey: productKeys.trashed(params || {}),
    queryFn: () => getTrashedProducts(params),
    staleTime: 5 * 60 * 1000,
  })
}

export const useRestoreProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: restoreProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}