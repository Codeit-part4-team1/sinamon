import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import { instance } from "@/lib/axios";
import { queryKey } from "@/constants/queryKeys";
import { AxiosError } from "axios";

import { HiMenu } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/components/ui/select";

export type Category =
  | "문화 · 예술"
  | "식음료"
  | "스포츠"
  | "투어"
  | "관광"
  | "웰빙"
  | "";

export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}
const DetailHeader = () => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  // async function getAcitivity() {
  //   try {
  //     const res = await instance.get(`/activities/${id}`);
  //     return res.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  const getAcitivity = async (id: any): Promise<Activity> => {
    const res = await instance.get(`/activities/${id}`);
    return res.data;
  };
  // async function getUser() {
  //   try {
  //     const res = await instance.get("/users/me");
  //     return res.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  const getUser = async () => {
    const res = await instance.get("/users/me");
    return res.data;
  };

  // async function deleteActivity() {
  //   try {
  //     const res = await instance.delete(`/my-activities/${id}`);
  //     return res.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  const deleteActivity = async ({ id }: any) => {
    return await instance.delete(`/my-activities/${id}`);
  };

  const { data: activityData } = useQuery({
    queryKey: [queryKey.activity],
    queryFn: () => getAcitivity(id)
  });

  const { data: userData } = useQuery({
    queryKey: [queryKey.usersMe],
    queryFn: () => getUser()
  });
  console.log(userData);

  const deleteActivityMutation = useMutation({
    mutationFn: () => deleteActivity(activityData?.id),

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
        <p className="text-[14px] opacity-75">{activityData?.category}</p>
        <h1 className="font-bold text-[32px] mb-[6px]">
          {activityData?.title}
        </h1>
        <div className="flex gap-3">
          <p className="flex gap-[6px] text-black items-center text-[10px] md:text-[14px]">
            <FaStar className="text-yellow-300" />
            {activityData?.rating} ({activityData?.reviewCount})
          </p>
          <p className=" flex gap-[6px] text-[10px] items-center  md:text-[14px]">
            <IoLocation />
            {activityData?.address}
          </p>
        </div>
      </div>
      <div>
        {activityData?.userId === userData?.id && (
          <Select defaultValue="all">
            <SelectTrigger className="w-[100px] flex flex-row-reverse invisible p-0">
              <HiMenu size="24" className="text-black visible" />
            </SelectTrigger>
            <SelectContent>
              <div className="flex flex-col gap-2 items-center text-center">
                <Link href={`/mypage/activities/${activityData?.id}/edit`}>
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
