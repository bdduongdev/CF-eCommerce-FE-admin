import { useOrdersAdmin } from '../../hooks/useOrders';
import StatusBadge from '../orders/StatusBadge';

const RecentOrders: React.FC = () => {
  const { data: ordersAdminData, isLoading } = useOrdersAdmin({ page: 1, limit: 5 });
  const orders = ordersAdminData?.data?.orders || [];

  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">Đang tải...</div>;
  }

  if (!orders.length) {
    return (
      <div className="bg-white p-6 rounded-lg border flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          🛍️
        </div>
        <p className="text-lg font-medium mb-1">Chưa có đơn hàng nào</p>
        <p className="text-sm text-gray-500 mb-4">Hãy thêm sản phẩm và bắt đầu bán để thấy đơn hàng ở đây.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow-sm w-full">
      <h3 className="font-semibold mb-2">Đơn hàng gần đây</h3>
      {orders.map((order) => (
        <div key={order._id} className="flex justify-between items-center py-2 border-b text-sm">
          <div className="flex flex-col gap-1">
            <span className="font-medium">#{order.order_number}</span>
            <span className="text-gray-500 text-xs">{order.user_id?.fullname || 'Ẩn tên'}</span>
          </div>
          <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total_amount)}</div>
          <div><StatusBadge status={order.status} /></div>
          <div className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString('vi-VN')}</div>
        </div>
      ))}
    </div>
  );
};

export default RecentOrders;
