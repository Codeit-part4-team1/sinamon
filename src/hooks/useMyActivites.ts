import { useMutation } from "@tanstack/react-query";

import { instance } from "@/lib/axios";

export const useMyActivities = {
  patchMyActivityEdit: (id: number) =>
    useMutation({
      mutationFn: (value: any) => instance.patch(`/my-activities/${id}`, value),
      onSuccess(data) {
        console.log(data);
      },
      onError(err: any) {
        console.log(err);
      }
    })
};
