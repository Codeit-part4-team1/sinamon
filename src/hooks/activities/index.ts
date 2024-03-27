import { getAcitivity } from "@/api/activities";
import { queryKey } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetActivity = useQuery({
  queryKey: [queryKey.activity],
  queryFn: (id) => getAcitivity(id)
});
