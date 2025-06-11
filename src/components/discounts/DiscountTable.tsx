import { Link } from 'react-router-dom'

interface Discount {
  discount_id: number
  product_id: number
  discount_type: string
  discount_value: number
  start_date: string
  end_date: string
  description: string
}

interface Product {
  id: number
  name: string
}

interface Props {
  discounts: Discount[]
  products: Product[]
}

export default function DiscountTable({ discounts, products }: Props) {
  return (
    <div className="bg-white border rounded-lg mt-6">
      <table className="w-full text-sm text-left border">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border">STT</th>
            <th className="p-3 border">Product</th>
            <th className="p-3 border">Type</th>
            <th className="p-3 border">Value</th>
            <th className="p-3 border">Start</th>
            <th className="p-3 border">End</th>
            <th className="p-3 border">Description</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((d, idx) => (
            <tr key={d.discount_id} className="border-t">
              <td className="p-3 border">{idx + 1}</td>
              <td className="p-3 border">{products.find((p) => p.id === d.product_id)?.name}</td>
              <td className="p-3 border capitalize">{d.discount_type}</td>
              <td className="p-3 border">
                {d.discount_type === 'percentage' ? `${d.discount_value}%` : `₦${d.discount_value}`}
              </td>
              <td className="p-3 border">{d.start_date}</td>
              <td className="p-3 border">{d.end_date}</td>
              <td className="p-3 border">{d.description}</td>
              <td className="p-3 border space-x-2">
                <Link to={`/discounts/edit/${d.discount_id}`} className="text-indigo-600 text-xs hover:underline">
                  Edit
                </Link>
                <button className="text-red-500 text-xs hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
