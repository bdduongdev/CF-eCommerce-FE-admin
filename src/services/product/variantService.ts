import axios from '../../lib/axios';

// Lấy tất cả biến thể của 1 sản phẩm gốc
export const getAllVariants = async (productId: string) => {
  const res = await axios.get(`/products/${productId}`);
  return res.data;
};

// Lấy chi tiết 1 biến thể
export const getVariantById = async (id: string) => {
  const res = await axios.get(`/products/${id}`);
  return res.data;
};

// Tạo mới biến thể
export const createVariant = async (data: any) => {
  const res = await axios.post('/products/', data);
  return res.data;
};

// Cập nhật biến thể
export const updateVariant = async (id: string, data: any) => {
  const res = await axios.patch(`/products/${id}`, data);
  return res.data;
};

// Xoá mềm biến thể
export const deleteVariant = async (id: string) => {
  const res = await axios.delete(`/products/soft-delete/${id}`);
  return res.data;
};

// Khôi phục biến thể đã xoá
export const restoreVariant = async (id: string) => {
  const res = await axios.patch(`/products/restore/${id}`);
  return res.data;
}; 