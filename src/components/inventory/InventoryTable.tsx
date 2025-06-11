import { useState } from 'react'
import { Link } from 'react-router-dom'

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

const allProducts = [
  {
    product_id: 1,
    product_name: 'iPhone 13 Pro',
    price: 1225000.0,
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
    price: 125000.0,
    stock_quantity: 0,
    category_id: 2,
    color_id: 2,
    storage_id: 2,
    image_url: '/polo.png',
    created_at: '2025-06-02T12:00:00Z',
  },
];

export default function InventoryTable() {
  const [search, setSearch] = useState('')
  const [filterColor, setFilterColor] = useState('')
  const [filterStorage, setFilterStorage] = useState('')
  const [bulkFilter, setBulkFilter] = useState('')

  const filteredProducts = allProducts.filter((p) => {
    const matchesName = p.product_name.toLowerCase().includes(search.toLowerCase())
    const matchesColor = filterColor ? p.color_id === parseInt(filterColor) : true
    const matchesStorage = filterStorage ? p.storage_id === parseInt(filterStorage) : true
    const matchesStock =
      bulkFilter === 'in-stock'
        ? p.stock_quantity > 0
        : bulkFilter === 'out-of-stock'
        ? p.stock_quantity === 0
        : true

    return matchesName && matchesColor && matchesStorage && matchesStock
  })

  return (
    <div className="bg-white rounded-lg border mt-6">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-gray-800 font-medium">Inventory Items</h2>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          />
          <select
            value={filterColor}
            onChange={(e) => setFilterColor(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          >
            <option value="">All Colors</option>
            {colors.map((c) => (
              <option key={c.color_id} value={c.color_id}>
                {c.color_name}
              </option>
            ))}
          </select>
          <select
            value={filterStorage}
            onChange={(e) => setFilterStorage(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          >
            <option value="">All Storage</option>
            {storages.map((s) => (
              <option key={s.storage_id} value={s.storage_id}>
                {s.storage_name}
              </option>
            ))}
          </select>
          <Link
            to="/inventory/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
          >
            + Add a New Product
          </Link>
          <button className="border px-3 py-1 rounded text-sm">Filter</button>
          <select
            value={bulkFilter}
            onChange={(e) => setBulkFilter(e.target.value)}
            className="border px-3 py-1 rounded text-sm"
          >
            <option value="">Bulk Action ▾</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="p-3">
              <input type="checkbox" />
            </th>
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
          {filteredProducts.map((p) => (
            <tr key={p.product_id} className="border-t hover:bg-gray-50">
              <td className="p-3">
                <input type="checkbox" />
              </td>
              <td className="p-3">{p.product_id}</td>
              <td className="p-3 font-medium">{p.product_name}</td>
              <td className="p-3">
                {categories.find((c) => c.category_id === p.category_id)?.category_name || 'N/A'}
              </td>
              <td className="p-3">
                {colors.find((c) => c.color_id === p.color_id)?.color_name || 'N/A'}
              </td>
              <td className="p-3">
                {storages.find((s) => s.storage_id === p.storage_id)?.storage_name || 'N/A'}
              </td>
              <td className="p-3">₦{p.price.toFixed(2)}</td>
              <td className="p-3">
                {p.stock_quantity === 0 ? 'Out of Stock' : p.stock_quantity}
              </td>
              <td className="p-3">
                <img
                  src={p.image_url}
                  alt={p.product_name}
                  className="w-8 h-8 rounded object-cover"
                />
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
  )
}
