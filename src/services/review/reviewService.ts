import axios from '../../lib/axios';
import type { 
  ReviewResponse, 
  SingleReviewResponse, 
  CreateReviewData, 
  ReviewFilters 
} from '../../types/review/review.type';

// Get all reviews with filters
export const getAllReviews = async (filters: ReviewFilters = {}): Promise<ReviewResponse> => {
  const params = new URLSearchParams();
  
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.product_id) params.append('product_id', filters.product_id);
  if (filters.user_id) params.append('user_id', filters.user_id);
  if (filters.rating) params.append('rating', filters.rating.toString());
  if (filters.sort) params.append('sort', filters.sort);

  const res = await axios.get(`/reviews?${params.toString()}`);
  return res.data;
};

// Create new review (admin only - for testing)
export const createReview = async (data: CreateReviewData): Promise<SingleReviewResponse> => {
  const res = await axios.post('/reviews', data);
  return res.data;
};

// Mock review statistics (vì không có API stats)
export const getReviewStats = async (): Promise<{
  success: boolean;
  message: string;
  data: {
    total_reviews: number;
    average_rating: number;
    five_star_reviews: number;
    four_star_reviews: number;
    three_star_reviews: number;
    two_star_reviews: number;
    one_star_reviews: number;
    reviews_this_month: number;
  };
}> => {
  // Mock data cho demo
  return {
    success: true,
    message: 'Lấy thống kê đánh giá thành công',
    data: {
      total_reviews: 1250,
      average_rating: 4.2,
      five_star_reviews: 450,
      four_star_reviews: 380,
      three_star_reviews: 250,
      two_star_reviews: 120,
      one_star_reviews: 50,
      reviews_this_month: 85
    }
  };
}; 