import React from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Shield, 
  ShieldOff,
  TrendingUp,
  Calendar,
  UserPlus
} from 'lucide-react';
import type { User } from '../../types/user/user.type';

interface UserSummaryProps {
  stats: {
    total_users: number;
    admin_users: number;
    customer_users: number;
    verified_users: number;
    unverified_users: number;
    new_users_today: number;
    new_users_this_month: number;
  };
  isLoading: boolean;
}

const UserSummary: React.FC<UserSummaryProps> = ({ stats, isLoading }) => {
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
      title: 'Tổng người dùng',
      value: formatNumber(stats.total_users),
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Quản trị viên',
      value: formatNumber(stats.admin_users),
      icon: Shield,
      color: 'bg-red-500',
      textColor: 'text-red-600'
    },
    {
      title: 'Khách hàng',
      value: formatNumber(stats.customer_users),
      icon: UserCheck,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Đã xác thực',
      value: formatNumber(stats.verified_users),
      icon: UserCheck,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Chưa xác thực',
      value: formatNumber(stats.unverified_users),
      icon: UserX,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Mới hôm nay',
      value: formatNumber(stats.new_users_today),
      icon: UserPlus,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Mới tháng này',
      value: formatNumber(stats.new_users_this_month),
      icon: TrendingUp,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600'
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

      {/* Quick Stats */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.total_users > 0 ? ((stats.verified_users / stats.total_users) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Tỷ lệ xác thực</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.total_users > 0 ? ((stats.admin_users / stats.total_users) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Tỷ lệ admin</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.total_users > 0 ? ((stats.customer_users / stats.total_users) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Tỷ lệ khách hàng</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.total_users > 0 ? ((stats.new_users_this_month / stats.total_users) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Tăng trưởng tháng</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSummary; 