import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

// Mock data for related tables
const users = [
  { user_id: 1, username: 'Janet Adebayo' },
  { user_id: 2, username: 'John Smith' },
];
const coupons = [
  { coupon_id: 1, code: 'SALE10' },
  { coupon_id: 2, code: 'FREESHIP' },
];

const orders = [
  {
    order_id: 1,
    user_id: 1,
    coupon_id: 1,
    order_date: '2022-08-12T00:25:00Z',
    total_amount: 25000.00,
    status: 'Completed',
  },
  {
    order_id: 2,
    user_id: 2,
    coupon_id: 2,
    order_date: '2022-08-13T14:30:00Z',
    total_amount: 15000.00,
    status: 'Pending',
  },
];

export default function OrderTable() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-gray-800 font-medium">All Orders</h2>
        <Link
          to="/orders/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
        >
          + Create a New Order
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2 px-2"><input type="checkbox" /></th>
              <th className="py-2 px-2">Order ID</th>
              <th className="py-2 px-2">Customer</th>
              <th className="py-2 px-2">Coupon Code</th>
              <th className="py-2 px-2">Order Date</th>
              <th className="py-2 px-2">Total Amount</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-2"><input type="checkbox" /></td>
                <td className="py-2 px-2">{order.order_id}</td>
                <td className="py-2 px-2">{users.find(u => u.user_id === order.user_id)?.username || 'N/A'}</td>
                <td className="py-2 px-2">{coupons.find(c => c.coupon_id === order.coupon_id)?.code || 'N/A'}</td>
                <td className="py-2 px-2">{new Date(order.order_date).toLocaleString()}</td>
                <td className="py-2 px-2">₦{order.total_amount.toFixed(2)}</td>
                <td className="py-2 px-2"><StatusBadge status={order.status} /></td>
                <td className="py-2 px-2 space-x-2">
                  <Link
                    to={`/orders/edit/${order.order_id}`}
                    className="text-indigo-600 hover:underline text-xs"
                  >
                    Edit
                  </Link>
                  <button className="text-red-500 hover:underline text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}