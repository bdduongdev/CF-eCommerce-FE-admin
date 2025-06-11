
import { useForm } from 'react-hook-form'

export type BannerFormData = {
  title: string
  image_url: string
  link_url: string
  position: string
  is_active: boolean
  start_date?: string
  end_date?: string
}

interface BannerFormProps {
  initialData?: BannerFormData
  onSubmit: (data: BannerFormData) => void
}

export default function BannerForm({ initialData, onSubmit }: BannerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BannerFormData>({
    defaultValues: initialData || {
      title: '',
      image_url: '',
      link_url: '',
      position: '',
      is_active: true,
      start_date: '',
      end_date: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title (optional)</label>
        <input
          {...register('title')}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          {...register('image_url', { required: 'Image URL is required' })}
          className="w-full border rounded px-3 py-2 text-sm"
        />
        {errors.image_url && (
          <p className="text-red-500 text-xs mt-1">{errors.image_url.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Link URL</label>
        <input
          {...register('link_url')}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Position</label>
        <select
          {...register('position')}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="">Select position</option>
          <option value="homepage_top">Homepage Top</option>
          <option value="sidebar">Sidebar</option>
          <option value="footer">Footer</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register('is_active')} />
        <label className="text-sm">Is Active</label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            {...register('start_date')}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            {...register('end_date')}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
        >
          Save Banner
        </button>
      </div>
    </form>
  )
}
