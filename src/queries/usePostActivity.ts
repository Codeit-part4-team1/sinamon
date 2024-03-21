import { useMutation, useQueryClient } from "@tanstack/react-query"
import { activitiesQueryKey } from "./queryKeys"

const usePostActivity = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postActivity,
    onSuccess: () => { 
      queryClient.invalidateQueries({
        queryKey: activitiesQueryKey.getList('cursor')
      })
    },
  })

}

export default usePostActivity