
import EditProductForm from '../../components/inventory/EditProductForm';
import { useParams } from 'react-router-dom';

export default function EditProductPage() {
  const { id } = useParams();

 
  const mockProduct = {
    name: 'iPhone 13 Pro',
    category: 'Gadgets',
    price: '1225000',
    stock: '8',
    discount: '0',
    description: 'High-end Apple smartphone.',
    status: 'Published',
  };

  return (
    <div className="flex min-h-screen w-full">
  
      <main className="flex-1 bg-gray-50 min-h-screen px-6 py-4">
      
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow mt-6">
          <h1 className="text-xl font-semibold mb-6 text-center">Edit Product</h1>
          <EditProductForm initialData={mockProduct} />
        </div>
      </main>
    </div>
  );
}