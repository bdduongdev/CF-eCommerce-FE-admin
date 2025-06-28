import React from 'react';
import { 
  Percent, 
  DollarSign, 
  TrendingUp,
  Package,
  Calendar,
  CheckCircle
} from 'lucide-react';

interface DiscountSummaryProps {
  stats: {
    total_discounts: number;
    active_discounts: number;
    percentage_discounts: number;
    fixed_discounts: number;
    total_savings: number;
    discounts_this_month: number;
  };
  isLoading: boolean;
}

const DiscountSummary: React.FC<DiscountSummaryProps> = ({ stats, isLoading }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
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
      title: 'Tổng discount',
      value: formatNumber(stats.total_discounts),
      icon: Package,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Đang hoạt động',
      value: formatNumber(stats.active_discounts),
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Tổng tiết kiệm',
      value: formatCurrency(stats.total_savings),
      icon: DollarSign,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Tháng này',
      value: formatNumber(stats.discounts_this_month),
      icon: TrendingUp,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  const typeStats = [
    {
      title: 'Giảm theo %',
      value: stats.percentage_discounts,
      total: stats.total_discounts,
      icon: Percent,
      color: 'bg-blue-500'
    },
    {
      title: 'Giảm cố định',
      value: stats.fixed_discounts,
      total: stats.total_discounts,
      icon: DollarSign,
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Type Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Phân loại discount</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {typeStats.map((stat, index) => {
            const Icon = stat.icon;
            const percentage = stat.total > 0 ? ((stat.value / stat.total) * 100).toFixed(1) : '0';
            
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                    <Icon className={`h-5 w-5 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{stat.title}</p>
                    <p className="text-xs text-gray-500">{stat.value} / {stat.total}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{percentage}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.total_discounts > 0 ? ((stats.active_discounts / stats.total_discounts) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Tỷ lệ hoạt động</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.total_discounts > 0 ? ((stats.percentage_discounts / stats.total_discounts) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Giảm theo %</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.total_discounts > 0 ? ((stats.fixed_discounts / stats.total_discounts) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Giảm cố định</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.total_discounts > 0 ? ((stats.discounts_this_month / stats.total_discounts) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Tăng trưởng tháng</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountSummary; 