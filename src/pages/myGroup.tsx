import { ReactNode, useContext } from "react";
import type { NextPageWithLayout } from "@/pages/_app";

import { AuthContext } from "@/contexts/AuthProvider";
import GroupCard from "@/components/myGroup/GroupCard";
import Button from "@/components/common/Button";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";
import { GROUPS } from "@/components/myGroup/GROUPS";
import type { GroupType } from "@/types/groupTypes";

const MyGroup: NextPageWithLayout = () => {
  const { updateUserInfo } = useContext(AuthContext);

  return (
    <>
      <div className="mb-5 md:mb-8 flex justify-between items-center">
        <span className="text-2xl md:text-3xl font-bold">내 모임 관리</span>
        <Button text="모임 등록하기" size="md" type="submit" />
      </div>
      <ul className="relative justify-between w-full grid gap-4 md:gap-5 grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))]">
        {GROUPS.map((groups: GroupType) => (
          <GroupCard key={groups.id} {...groups} />
        ))}
      </ul>
    </>
  );
};

MyGroup.getLayout = function getLayout(page: ReactNode) {
  return (
    <BaseLayout>
      <MenuLayout>{page}</MenuLayout>
    </BaseLayout>
  );
};

export default MyGroup;
