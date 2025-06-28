import React, { useState } from 'react';
import OrderTable from '../../components/orders/OrderTable';
import OrderDetailModal from '../../components/orders/OrderDetailModal';
import OrderSummary from '../../components/orders/OrderSummary';
import { useOrders, useOrder, useOrderStats, useCancelOrder } from '../../hooks/useOrders';
import type { Order, OrderFilters } from '../../types/order/order.type';

const OrdersPage: React.FC = () => {
  const [filters, setFilters] = useState<OrderFilters>({
    page: 1,
    limit: 10
  });

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Fetch data
  const { data: ordersData, isLoading: ordersLoading } = useOrders(filters);
  const { data: statsData, isLoading: statsLoading } = useOrderStats();
  const { data: orderDetailData, isLoading: detailLoading } = useOrder(
    selectedOrder?._id || ''
  );

  // Mutations
  const cancelOrderMutation = useCancelOrder();

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    // TODO: Implement edit order functionality
    alert('Chức năng chỉnh sửa đơn hàng sẽ được phát triển sau');
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      try {
        await cancelOrderMutation.mutateAsync({ id: orderId, reason: 'Admin hủy đơn hàng' });
        alert('Hủy đơn hàng thành công');
      } catch (error) {
        alert('Có lỗi xảy ra khi hủy đơn hàng');
      }
    }
  };

  const handleFiltersChange = (newFilters: OrderFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý và theo dõi tất cả đơn hàng của khách hàng
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <OrderSummary 
        stats={statsData?.data || {
          total_orders: 0,
          pending_orders: 0,
          confirmed_orders: 0,
          processing_orders: 0,
          shipped_orders: 0,
          delivered_orders: 0,
          cancelled_orders: 0,
          total_revenue: 0,
          today_revenue: 0,
          this_month_revenue: 0
        }}
        isLoading={statsLoading}
      />

      {/* Order Table */}
      <OrderTable
        orders={ordersData?.data.orders || []}
        isLoading={ordersLoading}
        onViewOrder={handleViewOrder}
        onEditOrder={handleEditOrder}
        onDeleteOrder={handleDeleteOrder}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        pagination={ordersData?.data.pagination || {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1
        }}
        onPageChange={handlePageChange}
      />

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        orderDetails={orderDetailData?.data.order_details || []}
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default OrdersPage;
