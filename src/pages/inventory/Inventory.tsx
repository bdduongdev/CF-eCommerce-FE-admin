import InventorySummary from '../../components/inventory/InventorySummary';
import InventoryTable from '../../components/inventory/InventoryTable';

export default function Inventory() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Inventory Management</h1>
        
        </div>

        <InventorySummary />
        <InventoryTable />
      </div>
    </div>
  );
}
