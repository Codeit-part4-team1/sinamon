import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/lib/axios";

import { queryKey } from "@/constants/queryKeys";
import { useRouter } from "next/router";
import { getMyActivities } from "@/api/myActivities";

export const patchMyActivityEdit = (
  id: number,
  handleSuccess: () => void,
  handleError: (status: number) => void
) =>
  useMutation({
    mutationFn: (value: any) => instance.patch(`/my-activities/${id}`, value),
    onSuccess(data) {
      console.log(data);
      handleSuccess();
    },
    onError(err: any) {
      console.log(err);
      handleError(err.response.status);
    }
  });

export const useGetMyActivities = () =>
  useQuery({
    queryKey: queryKey.myActivities,
    queryFn: () => getMyActivities()
  });

export const useMyActivities = () => {
  const queryClient = useQueryClient();

  const deleteMyActivity = useMutation({
    mutationFn: (id: number) => instance.delete(`/my-activities/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.myActivities });
    }
  });

  return { patchMyActivityEdit, getMyActivities, deleteMyActivity };
};
