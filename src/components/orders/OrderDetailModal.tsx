import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Calendar, Package, CreditCard } from 'lucide-react';
import StatusBadge from './StatusBadge';
import type { SingleOrderResponse } from '../../types/order/order.type';
import { useUpdateOrderStatusAdmin } from '../../hooks/useOrders';

interface OrderDetailModalProps {
  order: SingleOrderResponse['data']['order'] | null;
  orderDetails: SingleOrderResponse['data']['order_details'];
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  orderDetails,
  isOpen,
  onClose
}) => {
  if (!isOpen || !order) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      cod: 'Thanh toán khi nhận hàng',
      bank_transfer: 'Chuyển khoản ngân hàng',
      credit_card: 'Thẻ tín dụng',
      momo: 'Ví MoMo',
      vnpay: 'VNPay'
    };
    return labels[method] || method;
  };

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [form, setForm] = useState<{
    status: string;
    note: string;
    tracking_number: string;
    estimated_delivery: string;
    cancelled_reason: string;
  }>(() => ({
    status: order?.status || 'pending',
    note: order?.note || '',
    tracking_number: order?.tracking_number || '',
    estimated_delivery: order?.estimated_delivery ? order.estimated_delivery.slice(0, 10) : '',
    cancelled_reason: ''
  }));
  const updateStatusMutation = useUpdateOrderStatusAdmin();

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;
    const data: any = {
      status: form.status,
      note: form.note,
      tracking_number: form.tracking_number,
      estimated_delivery: form.estimated_delivery || undefined,
    };
    if (form.status === 'cancelled') {
      data.cancelled_reason = form.cancelled_reason;
    }
    updateStatusMutation.mutate({ id: order._id, data });
    setShowUpdateForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-4">
                Chi tiết đơn hàng #{order.order_number}
                {order.status !== 'cancelled' && (
                  <button
                    className="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    onClick={() => setShowUpdateForm((v) => !v)}
                  >
                    {showUpdateForm ? 'Đóng cập nhật' : 'Cập nhật trạng thái'}
                  </button>
                )}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {showUpdateForm && (
              <form className="mb-6 space-y-3" onSubmit={handleUpdateStatus}>
                <div>
                  <label className="block text-sm font-medium">Trạng thái mới</label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    required
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="pending">Chờ xác nhận</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="shipped">Đã gửi hàng</option>
                    <option value="delivered">Đã giao hàng</option>
                    <option value="cancelled">Đã hủy</option>
                    <option value="returned">Đã hoàn trả</option>
                  </select>
                </div>
                {form.status === 'cancelled' && (
                  <div>
                    <label className="block text-sm font-medium">Lý do hủy</label>
                    <input
                      className="w-full border rounded px-2 py-1"
                      value={form.cancelled_reason}
                      onChange={e => setForm(f => ({ ...f, cancelled_reason: e.target.value }))}
                      required
                      maxLength={200}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium">Ghi chú</label>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={form.note}
                    onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                    maxLength={500}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Mã vận chuyển</label>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={form.tracking_number}
                    onChange={e => setForm(f => ({ ...f, tracking_number: e.target.value }))}
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Ngày dự kiến giao</label>
                  <input
                    type="date"
                    className="w-full border rounded px-2 py-1"
                    value={form.estimated_delivery}
                    onChange={e => setForm(f => ({ ...f, estimated_delivery: e.target.value }))}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  disabled={updateStatusMutation.isPending}
                >
                  {updateStatusMutation.isPending ? 'Đang cập nhật...' : 'Xác nhận cập nhật'}
                </button>
                {updateStatusMutation.isError && (
                  <div className="text-red-600 text-sm mt-1">Cập nhật thất bại</div>
                )}
                {updateStatusMutation.isSuccess && (
                  <div className="text-green-600 text-sm mt-1">Cập nhật thành công</div>
                )}
              </form>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Information */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Thông tin đơn hàng</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Ngày tạo: {formatDate(order.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span>Trạng thái: <StatusBadge status={order.status} /></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <span>Thanh toán: {getPaymentMethodLabel(order.payment_method)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Trạng thái thanh toán: </span>
                      <span>
                        {order.payment_method === 'cod' ? 'Chờ thanh toán' : 'Đã thanh toán'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Thông tin khách hàng</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{order.user_id.fullname}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{order.user_id.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{order.user_id.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Địa chỉ giao hàng</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <div className="font-medium">{order.shipping_address.fullname}</div>
                        <div>{order.shipping_address.city}</div>
                        <div className="mt-1">SĐT: {order.shipping_address.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items and Summary */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Sản phẩm đã đặt</h4>
                  <div className="space-y-3">
                    {orderDetails.map((detail) => (
                      <div key={detail._id} className="flex gap-3 p-3 bg-white rounded border">
                        <img
                          src={detail.product_info.image_url}
                          alt={detail.product_info.product_name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{detail.product_info.product_name}</div>
                          <div className="text-xs text-gray-500">
                            {detail.product_info.color_name} - {detail.product_info.storage_name}
                          </div>
                          <div className="text-xs text-gray-500">SKU: {detail.product_info.sku}</div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm">Số lượng: {detail.quantity}</span>
                            <span className="font-medium text-sm">{formatCurrency(detail.total_price)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Tổng cộng</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Tạm tính:</span>
                      <span>{formatCurrency(order.subtotal)}</span>
                    </div>
                    {order.discount_amount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Giảm giá:</span>
                        <span>-{formatCurrency(order.discount_amount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Phí vận chuyển:</span>
                      <span>{formatCurrency(order.shipping_fee)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-medium">
                      <span>Tổng cộng:</span>
                      <span>{formatCurrency(order.total_amount)}</span>
                    </div>
                  </div>
                </div>

                {order.note && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Ghi chú</h4>
                    <p className="text-sm text-gray-600">{order.note}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;