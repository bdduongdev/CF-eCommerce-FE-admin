import axios from '../../lib/axios';
import type { 
  UserResponse, 
  SingleUserResponse, 
  UpdateUserData, 
  UserFilters 
} from '../../types/user/user.type';

// Get all users with filters
export const getAllUsers = async (filters: UserFilters = {}): Promise<UserResponse> => {
  const params = new URLSearchParams();
  
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.role) params.append('role', filters.role);
  if (filters.search) params.append('search', filters.search);

  const res = await axios.get(`/users?${params.toString()}`);
  return res.data;
};

// Get user by ID
export const getUserById = async (id: string): Promise<SingleUserResponse> => {
  const res = await axios.get(`/users/${id}`);
  return res.data;
};

// Update user role
export const updateUserRole = async (id: string, data: UpdateUserData): Promise<SingleUserResponse> => {
  const res = await axios.put(`/users/${id}`, data);
  return res.data;
};

// Mock user statistics (vì không có API stats)
export const getUserStats = async (): Promise<{
  success: boolean;
  message: string;
  data: {
    total_users: number;
    admin_users: number;
    customer_users: number;
    verified_users: number;
    unverified_users: number;
    new_users_today: number;
    new_users_this_month: number;
  };
}> => {
  // Mock data cho demo
  return {
    success: true,
    message: 'Lấy thống kê người dùng thành công',
    data: {
      total_users: 150,
      admin_users: 5,
      customer_users: 145,
      verified_users: 120,
      unverified_users: 30,
      new_users_today: 3,
      new_users_this_month: 25
    }
  };
}; 