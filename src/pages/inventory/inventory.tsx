import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import InventorySummary from '../../components/inventory/InventorySummary';
import InventoryTable from '../../components/inventory/InventoryTable';
import { Link } from 'react-router-dom';
export default function Inventory() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 min-h-screen px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <Header />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700">
           <Link
  to="/inventory/add"
  className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
>
  + Add a New Product
</Link>
           
          </button>
        </div>

        <InventorySummary />
        <InventoryTable />
      </main>
    </div>
  );
}
