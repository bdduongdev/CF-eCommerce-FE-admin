
import ImageUploader from '../../components/inventory/ImageUploader';
import AddProductForm from '../../components/inventory/AddProductForm';

export default function AddProductPage() {
  return (
    <div className="flex">
     
      <main className="flex-1 bg-gray-50 min-h-screen px-6 py-6">
        <div className="flex justify-between items-center mb-6">
         
          <h1 className="text-xl font-semibold text-gray-800">Add New Product</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
       
          <ImageUploader />

          <div className="flex flex-col justify-between">
            <AddProductForm />

            
          </div>
        </div>
      </main>
    </div>
  );
}
