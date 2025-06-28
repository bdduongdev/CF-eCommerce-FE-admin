export interface Review {
  _id: string;
  user_id: {
    _id: string;
    fullname: string;
    email: string;
  } | null;
  product_id: {
    _id: string;
    product_name: string;
  } | null;
  rating: number;
  comment?: string;
  review_date: string;
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data: {
    reviews: Review[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface SingleReviewResponse {
  success: boolean;
  message: string;
  data: Review;
}

export interface CreateReviewData {
  product_id: string;
  rating: number;
  comment?: string;
}

export interface ReviewFilters {
  page?: number;
  limit?: number;
  product_id?: string;
  user_id?: string;
  rating?: number;
  sort?: string;
}

export interface ReviewStats {
  total_reviews: number;
  average_rating: number;
  five_star_reviews: number;
  four_star_reviews: number;
  three_star_reviews: number;
  two_star_reviews: number;
  one_star_reviews: number;
  reviews_this_month: number;
} 