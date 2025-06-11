import { Link } from 'react-router-dom'

const banners = [
  {
    banner_id: 1,
    title: 'Khuyến mãi hè',
    image_url: '/banner1.jpg',
    link_url: '/summer-sale',
    position: 'homepage_top',
    is_active: true,
    start_date: '2024-06-01',
    end_date: '2024-06-30',
  },
  {
    banner_id: 2,
    title: 'Sản phẩm nổi bật',
    image_url: '/banner2.jpg',
    link_url: '/featured',
    position: 'sidebar',
    is_active: false,
    start_date: null,
    end_date: null,
  },
]

export default function BannerTable() {
  return (
    <div className="bg-white border rounded-lg mt-6">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">All Banners</h2>
        <Link
          to="/banner/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
        >
          + Add Banner
        </Link>
      </div>

      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Title</th>
            <th className="p-3">Position</th>
            <th className="p-3">Status</th>
            <th className="p-3">Active Time</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((b) => (
            <tr key={b.banner_id} className="border-t hover:bg-gray-50">
              <td className="p-3">
                <img src={b.image_url} alt={b.title} className="w-24 h-12 object-cover rounded" />
              </td>
              <td className="p-3">{b.title || '-'}</td>
              <td className="p-3">{b.position}</td>
              <td className="p-3">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    b.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {b.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="p-3">
                {b.start_date
                  ? `${b.start_date} → ${b.end_date || '∞'}`
                  : 'No limit'}
              </td>
              <td className="p-3 space-x-2">
                <Link
                  to={`/banner/edit/${b.banner_id}`}
                  className="text-indigo-600 hover:underline text-xs"
                >
                  Edit
                </Link>
                <button className="text-red-500 text-xs hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
