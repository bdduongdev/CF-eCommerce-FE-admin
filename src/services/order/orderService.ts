import axios from '../../lib/axios';
import type { 
  OrderResponse, 
  SingleOrderResponse, 
  UpdateOrderStatusData, 
  OrderFilters 
} from '../../types/order/order.type';

// Get all orders with filters (sử dụng API customer cho admin)
export const getAllOrders = async (filters: OrderFilters = {}): Promise<OrderResponse> => {
  const params = new URLSearchParams();
  
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.status) params.append('status', filters.status);

  const res = await axios.get(`/orders?${params.toString()}`);
  return res.data;
};

// Get order by ID
export const getOrderById = async (id: string): Promise<SingleOrderResponse> => {
  const res = await axios.get(`/orders/${id}`);
  return res.data;
};

// Update order status (có thể cần tạo API riêng cho admin)
export const updateOrderStatus = async (id: string, data: UpdateOrderStatusData): Promise<{ success: boolean; message: string }> => {
  // Tạm thời sử dụng endpoint customer, có thể cần tạo API admin riêng
  const res = await axios.patch(`/orders/${id}/status`, data);
  return res.data;
};

// Cancel order
export const cancelOrder = async (id: string, reason: string): Promise<{ success: boolean; message: string }> => {
  const res = await axios.patch(`/orders/${id}/cancel`, { reason });
  return res.data;
};

// Mock order statistics (vì không có API stats)
export const getOrderStats = async (): Promise<{
  success: boolean;
  message: string;
  data: {
    total_orders: number;
    pending_orders: number;
    confirmed_orders: number;
    processing_orders: number;
    shipped_orders: number;
    delivered_orders: number;
    cancelled_orders: number;
    total_revenue: number;
    today_revenue: number;
    this_month_revenue: number;
  };
}> => {
  // Mock data cho demo
  return {
    success: true,
    message: 'Lấy thống kê đơn hàng thành công',
    data: {
      total_orders: 25,
      pending_orders: 5,
      confirmed_orders: 3,
      processing_orders: 2,
      shipped_orders: 4,
      delivered_orders: 10,
      cancelled_orders: 1,
      total_revenue: 15000000,
      today_revenue: 500000,
      this_month_revenue: 8000000
    }
  };
}; 