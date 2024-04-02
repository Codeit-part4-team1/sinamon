import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "@/utils/cookie";

import { instance } from "@/lib/axios";

export const myNotifications = {
  get: () =>
    useQuery({
      queryKey: ["myNotifications"],
      queryFn: () => instance.get("/my-notifications"),
      enabled: !!getCookie("accessToken")
    }),
  delete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (notificationId) =>
        instance.delete(`/my-notifications/${notificationId}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["myNotifications"] });
      }
    });
  }
};
