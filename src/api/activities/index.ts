import { instance } from "@/lib/axios";
import { Activity } from "@/types/activities";

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
    category: any
    // category: string | null
  ) => {
    const res = await instance.get("activities", {
      params: { method, category, sort, page, size }
    });
    return res.data;
  }
};
