import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import { queryKey } from "@/constants/queryKeys";
import { AxiosError } from "axios";

import { HiMenu } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";

import { getAcitivity } from "@/api/activities";
import { getUser } from "@/api/users";
import { deleteActivity } from "@/api/myActivities";
import { Activity } from "@/types/activities";

const DetailHeader = ({ data }: { data: Activity }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // const { data: activityData } = useQuery({
  //   queryKey: [queryKey.activity],
  //   queryFn: () => getAcitivity(id)
  // });

  const { data: userData } = useQuery({
    queryKey: [queryKey.usersMe],
    queryFn: () => getUser()
  });

  const deleteActivityMutation = useMutation({
    mutationFn: () => deleteActivity(data?.id),

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

  const handleDeleteButton = () => {
    deleteActivityMutation.mutate();
    alert("삭제");
  };

  return (
    <header className="flex relative w-full gap-[10px] justify-between items-center">
      <div className="flex flex-col gap-[10px]">
        <p className="text-[14px] opacity-75">{data?.category}</p>
        <h1 className="font-bold text-[32px] mb-[6px]">{data?.title}</h1>
        <div className="flex gap-3">
          <p className="flex gap-[6px] text-black items-center text-[10px] md:text-[14px]">
            <FaStar className="text-yellow-300" />
            {data?.rating} ({data?.reviewCount})
          </p>
          <p className=" flex gap-[6px] text-[10px] items-center  md:text-[14px]">
            <IoLocation />
            {data?.address}
          </p>
        </div>
      </div>
      <div>
        {data?.userId === userData?.id && (
          <Select defaultValue="all">
            <SelectTrigger className="w-[100px] flex flex-row-reverse invisible p-0">
              <HiMenu size="24" className="text-black visible" />
            </SelectTrigger>
            <SelectContent>
              <div className="flex flex-col gap-2 items-center text-center">
                <Link href={`/mypage/activities/${data?.id}/edit`}>
                  <button className="text-[18px] leading-[22px] font-medium focus:bg-sub">
                    수정하기
                  </button>
                </Link>
                <button
                  className="text-[18px] leading-[22px] font-medium focus:bg-sub"
                  onClick={handleDeleteButton}
                >
                  삭제하기
                </button>
              </div>
            </SelectContent>
          </Select>
        )}
      </div>
    </header>
  );
};

export default DetailHeader;
