import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateCategory, useUpdateCategory, useCategory } from '../../hooks/useCategories';
import { ArrowLeft } from 'lucide-react';

interface Props {
  categoryId?: string;
}

type FormData = {
  category_name: string;
};

export default function CategoryForm({ categoryId }: Props) {
  const navigate = useNavigate();
  const isEditMode = !!categoryId;

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

  // Fetch category data if editing
  const { data: categoryData, isLoading: isLoadingCategory } = useCategory(categoryId || '');

  // Mutations
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  useEffect(() => {
    if (categoryData?.data && isEditMode) {
      reset({
        category_name: categoryData.data.category_name,
      });
    }
  }, [categoryData, isEditMode, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditMode && categoryId) {
        await updateCategoryMutation.mutateAsync({ id: categoryId, data });
        alert('Category updated successfully!');
      } else {
        await createCategoryMutation.mutateAsync(data);
        alert('Category created successfully!');
      }
      navigate('/category');
    } catch (error: any) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  if (isEditMode && isLoadingCategory) {
    return (
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="mx-auto w-full max-w-6xl bg-white border rounded-xl shadow px-12 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading category...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="mx-auto w-full max-w-6xl bg-white border rounded-xl shadow px-12 py-12">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate('/category')}
            className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditMode ? 'Edit Category' : 'Add New Category'}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter category name"
              {...register('category_name', {
                required: 'Category name is required',
                maxLength: {
                  value: 50,
                  message: 'Category name must not exceed 50 characters',
                },
                minLength: {
                  value: 2,
                  message: 'Category name must be at least 2 characters',
                },
              })}
              className="w-full border px-4 py-2 rounded text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
            />
            {errors.category_name && (
              <p className="text-red-500 text-sm mt-1">{errors.category_name.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/category')}
              className="px-5 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
              disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
              className={`px-5 py-2 rounded text-sm text-white ${
                createCategoryMutation.isPending || updateCategoryMutation.isPending
                  ? 'bg-indigo-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {createCategoryMutation.isPending || updateCategoryMutation.isPending
                ? 'Saving...'
                : isEditMode
                ? 'Update Category'
                : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
