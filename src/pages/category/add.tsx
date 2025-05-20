import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import CategoryForm from '../../components/category/CategoryForm';

export default function AddCategoryPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Header />
        <h1 className="text-xl font-semibold mb-4">Add Category</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <CategoryForm />
        </div>
      </main>
    </div>
  );
}
