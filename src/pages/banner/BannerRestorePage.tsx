import React, { useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useTrashedBanners, useRestoreBanner } from '../../hooks/useBanners';
import BannerTable from '../../components/banner/BannerTable';
import type { Banner, BannerFilters } from '../../types/banner/banner.type';

const BannerRestorePage: React.FC = () => {
  const [filters, setFilters] = useState<BannerFilters>({
    page: 1,
    limit: 10,
  });

  // Fetch trashed banners
  const { data: bannersData, isLoading: bannersLoading, error: bannersError } = useTrashedBanners(filters);
  const restoreBannerMutation = useRestoreBanner();

  const handleViewBanner = (banner: Banner) => {
    // For now, just show alert with banner info
    alert(`Banner: ${banner.title || 'Không có tiêu đề'}\nURL: ${banner.image_url}`);
  };

  const handleEditBanner = (banner: Banner) => {
    // Not available for trashed banners
    alert('Không thể chỉnh sửa banner đã xóa. Vui lòng khôi phục trước.');
  };

  const handleDeleteBanner = (banner: Banner) => {
    // Not available for trashed banners
    alert('Banner đã được xóa. Vui lòng khôi phục nếu muốn xóa lại.');
  };

  const handleRestoreBanner = async (banner: Banner) => {
    const confirmMessage = `Bạn có chắc muốn khôi phục banner "${banner.title || 'Không có tiêu đề'}"?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        await restoreBannerMutation.mutateAsync(banner._id);
        alert('Đã khôi phục banner thành công!');
      } catch (error) {
        alert('Có lỗi xảy ra khi khôi phục banner!');
        console.error('Error restoring banner:', error);
      }
    }
  };

  const handleToggleStatus = (banner: Banner) => {
    // Not available for trashed banners
    alert('Không thể thay đổi trạng thái banner đã xóa. Vui lòng khôi phục trước.');
  };

  const handleFiltersChange = (newFilters: BannerFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.location.href = '/banner'}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thùng rác Banner</h1>
            <p className="text-gray-600 mt-1">
              Quản lý các banner đã xóa
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <RotateCcw className="h-4 w-4" />
          <span>Banners đã xóa</span>
        </div>
      </div>

      {/* Error Display */}
      {bannersError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Lỗi khi tải dữ liệu</h3>
          <p className="text-red-600 mt-1">
            {bannersError instanceof Error ? bannersError.message : 'Có lỗi xảy ra'}
          </p>
        </div>
      )}

      {/* Banners Table */}
      {bannersData && (
        <BannerTable
          banners={bannersData.data.banners}
          isLoading={bannersLoading}
          onViewBanner={handleViewBanner}
          onEditBanner={handleEditBanner}
          onDeleteBanner={handleDeleteBanner}
          onRestoreBanner={handleRestoreBanner}
          onToggleStatus={handleToggleStatus}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          pagination={bannersData.data.pagination}
          onPageChange={handlePageChange}
          isTrashed={true}
        />
      )}

      {/* Empty State */}
      {bannersData && bannersData.data.banners.length === 0 && !bannersLoading && (
        <div className="text-center py-12">
          <RotateCcw className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Không có banner nào trong thùng rác</h3>
          <p className="mt-1 text-sm text-gray-500">
            Các banner đã xóa sẽ xuất hiện ở đây.
          </p>
        </div>
      )}
    </div>
  );
};

export default BannerRestorePage; 