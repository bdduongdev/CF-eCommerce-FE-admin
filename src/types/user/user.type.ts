export interface DetailedAddress {
  street: string;
  ward: string;
  district: string;
  city: string;
  country: string;
}

export interface User {
  _id: string;
  fullname: string;
  email: string;
  phone?: string;
  avatar: string;
  dateOfBirth?: string;
  gender: 'male' | 'female' | 'other';
  address?: string;
  detailedAddress?: DetailedAddress;
  role: 'admin' | 'customer';
  isVerified: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: {
    users: User[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

export interface SingleUserResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface UpdateUserData {
  role: 'admin' | 'customer';
}

export interface UserFilters {
  page?: number;
  limit?: number;
  role?: User['role'];
  search?: string;
}

export interface UserStats {
  total_users: number;
  admin_users: number;
  customer_users: number;
  verified_users: number;
  unverified_users: number;
  new_users_today: number;
  new_users_this_month: number;
} 