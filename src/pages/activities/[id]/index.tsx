import { ReactNode } from "react";
import DetailHeader from "@/components/Activities/DetailHeader/DetailHeader";
import Map from "@/components/Activities/Map/Map";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActivityDetail } from "@/api/activities";
import { queryKey } from "@/constants/queryKeys";
import { Activity } from "@/types/activities";
import ReviewList from "@/components/Activities/ReviewList/ReviewList";
import { ReservationDatePicker } from "@/components/Activities/ReservationPicker/ReservationDatePicker";
import Header from "@/components/layout/Header";
import BaseLayout from "@/components/layout/BaseLayout";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const activityId = Number(context.query["id"]);
  // const queryClient = new QueryClient();
  // try {
  //   await queryClient.fetchQuery({
  //     queryKey: [queryKey.activity],
  //     queryFn: () => getAcitivity({ activityId })
  //   });
  return { props: { activityId } };
  // } catch (error) {
  // console.log(error);
  //   return { notFound: true };
  // }
};

const Activity: any = ({
  activityId
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: activityData, isSuccess } = useQuery<Activity>({
    queryKey: queryKey.activity,
    queryFn: () => getActivityDetail(activityId)
  });

  const queryClient = useQueryClient();

  if (isSuccess) {
    queryClient.invalidateQueries({
      queryKey: queryKey.activity,
      refetchType: "inactive"
    });
  }

  if (!activityData) return;

  return (
    <>
      <Header />
      <div className="flex justify-center bg-gray-[#f9f9f9] pt-[26px] md:pt-[34px] lg:pt-[68px]">
        <div className="flex flex-col md:px-6 ">
          <DetailHeader data={activityData} />
          <main className="flex pt-4 gap-4 px-4 md:gap-6">
            <div className="flex flex-col gap-10 w-full  lg:w-[790px]">
              <hr className="hidden md:block" />
              <section className="flex flex-col gap-4">
                <h2 className="text-[20px] font-bold leading-[26px]">
                  모집 설명
                </h2>
                <p className="text-[16px] leading-[26px]">
                  {activityData.description}
                </p>
              </section>
              <hr />
              <Map ativityAddress={activityData.address} />
              <hr />
              <ReviewList
                activityRating={activityData.rating}
                activityId={activityId}
              />
            </div>
            <ReservationDatePicker data={activityData} />
          </main>
        </div>
      </div>
    </>
  );
};

Activity.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Activity;
