
import CategoryForm from '../../components/category/CategoryForm';

export default function AddCategoryPage() {
  return (
    <div className="flex">

      <main className="flex-1 p-6 bg-gray-50 min-h-screen">

        <h1 className="text-xl font-semibold mb-4"></h1>
       
          <CategoryForm />
        
      </main>
    </div>
  );
}
