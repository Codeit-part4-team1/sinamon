import { UseFormReturn } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import { CreatePageSubmitData, GetReviewsParams } from "@/types/activities";
import { queryKey } from "@/constants/queryKeys";
import {
  getActivitiesList,
  postActivities,
  getActivityDetail,
  getCurationActivitiesList,
  postCreateImageUrl,
  getReviews
} from "@/api/activities";

export const useGetActivitiesList = (
  method: string,
  page: number,
  size: number,
  selectedCategory: string | null,
  sort: string,
  keyword: string
) =>
  useQuery({
    queryKey: queryKey.getActivitiesList(
      selectedCategory,
      sort,
      page,
      size,
      keyword
    ),
    queryFn: () =>
      getActivitiesList(method, sort, page, size, selectedCategory, keyword)
  });

export const useGetCurationActivitiesList = (
  method: string,
  sort: string,
  size: number
) =>
  useQuery({
    queryKey: queryKey.curationActivitiesList,
    queryFn: () => getCurationActivitiesList(method, sort, size)
  });

export const usePostActivities = (handleSuccess: () => void) =>
  useMutation({
    mutationFn: (value: CreatePageSubmitData) => postActivities(value),
    onSuccess() {
      handleSuccess();
    }
  });

export const useGetActivityDetail = (id: number) =>
  useQuery({
    queryKey: queryKey.activity,
    queryFn: () => getActivityDetail(id),
    enabled: !!id
  });

// 체험 예약 가능일 조회 hook

// 체험 리뷰 조회 hook

// 체험 예약 신청 hook

export const usePostCreateImageUrl = (
  setValue: UseFormReturn["setValue"],
  imageName: string,
  getValues?: any,
  subImageUrlListAppend?: any
) =>
  useMutation({
    mutationFn: (value: FormData) => postCreateImageUrl(value),
    onSuccess(data) {
      imageName == "bannerImageUrl"
        ? setValue(imageName, data.activityImageUrl)
        : subImageUrlListAppend({
            subImagePreview: URL?.createObjectURL(
              getValues("subImageSelect")[0]
            ),
            subImageUrl: data.activityImageUrl
          });
    }
  });

export const useGetReviewListQeury = ({
  activityId,
  page: currentPageNumber
}: GetReviewsParams) => {
  return useQuery({
    queryKey: queryKey.getReviewList(activityId, currentPageNumber),
    queryFn: () => getReviews({ activityId, page: currentPageNumber, size: 3 })
  });
};
