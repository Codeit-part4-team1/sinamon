import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/api/users";
import { queryKey } from "@/constants/queryKeys";
import { getCookie } from "@/utils/cookie";

export const useGetUser = () =>
  useQuery({
    queryKey: [queryKey.usersMe],
    queryFn: () => getUser(),
    enabled: !!getCookie("accessToken")
  });
