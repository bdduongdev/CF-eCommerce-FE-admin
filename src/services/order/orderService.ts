import axios from '../../lib/axios'; 
import type { 
  OrderResponse, 
  SingleOrderResponse, 
  UpdateOrderStatusData, 
  OrderFilters 
} from '../../types/order/order.type';

// 🔹 Lấy đơn hàng của khách hàng (customer)
export const getCustomerOrders = async (filters: OrderFilters = {}): Promise<OrderResponse> => {
  const params = new URLSearchParams();
  
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.status) params.append('status', filters.status);

  const res = await axios.get(`/orders?${params.toString()}`);
  return res.data;
};

// 🔹 Lấy đơn hàng theo ID cho khách hàng
export const getOrderById = async (id: string): Promise<SingleOrderResponse> => {
  const res = await axios.get(`/orders/${id}`);
  return res.data;
};

// 🔹 Hủy đơn hàng (customer)
export const cancelOrder = async (id: string, reason: string): Promise<{ success: boolean; message: string }> => {
  const res = await axios.patch(`/orders/${id}/cancel`, { reason });
  return res.data;
};

// ✅ Lấy tất cả đơn hàng (admin)
export const getAllOrdersAdmin = async (filters: OrderFilters = {}): Promise<OrderResponse> => {
  const params = new URLSearchParams();
  
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.status) params.append('status', filters.status);
  if (filters.payment_status) params.append('payment_status', filters.payment_status);
  if (filters.payment_method) params.append('payment_method', filters.payment_method);
  if (filters.search) params.append('search', filters.search);
  if (filters.start_date) params.append('start_date', filters.start_date);
  if (filters.end_date) params.append('end_date', filters.end_date);
  if (filters.sort_by) params.append('sort_by', filters.sort_by);
  if (filters.sort_order) params.append('sort_order', filters.sort_order);

  // ❗ Đúng route admin
  const res = await axios.get(`/orders/admin/all?${params.toString()}`);
  return res.data;
};

// 🔹 Lấy chi tiết đơn hàng (admin)
export const getOrderByIdAdmin = async (id: string): Promise<SingleOrderResponse> => {
  const res = await axios.get(`/orders/admin/${id}`);
  return res.data;
};

// 🔹 Cập nhật trạng thái đơn hàng (admin)
export const updateOrderStatusAdmin = async (
  id: string,
  data: UpdateOrderStatusData
): Promise<{ success: boolean; message: string }> => {
  const res = await axios.patch(`/orders/admin/${id}/status`, data);
  return res.data;
};

// 🔹 Tạo đơn hàng từ giỏ hàng
export const createOrderFromCart = async (data: {
  shipping_address: any;
  payment_method: string;
  coupon_code?: string;
  note?: string;
}): Promise<SingleOrderResponse> => {
  const res = await axios.post('/orders/from-cart', data);
  return res.data;
};

// 🔹 Tạo đơn hàng trực tiếp
export const createOrderDirect = async (data: {
  variant_id: string;
  quantity: number;
  shipping_address: any;
  payment_method: string;
  note?: string;
}): Promise<SingleOrderResponse> => {
  const res = await axios.post('/orders/direct', data);
  return res.data;
};

// 🔹 Tạo đơn hàng chung
export const createOrder = async (data: {
  shipping_address: any;
  payment_method: string;
  note?: string;
  items: Array<{ product_variant_id: string; quantity: number }>;
}): Promise<SingleOrderResponse> => {
  const res = await axios.post('/orders', data);
  return res.data;
};

// 🔹 Hủy đơn hàng (admin)
export const cancelOrderAdmin = async (id: string, reason: string): Promise<{ success: boolean; message: string }> => {
  const res = await axios.patch(`/orders/admin/${id}/cancel`, { reason });
  return res.data;
};
