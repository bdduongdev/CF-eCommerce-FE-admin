import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useBanners, useBannerStats, useDeleteBanner, useToggleBannerStatus } from '../../hooks/useBanners';
import BannerTable from '../../components/banner/BannerTable';
import BannerSummary from '../../components/banner/BannerSummary';
import type { Banner, BannerFilters } from '../../types/banner/banner.type';

const BannersPage: React.FC = () => {
  const [filters, setFilters] = useState<BannerFilters>({
    page: 1,
    limit: 10,
  });

  // Fetch data
  const { data: bannersData, isLoading: bannersLoading, error: bannersError } = useBanners(filters);
  const { data: statsData, isLoading: statsLoading } = useBannerStats();
  const deleteBannerMutation = useDeleteBanner();
  const toggleStatusMutation = useToggleBannerStatus();

  const handleViewBanner = (banner: Banner) => {
    // For now, just show alert with banner info
    alert(`Banner: ${banner.title || 'Không có tiêu đề'}\nURL: ${banner.image_url}`);
  };

  const handleEditBanner = (banner: Banner) => {
    // Navigate to edit page
    window.location.href = `/banner/edit/${banner._id}`;
  };

  const handleDeleteBanner = async (banner: Banner) => {
    const confirmMessage = `Bạn có chắc muốn xóa banner "${banner.title || 'Không có tiêu đề'}"?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        await deleteBannerMutation.mutateAsync(banner._id);
        alert('Đã xóa banner thành công!');
      } catch (error) {
        alert('Có lỗi xảy ra khi xóa banner!');
        console.error('Error deleting banner:', error);
      }
    }
  };

  const handleToggleStatus = async (banner: Banner) => {
    const action = banner.is_active ? 'tạm dừng' : 'kích hoạt';
    const confirmMessage = `Bạn có chắc muốn ${action} banner "${banner.title || 'Không có tiêu đề'}"?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        await toggleStatusMutation.mutateAsync(banner._id);
        alert(`Đã ${action} banner thành công!`);
      } catch (error) {
        alert(`Có lỗi xảy ra khi ${action} banner!`);
        console.error('Error toggling banner status:', error);
      }
    }
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Banner</h1>
          <p className="text-gray-600 mt-1">
            Quản lý banner quảng cáo và khuyến mãi
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.location.href = '/banner/restore'}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
          >
            <Trash2 className="h-4 w-4" />
            Thùng rác
          </button>
          <button
            onClick={() => window.location.href = '/banner/add'}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4" />
            Thêm Banner
          </button>
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

      {/* Stats Summary */}
      {statsData && (
        <BannerSummary 
          stats={statsData.data} 
          isLoading={statsLoading} 
        />
      )}

      {/* Banners Table */}
      {bannersData && (
        <BannerTable
          banners={bannersData.data.banners}
          isLoading={bannersLoading}
          onViewBanner={handleViewBanner}
          onEditBanner={handleEditBanner}
          onDeleteBanner={handleDeleteBanner}
          onRestoreBanner={() => {}} // Not used in main table
          onToggleStatus={handleToggleStatus}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          pagination={bannersData.data.pagination}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default BannersPage;
