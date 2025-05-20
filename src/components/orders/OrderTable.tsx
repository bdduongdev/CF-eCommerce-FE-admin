import StatusBadge from "./StatusBadge";

const orders = [
  {
    name: 'Janet Adebayo',
    date: '12 Aug 2022 - 12:25 am',
    type: 'Home Delivery',
    id: '9348fj73',
    total: '₦25,000.00',
    status: 'Completed' as const,
    action: 'Completed',
  },
  // ... thêm dữ liệu mẫu
];

export default function OrderTable() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
      <h3 className="font-semibold text-gray-700 mb-2">Customer Orders</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2 px-2"><input type="checkbox" /></th>
              <th className="py-2 px-2">Customer Name</th>
              <th className="py-2 px-2">Order Date</th>
              <th className="py-2 px-2">Order Type</th>
              <th className="py-2 px-2">Tracking ID</th>
              <th className="py-2 px-2">Order Total</th>
              <th className="py-2 px-2">Action</th>
              <th className="py-2 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2 px-2"><input type="checkbox" /></td>
                <td className="py-2 px-2">{order.name}</td>
                <td className="py-2 px-2">{order.date}</td>
                <td className="py-2 px-2">{order.type}</td>
                <td className="py-2 px-2">{order.id}</td>
                <td className="py-2 px-2">{order.total}</td>
                <td className="py-2 px-2">{order.action}</td>
                <td className="py-2 px-2"><StatusBadge status={order.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
