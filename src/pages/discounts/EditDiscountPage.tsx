import { useParams } from 'react-router-dom'
import DiscountForm from '../../components/discounts/DiscountForm'


export type DiscountFormData = {
  product_id: number
  discount_type: string
  discount_value: number
  start_date: string
  end_date: string
  description: string
}
export default function EditDiscountPage() {
  const { id } = useParams()

  // TODO: Replace with fetch from API
  const mockData: DiscountFormData = {
    product_id: 1,
    discount_type: 'percentage',
    discount_value: 10,
    start_date: '2025-06-01',
    end_date: '2025-06-10',
    description: 'Summer Deal'
  }

  const handleSubmit = (data: DiscountFormData) => {
    console.log('Update discount:', id, data)
    // TODO: PUT to API
  }

  return (
    <div className="mx-auto w-full max-w-6xl bg-white border rounded-xl shadow px-12 py-12">
      <h2 className="text-xl font-semibold mb-4">Edit Discount #{id}</h2>
      <DiscountForm initialData={mockData} onSubmit={handleSubmit} />
    </div>
  )
}
