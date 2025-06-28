import React from 'react';
import type { User } from '../../types/user/user.type';

interface RoleBadgeProps {
  role: User['role'];
  className?: string;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className = '' }) => {
  const getRoleConfig = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return {
          label: 'Quản trị viên',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-200'
        };
      case 'customer':
        return {
          label: 'Khách hàng',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-200'
        };
      default:
        return {
          label: 'Không xác định',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200'
        };
    }
  };

  const config = getRoleConfig(role);

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${config.bgColor} ${config.textColor} ${config.borderColor} border
        ${className}
      `}
    >
      {config.label}
    </span>
  );
};

export default RoleBadge; 