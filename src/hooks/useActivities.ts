import { useQuery } from "@tanstack/react-query";

import { instance } from "@/lib/axios";

export const useActivities = {
  get: () =>
    useQuery({
      queryKey: ["activities"],
      queryFn: () => instance.get("/activities?method=cursor&page=1&size=20")
    })
};
