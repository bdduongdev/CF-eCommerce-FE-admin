import { useQuery } from '@tanstack/react-query'
import axios from '../lib/axios'

export interface Storage {
  _id: string
  storage_name: string
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export interface StorageResponse {
  success: boolean
  data: {
    storages: Storage[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }
  message: string
}

// Get all storages
export const getAllStorages = async (): Promise<StorageResponse> => {
  const res = await axios.get('/storages')
  return res.data
}

export const useStorages = () => {
  return useQuery({
    queryKey: ['storages'],
    queryFn: () => getAllStorages(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
} 