import { instance } from "@/lib/axios";

export const deleteActivity = async ({ id }: any) => {
  return await instance.delete(`/my-activities/${id}`);
};
