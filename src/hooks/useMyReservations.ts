import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "@/lib/axios";
import { queryKey } from "@/constants/queryKeys";
const CancelBody = {
  status: "canceled"
};

export const useMyReservations = () => {
  const queryClient = useQueryClient();

  const getMyReservations = () =>
    useQuery({
      queryKey: queryKey.myReservations,
      queryFn: () => instance.get("/my-reservations?size=999")
    });

  const cancelMyReservations = useMutation({
    mutationFn: (id: number) =>
      instance.patch(`/my-reservations/${id}`, CancelBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.myReservations });
    }
  });

  return { getMyReservations, cancelMyReservations };
};
