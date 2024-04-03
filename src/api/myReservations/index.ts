import { instance } from "@/lib/axios";

export const getMyReservations = async () => {
  const res = await instance.get("/my-reservations?size=999");
  return res.data;
};
