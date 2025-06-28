import React, { useState } from 'react';
import { Filter, User, Package, AlertTriangle } from 'lucide-react';
import RatingStars from './RatingStars';
import type { Review, ReviewFilters } from '../../types/review/review.type';

interface ReviewTableProps {
  reviews: Review[];
  isLoading: boolean;
  filters: ReviewFilters;
  onFiltersChange: (filters: ReviewFilters) => void;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

const ReviewTable: React.FC<ReviewTableProps> = ({
  reviews,
  isLoading,
  filters,
  onFiltersChange,
  pagination,
  onPageChange
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Ngày không hợp lệ';
    }
  };

  const getRatingLabel = (rating: number) => {
    const labels = {
      5: 'Xuất sắc',
      4: 'Tốt',
      3: 'Trung bình',
      2: 'Kém',
      1: 'Rất kém'
    };
    return labels[rating as keyof typeof labels] || 'Không xác định';
  };

  const renderUserInfo = (user: any) => {
    if (!user) {
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8">
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </div>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-red-600">Người dùng đã xóa</div>
            <div className="text-sm text-gray-500">Không có thông tin</div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center">
        <div className="flex-shrink-0 h-8 w-8">
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
        </div>
        <div className="ml-3">
          <div className="text-sm font-medium text-gray-900">
            {user.fullname || 'Không có tên'}
          </div>
          <div className="text-sm text-gray-500">
            {user.email || 'Không có email'}
          </div>
        </div>
      </div>
    );
  };

  const renderProductInfo = (product: any) => {
    if (!product) {
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8">
            <div className="h-8 w-8 rounded bg-red-100 flex items-center justify-center">
              <Package className="h-4 w-4 text-red-600" />
            </div>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-red-600">Sản phẩm đã xóa</div>
            <div className="text-sm text-gray-500">Không có thông tin</div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center">
        <div className="flex-shrink-0 h-8 w-8">
          <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
            <Package className="h-4 w-4 text-blue-600" />
          </div>
        </div>
        <div className="ml-3">
          <div className="text-sm font-medium text-gray-900">
            {product.product?.product_name || product.product_name || 'Không có tên sản phẩm'}
          </div>
          <div className="text-sm text-gray-500">
            ID: {product._id || 'Không có ID'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header with filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">Danh sách đánh giá</h3>
            <p className="text-sm text-gray-600 mt-1">
              Tổng cộng {pagination.total} đánh giá
            </p>
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
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.rating || ''}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                rating: e.target.value ? parseInt(e.target.value) : undefined, 
                page: 1 
              })}
            >
              <option value="">Tất cả đánh giá</option>
              <option value="5">5 sao - Xuất sắc</option>
              <option value="4">4 sao - Tốt</option>
              <option value="3">3 sao - Trung bình</option>
              <option value="2">2 sao - Kém</option>
              <option value="1">1 sao - Rất kém</option>
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.sort || ''}
              onChange={(e) => onFiltersChange({ ...filters, sort: e.target.value, page: 1 })}
            >
              <option value="">Sắp xếp mặc định</option>
              <option value="review_date:desc">Mới nhất</option>
              <option value="review_date:asc">Cũ nhất</option>
              <option value="rating:desc">Đánh giá cao nhất</option>
              <option value="rating:asc">Đánh giá thấp nhất</option>
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.limit || 10}
              onChange={(e) => onFiltersChange({ ...filters, limit: parseInt(e.target.value), page: 1 })}
            >
              <option value={10}>10 đánh giá</option>
              <option value={20}>20 đánh giá</option>
              <option value={50}>50 đánh giá</option>
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
                Người đánh giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đánh giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nhận xét
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày đánh giá
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
            ) : reviews.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Không có đánh giá nào
                </td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderUserInfo(review.user_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderProductInfo(review.product_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <RatingStars rating={review.rating} size="sm" />
                      <span className="text-xs text-gray-500">
                        {getRatingLabel(review.rating)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      {review.comment ? (
                        <p className="line-clamp-2">{review.comment}</p>
                      ) : (
                        <span className="text-gray-500 italic">Không có nhận xét</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(review.review_date)}
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
              {pagination.total} đánh giá
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

export default ReviewTable;
