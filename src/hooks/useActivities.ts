import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import { instance } from "@/lib/axios";

export const useActivities = {
  getActivitiesList: () =>
    useQuery({
      queryKey: ["activities"],
      queryFn: () => instance.get("/activities?method=cursor&page=1&size=20")
    }),

  postActivities: () =>
    useMutation({
      mutationFn: (value: any) => instance.post("/activities", value),
      onSuccess(data) {
        console.log(data);
      },
      onError(err: any) {
        console.log(err);
      }
    }),

  createImageUrl: (
    setValue: any,
    imageName: string,
    getValues?: any,
    subImageUrlListAppend?: any
  ) =>
    useMutation({
      mutationFn: (value: any) =>
        instance.post("/activities/image", value, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }),
      onSuccess(data) {
        imageName == "bannerImageUrl"
          ? setValue(imageName, data.data.activityImageUrl)
          : subImageUrlListAppend({
              subImagePreview: URL?.createObjectURL(
                getValues("subImageSelect")[0]
              ),
              subImageUrl: data.data.activityImageUrl
            });
      },
      onError(err: any) {
        console.log(err);
      }
    })
};
