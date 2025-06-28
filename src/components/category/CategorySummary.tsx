import { Folder, CheckCircle, Trash2 } from 'lucide-react';
import { useCategories, useTrashedCategories } from '../../hooks/useCategories';

export default function CategorySummary() {
  const { data: activeCategories } = useCategories({ limit: 1 });
  const { data: trashedCategories } = useTrashedCategories({ limit: 1 });

  const totalActive = activeCategories?.data?.pagination?.total || 0;
  const totalTrashed = trashedCategories?.data?.pagination?.total || 0;
  const total = totalActive + totalTrashed;

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
          <h4 className="text-sm text-gray-500">Active Categories</h4>
          <p className="text-xl font-semibold text-indigo-600 mt-1">{totalActive}</p>
        </div>
        <CheckCircle className="text-green-500" size={28} />
      </div>

      <div className="bg-white border p-4 rounded-lg shadow flex items-center justify-between">
        <div>
          <h4 className="text-sm text-gray-500">Deleted Categories</h4>
          <p className="text-xl font-semibold text-orange-500 mt-1">{totalTrashed}</p>
        </div>
        <Trash2 className="text-orange-400" size={28} />
      </div>
    </div>
  );
}
