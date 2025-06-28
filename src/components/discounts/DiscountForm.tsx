import React, { useState, useEffect } from 'react';
import { X, Package, Calendar, Percent, DollarSign } from 'lucide-react';
import type { Discount, CreateDiscountData, UpdateDiscountData } from '../../types/discount/discount.type';

interface DiscountFormProps {
  discount?: Discount;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateDiscountData | UpdateDiscountData) => void;
  isLoading?: boolean;
}

const DiscountForm: React.FC<DiscountFormProps> = ({
  discount,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<CreateDiscountData>({
    product_id: '',
    discount_type: 'percentage',
    discount_value: 0,
    start_date: '',
    end_date: '',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (discount) {
      setFormData({
        product_id: discount.product_id._id,
        discount_type: discount.discount_type,
        discount_value: discount.discount_value,
        start_date: discount.start_date.split('T')[0],
        end_date: discount.end_date.split('T')[0],
        description: discount.description || ''
      });
    } else {
      setFormData({
        product_id: '',
        discount_type: 'percentage',
        discount_value: 0,
        start_date: '',
        end_date: '',
        description: ''
      });
    }
    setErrors({});
  }, [discount, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.product_id) {
      newErrors.product_id = 'Vui lòng chọn sản phẩm';
    }

    if (!formData.discount_value || formData.discount_value <= 0) {
      newErrors.discount_value = 'Giá trị giảm giá phải lớn hơn 0';
    }

    if (formData.discount_type === 'percentage' && formData.discount_value > 100) {
      newErrors.discount_value = 'Phần trăm giảm giá không được vượt quá 100%';
    }

    if (!formData.start_date) {
      newErrors.start_date = 'Vui lòng chọn ngày bắt đầu';
    }

    if (!formData.end_date) {
      newErrors.end_date = 'Vui lòng chọn ngày kết thúc';
    }

    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);
      
      if (startDate >= endDate) {
        newErrors.end_date = 'Ngày kết thúc phải sau ngày bắt đầu';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submitData = {
        ...formData,
        start_date: new Date(formData.start_date).toISOString(),
        end_date: new Date(formData.end_date).toISOString()
      };
      
      onSubmit(submitData);
    }
  };

  const handleInputChange = (field: keyof CreateDiscountData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {discount ? 'Chỉnh sửa discount' : 'Tạo discount mới'}
              </h2>
              <p className="text-sm text-gray-600">
                {discount ? 'Cập nhật thông tin discount' : 'Thêm discount cho sản phẩm'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sản phẩm <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.product_id}
              onChange={(e) => handleInputChange('product_id', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.product_id ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Chọn sản phẩm</option>
              <option value="product1">iPhone 15 Pro Max</option>
              <option value="product2">Samsung Galaxy S24</option>
              <option value="product3">MacBook Pro M3</option>
              <option value="product4">iPad Pro 12.9</option>
            </select>
            {errors.product_id && (
              <p className="mt-1 text-sm text-red-600">{errors.product_id}</p>
            )}
          </div>

          {/* Discount Type and Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại giảm giá <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleInputChange('discount_type', 'percentage')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg transition-colors ${
                    formData.discount_type === 'percentage'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Percent className="h-4 w-4" />
                  Phần trăm
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('discount_type', 'fixed')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg transition-colors ${
                    formData.discount_type === 'fixed'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <DollarSign className="h-4 w-4" />
                  Cố định
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giá trị giảm <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.discount_value}
                  onChange={(e) => handleInputChange('discount_value', parseFloat(e.target.value) || 0)}
                  min="0"
                  max={formData.discount_type === 'percentage' ? 100 : undefined}
                  step={formData.discount_type === 'percentage' ? 1 : 1000}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.discount_value ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={formData.discount_type === 'percentage' ? '0-100' : '0'}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {formData.discount_type === 'percentage' ? '%' : 'VNĐ'}
                </span>
              </div>
              {errors.discount_value && (
                <p className="mt-1 text-sm text-red-600">{errors.discount_value}</p>
              )}
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày bắt đầu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleInputChange('start_date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.start_date ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.start_date && (
                <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày kết thúc <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => handleInputChange('end_date', e.target.value)}
                  min={formData.start_date || new Date().toISOString().split('T')[0]}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.end_date ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.end_date && (
                <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập mô tả cho discount (tùy chọn)"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Đang xử lý...' : (discount ? 'Cập nhật' : 'Tạo')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiscountForm;
