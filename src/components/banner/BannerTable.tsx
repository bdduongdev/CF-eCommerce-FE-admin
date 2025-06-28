import React, { useState } from 'react';
import { Eye, Edit, Trash2, RotateCcw, Search, Filter, Play, Pause, ExternalLink } from 'lucide-react';
import StatusBadge from './StatusBadge';
import type { Banner, BannerFilters } from '../../types/banner/banner.type';

interface BannerTableProps {
  banners: Banner[];
  isLoading: boolean;
  onViewBanner: (banner: Banner) => void;
  onEditBanner: (banner: Banner) => void;
  onDeleteBanner: (banner: Banner) => void;
  onRestoreBanner: (banner: Banner) => void;
  onToggleStatus: (banner: Banner) => void;
  filters: BannerFilters;
  onFiltersChange: (filters: BannerFilters) => void;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
  isTrashed?: boolean;
}

const BannerTable: React.FC<BannerTableProps> = ({
  banners,
  isLoading,
  onViewBanner,
  onEditBanner,
  onDeleteBanner,
  onRestoreBanner,
  onToggleStatus,
  filters,
  onFiltersChange,
  pagination,
  onPageChange,
  isTrashed = false
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate && !endDate) return 'Không giới hạn';
    
    const start = startDate ? new Date(startDate).toLocaleDateString('vi-VN') : 'Không giới hạn';
    const end = endDate ? new Date(endDate).toLocaleDateString('vi-VN') : 'Không giới hạn';
    
    return `${start} - ${end}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header with search and filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tiêu đề..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.search || ''}
                onChange={(e) => onFiltersChange({ ...filters, search: e.target.value, page: 1 })}
              />
            </div>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
          >
            <Filter className="h-4 w-4" />
            Bộ lọc
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {!isTrashed && (
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.is_active !== undefined ? filters.is_active.toString() : ''}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  is_active: e.target.value ? e.target.value === 'true' : undefined, 
                  page: 1 
                })}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="true">Đang hoạt động</option>
                <option value="false">Tạm dừng</option>
              </select>
            )}

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.limit || 10}
              onChange={(e) => onFiltersChange({ ...filters, limit: parseInt(e.target.value), page: 1 })}
            >
              <option value={10}>10 banner</option>
              <option value={20}>20 banner</option>
              <option value={50}>50 banner</option>
            </select>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Banner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thông tin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời gian
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Đang tải...
                </td>
              </tr>
            ) : banners.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Không có banner nào
                </td>
              </tr>
            ) : (
              banners.map((banner) => (
                <tr key={banner._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-24">
                        <img
                          className="h-16 w-24 rounded-lg object-cover"
                          src={banner.image_url}
                          alt={banner.title || 'Banner'}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {banner.title || 'Không có tiêu đề'}
                        </div>
                        {banner.position && (
                          <div className="text-sm text-gray-500">
                            Vị trí: {banner.position}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {banner.link_url ? (
                        <a 
                          href={banner.link_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Xem link
                        </a>
                      ) : (
                        <span className="text-gray-500">Không có link</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge isActive={banner.is_active} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Ngày tạo: {formatDate(banner.created_at)}</div>
                    <div>Hiệu lực: {formatDateRange(banner.start_date, banner.end_date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onViewBanner(banner)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      {!isTrashed ? (
                        <>
                          <button
                            onClick={() => onEditBanner(banner)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Chỉnh sửa"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onToggleStatus(banner)}
                            className={`p-1 rounded ${
                              banner.is_active 
                                ? 'text-orange-600 hover:text-orange-900' 
                                : 'text-green-600 hover:text-green-900'
                            }`}
                            title={banner.is_active ? 'Tạm dừng' : 'Kích hoạt'}
                          >
                            {banner.is_active ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => onDeleteBanner(banner)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Xóa"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => onRestoreBanner(banner)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Khôi phục"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Hiển thị {((pagination.page - 1) * pagination.limit) + 1} đến{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} trong tổng số{' '}
              {pagination.total} banner
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Trước
              </button>
              <span className="px-3 py-1 text-sm text-gray-700">
                Trang {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => onPageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerTable;
