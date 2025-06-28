import React from 'react';

interface StatusBadgeProps {
  isActive: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ isActive, className = '' }) => {
  const getStatusConfig = () => {
    if (isActive) {
      return {
        text: 'Hoạt động',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-200'
      };
    } else {
      return {
        text: 'Không hoạt động',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-200'
      };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isActive ? 'bg-green-400' : 'bg-gray-400'}`}></span>
      {config.text}
    </span>
  );
};

export default StatusBadge; 