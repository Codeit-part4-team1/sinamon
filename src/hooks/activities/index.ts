import { useQuery } from "@tanstack/react-query";

import { activities, getAcitivity } from "@/api/activities";
import { queryKey } from "@/constants/queryKeys";

// export const useGetActivity = useQuery({
//   queryKey: [queryKey.activity],
//   queryFn: (id) => getAcitivity(id)
// });

export const useActivities = {
  getActivitiesList: (
    method: string,
    page: number,
    size: number,
    selectedCategory: string | null,
    sort: string
  ) =>
    useQuery({
      queryKey: queryKey.getActivitiesList(selectedCategory, sort, page, size),
      queryFn: () =>
        activities.getActivitiesList(
          method,
          sort,
          page,
          size,
          selectedCategory
        ),
    }),

  getCurationActivitiesList: (method: string, sort: string, size: number) =>
    useQuery({
      queryKey: ["activity"],
      queryFn: () => activities.getCurationActivitiesList(method, sort, size)
    })
};
