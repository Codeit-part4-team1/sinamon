import { ReactNode } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";

import { instance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/constants/queryKeys";
import Link from "next/link";

interface Activity {
  id: number;
  title: string;
}

const MyActivitiesPage: NextPageWithLayout = () => {
  // 임시 페이지

  const { data } = useQuery({
    queryKey: [queryKey.activity],
    queryFn: () => instance.get("/my-activities?size=20")
  });

  return (
    <ul>
      {data?.data.activities.map(({ id, title }: Activity) => (
        <li key={id}>
          <Link href={`/myactivities/${id}/edit`}>{title}</Link>
        </li>
      ))}
    </ul>
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
