import { ReactNode, useState } from "react";
import { useRouter } from "next/router";

import type { NextPageWithLayout } from "@/pages/_app";
import type { ReservationType } from "@/types/MyReservationTypes";
import { getCookie } from "@/utils/cookie";
import { usegetMyReservations } from "@/hooks/myReservaions";
import ReservationCard from "@/components/myHistory/ReservationCard";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { PiFileMagnifyingGlass } from "react-icons/pi";

const MyHistory: NextPageWithLayout = () => {
  const router = useRouter();

  if (!getCookie("accessToken") && !getCookie("refreshToken")) {
    try {
      router.push("/signin");
    } catch (err) {
      console.error("Error occurred while redirecting to /signin:", err);
    }
  }

  const [value, setValue] = useState("all");

  const { data, isLoading } = usegetMyReservations();
  const { reservations } = data || [];

  let filteredReservations = reservations?.filter(
    (reservation: ReservationType) =>
      value === "all" || reservation.status === value
  );

  type StatusCounts = {
    [key: string]: number;
  };

  function aggregateStatusCounts(data: ReservationType[]) {
    return data?.reduce((acc: StatusCounts, { status }) => {
      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status]++;
      return acc;
    }, {});
  }

  const statusCounts = aggregateStatusCounts(reservations);

  return (
    <div>
      <div className="mb-5 md:mb-8 flex justify-between items-center">
        <span className="text-2xl md:text-3xl font-bold">참여 내역</span>
        {reservations?.length === 0 || (
          <Select defaultValue="all" value={value} onValueChange={setValue}>
            <SelectTrigger className="w-[110px] md:w-[120px] h-10 md:h-12 px-3 md:py-3 md:px-4 text-sm md:text-base font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                className="text-sm md:text-base font-medium focus:bg-sub"
                value="all"
              >
                모두
              </SelectItem>
              <SelectItem
                className="text-sm md:text-base font-medium focus:bg-sub"
                value="pending"
              >
                승인 대기
              </SelectItem>
              <SelectItem
                className="text-sm md:text-base font-medium focus:bg-sub"
                value="canceled"
              >
                예약 취소
              </SelectItem>
              <SelectItem
                className="text-sm md:text-base font-medium focus:bg-sub"
                value="confirmed"
              >
                예약 완료
              </SelectItem>
              <SelectItem
                className="text-sm md:text-base font-medium focus:bg-sub"
                value="declined"
              >
                예약 거절
              </SelectItem>
              <SelectItem
                className="text-sm md:text-base font-medium focus:bg-sub"
                value="completed"
              >
                체험 완료
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
      <ul className="relative justify-between w-full grid gap-4 md:gap-5 grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))]">
        {filteredReservations?.map((reservation: ReservationType) => (
          <ReservationCard key={`key-${reservation.id}`} {...reservation} />
        ))}
      </ul>
      {filteredReservations?.length === 0 && (
        <div className="h-52 flex flex-col justify-center items-center gap-8">
          <PiFileMagnifyingGlass className="font-light text-8xl text-gray-4b4b4b dark:text-zinc-300" />
          <p className="flex text-xl font-bold justify-center">
            아직 참여한 모임이 없어요
          </p>
        </div>
      )}
    </div>
  );
};

MyHistory.getLayout = function getLayout(page: ReactNode) {
  return (
    <BaseLayout>
      <MenuLayout>{page}</MenuLayout>
    </BaseLayout>
  );
};

export default MyHistory;
