import { parse } from "cookie";

const getAccessToken = () => {
  if (typeof window !== "object") return;
  const cookies = parse(document.cookie);
  const accessToken = cookies.accessToken;
  return accessToken;
};

const getRefreshToken = () => {
  if (typeof window !== "object") return;
  const cookies = parse(document.cookie);
  const refreshToken = cookies.refreshToken;
  return refreshToken;
};

export const getHeader = () => {
  return {
    Authorization: `Bearer ${getAccessToken()}`,
    "Content-Type": "application/json"
  };
};
