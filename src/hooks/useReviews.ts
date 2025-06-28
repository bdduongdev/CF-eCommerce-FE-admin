import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAllReviews, 
  createReview, 
  getReviewStats 
} from '../services/review/reviewService';
import type { ReviewFilters, CreateReviewData } from '../types/review/review.type';

// Get all reviews
export const useReviews = (filters: ReviewFilters = {}) => {
  return useQuery({
    queryKey: ['reviews', filters],
    queryFn: () => getAllReviews(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get review statistics
export const useReviewStats = () => {
  return useQuery({
    queryKey: ['review-stats'],
    queryFn: () => getReviewStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create review
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateReviewData) => createReview(data),
    onSuccess: () => {
      // Invalidate and refetch reviews
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['review-stats'] });
    },
  });
}; 