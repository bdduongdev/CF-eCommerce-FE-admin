import { useState } from 'react'
import { Link } from 'react-router-dom'
import DiscountTable from '../../components/discounts/DiscountTable'
import DiscountToolbar from '../../components/discounts/DiscountToolbar'

const mockProducts = [
  { id: 1, name: 'iPhone 13 Pro' },
  { id: 2, name: 'Polo T-Shirt' },
]

const mockDiscounts = [
  {
    discount_id: 1,
    product_id: 1,
    discount_type: 'percentage',
    discount_value: 10,
    start_date: '2025-06-01',
    end_date: '2025-06-10',
    description: 'Summer Sale',
  },
  {
    discount_id: 2,
    product_id: 2,
    discount_type: 'fixed',
    discount_value: 50000,
    start_date: '2025-06-05',
    end_date: '2025-06-15',
    description: 'Clearance',
  },
]

export default function DiscountsPage() {
  const [search, setSearch] = useState('')

  const filtered = mockDiscounts.filter((d) => {
    const product = mockProducts.find((p) => p.id === d.product_id)
    return product?.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Discounts</h2>
        <Link
          to="/discounts/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
        >
          + Add Discount
        </Link>
      </div>

      <DiscountToolbar search={search} setSearch={setSearch} />
      <DiscountTable discounts={filtered} products={mockProducts} />
    </div>
  )
}
