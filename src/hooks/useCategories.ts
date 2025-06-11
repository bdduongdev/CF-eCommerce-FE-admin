// src/hooks/useCategories.ts
import { useEffect, useState } from 'react'
import axios from 'axios'



export interface Category {
  _id: string;
  category_name: string;
  is_deleted: boolean;
  updated_at?: string;
}

export const useCategories = (showTrashed = false) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    setLoading(true)
    setError(null)
    try {
      const endpoint = showTrashed ? '/categories/trashed' : '/categories'
      const res = await axios.get(endpoint)

      // fallback an toàn nếu backend trả về khác định dạng
      const data = res?.data?.data?.categories || res?.data?.categories || res?.data || []
      if (!Array.isArray(data)) throw new Error('Dữ liệu danh mục không hợp lệ')

      setCategories(data)
    } catch (err: any) {
      console.error('Lỗi khi tải danh mục:', err)
      setError(err?.response?.data?.message || err.message || 'Lỗi tải danh mục')
      setCategories([]) // fallback rỗng để tránh map undefined
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [showTrashed])

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories
  }
}
