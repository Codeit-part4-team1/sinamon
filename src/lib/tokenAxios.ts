import axios from "axios";

import { getCookie } from "@/utils/cookie";

export const tokenInstance = axios.create({
  baseURL: "https://sp-globalnomad-api.vercel.app/2-1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

tokenInstance.interceptors.request.use(
  (config) => {
    const refreshToken = getCookie("refreshToken");
    config.headers["Authorization"] = `Bearer ${refreshToken}`;
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);
