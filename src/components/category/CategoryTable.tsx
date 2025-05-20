import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Gadgets', description: 'Electronic devices', status: 'Published' },
  { id: 2, name: 'Fashion', description: 'Clothing and accessories', status: 'Unpublished' },
];

export default function CategoryTable() {
  return (
    <div className="bg-white rounded-lg border mt-6">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-gray-800 font-medium">All Categories</h2>
        <Link
          to="/category/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
        >
          + Add Category
        </Link>
      </div>

      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium">{cat.name}</td>
              <td className="p-3">{cat.description}</td>
              <td className="p-3">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    cat.status === 'Published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-600'
                  }`}
                >
                  {cat.status}
                </span>
              </td>
              <td className="p-3 space-x-2">
                <Link
                  to={`/categories/edit/${cat.id}`}
                  className="text-indigo-600 hover:underline text-xs"
                >
                  Edit
                </Link>
                <button className="text-red-500 hover:underline text-xs">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
