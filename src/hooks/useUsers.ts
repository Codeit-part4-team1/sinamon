import { useQuery } from "@tanstack/react-query";

import { instance } from "@/lib/axios";

export const useUsers = {
  get: () =>
    useQuery({
      queryKey: ["user"],
      queryFn: () => instance.get("/users/me")
    })
};
