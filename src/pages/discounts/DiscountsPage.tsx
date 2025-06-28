import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { useDiscounts, useDiscountStats, useCreateDiscount, useUpdateDiscount, useDeleteDiscount, useToggleDiscountStatus } from '../../hooks/useDiscounts';
import DiscountTable from '../../components/discounts/DiscountTable';
import DiscountSummary from '../../components/discounts/DiscountSummary';
import DiscountForm from '../../components/discounts/DiscountForm';
import type { DiscountFilters, CreateDiscountData, UpdateDiscountData } from '../../types/discount/discount.type';
import type { Discount } from '../../types/discount/discount.type';

export default function DiscountsPage() {
  const [filters, setFilters] = useState<DiscountFilters>({
    page: 1,
    limit: 10,
    sort: 'created_at:desc'
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);

  const { data: discountsData, isLoading: discountsLoading } = useDiscounts(filters);
  const { data: statsData, isLoading: statsLoading } = useDiscountStats();
  
  const createDiscountMutation = useCreateDiscount();
  const updateDiscountMutation = useUpdateDiscount();
  const deleteDiscountMutation = useDeleteDiscount();
  const toggleStatusMutation = useToggleDiscountStatus();

  const handleFiltersChange = (newFilters: DiscountFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleCreateDiscount = () => {
    setSelectedDiscount(null);
    setIsFormOpen(true);
  };

  const handleEditDiscount = (discount: Discount) => {
    setSelectedDiscount(discount);
    setIsFormOpen(true);
  };

  const handleDeleteDiscount = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa discount này?')) {
      try {
        await deleteDiscountMutation.mutateAsync(id);
        alert('Xóa discount thành công!');
      } catch (error) {
        alert('Có lỗi xảy ra khi xóa discount!');
      }
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatusMutation.mutateAsync(id);
      alert('Cập nhật trạng thái thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật trạng thái!');
    }
  };

  const handleFormSubmit = async (data: CreateDiscountData | UpdateDiscountData) => {
    try {
      if (selectedDiscount) {
        await updateDiscountMutation.mutateAsync({ id: selectedDiscount._id, data: data as UpdateDiscountData });
        alert('Cập nhật discount thành công!');
      } else {
        await createDiscountMutation.mutateAsync(data as CreateDiscountData);
        alert('Tạo discount thành công!');
      }
      setIsFormOpen(false);
      setSelectedDiscount(null);
    } catch (error) {
      alert('Có lỗi xảy ra!');
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedDiscount(null);
  };

  return (
    <div className="flex">
      <main className="flex-1 p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý giảm giá</h1>
              <p className="text-gray-600 mt-1">
                Tạo và quản lý các chương trình giảm giá cho sản phẩm
              </p>
            </div>
            <button
              onClick={handleCreateDiscount}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4" />
              Tạo discount
            </button>
          </div>

          {/* Summary Stats */}
          {statsData?.data && (
            <DiscountSummary 
              stats={statsData.data} 
              isLoading={statsLoading} 
            />
          )}

          {/* Discounts Table */}
          {discountsData?.data && (
            <DiscountTable
              discounts={discountsData.data.discounts}
              isLoading={discountsLoading}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              pagination={discountsData.data.pagination}
              onPageChange={handlePageChange}
              onEdit={handleEditDiscount}
              onDelete={handleDeleteDiscount}
              onToggleStatus={handleToggleStatus}
            />
          )}

          {/* Form Modal */}
          <DiscountForm
            discount={selectedDiscount}
            isOpen={isFormOpen}
            onClose={handleCloseForm}
            onSubmit={handleFormSubmit}
            isLoading={createDiscountMutation.isPending || updateDiscountMutation.isPending}
          />

          {/* Info Alert */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Lưu ý</h3>
                <div className="mt-1 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Discount sẽ tự động kích hoạt trong khoảng thời gian đã thiết lập</li>
                    <li>Bạn có thể tạm thời tắt/bật discount bằng nút "Thao tác"</li>
                    <li>Discount đã hết hạn sẽ không còn hiệu lực</li>
                    <li>Giá trị giảm theo phần trăm không được vượt quá 100%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
