import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";

import React, { useContext } from "react";

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
    <div>
      <div className="mb-4 md:mb-6 flex justify-between items-center">
        <span className="text-2xl md:text-3xl font-bold">내 모임 관리</span>
        <Button text="모임 등록하기" size="lg" type="submit" />
      </div>
      <ul className="relative justify-center w-full flex flex-row flex-wrap gap-4">
        {GROUPS.map((groups: GroupType) => (
          <GroupCard key={groups.id} {...groups} />
        ))}
      </ul>
    </div>
  );
};

MyGroup.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <MenuLayout>{page}</MenuLayout>
    </BaseLayout>
  );
};

export default MyGroup;
