
import CategoryForm from '../../components/category/CategoryForm';

export default function AddCategoryPage() {
  return (
    <div className="flex">

      <main className="flex-1 p-6 bg-gray-50 min-h-screen">

        <h1 className="text-xl font-semibold mb-4">Add Category</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <CategoryForm />
        </div>
      </main>
    </div>
  );
}
