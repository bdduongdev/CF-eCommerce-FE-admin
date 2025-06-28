import React from 'react';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  Truck, 
  Package, 
  XCircle,
  TrendingUp,
  DollarSign,
  Calendar
} from 'lucide-react';
import type { Order } from '../../types/order/order.type';

interface OrderSummaryProps {
  stats: {
    total_orders: number;
    pending_orders: number;
    confirmed_orders: number;
    processing_orders: number;
    shipped_orders: number;
    delivered_orders: number;
    cancelled_orders: number;
    total_revenue: number;
    today_revenue: number;
    this_month_revenue: number;
  };
  isLoading: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ stats, isLoading }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(8)].map((_, index) => (
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
      title: 'Tổng đơn hàng',
      value: formatNumber(stats.total_orders),
      icon: ShoppingBag,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Chờ xác nhận',
      value: formatNumber(stats.pending_orders),
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Đã xác nhận',
      value: formatNumber(stats.confirmed_orders),
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Đang xử lý',
      value: formatNumber(stats.processing_orders),
      icon: Package,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Đã gửi hàng',
      value: formatNumber(stats.shipped_orders),
      icon: Truck,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600'
    },
    {
      title: 'Đã giao hàng',
      value: formatNumber(stats.delivered_orders),
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Đã hủy',
      value: formatNumber(stats.cancelled_orders),
      icon: XCircle,
      color: 'bg-red-500',
      textColor: 'text-red-600'
    },
    {
      title: 'Tổng doanh thu',
      value: formatCurrency(stats.total_revenue),
      icon: DollarSign,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    }
  ];

  const revenueCards = [
    {
      title: 'Doanh thu hôm nay',
      value: formatCurrency(stats.today_revenue),
      icon: Calendar,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Doanh thu tháng này',
      value: formatCurrency(stats.this_month_revenue),
      icon: TrendingUp,
      color: 'bg-green-500',
      textColor: 'text-green-600'
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

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {revenueCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${card.color} bg-opacity-10`}>
                  <Icon className={`h-8 w-8 ${card.textColor}`} />
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
              {stats.total_orders > 0 ? ((stats.delivered_orders / stats.total_orders) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Tỷ lệ giao hàng thành công</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.total_orders > 0 ? ((stats.pending_orders / stats.total_orders) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Đơn hàng chờ xử lý</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.total_orders > 0 ? ((stats.cancelled_orders / stats.total_orders) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Tỷ lệ hủy đơn</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.total_orders > 0 ? formatCurrency(stats.total_revenue / stats.total_orders) : '0₫'}
            </div>
            <div className="text-sm text-gray-600">Giá trị đơn hàng trung bình</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary; 