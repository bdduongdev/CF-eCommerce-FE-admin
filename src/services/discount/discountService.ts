import axios from '../../lib/axios';
import type { 
  DiscountResponse, 
  SingleDiscountResponse, 
  CreateDiscountData, 
  UpdateDiscountData,
  DiscountFilters 
} from '../../types/discount/discount.type';

// Mock data cho demo
const mockDiscounts = [
  {
    _id: '1',
    product_id: {
      _id: 'product1',
      product_name: 'iPhone 15 Pro Max'
    },
    discount_type: 'percentage' as const,
    discount_value: 15,
    start_date: '2024-01-01T00:00:00.000Z',
    end_date: '2024-12-31T23:59:59.000Z',
    description: 'Giảm giá 15% cho iPhone 15 Pro Max',
    created_at: '2024-01-01T00:00:00.000Z',
    is_active: true
  },
  {
    _id: '2',
    product_id: {
      _id: 'product2',
      product_name: 'Samsung Galaxy S24'
    },
    discount_type: 'fixed' as const,
    discount_value: 2000000,
    start_date: '2024-02-01T00:00:00.000Z',
    end_date: '2024-06-30T23:59:59.000Z',
    description: 'Giảm giá 2 triệu cho Samsung Galaxy S24',
    created_at: '2024-02-01T00:00:00.000Z',
    is_active: true
  },
  {
    _id: '3',
    product_id: {
      _id: 'product3',
      product_name: 'MacBook Pro M3'
    },
    discount_type: 'percentage' as const,
    discount_value: 10,
    start_date: '2024-03-01T00:00:00.000Z',
    end_date: '2024-08-31T23:59:59.000Z',
    description: 'Giảm giá 10% cho MacBook Pro M3',
    created_at: '2024-03-01T00:00:00.000Z',
    is_active: false
  }
];

// Get all discounts with filters
export const getAllDiscounts = async (filters: DiscountFilters = {}): Promise<DiscountResponse> => {
  // Mock implementation
  let filteredDiscounts = [...mockDiscounts];
  
  if (filters.discount_type) {
    filteredDiscounts = filteredDiscounts.filter(d => d.discount_type === filters.discount_type);
  }
  
  if (filters.is_active !== undefined) {
    filteredDiscounts = filteredDiscounts.filter(d => d.is_active === filters.is_active);
  }
  
  if (filters.product_id) {
    filteredDiscounts = filteredDiscounts.filter(d => d.product_id._id === filters.product_id);
  }
  
  // Sort
  if (filters.sort) {
    const [field, order] = filters.sort.split(':');
    filteredDiscounts.sort((a, b) => {
      if (field === 'created_at') {
        return order === 'desc' 
          ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return 0;
    });
  } else {
    filteredDiscounts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
  
  // Pagination
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;
  const paginatedDiscounts = filteredDiscounts.slice(skip, skip + limit);
  
  return {
    success: true,
    message: 'Lấy danh sách discount thành công',
    data: {
      discounts: paginatedDiscounts,
      pagination: {
        total: filteredDiscounts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredDiscounts.length / limit)
      }
    }
  };
};

// Get discount by ID
export const getDiscountById = async (id: string): Promise<SingleDiscountResponse> => {
  const discount = mockDiscounts.find(d => d._id === id);
  
  if (!discount) {
    throw new Error('Discount không tồn tại');
  }
  
  return {
    success: true,
    message: 'Lấy thông tin discount thành công',
    data: discount
  };
};

// Create new discount
export const createDiscount = async (data: CreateDiscountData): Promise<SingleDiscountResponse> => {
  const newDiscount = {
    _id: Date.now().toString(),
    product_id: {
      _id: data.product_id,
      product_name: 'Product Name' // Mock product name
    },
    ...data,
    created_at: new Date().toISOString(),
    is_active: true
  };
  
  mockDiscounts.push(newDiscount);
  
  return {
    success: true,
    message: 'Tạo discount thành công',
    data: newDiscount
  };
};

// Update discount
export const updateDiscount = async (id: string, data: UpdateDiscountData): Promise<SingleDiscountResponse> => {
  const discountIndex = mockDiscounts.findIndex(d => d._id === id);
  
  if (discountIndex === -1) {
    throw new Error('Discount không tồn tại');
  }
  
  mockDiscounts[discountIndex] = {
    ...mockDiscounts[discountIndex],
    ...data
  };
  
  return {
    success: true,
    message: 'Cập nhật discount thành công',
    data: mockDiscounts[discountIndex]
  };
};

// Delete discount (soft delete)
export const deleteDiscount = async (id: string): Promise<{ success: boolean; message: string }> => {
  const discountIndex = mockDiscounts.findIndex(d => d._id === id);
  
  if (discountIndex === -1) {
    throw new Error('Discount không tồn tại');
  }
  
  mockDiscounts[discountIndex].is_active = false;
  
  return {
    success: true,
    message: 'Xóa discount thành công'
  };
};

// Toggle discount status
export const toggleDiscountStatus = async (id: string): Promise<SingleDiscountResponse> => {
  const discountIndex = mockDiscounts.findIndex(d => d._id === id);
  
  if (discountIndex === -1) {
    throw new Error('Discount không tồn tại');
  }
  
  mockDiscounts[discountIndex].is_active = !mockDiscounts[discountIndex].is_active;
  
  return {
    success: true,
    message: 'Cập nhật trạng thái discount thành công',
    data: mockDiscounts[discountIndex]
  };
};

// Get discount statistics
export const getDiscountStats = async (): Promise<{
  success: boolean;
  message: string;
  data: {
    total_discounts: number;
    active_discounts: number;
    percentage_discounts: number;
    fixed_discounts: number;
    total_savings: number;
    discounts_this_month: number;
  };
}> => {
  const total_discounts = mockDiscounts.length;
  const active_discounts = mockDiscounts.filter(d => d.is_active).length;
  const percentage_discounts = mockDiscounts.filter(d => d.discount_type === 'percentage').length;
  const fixed_discounts = mockDiscounts.filter(d => d.discount_type === 'fixed').length;
  
  // Mock calculations
  const total_savings = mockDiscounts.reduce((sum, d) => {
    if (d.discount_type === 'percentage') {
      return sum + (d.discount_value * 100000); // Mock calculation
    }
    return sum + d.discount_value;
  }, 0);
  
  const thisMonth = new Date().getMonth();
  const discounts_this_month = mockDiscounts.filter(d => 
    new Date(d.created_at).getMonth() === thisMonth
  ).length;
  
  return {
    success: true,
    message: 'Lấy thống kê discount thành công',
    data: {
      total_discounts,
      active_discounts,
      percentage_discounts,
      fixed_discounts,
      total_savings,
      discounts_this_month
    }
  };
}; 