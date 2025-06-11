// src/pages/banner/EditBannerPage.tsx
import { useParams } from 'react-router-dom'
import BannerForm from '../../components/banner/BannerForm'
import type { BannerFormData } from '../../components/banner/BannerForm'

export default function EditBannerPage() {
  const { id } = useParams()

  // Giả lập dữ liệu có sẵn từ API hoặc local
  const mockData: BannerFormData = {
    title: 'Summer Sale',
    image_url: '/banner1.jpg',
    link_url: '/summer-sale',
    position: 'homepage_top',
    is_active: true,
    start_date: '2024-06-01',
    end_date: '2024-06-30',
  }

  const handleSubmit = (data: BannerFormData) => {
    console.log('Banner updated:', data)
    // TODO: Call API update here
  }

  return (
    <div className="p-6">
      <div className="mx-auto w-full max-w-6xl bg-white border rounded-xl shadow px-12 py-12">
        <h1 className="text-xl font-semibold mb-4">Edit Banner #{id}</h1>
        <BannerForm initialData={mockData} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
