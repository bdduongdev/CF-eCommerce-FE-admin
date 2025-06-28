import { useTrashedCategories, useRestoreCategory } from '../../hooks/useCategories'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { RotateCcw, ArrowLeft, Search } from 'lucide-react'

export default function RestoreCategoryTable() {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)

  const { data, isLoading, isError, refetch } = useTrashedCategories({ 
    page: currentPage, 
    limit 
  })

  const restoreCategoryMutation = useRestoreCategory()

  const categories = data?.data?.categories || []
  const pagination = data?.data?.pagination

  const filteredCategories = categories.filter((cat) =>
    (cat?.category_name ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const handleRestore = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to restore "${name}"?`)) {
      try {
        await restoreCategoryMutation.mutateAsync(id)
        alert('Category restored successfully!')
      } catch (error: any) {
        alert(error.response?.data?.message || 'Failed to restore category')
      }
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="bg-white rounded-lg border mt-6">
      <div className="flex flex-wrap justify-between items-center gap-3 px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <Link
            to="/category"
            className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-gray-800 font-medium">Deleted Categories</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border pl-10 pr-3 py-2 rounded text-sm w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading deleted categories...</p>
        </div>
      ) : isError ? (
        <div className="p-8 text-center">
          <p className="text-sm text-red-500">Error loading deleted categories.</p>
          <button 
            onClick={() => refetch()}
            className="mt-2 text-indigo-600 hover:underline text-sm"
          >
            Try again
          </button>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-sm text-gray-500 italic">
            {search ? 'No deleted categories found matching your search.' : 'No deleted categories found.'}
          </p>
        </div>
      ) : (
        <>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Category Name</th>
                <th className="p-3">Deleted At</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat, index) => (
                <tr key={cat._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{(currentPage - 1) * limit + index + 1}</td>
                  <td className="p-3 font-medium">{cat.category_name}</td>
                  <td className="p-3 text-gray-600">
                    {new Date(cat.updated_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                      onClick={() => handleRestore(cat._id, cat.category_name)}
                      title="Restore"
                      disabled={restoreCategoryMutation.isPending}
                    >
                      <RotateCcw size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-between items-center px-4 py-3 border-t">
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, pagination.total)} of {pagination.total} results
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
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
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}