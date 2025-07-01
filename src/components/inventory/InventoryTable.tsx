import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts, useDeleteProduct } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import { useColors } from '../../hooks/useColors'
import { useStorages } from '../../hooks/useStorages'
import { Trash2, Edit, Plus, Archive, Search, Filter, X } from 'lucide-react'
import type { ProductVariant } from '../../types/product/product.type'

export default function InventoryTable() {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    color: '',
    storage: '',
    status: '',
    minPrice: '',
    maxPrice: ''
  })

  const { data, isLoading, isError, refetch } = useProducts({ 
    page: currentPage, 
    limit,
    search,
    ...filters
  })

  const { data: categoriesData } = useCategories()
  const { data: colorsData } = useColors()
  const { data: storagesData } = useStorages()

  const deleteProductMutation = useDeleteProduct()

  const products: ProductVariant[] = data?.data?.products || []
  const pagination = data?.data?.pagination
  const categories = categoriesData?.data?.categories || []
  const colors = colorsData?.data?.colors || []
  const storages = storagesData?.data?.storages || []

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProductMutation.mutateAsync(id)
        alert('Product deleted successfully!')
      } catch (error: any) {
        alert(error.response?.data?.message || 'Failed to delete product')
      }
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1) // Reset to first page when filter changes
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      color: '',
      storage: '',
      status: '',
      minPrice: '',
      maxPrice: ''
    })
    setSearch('')
    setCurrentPage(1)
  }

  return (
    <div className="bg-white rounded-lg border mt-6 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Inventory Items</h2>
          
          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
            >
              <Filter size={16} />
              <span className="hidden sm:inline">Filters</span>
            </button>

            {/* Actions */}
            <div className="flex gap-2">
              <Link
                to="/inventory/restore"
                className="flex items-center gap-1 px-3 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50"
              >
                <Archive size={16} />
                <span className="hidden sm:inline">Restore</span>
              </Link>
              <Link
                to="/inventory/create"
                className="flex items-center gap-1 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Add Product</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-700">Filters</h3>
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
              >
                <X size={14} />
                Clear all
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category_name}
                  </option>
                ))}
              </select>

              <select
                value={filters.color}
                onChange={(e) => handleFilterChange('color', e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">All Colors</option>
                {colors.map((color) => (
                  <option key={color._id} value={color._id}>
                    {color.color_name}
                  </option>
                ))}
              </select>

              <select
                value={filters.storage}
                onChange={(e) => handleFilterChange('storage', e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">All Storage</option>
                {storages.map((storage) => (
                  <option key={storage._id} value={storage._id}>
                    {storage.storage_name}
                  </option>
                ))}
              </select>

              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />

              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading products...</p>
        </div>
      ) : isError ? (
        <div className="p-8 text-center">
          <p className="text-sm text-red-500">Error loading products.</p>
          <button 
            onClick={() => refetch()}
            className="mt-2 text-indigo-600 hover:underline text-sm"
          >
            Try again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-sm text-gray-500 italic">No products found.</p>
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
                  <th className="p-3 text-left font-medium">Status</th>
                  <th className="p-3 text-left font-medium hidden sm:table-cell">Image</th>
                  <th className="p-3 text-left font-medium hidden md:table-cell">Created</th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: ProductVariant, index: number) => (
                  <tr key={product._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{(currentPage - 1) * limit + index + 1}</td>
                    <td className="p-3">
                      <div className="font-medium text-gray-900">{product.product?.product_name || 'N/A'}</div>
                      <div className="text-xs text-gray-500 md:hidden">
                        {product.product?.category?.category_name || 'N/A'} • {product.color?.color_name || 'N/A'} • {product.storage?.storage_name || 'N/A'}
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell">{product.product?.category?.category_name || 'N/A'}</td>
                    <td className="p-3 hidden lg:table-cell">{product.color?.color_name || 'N/A'}</td>
                    <td className="p-3 hidden lg:table-cell">{product.storage?.storage_name || 'N/A'}</td>
                    <td className="p-3">VNĐ{typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}</td>
                    <td className="p-3 hidden xl:table-cell">VNĐ{typeof product.total_price === 'number' ? product.total_price.toFixed(2) : '0.00'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status || 'N/A'}
                      </span>
                    </td>
                    <td className="p-3 hidden sm:table-cell">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.product?.product_name || 'Product'}
                          className="w-8 h-8 rounded object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">No</span>
                        </div>
                      )}
                    </td>
                    <td className="p-3 hidden md:table-cell text-gray-600">
                      {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Link
                          to={`/inventory/edit/${product._id}`}
                          className="text-indigo-600 hover:text-indigo-800 p-1 rounded hover:bg-indigo-50"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                          onClick={() => handleDelete(product._id, product.product?.product_name || 'Unknown')}
                          title="Delete"
                          disabled={deleteProductMutation.isPending}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
                        className={`px-3 py-1 text-sm border rounded ${
                          currentPage === page
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
