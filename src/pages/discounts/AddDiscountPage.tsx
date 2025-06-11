import DiscountForm from '../../components/discounts/DiscountForm'

export type DiscountFormData = {
  product_id: number
  discount_type: string
  discount_value: number
  start_date: string
  end_date: string
  description: string
}
export default function AddDiscountPage() {
  const handleSubmit = (data: DiscountFormData) => {
    console.log('Create new discount:', data)
    // TODO: POST to API
  }

  return (
    <div className="mx-auto w-full max-w-6xl bg-white border rounded-xl shadow px-12 py-12">
      <h2 className="text-xl font-semibold mb-4">Add Discount</h2>
      <DiscountForm onSubmit={handleSubmit} />
    </div>
  )
}