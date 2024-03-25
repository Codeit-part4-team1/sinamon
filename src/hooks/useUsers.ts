import { useQuery } from "@tanstack/react-query";

import { instance } from "@/lib/axios";
import { getCookie } from "@/utils/cookie";

export const useUsers = {
  get: () =>
    useQuery({
      queryKey: ["user"],
      queryFn: () => instance.get("/users/me"),
      enabled: !!getCookie("accessToken")
    })
};
