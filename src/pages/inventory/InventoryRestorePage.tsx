import InventoryRestoreTable from '../../components/inventory/InventoryRestoreTable'

export default function InventoryRestorePage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Restore Deleted Products</h1>
          <p className="text-gray-600">View and restore products that have been soft deleted.</p>
        </div>
        <InventoryRestoreTable />
      </div>
    </div>
  )
}
