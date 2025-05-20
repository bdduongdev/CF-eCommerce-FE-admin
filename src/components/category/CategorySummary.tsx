import { Folder, CheckCircle, Clock } from 'lucide-react';

export default function CategorySummary() {
  
  const total = 0;
  const published = 0;
  const unpublished = 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-indigo-600 text-white p-4 rounded-lg shadow flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium">Total Categories</h4>
          <p className="text-2xl font-bold mt-1">{total}</p>
        </div>
        <Folder size={32} />
      </div>

      <div className="bg-white border p-4 rounded-lg shadow flex items-center justify-between">
        <div>
          <h4 className="text-sm text-gray-500">Published</h4>
          <p className="text-xl font-semibold text-indigo-600 mt-1">{published}</p>
        </div>
        <CheckCircle className="text-green-500" size={28} />
      </div>

      <div className="bg-white border p-4 rounded-lg shadow flex items-center justify-between">
        <div>
          <h4 className="text-sm text-gray-500">Unpublished</h4>
          <p className="text-xl font-semibold text-orange-500 mt-1">{unpublished}</p>
        </div>
        <Clock className="text-orange-400" size={28} />
      </div>
    </div>
  );
}
