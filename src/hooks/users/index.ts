import { getUser } from "@/api/users";
import { queryKey } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = useQuery({
  queryKey: [queryKey.usersMe],
  queryFn: () => getUser()
});
