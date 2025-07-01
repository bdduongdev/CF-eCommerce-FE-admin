import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAllOrdersAdmin, 
  getOrderByIdAdmin, 
  updateOrderStatusAdmin,
  createOrder,
  createOrderFromCart,
  createOrderDirect,
  
} from '../services/order/orderService';
import type { OrderFilters, OrderResponse, SingleOrderResponse } from '../types/order/order.type';

// Lấy tất cả đơn hàng cho admin
export const useOrdersAdmin = (filters: OrderFilters = {}) => {
  return useQuery<OrderResponse, Error>({
    queryKey: ['orders-admin', filters],
    queryFn: () => getAllOrdersAdmin(filters),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Lấy đơn hàng theo ID cho admin
export const useOrderAdmin = (id: string) => {
  return useQuery<SingleOrderResponse, Error>({
    queryKey: ['order-admin', id],
    queryFn: () => getOrderByIdAdmin(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Cập nhật trạng thái đơn hàng cho admin
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { status: string; note?: string; tracking_number?: string; estimated_delivery?: string; cancelled_reason?: string } }) => 
      updateOrderStatusAdmin(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders-admin'] });
      queryClient.invalidateQueries({ queryKey: ['order-admin'] });
    },
    onError: (error) => {
      console.error('Lỗi useUpdateOrderStatus:', error);
    },
  });
};

// Cập nhật trạng thái đơn hàng cho admin
export const useUpdateOrderStatusAdmin = useUpdateOrderStatus;

// Tạo đơn hàng từ giỏ hàng (nếu cần cho admin)
export const useCreateOrderFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { shipping_address: any; payment_method: string; coupon_code?: string; note?: string }) => 
      createOrderFromCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders-admin'] });
    },
    onError: (error) => {
      console.error('Lỗi useCreateOrderFromCart:', error);
    },
  });
};

// Tạo đơn hàng trực tiếp (nếu cần cho admin)
export const useCreateOrderDirect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { variant_id: string; quantity: number; shipping_address: any; payment_method: string; note?: string }) => 
      createOrderDirect(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders-admin'] });
    },
    onError: (error) => {
      console.error('Lỗi useCreateOrderDirect:', error);
    },
  });
};

// Tạo đơn hàng chung (nếu cần cho admin)
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { shipping_address: any; payment_method: string; note?: string; items: Array<{ product_variant_id: string; quantity: number }> }) => 
      createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders-admin'] });
    },
    onError: (error) => {
      console.error('Lỗi useCreateOrder:', error);
    },
  });
};

// Hủy đơn hàng cho admin (dùng updateOrderStatusAdmin)
export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => {
      return updateOrderStatusAdmin(id, { status: 'cancelled', cancelled_reason: reason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders-admin'] });
      queryClient.invalidateQueries({ queryKey: ['order-admin'] });
    },
    onError: (error) => {
      console.error('Lỗi useCancelOrder:', error);
    },
  });
};

// useOrderStats trả về object giống useQuery để tránh lỗi destructure
export const useOrderStats = () => ({ data: undefined, isLoading: false, isError: false });

// Lấy tất cả đơn hàng cho admin
export const useOrders = useOrdersAdmin;
// Lấy đơn hàng theo ID cho admin
export const useOrder = useOrderAdmin;

// Khi lấy chi tiết đơn hàng, luôn lấy product_variant_id và product_info từ order_details
// Khi sử dụng dữ liệu, FE cần truy cập order_details.product_info để lấy thông tin variant