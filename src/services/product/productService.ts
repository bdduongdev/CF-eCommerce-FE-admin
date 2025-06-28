import axios from '../../lib/axios'
import type { ProductListResponse, ProductDetailResponse } from '../../types/product/product.type'

// Lấy danh sách sản phẩm
export const getAllProducts = async (params?: any): Promise<ProductListResponse> => {
  const res = await axios.get('/products', { params })
  return res.data
}

// Lấy chi tiết sản phẩm
export const getProductById = async (id: string): Promise<ProductDetailResponse> => {
  const res = await axios.get(`/products/show/${id}`)
  return res.data
}

// Tạo sản phẩm mới (form-data)
export const createProduct = async (formData: FormData): Promise<ProductDetailResponse> => {
  const res = await axios.post('/products/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

// Cập nhật sản phẩm (form-data)
export const updateProduct = async (id: string, formData: FormData): Promise<ProductDetailResponse> => {
  const res = await axios.put(`/products/update/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

// Xóa mềm sản phẩm
export const deleteProduct = async (id: string): Promise<{ success: boolean; message: string }> => {
  const res = await axios.delete(`/products/delete/${id}`)
  return res.data
}

// Lấy danh sách sản phẩm đã xóa
export const getTrashedProducts = async (params?: any): Promise<ProductListResponse> => {
  const res = await axios.get('/products/trashed', { params })
  return res.data
}

// Khôi phục sản phẩm đã xóa
export const restoreProduct = async (id: string): Promise<{ success: boolean; message: string }> => {
  const res = await axios.put(`/products/restore/${id}`)
  return res.data
} 