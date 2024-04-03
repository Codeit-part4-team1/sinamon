import axios from "axios";

import { getCookie, setCookie, removeCookie } from "@/utils/cookie";
import { postToken } from "@/api/auth";

export const instance = axios.create({
  baseURL: "https://sp-globalnomad-api.vercel.app/2-1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    if (!accessToken && refreshToken) {
      config.headers.Authorization = `Bearer ${refreshToken}`;
      const result = await postToken();
      removeCookie("accessToken");
      setCookie("accessToken", result.accessToken, {
        path: "/",
        maxAge: 60 * 30
      });
      setCookie("refreshToken", result.refreshToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
