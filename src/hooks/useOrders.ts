import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAllOrders, 
  getOrderById, 
  cancelOrder, 
  getOrderStats 
} from '../services/order/orderService';
import type { OrderFilters } from '../types/order/order.type';

// Get all orders
export const useOrders = (filters: OrderFilters = {}) => {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: () => getAllOrders(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3, // Retry 3 times on failure
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    onError: (error) => {
      console.error('useOrders error:', error);
    },
    onSuccess: (data) => {
      console.log('useOrders success:', data);
    },
  });
};

// Get order by ID
export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onError: (error) => {
      console.error('useOrder error:', error);
    },
  });
};

// Get order statistics
export const useOrderStats = () => {
  return useQuery({
    queryKey: ['order-stats'],
    queryFn: () => getOrderStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onError: (error) => {
      console.error('useOrderStats error:', error);
    },
  });
};

// Cancel order
export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => 
      cancelOrder(id, reason),
    onSuccess: () => {
      // Invalidate and refetch orders
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order-stats'] });
    },
    onError: (error) => {
      console.error('useCancelOrder error:', error);
    },
  });
}; 