import { Link } from 'react-router-dom';

// Mock data for Roles
const roles = [
  { role_id: 1, role_name: 'Admin' },
  { role_id: 2, role_name: 'Customer' },
];

const users = [
  {
    user_id: 1,
    username: 'janedoe',
    email: 'jane@example.com',
    phone_number: '123-456-7890',
    address: '123 Main St',
    role_id: 1,
    created_at: '2025-06-01T10:00:00Z',
  },
  {
    user_id: 2,
    username: 'johnsmith',
    email: 'john@example.com',
    phone_number: '098-765-4321',
    address: '456 Elm St',
    role_id: 2,
    created_at: '2025-06-02T12:00:00Z',
  },
];

export default function UserTable() {
  return (
    <div className="bg-white rounded-lg shadow border">
      <div className="p-4 border-b font-medium text-gray-700">User List</div>
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500 uppercase">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Username</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone Number</th>
            <th className="p-3">Address</th>
            <th className="p-3">Role</th>
            <th className="p-3">Created At</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.user_id} className="border-t hover:bg-gray-50">
              <td className="p-3">{u.user_id}</td>
              <td className="p-3">{u.username}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.phone_number || 'N/A'}</td>
              <td className="p-3">{u.address || 'N/A'}</td>
              <td className="p-3">{roles.find(r => r.role_id === u.role_id)?.role_name || 'N/A'}</td>
              <td className="p-3">{new Date(u.created_at).toLocaleDateString()}</td>
              <td className="p-3 space-x-2">
                <Link
                  to={`/users/edit/${u.user_id}`}
                  className="text-indigo-600 text-sm underline hover:text-indigo-800"
                >
                  Edit
                </Link>
                <button className="text-red-600 text-sm underline hover:text-red-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}