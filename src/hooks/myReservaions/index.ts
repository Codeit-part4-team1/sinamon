import { useQuery } from "@tanstack/react-query";

import { getMyReservations } from "@/api/myReservations";
import { queryKey } from "@/constants/queryKeys";
import { getCookie } from "@/utils/cookie";


export const usegetMyReservations = () =>
  useQuery({
    queryKey: queryKey.myReservations,
    queryFn: () => getMyReservations(),
    enabled: !!getCookie("accessToken")
  });
