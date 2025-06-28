import React from 'react';
import type { Banner } from '../../types/banner/banner.type';

interface StatusBadgeProps {
  isActive: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ isActive, className = '' }) => {
  const getStatusConfig = (isActive: boolean) => {
    if (isActive) {
      return {
        label: 'Đang hoạt động',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-200'
      };
    } else {
      return {
        label: 'Tạm dừng',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-200'
      };
    }
  };

  const config = getStatusConfig(isActive);

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

export default StatusBadge; 