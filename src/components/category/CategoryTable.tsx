import { useCategories, useDeleteCategory } from '../../hooks/useCategories'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Trash2, Edit, Plus, Archive } from 'lucide-react'

export default function CategoryTable() {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)

  const { data, isLoading, isError, refetch } = useCategories({ 
    page: currentPage, 
    limit 
  })

  const deleteCategoryMutation = useDeleteCategory()

  const categories = data?.data?.categories || []
  const pagination = data?.data?.pagination

  const filteredCategories = categories.filter((cat) =>
    (cat?.category_name ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteCategoryMutation.mutateAsync(id)
        alert('Category deleted successfully!')
      } catch (error: any) {
        alert(error.response?.data?.message || 'Failed to delete category')
      }
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="bg-white rounded-lg border mt-6">
      <div className="flex flex-wrap justify-between items-center gap-3 px-4 py-3 border-b">
        <h2 className="text-gray-800 font-medium">All Categories</h2>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded text-sm w-full sm:w-64"
          />

          <Link
            to="/category/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700 flex items-center gap-1"
          >
            <Plus size={16} />
            Add Category
          </Link>

          <Link
            to="/category/restore"
            className="bg-yellow-500 text-white px-4 py-2 rounded text-sm hover:bg-yellow-600 flex items-center gap-1"
          >
            <Archive size={16} />
            Restore
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading categories...</p>
        </div>
      ) : isError ? (
        <div className="p-8 text-center">
          <p className="text-sm text-red-500">Error loading categories.</p>
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
            {search ? 'No categories found matching your search.' : 'No categories found.'}
          </p>
        </div>
      ) : (
        <>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Category Name</th>
                <th className="p-3">Created At</th>
                <th className="p-3">Updated At</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat, index) => (
                <tr key={cat._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{(currentPage - 1) * limit + index + 1}</td>
                  <td className="p-3 font-medium">{cat.category_name}</td>
                  <td className="p-3 text-gray-600">
                    {new Date(cat.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-gray-600">
                    {new Date(cat.updated_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/category/edit/${cat._id}`}
                        className="text-indigo-600 hover:text-indigo-800 p-1 rounded hover:bg-indigo-50"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                        onClick={() => handleDelete(cat._id, cat.category_name)}
                        title="Delete"
                        disabled={deleteCategoryMutation.isPending}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
