import { FaStar } from "react-icons/fa";
import Pagination from "@/components/common/Pagination/Pagination";
import { getReviews } from "@/api/activities";
import { GetReviewsParams, ReviewsData } from "@/types/activities";
import { queryKey } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Fragment, useState } from "react";
import Avatar from "@/components/common/Avatar/Avatar";

const ReviewList = ({
  activityId,
  activityRating
}: {
  activityId: number;
  activityRating: number;
}) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  // const useGetReviewPageQeury = ({
  //   activityId,
  //   page,
  //   size
  // }: GetReviewsParams) => {
  //   return useInfiniteQuery({
  //     queryKey: queryKey.getReviewList(activityId, page, size),
  //     initialPageParam: null,
  //     queryFn: () => getReviews({ activityId, page, size }),
  //     getNextPageParam: (lastPage) => lastPage.data,
  //     getPreviousPageParam: (firstPage) => firstPage.data
  //   });
  // };

  const useGetReviewListQeury = ({
    activityId,
    page: currentPageNumber
  }: GetReviewsParams) => {
    return useQuery({
      queryKey: queryKey.getReviewList(activityId, currentPageNumber),
      queryFn: () => getReviews({ activityId, page: 1, size: 3 })
    });
  };
  const { data: reviewData } = useGetReviewListQeury({
    activityId,
    page: currentPageNumber
  });
  const { reviews, totalCount }: ReviewsData = reviewData;
  console.log(reviewData);

  const transRating = (rating: number) => {
    const roundedRating = Math.round(rating);
    if (roundedRating >= 4.5) {
      return "매우 만족";
    } else if (roundedRating >= 4.0) {
      return "만족";
    } else if (roundedRating >= 3.0) {
      return "보통";
    } else if (roundedRating >= 2.5) {
      return "불만족";
    } else {
      return "매우 불만족";
    }
  };
  // const { data, hasNextPage, fetchNextPage } = useGetReviewPageQeury({
  //   activityId,
  //   page: 1,
  //   size: 3
  // });

  console.log(reviews);

  return (
    <section className="flex flex-col gap-6">
      <h2 className="md:font-bold md:text-[20px]">후기</h2>
      {totalCount !== 0 && (
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-[50px]">{activityRating}</h3>
          <div className="flex flex-col gap-2">
            <p className="text-[18px] font-normal leading-6">
              {transRating(activityRating)}
            </p>
            <p className="flex font-normal text-[14px] gap-[6px] items-center">
              <FaStar className="text-yellow-300" />
              {totalCount.toLocaleString("ko-KR")}개 후기
            </p>
          </div>
        </div>
      )}
      {/* 후기 */}
      {totalCount !== 0 && (
        <>
          <div className="flex flex-col gap-6 mb-10 md:mb-12">
            {reviews.map((review, index) => (
              <Fragment key={review.id}>
                <div className="flex gap-4">
                  <Avatar user={review.user} size="sm" />
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-[10px] items-center">
                      <h3 className="font-bold text-[16px]">
                        {review.user.nickname}
                      </h3>
                      <p className="text-gray-4b4b4b text-[16px]">
                        {dayjs(review.createdAt).format("YYYY.MM.DD")}
                      </p>
                    </div>
                    <p className="text-[16px] leading-[26px]">
                      {review.content}
                    </p>
                  </div>
                </div>
                <hr />
              </Fragment>
            ))}
          </div>
          <Pagination />
        </>
      )}
    </section>
  );
};

export default ReviewList;
