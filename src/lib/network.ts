import { parse } from "cookie";

const getAccessToken = () => {
  if (typeof window !== "object") return;
  const cookies = parse(document.cookie);
  const accessToken = cookies.accessToken;
  return accessToken;
};

export const getHeader = () => {
  return {
    Authorization: `Bearer ${getAccessToken()}`,
    "Content-Type": "application/json"
  };
};
