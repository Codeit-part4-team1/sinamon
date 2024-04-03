import { instance } from "@/lib/axios";
import {
  Activity,
  GetAvailableDateParams,
  GetReviewsParams,
  PostReservationParams
} from "@/types/activities";

export const getAcitivity = async (id: any): Promise<Activity> => {
  const res = await instance.get(`/activities/${id}`);
  return res.data;
};

export const activities = {
  getActivitiesList: async (
    method: string,
    sort: string,
    page: number,
    size: number,
    category: string | null
  ) => {
    const res = await instance.get("activities", {
      params: { method, category, sort, page, size }
    });
    return res.data;
  }
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
