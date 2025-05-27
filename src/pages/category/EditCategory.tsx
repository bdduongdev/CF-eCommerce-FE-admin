// src/pages/category/EditCategory.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function EditCategory() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    description: '',
    status: 'Published',
  })

  // Giả lập lấy dữ liệu từ ID
  useEffect(() => {
    // Replace this with real fetch call
    const category = {
      name: 'Gadgets',
      description: 'Electronic devices',
      status: 'Published',
    }
    setForm(category)
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Gửi dữ liệu cập nhật
    console.log('Updated Category:', { id, ...form })
    navigate('/category')
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg p-6 shadow border">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Category Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm bg-white text-gray-800"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border px-3 py-2 rounded text-sm bg-white text-gray-800"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm bg-white text-gray-800"
          >
            <option value="Published">Published</option>
            <option value="Unpublished">Unpublished</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate('/category')}
            className="px-4 py-2 rounded bg-gray-100 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
