import React, { useState } from "react";
import { useReviews, useReviewStats } from '../../hooks/useReviews';
import ReviewTable from '../../components/reviews/ReviewTable';
import ReviewSummary from '../../components/reviews/ReviewSummary';
import type { ReviewFilters } from '../../types/review/review.type';

export default function ReviewsPage() {
  const [filters, setFilters] = useState<ReviewFilters>({
    page: 1,
    limit: 10,
    sort: 'review_date:desc'
  });

  const { data: reviewsData, isLoading: reviewsLoading } = useReviews(filters);
  const { data: statsData, isLoading: statsLoading } = useReviewStats();

  const handleFiltersChange = (newFilters: ReviewFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  return (
    <div className="flex">
      <main className="flex-1 p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý đánh giá</h1>
              <p className="text-gray-600 mt-1">
                Xem và quản lý tất cả đánh giá từ khách hàng
              </p>
            </div>
          </div>

          {/* Summary Stats */}
          {statsData?.data && (
            <ReviewSummary 
              stats={statsData.data} 
              isLoading={statsLoading} 
            />
          )}

          {/* Reviews Table */}
          {reviewsData?.data && (
            <ReviewTable
              reviews={reviewsData.data.reviews}
              isLoading={reviewsLoading}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              pagination={reviewsData.data.pagination}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </div>
  );
}
