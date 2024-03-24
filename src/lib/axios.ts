import axios from "axios";

import { getCookie } from "@/utils/cookie";

export const instance = axios.create({
  baseURL: "https://sp-globalnomad-api.vercel.app/2-1",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
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

instance.defaults.timeout = 2500;
