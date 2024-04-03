import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { profile } from "console";
import profileImage from "../../../../public/images/temp-profile.png";
import Pagination from "@/components/common/Pagination/Pagination";
import { getReviews } from "@/api/activities";
import { GetReviewsParams } from "@/types/activities";
import { queryKey } from "@/constants/queryKeys";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ReviewList = ({ activityId }: { activityId: number }) => {
  const useGetReviewPageQeury = ({
    activityId,
    page,
    size
  }: GetReviewsParams) => {
    return useInfiniteQuery({
      queryKey: queryKey.getReviewList(activityId, page, size),
      initialPageParam: null,
      queryFn: () => getReviews({ activityId, page, size }),
      getNextPageParam: (lastPage) => lastPage.data,
      getPreviousPageParam: (firstPage) => firstPage.data
    });
  };

  const useGetReviewListQeury = ({
    activityId,
    page,
    size
  }: GetReviewsParams) => {
    return useQuery({
      queryKey: queryKey.getReviewList(activityId, page, size),
      queryFn: () => getReviews({ activityId, page: 1, size: 3 })
    });
  };
  // const { data: reviewData } = useGetReviewListQeury({
  //   activityId,
  //   page: 1,
  //   size: 3
  // });
  // const { data, hasNextPage, fetchNextPage } = useGetReviewPageQeury({
  //   activityId,
  //   page: 1,
  //   size: 3
  // });
  // console.log(hasNextPage);
  // console.log(fetchNextPage);

  return (
    <section className="flex flex-col gap-6">
      <h2 className="md:font-bold md:text-[20px]">후기</h2>
      <div className="flex items-center gap-4">
        <h3 className="font-semibold text-[50px]">4.2</h3>
        <div className="flex flex-col gap-2">
          <p className="text-[18px] font-normal leading-6">매우 만족</p>
          <p className="flex font-normal text-[14px] gap-[6px] items-center">
            <FaStar className="text-yellow-300" />
            4200개 후기
          </p>
        </div>
      </div>
      {/* 후기 */}
      <div className="flex flex-col gap-6 mb-10 md:mb-12">
        <div className="flex gap-4">
          <Image
            className="rounded-full bg-[#E3E5E8] shrink-0 object-cover h-[45px]"
            src={profileImage}
            width={45}
            height={45}
            alt="프로필 이미지"
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-[10px] items-center">
              <h3 className="font-bold text-[16px]">닉네임</h3>
              <p className="text-gray-4b4b4b text-[16px]">2024.02.24</p>
            </div>
            <p className="text-[16px] leading-[26px]">
              저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말
              즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게
              정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤
              수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말
              친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운
              스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극
              추천합니다!"{" "}
            </p>
          </div>
        </div>
        <hr />
      </div>
      <Pagination />
    </section>
  );
};

export default ReviewList;
