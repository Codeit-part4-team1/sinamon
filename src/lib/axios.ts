import axios from "axios";

import { getCookie, setCookie, removeCookie } from "@/utils/cookie";

export const instance = axios.create({
  baseURL: "https://sp-globalnomad-api.vercel.app/2-1",
  timeout: 5000,
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
  async (error) => {
    const originRequest = error.config;
    const refreshToken = getCookie("refreshToken");
    // 401 error (accessToken) 만료로 refreshToken 검증 후 accessToken 발급
    // _retry 속성으로 해당 요청이 재시도가 되었는지 여부를 표시
    if (
      error.response?.status === 401 &&
      !originRequest._retry &&
      refreshToken
    ) {
      removeCookie("accessToken");
      const result = await instance.post(
        "/auth/tokens",
        {},
        {
          headers: { Authorization: `Bearer ${refreshToken}`, _retry: true }
        }
      );
      setCookie("accessToken", result.data.accessToken, {
        path: "/"
      });
      setCookie("refreshToken", result.data.refreshToken, {
        path: "/"
      });

      return instance(originRequest);
    }
    return Promise.reject(error);
  }
);
