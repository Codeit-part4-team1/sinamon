import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/lib/axios";

import { queryKey } from "@/constants/queryKeys";
import { useRouter } from "next/router";

export const patchMyActivityEdit = (
  id: number,
  handleError: (status: number) => void
) =>
  useMutation({
    mutationFn: (value: any) => instance.patch(`/my-activities/${id}`, value),
    onSuccess(data) {
      console.log(data);
    },
    onError(err: any) {
      console.log(err);
      handleError(err.response.status);
    }
  });

export const useMyActivities = () => {
  const queryClient = useQueryClient();

  const getMyActivities = () =>
    useQuery({
      queryKey: queryKey.myActivities,
      queryFn: () => instance.get("/my-activities?size=999")
    });

  const deleteMyActivity = useMutation({
    mutationFn: (id: number) => instance.delete(`/my-activities/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.myActivities });
    }
  });

  return { patchMyActivityEdit, getMyActivities, deleteMyActivity };
};
