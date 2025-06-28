import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCreateProduct } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import { useColors } from '../../hooks/useColors'
import { useStorages } from '../../hooks/useStorages'
import { ArrowLeft, Upload } from 'lucide-react'
import { useState } from 'react'

export type ProductFormData = {
  product_name: string
  description?: string
  price: number
  category_id: string
  color_id: string
  storage_id: string
  status: string
}

export default function AddProductForm() {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      status: 'active'
    }
  })

  const createProductMutation = useCreateProduct()
  const { data: categoriesData } = useCategories()
  const { data: colorsData } = useColors()
  const { data: storagesData } = useStorages()

  const categories = categoriesData?.data?.categories || []
  const colors = colorsData?.data?.colors || []
  const storages = storagesData?.data?.storages || []

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData()

      // Add form fields
      formData.append('product_name', data.product_name)
      formData.append('description', data.description || '')
      formData.append('price', data.price.toString())
      formData.append('category_id', data.category_id)
      formData.append('color_id', data.color_id)
      formData.append('storage_id', data.storage_id)
      formData.append('status', data.status)

      // Add image if selected
      if (selectedImage) {
        formData.append('image', selectedImage)
      }

      await createProductMutation.mutateAsync(formData)
      alert('Product created successfully!')
      navigate('/inventory')
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create product')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/inventory')}
                className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('product_name', {
                  required: 'Product name is required',
                  minLength: { value: 2, message: 'Product name must be at least 2 characters' }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                placeholder="Enter product name"
              />
              {errors.product_name && <p className="text-red-500 text-sm mt-1">{errors.product_name.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                {...register('description')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                rows={3}
                placeholder="Enter product description"
              />
            </div>

            {/* Price and Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('price', {
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                  placeholder="0.00"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('status', { required: 'Status is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
              </div>
            </div>

            {/* Category, Color, Storage */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('category_id', { required: 'Category is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
                {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('color_id', { required: 'Color is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="">-- Select Color --</option>
                  {colors.map((color) => (
                    <option key={color._id} value={color._id}>
                      {color.color_name}
                    </option>
                  ))}
                </select>
                {errors.color_id && <p className="text-red-500 text-sm mt-1">{errors.color_id.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Storage <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('storage_id', { required: 'Storage is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="">-- Select Storage --</option>
                  {storages.map((storage) => (
                    <option key={storage._id} value={storage._id}>
                      {storage.storage_name}
                    </option>
                  ))}
                </select>
                {errors.storage_id && <p className="text-red-500 text-sm mt-1">{errors.storage_id.message}</p>}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </label>
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/inventory')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={createProductMutation.isPending}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createProductMutation.isPending}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${createProductMutation.isPending
                    ? 'bg-indigo-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
              >
                {createProductMutation.isPending ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
