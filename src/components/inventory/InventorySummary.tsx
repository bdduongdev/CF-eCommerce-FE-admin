import { Folder, Users } from 'lucide-react';

export default function InventorySummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-indigo-600 text-white rounded-lg p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm">All Products</h4>
          <Folder size={18} />
        </div>
        <h2 className="text-2xl font-bold">350</h2>
        <p className="text-sm mt-1">Active <span className="font-semibold">316</span> <span className="text-xs">(86%)</span></p>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h4 className="text-sm text-red-500 font-semibold mb-2">Low Stock Alert</h4>
        <p className="text-2xl font-bold text-gray-800">23</p>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Expired</span>
          <span>1 Start Rating</span>
        </div>
        <div className="flex justify-between text-xl font-semibold text-gray-800">
          <span>3</span>
          <span>2</span>
        </div>
      </div>
    </div>
  );
}
