import { Link } from 'react-router-dom';

// const categories = [
//   { category_id: 1, category_name: 'Gadgets', created_at: '2025-06-01T10:00:00Z' },
//   { category_id: 2, category_name: 'Fashion', created_at: '2025-06-02T12:00:00Z' },
// ];

// export default function CategoryTable() {
//   return (
//     <div className="bg-white rounded-lg border mt-6">
//       <div className="flex justify-between items-center px-4 py-3 border-b">
//         <h2 className="text-gray-800 font-medium">All Categories</h2>
//         <Link
//           to="/category/create"
//           className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
//         >
//           + Add Category
//         </Link>

   
//       </div>

//       <table className="w-full text-sm text-left">
//         <thead className="bg-gray-50 text-gray-500">
//           <tr>
//             <th className="p-3">ID</th>
//             <th className="p-3">Category Name</th>
//             <th className="p-3">Created At</th>
//             <th className="p-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((cat) => (
//             <tr key={cat.category_id} className="border-t hover:bg-gray-50">
//               <td className="p-3">{cat.category_id}</td>
//               <td className="p-3 font-medium">{cat.category_name}</td>
//               <td className="p-3">{new Date(cat.created_at).toLocaleDateString()}</td>
//               <td className="p-3 space-x-2">
//                 <Link
//                   to={`/category/edit/${cat.category_id}`}
//                   className="text-indigo-600 hover:underline text-xs"
//                 >
//                   Edit
//                 </Link>
//                 <button className="text-red-500 hover:underline text-xs">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import { useCategories } from '../../hooks/useCategories';

export default function CategoryTable() {
  const { categories, loading, error } = useCategories()

  if (loading) return <p className="p-4">Đang tải danh mục...</p>
  if (error) return <p className="p-4 text-red-500">Lỗi: {error}</p>

  return (
    <div className="bg-white rounded-lg border mt-6">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-gray-800 font-medium">All Categories</h2>
        <Link
          to="/category/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
        >
          + Add Category
        </Link>
      </div>

      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Category Name</th>
            <th className="p-3">Created At</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3 font-medium">{cat.category_name}</td>
              <td className="p-3">
                {cat.updated_at ? new Date(cat.updated_at).toLocaleDateString() : '—'}
              </td>
              <td className="p-3 space-x-2">
                <Link
                  to={`/category/edit/${cat._id}`}
                  className="text-indigo-600 hover:underline text-xs"
                >
                  Edit
                </Link>
                <button
                  className="text-red-500 hover:underline text-xs"
                  onClick={() => {
                    // TODO: thêm hàm xóa nếu cần
                  }}
                >
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