import { useForm } from 'react-hook-form';

type ProductFormData = {
  name: string;
  category: string;
  price: string;
  stock: string;
  discount: string;
  description: string;
  status: string;
};

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      category: '',
      price: '',
      stock: '',
      discount: '',
      description: '',
      status: 'Published',
    },
  });

  const onSubmit = (data: ProductFormData) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <input
        type="text"
        {...register('name', { required: 'Product name is required' })}
        placeholder="Product Name"
        className="w-full border rounded p-2 text-sm"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <input
        type="text"
        {...register('category', { required: 'Category is required' })}
        placeholder="Category"
        className="w-full border rounded p-2 text-sm"
      />
      {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

      <div className="flex gap-2">
        <input
          type="number"
          {...register('price', { required: 'Price is required' })}
          placeholder="Unit Price"
          className="flex-1 border rounded p-2 text-sm"
        />
        <input
          type="number"
          {...register('discount')}
          placeholder="Discount"
          className="flex-1 border rounded p-2 text-sm"
        />
      </div>
      {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

      <input
        type="number"
        {...register('stock', { required: 'Stock is required' })}
        placeholder="In-Stock Quantity"
        className="w-full border rounded p-2 text-sm"
      />
      {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}

      <select
        {...register('status')}
        className="w-full border rounded p-2 text-sm"
      >
        <option value="Published">Published</option>
        <option value="Unpublished">Unpublished</option>
      </select>

      <textarea
        {...register('description')}
        placeholder="Product Description"
        className="w-full border rounded p-2 text-sm"
        rows={4}
      />

      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm">
        Create Product
      </button>
    </form>
  );
}
