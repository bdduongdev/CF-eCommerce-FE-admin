import React from 'react';
import { 
  Star, 
  MessageSquare, 
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';
import RatingStars from './RatingStars';
import type { Review } from '../../types/review/review.type';

interface ReviewSummaryProps {
  stats: {
    total_reviews: number;
    average_rating: number;
    five_star_reviews: number;
    four_star_reviews: number;
    three_star_reviews: number;
    two_star_reviews: number;
    one_star_reviews: number;
    reviews_this_month: number;
  };
  isLoading: boolean;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ stats, isLoading }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const getRatingPercentage = (count: number) => {
    return stats.total_reviews > 0 ? ((count / stats.total_reviews) * 100).toFixed(1) : '0';
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border animate-pulse">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Tổng đánh giá',
      value: formatNumber(stats.total_reviews),
      icon: MessageSquare,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Đánh giá trung bình',
      value: stats.average_rating.toFixed(1),
      icon: Star,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      showStars: true
    },
    {
      title: 'Đánh giá tháng này',
      value: formatNumber(stats.reviews_this_month),
      icon: TrendingUp,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    }
  ];

  const ratingBars = [
    { stars: 5, count: stats.five_star_reviews, color: 'bg-green-500' },
    { stars: 4, count: stats.four_star_reviews, color: 'bg-blue-500' },
    { stars: 3, count: stats.three_star_reviews, color: 'bg-yellow-500' },
    { stars: 2, count: stats.two_star_reviews, color: 'bg-orange-500' },
    { stars: 1, count: stats.one_star_reviews, color: 'bg-red-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${card.color} bg-opacity-10`}>
                  <Icon className={`h-6 w-6 ${card.textColor}`} />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-gray-900">{card.value}</p>
                    {card.showStars && (
                      <RatingStars rating={stats.average_rating} size="sm" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rating Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Phân bố đánh giá</h3>
        <div className="space-y-3">
          {ratingBars.map((bar) => (
            <div key={bar.stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium text-gray-700">{bar.stars}</span>
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${bar.color}`}
                  style={{ width: `${getRatingPercentage(bar.count)}%` }}
                ></div>
              </div>
              <div className="w-20 text-right">
                <span className="text-sm text-gray-600">{formatNumber(bar.count)}</span>
                <span className="text-xs text-gray-500 ml-1">({getRatingPercentage(bar.count)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {getRatingPercentage(stats.five_star_reviews + stats.four_star_reviews)}%
            </div>
            <div className="text-sm text-gray-600">Đánh giá tích cực (4-5 sao)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {getRatingPercentage(stats.three_star_reviews)}%
            </div>
            <div className="text-sm text-gray-600">Đánh giá trung bình</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {getRatingPercentage(stats.one_star_reviews + stats.two_star_reviews)}%
            </div>
            <div className="text-sm text-gray-600">Đánh giá tiêu cực (1-2 sao)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.total_reviews > 0 ? ((stats.reviews_this_month / stats.total_reviews) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Tăng trưởng tháng</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary; 