
import { useState } from 'react'

type Props = {
  onSubmit: (form: UserFormData ) => void
}

export type UserFormData  = {
  name: string
  email: string
  role: string
  status: string
}



export default function UserForm({ onSubmit }: Props) {
  const [form, setForm] = useState<UserFormData >({
    name: '',
    email: '',
    role: 'User',
    status: 'Active'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 text-left">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 text-left">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 text-left">
          Role
        </label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 text-left">
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm">
          Create User
        </button>
      </div>
    </form>
  )
}
