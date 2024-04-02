import { instance } from "@/lib/axios";

export const deleteActivity = async ({ id }: any) => {
  return await instance.delete(`/my-activities/${id}`);
};

export const getMyActivities = async () => {
  const res = await instance.get("/my-activities?size=999");
  return res.data;
};
