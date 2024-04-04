import { instance } from "@/lib/axios";
import { tokenInstance } from "@/lib/tokenAxios";
import { SignInRequest } from "@/types/auth";

export const postToken = async () => {
  const res = await tokenInstance.post("/auth/tokens");
  return res.data;
};

export const login = async (value: SignInRequest) => {
  const res = await instance.post("/auth/login", value);
  return res.data;
};
