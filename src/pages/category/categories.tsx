import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import CategoryTable from '../../components/category/CategoryTable';
import CategorySummary from '../../components/category/CategorySummary';

export default function CategoriesPage() {
  return (
   
        <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Header />
        <h1 className="text-xl font-semibold mb-4">Categories</h1>

        <CategorySummary /> 

        <CategoryTable />
      </main>
    </div>
  );
}
