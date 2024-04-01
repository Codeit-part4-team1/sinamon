import DetailHeader from "@/components/Activities/DetailHeader/DetailHeader";
import Map from "@/components/Activities/Map/Map";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActivityDetail } from "@/api/activities";
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
    <div className="flex justify-center bg-gray-[#f9f9f9]">
      <div className="flex flex-col w-[1200px] ">
        <DetailHeader />
        <main className="flex ">
          <div>
            <hr />
            <section>
              <h2>모집 설명</h2>
              <p>{activityData.description}</p>
            </section>
            <Map ativityAddress={activityData.address} />
            <hr />
            <ReviewList />
          </div>
          <ReservationDatePicker />
        </main>
      </div>
    </div>
  );
};

export default Activity;
