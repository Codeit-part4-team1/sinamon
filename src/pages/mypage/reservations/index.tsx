import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "@/pages/_app";

import { getCookie } from "@/utils/cookie";
import ReservationCard from "@/components/myHistory/ReservationCard";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";
import { useMyReservations } from "@/hooks/useMyReservations";
import type { ReservationType } from "@/types/MyReservationTypes";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const MyHistory: NextPageWithLayout = () => {
  const router = useRouter();

  if (!getCookie("accessToken") && !getCookie("refreshToken")) {
    try {
      router.push("/signin");
    } catch (err) {
      console.error("Error occurred while redirecting to /signin:", err);
    }
    return;
  }

  const { getMyReservations } = useMyReservations();
  const { data } = getMyReservations();
  const { reservations } = data?.data || [];

  const [value, setValue] = useState("all");

  let filteredReservations = reservations;
  if (value !== "all") {
    filteredReservations = reservations.filter(
      (reservation: ReservationType) => reservation.status === value
    );
  }

  return (
    <div>
      <div className="mb-5 md:mb-8 flex justify-between items-center">
        <span className="text-2xl md:text-3xl font-bold">전체</span>
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
      </div>
      <ul className="relative justify-between w-full grid gap-4 md:gap-5 grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))]">
        {filteredReservations?.map((reservation: ReservationType) => (
          <ReservationCard key={reservation.id} {...reservation} />
        ))}
      </ul>
      {filteredReservations?.length === 0 && (
        <p className="flex text-xl font-bold justify-center">
          아직 등록한 체험이 없어요
        </p>
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
