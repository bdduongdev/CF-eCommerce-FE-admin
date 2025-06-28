import React, { useState } from 'react';
import { useUsers, useUserStats, useUpdateUserRole } from '../../hooks/useUsers';
import UserTable from '../../components/users/UserTable';
import UserSummary from '../../components/users/UserSummary';
import UserDetailModal from '../../components/users/UserDetailModal';
import TokenDebug from '../../components/debug/TokenDebug';
import type { User, UserFilters } from '../../types/user/user.type';

const Users: React.FC = () => {
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: 10,
  });
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Fetch data
  const { data: usersData, isLoading: usersLoading, error: usersError } = useUsers(filters);
  const { data: statsData, isLoading: statsLoading } = useUserStats();
  const updateUserRoleMutation = useUpdateUserRole();

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    // For now, just open detail modal
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const handleToggleRole = async (user: User) => {
    const newRole = user.role === 'admin' ? 'customer' : 'admin';
    const confirmMessage = user.role === 'admin' 
      ? `Bạn có chắc muốn hạ cấp ${user.fullname} thành khách hàng?`
      : `Bạn có chắc muốn nâng cấp ${user.fullname} thành quản trị viên?`;

    if (window.confirm(confirmMessage)) {
      try {
        await updateUserRoleMutation.mutateAsync({
          id: user._id,
          data: { role: newRole }
        });
        alert(`Đã ${user.role === 'admin' ? 'hạ cấp' : 'nâng cấp'} vai trò thành công!`);
      } catch (error) {
        alert('Có lỗi xảy ra khi cập nhật vai trò!');
        console.error('Error updating user role:', error);
      }
    }
  };

  const handleFiltersChange = (newFilters: UserFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Debug Info */}
      <TokenDebug />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
          <p className="text-gray-600 mt-1">
            Quản lý tài khoản người dùng và phân quyền
          </p>
        </div>
      </div>

      {/* Error Display */}
      {usersError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Lỗi khi tải dữ liệu</h3>
          <p className="text-red-600 mt-1">
            {usersError instanceof Error ? usersError.message : 'Có lỗi xảy ra'}
          </p>
          <p className="text-red-600 mt-1">
            Vui lòng kiểm tra token authentication hoặc đăng nhập lại.
          </p>
        </div>
      )}

      {/* Stats Summary */}
      {statsData && (
        <UserSummary 
          stats={statsData.data} 
          isLoading={statsLoading} 
        />
      )}

      {/* Users Table */}
      {usersData && (
        <UserTable
          users={usersData.data.users}
          isLoading={usersLoading}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onToggleRole={handleToggleRole}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          pagination={usersData.data.pagination}
          onPageChange={handlePageChange}
        />
      )}

      {/* User Detail Modal */}
      <UserDetailModal
        user={selectedUser}
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        onToggleRole={handleToggleRole}
      />
    </div>
  );
};

export default Users;
