import { ReactNode, useContext } from "react";
import type { NextPageWithLayout } from "@/pages/_app";

import MyActivitiesCard from "@/components/myActivity/myActivitiesCard";
import Button from "@/components/common/Button/Button";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";
import { useMyActivities } from "@/hooks/useMyActivites";
import type { MyActivitiesType } from "@/types/MyActivitiesType";
import Link from "next/link";

const myActivity: NextPageWithLayout = () => {
  const { getMyActivities } = useMyActivities();
  const { data } = getMyActivities();
  const { activities } = data?.data || [];

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
