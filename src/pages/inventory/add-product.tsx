import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import ImageUploader from '../../components/inventory/ImageUploader';
import AddProductForm from '../../components/inventory/AddProductForm';

export default function AddProductPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 min-h-screen px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <Header />
          <h1 className="text-xl font-semibold text-gray-800">Add New Product</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Image Upload */}
          <ImageUploader />

          {/* Right: Form */}
          <div className="flex flex-col justify-between">
            <AddProductForm />

            <div className="mt-6 flex justify-end gap-3">
              <button className="px-4 py-2 border rounded text-sm">Cancel</button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">Create Product</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
