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
    onSuccess() {
      handleSuccess();
    },
    onError(err: any) {
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

  const getMyActivities = () =>
    useQuery({
      queryKey: queryKey.myActivities,
      queryFn: () => instance.get("/my-activities?size=999")
    });

  const GetActivityReservedSchedules = (id: number, date: string) =>
    useQuery({
      queryKey: [queryKey.getReservationByDate, id, date],
      queryFn: () =>
        instance.get(`/my-activities/${id}/reserved-schedule?date=${date}`)
    });

  const GetActivityReservedSchedulesByTime = (
    id: number,
    scheduleId: number,
    status: string
  ) =>
    useQuery({
      queryKey: [queryKey.getReservationByScheduleId, id, scheduleId, status],
      queryFn: () =>
        instance.get(
          `/my-activities/${id}/reservations?scheduleId=${scheduleId}&status=${status}`
        ),
      enabled: scheduleId !== undefined
    });

  const ApporveReservation = useMutation({
    mutationFn: (data: any) =>
      instance.patch(
        `/my-activities/${data.activityId}/reservations/${data.reservationId}`,
        ApproveBody
      ),
    onSuccess: () => {
      [
        queryKey.getReservationByDate,
        queryKey.getReservationByScheduleId
      ].forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
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
      [
        queryKey.getReservationByDate,
        queryKey.getReservationByScheduleId
      ].forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
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
