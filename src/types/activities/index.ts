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
export interface ActivityList {
  id: number;
  bannerImageUrl: string;
  reviewCount: number;
  rating: number;
  title: string;
  price: number;
}

export type GetActivityDetail = {
  address: string;
  bannerImageUrl: string;
  category: string;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  rating: number;
  reviewCount: number;
  schedules: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  }[];
  subImages: {
    id: number;
    imageUrl: string;
  }[];
  title: string;
  updatedAt: string;
  userId: number;
};

export interface CreatePageSubmitData {
  title: string;
  category: string;
  price: string | number;
  description: string;
  address: string;
  schedules: {
    date: string;
    startTime: string | Date;
    endTime: string | Date;
  }[];
  bannerImageUrl: string;
  subImageUrls?: [];
}
