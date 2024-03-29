import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { activities, getAcitivity } from "@/api/activities";
import { queryKey } from "@/constants/queryKeys";

// export const useGetActivity = useQuery({
//   queryKey: [queryKey.activity],
//   queryFn: (id) => getAcitivity(id)
// });

export const useActivities = {
  getActivitiesList: (
    method: any,
    // method: string,
    page: any,
    // page: number,
    size: any,
    // size: number,
    selectedCategory: any,
    // selectedCategory: string | null,
    sort: any
    // sort: string
  ) =>
    useInfiniteQuery({
      queryKey: queryKey.getActivitiesList(selectedCategory, sort, page, size),
      initialPageParam: 1,
      queryFn: () =>
        activities.getActivitiesList(
          method,
          sort,
          page,
          size,
          selectedCategory
        ),
      getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
        lastPage.cursorId ? lastPageParam + 1 : undefined
    })
};
