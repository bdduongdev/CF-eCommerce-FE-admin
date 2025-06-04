
import CategoryTable from '../../components/category/CategoryTable';
import CategorySummary from '../../components/category/CategorySummary';

export default function CategoriesPage() {
  return (
   
        <div className="flex">
      
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
       
       

        <CategorySummary /> 

        <CategoryTable />
      </main>
    </div>
  );
}
