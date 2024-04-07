import { instance } from "@/lib/axios";
import {
  Activity,
  CreatePageSubmitData,
  GetAvailableDateParams,
  GetReviewsParams,
  PostReservationParams,
  getActivitiesListParams
} from "@/types/activities";
export const getActivitiesList = async (
  method: string,
  sort: string,
  page: number,
  size: number,
  category: string | null,
  keyword: string
) => {
  const params: getActivitiesListParams = {
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

export const postActivities = async (value: CreatePageSubmitData) => {
  const res = instance.post("/activities", value);
  return res;
};

export const getActivityDetail = async (id: number) => {
  const res = await instance.get(`/activities/${id}`);
  return res.data;
};

export const postCreateImageUrl = async (value: FormData) => {
  const res = await instance.post("/activities/image", value, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

export const getReviews = async ({
  activityId,
  page = 1,
  size = 3
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
