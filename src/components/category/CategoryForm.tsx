import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  categoryId?: string;
}

type FormData = {
  category_name: string;
};

export default function CategoryForm({ categoryId }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      category_name: '',
    },
  });

  useEffect(() => {
    if (categoryId) {
      const fetched = {
        category_name: 'Gadgets',
      };
      reset(fetched);
    }
  }, [categoryId, reset]);

  const onSubmit = (data: FormData) => {
    console.log(categoryId ? 'Update category' : 'Create category', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Category Name</label>
        <input
          type="text"
          placeholder="Category Name"
          {...register('category_name', { 
            required: 'Category name is required',
            maxLength: { value: 50, message: 'Category name must not exceed 50 characters' }
          })}
          className="w-full border p-2 rounded text-sm"
        />
        {errors.category_name && (
          <p className="text-red-500 text-sm">{errors.category_name.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
      >
        {categoryId ? 'Update Category' : 'Create Category'}
      </button>
    </form>
  );
}