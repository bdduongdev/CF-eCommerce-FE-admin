import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  size = 'md', 
  showNumber = false,
  className = '' 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3';
      case 'lg':
        return 'w-5 h-5';
      default:
        return 'w-4 h-4';
    }
  };

  const getRatingColor = (starIndex: number) => {
    if (starIndex < Math.floor(rating)) {
      return 'text-yellow-400 fill-current'; // Full star
    } else if (starIndex < rating) {
      return 'text-yellow-400 fill-current'; // Partial star (simplified)
    } else {
      return 'text-gray-300'; // Empty star
    }
  };

  const getRatingText = () => {
    if (rating >= 4.5) return 'Xuất sắc';
    if (rating >= 4.0) return 'Tốt';
    if (rating >= 3.5) return 'Khá';
    if (rating >= 3.0) return 'Trung bình';
    if (rating >= 2.0) return 'Kém';
    return 'Rất kém';
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((starIndex) => (
          <Star
            key={starIndex}
            className={`${getSizeClasses()} ${getRatingColor(starIndex)}`}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm text-gray-600 ml-1">
          {rating.toFixed(1)} ({getRatingText()})
        </span>
      )}
    </div>
  );
};

export default RatingStars; 