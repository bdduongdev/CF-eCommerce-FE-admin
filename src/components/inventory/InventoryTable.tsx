import StatusBadge from './StatusBadge';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    image: '/iphone.png',
    name: 'iPhone 13 Pro',
    category: 'Gadgets',
    price: '₦1,225,000.00',
    stock: '8',
    discount: '₦0.00',
    total: '₦50,000.00',
    status: 'Published',
  },
  {
    id: 2,

    image: '/polo.png',
    name: 'Polo T-Shirt',
    category: 'Fashion',
    price: '₦125,000.00',
    stock: 'Out of Stock',
    discount: '₦0.00',
    total: '₦50,000.00',
    status: 'Unpublished',
  },
];

export default function InventoryTable() {
  return (
    <div className="bg-white rounded-lg border mt-6">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-gray-800 font-medium">Inventory Items</h2>
        <div className="flex gap-2">
          <input type="text" placeholder="Search" className="border px-2 py-1 rounded text-sm" />
          <button className="border px-3 py-1 rounded text-sm">Filter</button>
          <button className="border px-3 py-1 rounded text-sm">Share</button>
          <button className="border px-3 py-1 rounded text-sm">Bulk Action ▾</button>
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="p-3"><input type="checkbox" /></th>
            {/* <th className="p-3">STT</th> */}

            <th className="p-3">Product Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Unit Price</th>
            <th className="p-3">In-Stock</th>
            <th className="p-3">Discount</th>
            <th className="p-3">Total Value</th>
            <th className="p-3">Action</th>
            <th className="p-3">Status</th>
            <th className="p-3">!!</th>

          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50">
              <td className="p-3"><input type="checkbox" /></td>
              <td className="p-3 flex items-center gap-2">
                <img src={p.image} alt={p.name} className="w-8 h-8 rounded object-cover" />
                {p.name}
              </td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">{p.price}</td>
              <td className="p-3 text-gray-600">{p.stock}</td>
              <td className="p-3">{p.discount}</td>
              <td className="p-3">{p.total}</td>
              <td className="p-3">
                <select className="border rounded px-2 py-1 text-xs">
                  <option>{p.status === 'Published' ? 'Unpublish' : 'Publish'}</option>
                </select>
              </td>
              <td className="p-3">
                <StatusBadge status={p.status as 'Published' | 'Unpublished'} />
              </td>
              <td className="p-3">
                <Link
                  to={`/inventory/edit/${p.id}`}
                  className="text-xs text-indigo-600 underline hover:text-indigo-800"
                >
                  Edit
                </Link>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
