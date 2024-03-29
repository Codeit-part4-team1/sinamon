import DetailHeader from "@/components/Activities/DetailHeader/DetailHeader";
import Map from "@/components/Activities/Map/Map";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useQuery } from "@tanstack/react-query";
import { getAcitivity } from "@/api/activities";
import { queryKey } from "@/constants/queryKeys";
import { Activity } from "@/types/activities";
import ReviewList from "@/components/Activities/ReviewList/ReviewList";
import ReservationDatePicker from "@/components/Activities/ReservationPicker/ReservationDatePicker";

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

const Activity = ({
  activityId
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: activityData } = useQuery<Activity>({
    queryKey: [queryKey.activity],
    queryFn: () => getAcitivity(activityId)
  });
  if (!activityData) return;

  return (
    <div className="flex  justify-center bg-gray-[#f9f9f9]">
      <div className="flex flex-col w-[1200px] ">
        <DetailHeader data={activityData} />
        <main className="flex w-full gap-[17px] md:gap-6">
          <div className="flex flex-col gap-10 w-[327px] md:w-[428px] lg:w-[790px]">
            <hr />
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
            <ReviewList activityId={activityId} />
          </div>
          <ReservationDatePicker />
        </main>
      </div>
    </div>
  );
};

export default Activity;
