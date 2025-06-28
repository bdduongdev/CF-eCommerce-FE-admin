import React from 'react';
import { 
  Image, 
  Play, 
  Pause, 
  Trash2,
  TrendingUp,
  Calendar
} from 'lucide-react';
import type { Banner } from '../../types/banner/banner.type';

interface BannerSummaryProps {
  stats: {
    total_banners: number;
    active_banners: number;
    inactive_banners: number;
    deleted_banners: number;
    banners_this_month: number;
  };
  isLoading: boolean;
}

const BannerSummary: React.FC<BannerSummaryProps> = ({ stats, isLoading }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[...Array(5)].map((_, index) => (
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
      title: 'Tổng banner',
      value: formatNumber(stats.total_banners),
      icon: Image,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Đang hoạt động',
      value: formatNumber(stats.active_banners),
      icon: Play,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Tạm dừng',
      value: formatNumber(stats.inactive_banners),
      icon: Pause,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Đã xóa',
      value: formatNumber(stats.deleted_banners),
      icon: Trash2,
      color: 'bg-red-500',
      textColor: 'text-red-600'
    },
    {
      title: 'Tháng này',
      value: formatNumber(stats.banners_this_month),
      icon: TrendingUp,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                  <p className="text-lg font-semibold text-gray-900">{card.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.total_banners > 0 ? ((stats.active_banners / stats.total_banners) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Tỷ lệ hoạt động</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.total_banners > 0 ? ((stats.active_banners / stats.total_banners) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Tỷ lệ kích hoạt</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.total_banners > 0 ? ((stats.deleted_banners / stats.total_banners) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Tỷ lệ đã xóa</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.total_banners > 0 ? ((stats.banners_this_month / stats.total_banners) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Tăng trưởng tháng</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSummary; 