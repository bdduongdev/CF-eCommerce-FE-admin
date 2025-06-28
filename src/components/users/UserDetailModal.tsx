import React from 'react';
import { X, MapPin, Phone, Mail, Calendar, User, Shield, ShieldOff } from 'lucide-react';
import RoleBadge from './RoleBadge';
import type { User as UserType } from '../../types/user/user.type';

interface UserDetailModalProps {
  user: UserType | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleRole: (user: UserType) => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  user,
  isOpen,
  onClose,
  onToggleRole
}) => {
  if (!isOpen || !user) return null;

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

  const getGenderLabel = (gender: UserType['gender']) => {
    const labels = {
      male: 'Nam',
      female: 'Nữ',
      other: 'Khác'
    };
    return labels[gender] || gender;
  };

  const formatDateOfBirth = (dateString?: string) => {
    if (!dateString) return 'Chưa cập nhật';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Chi tiết người dùng
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* User Avatar and Basic Info */}
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src={user.avatar}
                    alt={user.fullname}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900">{user.fullname}</h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <RoleBadge role={user.role} />
                    <div className="flex items-center">
                      {user.isVerified ? (
                        <Shield className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ShieldOff className="h-4 w-4 text-yellow-500 mr-1" />
                      )}
                      <span className={`text-sm ${user.isVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                        {user.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onToggleRole(user)}
                  className={`px-3 py-1 text-sm rounded-md border ${
                    user.role === 'admin' 
                      ? 'text-orange-600 border-orange-300 hover:bg-orange-50' 
                      : 'text-purple-600 border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  {user.role === 'admin' ? 'Hạ cấp' : 'Nâng cấp'}
                </button>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-3">Thông tin liên hệ</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-3">Thông tin cá nhân</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Giới tính:</span>
                    <span className="ml-2 text-gray-900">{getGenderLabel(user.gender)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Ngày sinh:</span>
                    <span className="ml-2 text-gray-900">{formatDateOfBirth(user.dateOfBirth)}</span>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              {(user.address || user.detailedAddress) && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-3">Địa chỉ</h5>
                  <div className="space-y-1 text-sm">
                    {user.address && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span>{user.address}</span>
                      </div>
                    )}
                    {user.detailedAddress && (
                      <div className="ml-6 text-sm text-gray-600">
                        <div>{user.detailedAddress.street}</div>
                        <div>{user.detailedAddress.ward}, {user.detailedAddress.district}</div>
                        <div>{user.detailedAddress.city}, {user.detailedAddress.country}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Account Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-3">Thông tin tài khoản</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Ngày tạo:</span>
                    <span className="ml-2 text-gray-900">{formatDate(user.created_at)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Cập nhật lần cuối:</span>
                    <span className="ml-2 text-gray-900">{formatDate(user.updated_at)}</span>
                  </div>
                </div>
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

export default UserDetailModal; 