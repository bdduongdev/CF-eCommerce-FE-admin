
import InventorySummary from '../../components/inventory/InventorySummary';
import InventoryTable from '../../components/inventory/InventoryTable';

export default function Inventory() {
  return (
    <div className="flex">
     
      <main className="flex-1 bg-gray-50 min-h-screen px-6 py-4">
        <div className="flex justify-between items-center mb-4">
     
        
        </div>

        <InventorySummary />
        <InventoryTable />
      </main>
    </div>
  );
}
