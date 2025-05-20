import { useParams } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import AddProductForm from '../../components/inventory/AddProductForm';
import ImageUploader from '../../components/inventory/ImageUploader';

export default function EditProductPage() {
  const { id } = useParams();

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 min-h-screen px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <Header />
          <h1 className="text-xl font-semibold text-gray-800">Edit Product #{id}</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader />
          <div className="flex flex-col justify-between">
            <AddProductForm />
            <div className="mt-6 flex justify-end gap-3">
              <button className="px-4 py-2 border rounded text-sm">Cancel</button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
                Update Product
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
