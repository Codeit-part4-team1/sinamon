import { instance } from "@/lib/axios";

export const getUser = async () => {
  const res = await instance.get("/users/me");
  return res.data;
};
