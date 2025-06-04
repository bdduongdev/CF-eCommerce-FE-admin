import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type Product = {
  product_name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: string;
  color_id: string;
  storage_id: string;
  image_url: string;
};

type Props = {
  initialData?: Product;
  onSubmit?: (data: Product) => void;
};

export default function EditProductForm({ initialData, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      product_name: '',
      description: '',
      price: 0,
      stock_quantity: 0,
      category_id: '',
      color_id: '',
      storage_id: '',
      image_url: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onFormSubmit = (data: Product) => {
    onSubmit?.(data);
    alert('Product updated successfully!');
  };

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <label className="text-sm block mb-1 font-medium text-gray-700 text-left">Product Name</label>
        <input
          type="text"
          {...register('product_name', { 
            required: 'Product name is required',
            maxLength: { value: 100, message: 'Product name must not exceed 100 characters' }
          })}
          className="w-full border rounded p-2 text-sm"
        />
        {errors.product_name && <p className="text-red-500 text-sm">{errors.product_name.message}</p>}
      </div>

      <div>
        <label className="text-sm block mb-1 font-medium text-gray-700 text-left">Category</label>
        <select
          {...register('category_id', { required: 'Category is required' })}
          className="w-full border rounded p-2 text-sm"
        >
          <option value="">Select Category</option>
          <option value="1">Gadgets</option>
          <option value="2">Accessories</option>
        </select>
        {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
      </div>

      <div>
        <label className="text-sm block mb-1 font-medium text-gray-700 text-left">Color</label>
        <select
          {...register('color_id', { required: 'Color is required' })}
          className="w-full border rounded p-2 text-sm"
        >
          <option value="">Select Color</option>
          <option value="1">Red</option>
          <option value="2">Blue</option>
        </select>
        {errors.color_id && <p className="text-red-500 text-sm">{errors.color_id.message}</p>}
      </div>

      <div>
        <label className="text-sm block mb-1 font-medium text-gray-700 text-left">Storage</label>
        <select
          {...register('storage_id', { required: 'Storage is required' })}
          className="w-full border rounded p-2 text-sm"
        >
          <option value="">Select Storage</option>
          <option value="1">64GB</option>
          <option value="2">128GB</option>
        </select>
        {errors.storage_id && <p className="text-red-500 text-sm">{errors.storage_id.message}</p>}
      </div>

      <div>
        <label className="text-sm block mb-1 font-medium text-gray-700 text-left">Price</label>
        <input
          type="number"
          step="0.01"
          {...register('price', { 
            required: 'Price is required',
            min: { value: 0, message: 'Price must be non-negative' }
          })}
          className="w-full border rounded p-2 text-sm"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div>
        <label className="text-sm block mb-1 font-medium text-gray-700 text-left">Stock Quantity</label>
        <input
          type="number"
          {...register('stock_quantity', { 
            required: 'Stock is required',
            min: { value: 0, message: 'Stock must be non-negative' }
          })}
          className="w-full border rounded p-2 text-sm"
        />
        {errors.stock_quantity && <p className="text-red-500 text-sm">{errors.stock_quantity.message}</p>}
      </div>

      <div>
        <label className="text-sm block mb-1 font-medium text-gray-700 text-left">Image URL</label>
        <input
          type="text"
          {...register('image_url', { 
            required: 'Image URL is required',
            maxLength: { value: 255, message: 'Image URL must not exceed 255 characters' }
          })}
          className="w-full border rounded p-2 text-sm"
        />
        {errors.image_url && <p className="text-red-500 text-sm">{errors.image_url.message}</p>}
      </div>

      <div>
        <label className="text-sm block mb-1 font-medium text-gray-700 text-left">Description</label>
        <textarea
          {...register('description')}
          className="w-full border rounded p-2 text-sm"
          rows={4}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}