import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useCreateBanner } from '../../hooks/useBanners';
import BannerForm from '../../components/banner/BannerForm';
import type { CreateBannerData } from '../../types/banner/banner.type';

const AddBannerPage: React.FC = () => {
  const createBannerMutation = useCreateBanner();

  const handleSubmit = async (data: CreateBannerData) => {
    try {
      await createBannerMutation.mutateAsync(data);
      alert('Tạo banner thành công!');
      window.location.href = '/banner';
    } catch (error) {
      alert('Có lỗi xảy ra khi tạo banner!');
      console.error('Error creating banner:', error);
    }
  };

  const handleCancel = () => {
    window.location.href = '/banner';
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thêm Banner Mới</h1>
          <p className="text-gray-600 mt-1">
            Tạo banner quảng cáo mới cho website
          </p>
        </div>
      </div>

      {/* Banner Form */}
      <BannerForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={createBannerMutation.isPending}
      />
    </div>
  );
};

export default AddBannerPage;
