import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "@/lib/axios";
import { queryKey } from "@/constants/queryKeys";
import { ReservationReviewBodyType } from "@/types/MyReservationTypes";

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
    },
    onError(err: any) {
      alert(err.response.data.message);
    }
  });
  const reviewMyReservations = (id: number) =>
    useMutation({
      mutationFn: (reviewBody: ReservationReviewBodyType) =>
        instance.post(`/my-reservations/${id}/reviews`, reviewBody),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKey.myReservations });
      },
      onError(err: any) {
        alert(err.response.data.message);
      }
    });

  return { getMyReservations, cancelMyReservations, reviewMyReservations };
};
