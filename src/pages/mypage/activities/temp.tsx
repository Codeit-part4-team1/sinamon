import { ReactNode } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { instance } from "@/lib/axios";
import { queryKey } from "@/constants/queryKeys";
import type { NextPageWithLayout } from "@/pages/_app";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";
import Button from "@/components/common/Button/Button";

const MyActivitiesPage: NextPageWithLayout = () => {
  // 임시 페이지

  const { data } = useQuery({
    queryKey: [queryKey.activity],
    queryFn: () => instance.get("/my-activities?size=20")
  });

  return (
    <div>
      <Link href={"create"}>
        <Button text="모임 등록하기" type="button" size="md" />
      </Link>
      <ul>
        {data?.data.activities.map(({ id, title }: any) => (
          <li key={id}>
            <Link href={`${id}/edit`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

MyActivitiesPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <BaseLayout>
      <MenuLayout>{page}</MenuLayout>
    </BaseLayout>
  );
};

export default MyActivitiesPage;
