import { useQuery } from '@tanstack/react-query'
import axios from '../lib/axios'

export interface Color {
  _id: string
  color_name: string
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export interface ColorResponse {
  success: boolean
  data: {
    colors: Color[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }
  message: string
}

// Get all colors
export const getAllColors = async (): Promise<ColorResponse> => {
  const res = await axios.get('/colors')
  return res.data
}

export const useColors = () => {
  return useQuery({
    queryKey: ['colors'],
    queryFn: () => getAllColors(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
} 