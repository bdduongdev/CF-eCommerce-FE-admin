import axios from '../../lib/axios'

export interface Category {
  _id: string
  category_name: string
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export interface CreateCategoryData {
  category_name: string
}

export interface UpdateCategoryData {
  category_name: string
}

export interface CategoryResponse {
  success: boolean
  data: {
    categories: Category[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }
  message: string
}

export interface SingleCategoryResponse {
  success: boolean
  data: Category
  message: string
}

// Get all categories
export const getAllCategories = async (params?: { limit?: number; page?: number }): Promise<CategoryResponse> => {
  const res = await axios.get('/categories', { params })
  return res.data
}

// Get trashed categories
export const getTrashedCategories = async (params?: { limit?: number; page?: number }): Promise<CategoryResponse> => {
  const res = await axios.get('/categories/trashed', { params })
  return res.data
}

// Get category by ID
export const getCategoryById = async (id: string): Promise<SingleCategoryResponse> => {
  const res = await axios.get(`/categories/detail/${id}`)
  return res.data
}

// Create new category
export const createCategory = async (data: CreateCategoryData): Promise<SingleCategoryResponse> => {
  const res = await axios.post('/categories/create', data)
  return res.data
}

// Update category
export const updateCategory = async (id: string, data: UpdateCategoryData): Promise<SingleCategoryResponse> => {
  const res = await axios.put(`/categories/update/${id}`, data)
  return res.data
}

// Delete category (soft delete)
export const deleteCategory = async (id: string): Promise<{ success: boolean; message: string }> => {
  const res = await axios.delete(`/categories/delete/${id}`)
  return res.data
}

// Restore category
export const restoreCategory = async (id: string): Promise<{ success: boolean; message: string }> => {
  const res = await axios.put(`/categories/restore/${id}`)
  return res.data
} 