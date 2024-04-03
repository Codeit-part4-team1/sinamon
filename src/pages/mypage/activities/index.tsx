import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import type { NextPageWithLayout } from "@/pages/_app";
import type { MyActivitiesType } from "@/types/MyActivitiesType";
import { getCookie } from "@/utils/cookie";
import { useGetMyActivities } from "@/hooks/useMyActivites";
import MyActivitiesCard from "@/components/myActivity/myActivitiesCard";
import Button from "@/components/common/Button/Button";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";

import { MdOutlineFindInPage } from "react-icons/md";
import { PiFileMagnifyingGlass } from "react-icons/pi";

const myActivity: NextPageWithLayout = () => {
  const router = useRouter();

  if (!getCookie("accessToken") && !getCookie("refreshToken")) {
    try {
      router.push("/signin");
    } catch (err) {
      console.error("Error occurred while redirecting to /signin:", err);
    }
  }

  const { data } = useGetMyActivities();
  const { activities } = data || [];

  return (
    <>
      <div className="mb-5 md:mb-8 flex justify-between items-center">
        <span className="text-2xl md:text-3xl font-bold">내 모임 관리</span>
        <Link href={"activities/create"}>
          <Button text="모임 등록하기" size="md" type="submit" />
        </Link>
      </div>
      <ul className="relative justify-between w-full grid gap-4 md:gap-5 grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))]">
        {activities?.map((groups: MyActivitiesType) => (
          <MyActivitiesCard key={groups.id} {...groups} />
        ))}
      </ul>
      {activities?.length === 0 && (
        <div className="h-52 flex flex-col justify-center items-center gap-8">
          <PiFileMagnifyingGlass className="font-light text-8xl text-gray-4b4b4b dark:text-zinc-300" />
          <p className="flex text-xl font-bold justify-center">
            아직 등록한 모임이 없어요
          </p>
        </div>
      )}
    </>
  );
};

myActivity.getLayout = function getLayout(page: ReactNode) {
  return (
    <BaseLayout>
      <MenuLayout>{page}</MenuLayout>
    </BaseLayout>
  );
};

export default myActivity;
