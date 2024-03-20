import { ReactNode, useContext } from "react";
import type { NextPageWithLayout } from "@/pages/_app";

import { AuthContext } from "@/contexts/AuthProvider";
import ReservationCard from "@/components/myHistory/ReservationCard";
import StatusDropdown from "@/components/myHistory/StatusDropdown";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";
import { RESERVATIONS } from "@/components/myHistory/RESERVATIONS";
import type { Reservation } from "@/types/reservationTypes";

const MyHistory: NextPageWithLayout = () => {
  const { updateUserInfo } = useContext(AuthContext);

  return (
    <>
      <div className="mb-5 md:mb-8 flex justify-between items-center">
        <span className="text-2xl md:text-3xl font-bold">전체</span>
        <StatusDropdown />
      </div>
      <ul className="relative justify-between w-full grid gap-4 md:gap-5 grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))]">
        {RESERVATIONS.map((reservation: Reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </ul>
    </>
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
