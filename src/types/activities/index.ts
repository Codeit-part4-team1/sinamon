import { Category } from "@/types/common";

export interface GetActivities {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetReviewsParams {
  activityId: number;
  page?: number;
  size?: 3;
}

export interface GetAvailableDateParams {
  activityId: number;
  year: string;
  month: string;
}
export interface PostReservationParams {
  activityId: number;
  scheduleId: number;
  headCount: number;
}
interface UserInfo {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface Review {
  id: number;
  user: UserInfo;
  activityId: number;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
export interface ReviewsData {
  reviews: Review[];
  aveerageRating: number;
  totalCount: number;
}
