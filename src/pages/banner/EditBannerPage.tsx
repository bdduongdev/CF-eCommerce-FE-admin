// src/pages/banner/EditBannerPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBanner, useUpdateBanner } from '../../hooks/useBanners';
import BannerForm from '../../components/banner/BannerForm';
import type { UpdateBannerData } from '../../types/banner/banner.type';

const EditBannerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: bannerData, isLoading: bannerLoading, error: bannerError } = useBanner(id || '');
  const updateBannerMutation = useUpdateBanner();

  const handleSubmit = async (data: UpdateBannerData) => {
    if (!id) return;
    
    try {
      await updateBannerMutation.mutateAsync({ id, data });
      alert('Cập nhật banner thành công!');
      window.location.href = '/banner';
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật banner!');
      console.error('Error updating banner:', error);
    }
  };

  const handleCancel = () => {
    window.location.href = '/banner';
  };

  if (bannerLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="text-center text-gray-500">Đang tải...</div>
      </div>
    );
  }

  if (bannerError || !bannerData) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Lỗi khi tải dữ liệu</h3>
          <p className="text-red-600 mt-1">
            {bannerError instanceof Error ? bannerError.message : 'Không tìm thấy banner'}
          </p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa Banner</h1>
          <p className="text-gray-600 mt-1">
            Cập nhật thông tin banner
          </p>
        </div>
      </div>

      {/* Banner Form */}
      <BannerForm
        banner={bannerData.data}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={updateBannerMutation.isPending}
      />
    </div>
  );
};

export default EditBannerPage;
