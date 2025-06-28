import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAllCategories,
  getTrashedCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  restoreCategory,
  type CreateCategoryData,
  type UpdateCategoryData
} from '../services/category/categoryService'

// Query keys
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (filters: { limit?: number; page?: number }) => [...categoryKeys.lists(), filters] as const,
  trashed: (filters: { limit?: number; page?: number }) => [...categoryKeys.all, 'trashed', filters] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
}

// Get all categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get trashed categories
export const useTrashedCategories = (params?: { limit?: number; page?: number }) => {
  return useQuery({
    queryKey: categoryKeys.trashed(params || {}),
    queryFn: () => getTrashedCategories(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get category by ID
export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  })
}

// Create category mutation
export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() })
    },
  })
}

// Update category mutation
export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryData }) => 
      updateCategory(id, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) })
    },
  })
}

// Delete category mutation
export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}

// Restore category mutation
export const useRestoreCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: restoreCategory,
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}
