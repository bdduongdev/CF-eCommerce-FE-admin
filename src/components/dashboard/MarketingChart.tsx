import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useOrdersAdmin } from '../../hooks/useOrders';

const COLORS = ['#6366F1', '#FDBA74', '#FACC15', '#34D399', '#F87171', '#A78BFA', '#FBBF24'];

const STATUS_LABELS: Record<string, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipped: 'Đã gửi hàng',
  delivered: 'Đã giao hàng',
  cancelled: 'Đã hủy',
  returned: 'Đã hoàn trả',
};

export default function MarketingChart() {
  const { data: ordersAdminData } = useOrdersAdmin({ page: 1, limit: 100 });
  const orders = ordersAdminData?.data?.orders || [];

  // Đếm số lượng theo trạng thái
  const statusCount: Record<string, number> = {};
  orders.forEach(order => {
    statusCount[order.status] = (statusCount[order.status] || 0) + 1;
  });

  const chartData = Object.entries(statusCount).map(([status, value]) => ({
    name: STATUS_LABELS[status] || status,
    value,
  }));

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="text-sm text-gray-500 mb-2">Phân bố trạng thái đơn hàng</div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#6366F1"
            label
          >
            {chartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      {chartData.length === 0 && (
        <div className="text-center text-gray-400 mt-4">Không có dữ liệu đơn hàng</div>
      )}
    </div>
  );
}

