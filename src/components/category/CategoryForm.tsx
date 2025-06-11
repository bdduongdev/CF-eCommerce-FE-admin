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
      // Giả lập fetch API
      const fetched = {
        category_name: 'Gadgets',
      };
      reset(fetched);
    }
  }, [categoryId, reset]);

  const onSubmit = (data: FormData) => {
    console.log(categoryId ? 'Update category' : 'Create category', data);
    // TODO: Gọi API tương ứng
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="mx-auto w-full max-w-6xl bg-white border rounded-xl shadow px-12 py-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          {categoryId ? 'Edit Category' : 'Add New Category'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              placeholder="Enter category name"
              {...register('category_name', {
                required: 'Category name is required',
                maxLength: {
                  value: 50,
                  message: 'Category name must not exceed 50 characters',
                },
              })}
              className="w-full border px-4 py-2 rounded text-sm focus:ring-2 focus:ring-indigo-500"
            />
            {errors.category_name && (
              <p className="text-red-500 text-sm mt-1">{errors.category_name.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 text-sm"
            >
              {categoryId ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
