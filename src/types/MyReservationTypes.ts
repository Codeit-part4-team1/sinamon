import { Status } from "@/types/common";

export interface Activity {
  bannerImageUrl: string;
  title: string;
  id: number;
}

export interface ReservationType {
  activity: Activity;
  scheduleId: number;
  id: number;
  teamId: string;
  userId: number;
  status: Status;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationReviewBodyType {
  rating: number;
  content: string;
}
