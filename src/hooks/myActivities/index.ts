import { deleteActivity } from "@/api/myActivities";
import { queryKey } from "@/constants/queryKeys";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();
const router = useRouter();

export const deleteActivityMutation = useMutation({
  mutationFn: (id) => deleteActivity(id),

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: queryKey.myActivities });
    alert("삭제되었습니다.");
    router.push("/");
  },
  onError: (error) => {
    if (error instanceof AxiosError) {
      alert(error.response?.data.message);
    }
  }
});
