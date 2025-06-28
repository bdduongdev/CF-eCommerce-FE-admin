// src/components/inventory/InventoryRestoreTable.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTrashedProducts, useRestoreProduct } from '../../hooks/useProducts'
import { RotateCcw, ArrowLeft, Search } from 'lucide-react'
import type { TrashedProduct } from '../../types/product/product.type'

export default function InventoryRestoreTable() {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)

  const { data, isLoading, isError, refetch } = useTrashedProducts({
    page: currentPage,
    limit
  })

  const restoreProductMutation = useRestoreProduct()

  const products = data?.data?.products || []
  const pagination = data?.data?.pagination

  const filteredProducts = (products as unknown as TrashedProduct[]).filter((product: TrashedProduct) =>
    (product?.product_name ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const handleRestore = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to restore "${name}"?`)) {
      try {
        await restoreProductMutation.mutateAsync(id)
        alert('Product restored successfully!')
      } catch (error: any) {
        alert(error.response?.data?.message || 'Failed to restore product')
      }
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="bg-white rounded-lg border mt-6 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/inventory"
              className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100"
            >
              <ArrowLeft size={20} />
            </Link>
            <h2 className="text-lg font-semibold text-gray-800">Deleted Products</h2>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search deleted products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading deleted products...</p>
        </div>
      ) : isError ? (
        <div className="p-8 text-center">
          <p className="text-sm text-red-500">Error loading deleted products.</p>
          <button
            onClick={() => refetch()}
            className="mt-2 text-indigo-600 hover:underline text-sm"
          >
            Try again
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-sm text-gray-500 italic">
            {search ? 'No deleted products found matching your search.' : 'No deleted products found.'}
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="p-3 text-left font-medium">ID</th>
                  <th className="p-3 text-left font-medium">Product</th>
                  <th className="p-3 text-left font-medium hidden md:table-cell">Category</th>
                  <th className="p-3 text-left font-medium hidden lg:table-cell">Color</th>
                  <th className="p-3 text-left font-medium hidden lg:table-cell">Storage</th>
                  <th className="p-3 text-left font-medium">Price</th>
                  <th className="p-3 text-left font-medium hidden xl:table-cell">Total Price</th>
                  <th className="p-3 text-left font-medium hidden sm:table-cell">Image</th>
                  <th className="p-3 text-left font-medium hidden md:table-cell">Deleted</th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(filteredProducts as unknown as TrashedProduct[]).map((product: TrashedProduct, index: number) => (
                  <tr key={product._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{(currentPage - 1) * limit + index + 1}</td>
                    <td className="p-3">
                      <div className="font-medium text-gray-900">{product.product_name}</div>
                      <div className="text-xs text-gray-500 md:hidden">
                        {product.category_id?.category_name} • {product.color_id?.color_name} • {product.storage_id?.storage_name}
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell">{product.category_id?.category_name || 'N/A'}</td>
                    <td className="p-3 hidden lg:table-cell">{product.color_id?.color_name || 'N/A'}</td>
                    <td className="p-3 hidden lg:table-cell">{product.storage_id?.storage_name || 'N/A'}</td>
                    <td className="p-3">VNĐ{product.price?.toFixed(2) || '0.00'}</td>
                    <td className="p-3 hidden xl:table-cell">VNĐ{product.total_price?.toFixed(2) || '0.00'}</td>
                    <td className="p-3 hidden sm:table-cell">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.product_name}
                          className="w-8 h-8 rounded object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">No</span>
                        </div>
                      )}
                    </td>
                    <td className="p-3 hidden md:table-cell text-gray-600">
                      {new Date(product.updated_at).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <button
                        className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                        onClick={() => handleRestore(product._id, product.product_name)}
                        title="Restore"
                        disabled={restoreProductMutation.isPending}
                      >
                        <RotateCcw size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="px-4 py-3 border-t bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="text-sm text-gray-600 text-center sm:text-left">
                  Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, pagination.total)} of {pagination.total} results
                </div>
                <div className="flex justify-center gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 text-sm border rounded ${currentPage === page
                          ? 'bg-indigo-600 text-white'
                          : 'hover:bg-gray-50'
                          }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
