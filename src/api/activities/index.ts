import { instance } from "@/lib/axios";
import {
  Activity,
  GetAvailableDateParams,
  GetReviewsParams,
  PostReservationParams
} from "@/types/activities";
export const getActivitiesList = async (
  method: string,
  sort: string,
  page: number,
  size: number,
  category: string | null,
  keyword: string
) => {
  const params: any = {
    method: method,
    category: category,
    sort: sort,
    page: page,
    size: size
  };

  keyword && (params["keyword"] = keyword);

  const res = await instance.get("activities", {
    params
  });
  return res.data;
};

export const getCurationActivitiesList = async (
  method: string,
  sort: string,
  size: number
) => {
  const res = await instance.get("activities", {
    params: { method, sort, size }
  });
  return res.data;
};

export const postActivities = async (value: any) => {
  const res = instance.post("/activities", value);
  return res;
};

export const getActivityDetail = async (id: number) => {
  const res = await instance.get(`/activities/${id}`);
  return res.data;
};

// 체험 예약 가능일 조회 api

// 체험 리뷰 조회 api

// 체험 예약 신청 api

export const postCreateImageUrl = async (value: any) => {
  const res = await instance.post("/activities/image", value, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

export const getReviews = async ({
  activityId,
  page,
  size
}: GetReviewsParams) => {
  const res = await instance.get(
    `/activities/${activityId}/reviews?page=${page}&size=${size}`
  );
  return res.data;
};

export const getAvailableDate = async ({
  activityId,
  year,
  month
}: GetAvailableDateParams) => {
  const res = await instance.get(
    `/activities/${activityId}/available-schedule?year=${year}&month=${month}`
  );
  return res.data;
};
export const postReservation = async ({
  activityId,
  scheduleId,
  headCount
}: PostReservationParams) => {
  const res = await instance.post(`/activities/${activityId}/reservations`, {
    scheduleId,
    headCount
  });
  return res;
};
