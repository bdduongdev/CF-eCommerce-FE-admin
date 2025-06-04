import { Link } from 'react-router-dom';

// Mock data for related tables
const categories = [
  { category_id: 1, category_name: 'Gadgets' },
  { category_id: 2, category_name: 'Fashion' },
];
const colors = [
  { color_id: 1, color_name: 'Blue' },
  { color_id: 2, color_name: 'Red' },
];
const storages = [
  { storage_id: 1, storage_name: '64GB' },
  { storage_id: 2, storage_name: '128GB' },
];

const products = [
  {
    product_id: 1,
    product_name: 'iPhone 13 Pro',
    price: 1225000.00,
    stock_quantity: 8,
    category_id: 1,
    color_id: 1,
    storage_id: 1,
    image_url: '/iphone.png',
    created_at: '2025-06-01T10:00:00Z',
  },
  {
    product_id: 2,
    product_name: 'Polo T-Shirt',
    price: 125000.00,
    stock_quantity: 0,
    category_id: 2,
    color_id: 2,
    storage_id: 2,
    image_url: '/polo.png',
    created_at: '2025-06-02T12:00:00Z',
  },
];

export default function InventoryTable() {
  return (
    <div className="bg-white rounded-lg border mt-6">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-gray-800 font-medium">Inventory Items</h2>
        <div className="flex gap-2">
          <input type="text" placeholder="Search" className="border px-2 py-1 rounded text-sm" />
          <Link
            to="/inventory/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
          >
            + Add a New Product
          </Link>
          <button className="border px-3 py-1 rounded text-sm">Filter</button>
          <button className="border px-3 py-1 rounded text-sm">Share</button>
          <button className="border px-3 py-1 rounded text-sm">Bulk Action ▾</button>
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="p-3"><input type="checkbox" /></th>
            <th className="p-3">ID</th>
            <th className="p-3">Product Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Color</th>
            <th className="p-3">Storage</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock Quantity</th>
            <th className="p-3">Image</th>
            <th className="p-3">Created At</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.product_id} className="border-t hover:bg-gray-50">
              <td className="p-3"><input type="checkbox" /></td>
              <td className="p-3">{p.product_id}</td>
              <td className="p-3 font-medium">{p.product_name}</td>
              <td className="p-3">{categories.find(c => c.category_id === p.category_id)?.category_name || 'N/A'}</td>
              <td className="p-3">{colors.find(c => c.color_id === p.color_id)?.color_name || 'N/A'}</td>
              <td className="p-3">{storages.find(s => s.storage_id === p.storage_id)?.storage_name || 'N/A'}</td>
              <td className="p-3">₦{p.price.toFixed(2)}</td>
              <td className="p-3">{p.stock_quantity === 0 ? 'Out of Stock' : p.stock_quantity}</td>
              <td className="p-3">
                <img src={p.image_url} alt={p.product_name} className="w-8 h-8 rounded object-cover" />
              </td>
              <td className="p-3">{new Date(p.created_at).toLocaleDateString()}</td>
              <td className="p-3 space-x-2">
                <Link
                  to={`/inventory/edit/${p.product_id}`}
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
  );
}