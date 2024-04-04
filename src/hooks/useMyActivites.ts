import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/lib/axios";
import { queryKey } from "@/constants/queryKeys";
import { getMyActivities } from "@/api/myActivities";

const ApproveBody = {
  status: "confirmed"
};

const DeclineBody = {
  status: "declined"
};

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

export const useMyActivities = (date?: string) => {
  const queryClient = useQueryClient();

  const getMyActivities = () =>
    useQuery({
      queryKey: queryKey.myActivities,
      queryFn: () => instance.get("/my-activities?size=999")
    });

  const GetActivityReservedSchedules = (id: number, date: string) =>
    useQuery({
      queryKey: [queryKey.getReservationByDate, date],
      queryFn: () =>
        instance.get(`/my-activities/${id}/reserved-schedule?date=${date}`)
    });

  const GetActivityReservedSchedulesByTime = (
    id: number,
    scheduleId: string | undefined,
    status: string
  ) =>
    useQuery({
      queryKey: [queryKey.getReservationByScheduleId, scheduleId, status],
      queryFn: () =>
        instance.get(
          `/my-activities/${id}/reservations?scheduleId=${scheduleId}&status=${status}`
        )
    });

  const ApporveReservation = useMutation({
    mutationFn: (data: any) =>
      instance.patch(
        `/my-activities/${data.activityId}/reservations/${data.reservationId}`,
        ApproveBody
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.getReservationByDate, date]
      });
    },
    onError(err: any) {
      alert(err.response.data.message);
    }
  });

  const DeclineReservation = useMutation({
    mutationFn: (data: any) =>
      instance.patch(
        `/my-activities/${data.activityId}/reservations/${data.reservationId}`,
        DeclineBody
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.getReservationByDate, date]
      });
    },
    onError(err: any) {
      alert(err.response.data.message);
    }
  });

  const deleteMyActivity = useMutation({
    mutationFn: (id: number) => instance.delete(`/my-activities/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.myActivities });
    },
    onError(err: any) {
      alert(err.response.data.message);
    }
  });

  return {
    getMyActivities,
    GetActivityReservedSchedules,
    GetActivityReservedSchedulesByTime,
    ApporveReservation,
    DeclineReservation,
    deleteMyActivity
  };
};
