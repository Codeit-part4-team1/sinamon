import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { activitiesQueryKey } from './queryKeys'
import { getActivities } from '@/api/activities'

interface UseGetActivitiesQueryOptions {
  page?: number
  size?: number
}

const useGetActivitiesQuery = ({ page, size }: UseGetActivitiesQueryOptions) => {
  return useInfiniteQuery({
    queryKey: activitiesQueryKey.getList('cursor', page, size),
    initialPageParam: null,
    queryFn: ({ pageParam }) => getActivities({ method: 'cursor', page, size, cursorId: pageParam}),
    getNextPageParam: (lastPage) => lastPage.data.cursorId
  }) 
}

export default useGetActivitiesQuery