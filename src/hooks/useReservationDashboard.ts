import { useQuery } from "@tanstack/react-query";
import { instance } from "@/lib/axios";
import { getCookie } from "@/utils/cookie";
import { queryKey } from "@/constants/queryKeys";

export const reservationDashboard = {
  getActivities: () =>
    useQuery({
      queryKey: ["activitiesList"],
      queryFn: () => instance.get("/my-activities"),
      enabled: !!getCookie("accessToken")
    }),
  getMonthlyActivites: (activityId: number, year: string, month: string) =>
    useQuery({
      queryKey: [
        queryKey.getReservationByDate,
        { activityId },
        { year },
        { month }
      ],
      queryFn: () =>
        instance.get(
          `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`
        ),
      enabled: !!getCookie("accessToken") && activityId !== 0,
      throwOnError: true
    })
};
