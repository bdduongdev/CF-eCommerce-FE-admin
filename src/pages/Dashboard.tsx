import React from 'react';
import { useQuery } from '@tanstack/react-query';
import StatCard from "../components/dashboard/StatCard";
import RecentOrders from "../components/dashboard/RecentOrders";
import MarketingChart from "../components/dashboard/MarketingChart";
import SalesSummaryChart from "../components/dashboard/SalesSummaryChart";
import { useOrders } from '../hooks/useOrders';
import { useProducts } from '../hooks/useProducts';
import { useUsers } from '../hooks/useUsers';
import { useReviewStats } from '../hooks/useReviews';
import { useDiscountStats } from '../hooks/useDiscounts';
import { useBanners } from '../hooks/useBanners';
import { useCategories } from '../hooks/useCategories';

// app/dashboard/page.tsx

export default function DashboardPage() {
  // Fetch data from various APIs
  const { data: ordersData } = useOrders({ page: 1, limit: 5 });
  const { data: productsData } = useProducts({ page: 1, limit: 10 });
  const { data: usersData } = useUsers({ page: 1, limit: 10 });
  const { data: reviewStats } = useReviewStats();
  const { data: discountStats } = useDiscountStats();
  const { data: bannersData } = useBanners({ page: 1, limit: 5 });
  const { data: categoriesData } = useCategories({ page: 1, limit: 10 });

  // Calculate statistics
  const totalOrders = ordersData?.data?.pagination?.total || 0;
  const totalProducts = productsData?.data?.pagination?.total || 0;
  const totalUsers = usersData?.data?.pagination?.total || 0;
  const totalReviews = reviewStats?.data?.total_reviews || 0;
  const totalDiscounts = discountStats?.data?.total_discounts || 0;
  const totalBanners = bannersData?.data?.pagination?.total || 0;
  const totalCategories = categoriesData?.data?.pagination?.total || 0;

  // Calculate revenue (mock data for now)
  const totalRevenue = totalOrders * 2500000; // Mock average order value
  const revenueChange = '+12.5%'; // Mock change

  // Get recent orders for the chart
  const recentOrders = ordersData?.data?.orders || [];
  const recentProducts = productsData?.data?.products || [];

  return (
    <div className="flex">
      <main className="flex-1 p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Tổng quan về hoạt động của hệ thống
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Doanh thu" 
              value={new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(totalRevenue)}
              change={revenueChange}
              icon="💰"
            />
            <StatCard 
              title="Khách hàng" 
              value={totalUsers.toLocaleString('vi-VN')} 
              change="+5.2%" 
              icon="👥"
            />
            <StatCard 
              title="Đơn hàng" 
              value={totalOrders.toLocaleString('vi-VN')} 
              change="+8.1%" 
              icon="📦"
            />
            <StatCard 
              title="Sản phẩm" 
              value={totalProducts.toLocaleString('vi-VN')} 
              change="+3.4%" 
              highlight 
              icon="🛍️"
            />
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Đánh giá" 
              value={totalReviews.toLocaleString('vi-VN')} 
              change={`${reviewStats?.data?.average_rating?.toFixed(1) || 0}⭐`}
              icon="⭐"
            />
            <StatCard 
              title="Giảm giá" 
              value={totalDiscounts.toLocaleString('vi-VN')} 
              change={`${discountStats?.data?.active_discounts || 0} hoạt động`}
              icon="🎯"
            />
            <StatCard 
              title="Banner" 
              value={totalBanners.toLocaleString('vi-VN')} 
              change="+2.1%" 
              icon="🖼️"
            />
            <StatCard 
              title="Danh mục" 
              value={totalCategories.toLocaleString('vi-VN')} 
              change="+1.8%" 
              icon="📁"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Biểu đồ Marketing</h3>
              <MarketingChart />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tóm tắt Doanh số</h3>
              <SalesSummaryChart />
            </div>
          </div>

          {/* Recent Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Đơn hàng gần đây</h3>
              <RecentOrders />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sản phẩm mới</h3>
              <div className="space-y-3">
                {recentProducts.slice(0, 5).map((product) => (
                  <div key={product._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-medium">
                        {product.product?.product_name?.charAt(0) || 'P'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {product.product?.product_name || 'Không có tên'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.product?.category?.category_name || 'Không có danh mục'}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(product.price || 0)}
                    </div>
                  </div>
                ))}
                {recentProducts.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    Không có sản phẩm nào
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê nhanh</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {reviewStats?.data?.average_rating?.toFixed(1) || 0}
                </div>
                <div className="text-sm text-gray-600">Đánh giá trung bình</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {discountStats?.data?.active_discounts || 0}
                </div>
                <div className="text-sm text-gray-600">Discount đang hoạt động</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0}
                </div>
                <div className="text-sm text-gray-600">Giá trị đơn hàng TB (VNĐ)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {totalProducts > 0 ? Math.round(totalOrders / totalProducts * 100) / 100 : 0}
                </div>
                <div className="text-sm text-gray-600">Tỷ lệ đơn hàng/SP</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

