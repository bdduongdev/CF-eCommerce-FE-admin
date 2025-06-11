import { useForm } from 'react-hook-form'

export type DiscountFormData = {
  product_id: number
  discount_type: string
  discount_value: number
  start_date: string
  end_date: string
  description: string
}

type Props = {
  initialData?: DiscountFormData
  onSubmit: (data: DiscountFormData) => void
}

export default function DiscountForm({ initialData, onSubmit }: Props) {
  const { register, handleSubmit } = useForm<DiscountFormData>({
    defaultValues: initialData || {
      product_id: 1,
      discount_type: 'percentage',
      discount_value: 0,
      start_date: '',
      end_date: '',
      description: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Product ID</label>
        <input type="number" {...register('product_id')} className="w-full border p-2 rounded text-sm" required />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Discount Type</label>
        <select {...register('discount_type')} className="w-full border p-2 rounded text-sm">
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Discount Value</label>
        <input type="number" {...register('discount_value')} className="w-full border p-2 rounded text-sm" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input type="date" {...register('start_date')} className="w-full border p-2 rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input type="date" {...register('end_date')} className="w-full border p-2 rounded text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea {...register('description')} className="w-full border p-2 rounded text-sm" rows={3} />
      </div>

      <div className="text-right">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700">
          Save Discount
        </button>
      </div>
    </form>
  )
}
