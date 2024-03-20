import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";

import React, { useContext } from "react";

import { AuthContext } from "@/contexts/AuthProvider";
import ReservationCard from "@/components/myHistory/ReservationCard";
import SortDropdown from "@/components/myHistory/SortDropdown";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";
import { RESERVATIONS } from "@/components/myHistory/RESERVATIONS";
import type { Reservation } from "@/types/reservationTypes";

const MyHistory: NextPageWithLayout = () => {
  const { updateUserInfo } = useContext(AuthContext);

  return (
    <div>
      <div className="mb-4 md:mb-6 flex justify-between items-center">
        <span className="text-2xl md:text-3xl font-bold">전체</span>
        <SortDropdown />
      </div>
      <ul className="relative justify-center w-full flex flex-row flex-wrap md:gap-4 sm:gap-2">
        {RESERVATIONS.map((reservation: Reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </ul>
    </div>
  );
};

MyHistory.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <MenuLayout>{page}</MenuLayout>
    </BaseLayout>
  );
};

export default MyHistory;
