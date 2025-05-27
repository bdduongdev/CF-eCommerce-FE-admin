const users = [
  {
    id: 1,
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john@example.com',
    role: 'User',
    status: 'Inactive',
  },
]

export default function UserTable() {
  return (
    <div className="bg-white rounded-lg shadow border">
      <div className="p-4 border-b font-medium text-gray-700">User List</div>
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500 uppercase">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    u.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {u.status}
                </span>
              </td>
              <td className="p-3 space-x-2">
                <a
                  href={`/users/edit/${u.id}`}
                  className="text-indigo-600 text-sm underline hover:text-indigo-800"
                >
                  Edit
                </a>
                <button className="text-red-600 text-sm underline hover:text-red-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
