import React, { useState } from "react";
import ReactDOM from "react-dom";

import { FaXmark } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { useMyActivities } from "@/hooks/useMyActivites";
import ReservationInfoModalDetail from "./ReservationInfoModalDetail";

type ViewType = {
  pending: boolean;
  confirmed: boolean;
  declined: boolean;
};

interface Count {
  declined: number;
  confirmed: number;
  pending: number;
}

interface Schedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: Count;
}

type dateReservations = Schedule[];

const ReservationInfoModal = ({
  onCancel,
  destination,
  ACTIVITYID,
  ACTIVITYDATE
}: any) => {
  // const ACTIVITYID = 434;
  // const ACTIVITYDATE = "2024-03-31";

  const { GetActivityReservedSchedules } = useMyActivities();
  const { data } = GetActivityReservedSchedules(ACTIVITYID, ACTIVITYDATE);
  const dateReservations = data?.data || [];
  console.log(dateReservations);

  const sumCounts = (dateReservations: dateReservations) => {
    return dateReservations.reduce<Count>(
      (acc, { count }) => {
        acc.declined += count.declined;
        acc.confirmed += count.confirmed;
        acc.pending += count.pending;
        return acc;
      },
      { declined: 0, confirmed: 0, pending: 0 }
    );
  };

  const firstTime = `${dateReservations[0]?.startTime} - ${dateReservations[0]?.endTime}`;

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  }

  const ReservationsCount = sumCounts(dateReservations);

  const [view, setView] = useState("pending");
  const [scheduleId, setScheduleId] = useState(dateReservations[0]?.scheduleId);

  console.log(scheduleId);
  const currentView = (e: any) => {
    setView(e.target.id);
    () => GetActivityReservedSchedules(ACTIVITYID, ACTIVITYDATE);
  };

  let filteredDateReservations = dateReservations.filter(
    (dateReservations: any) => dateReservations.count[view] > 0
  );

  console.log(filteredDateReservations);

  return ReactDOM.createPortal(
    <>
      <div className="absolute top-0 bg-gray-400 opacity-40 w-full h-full z-10"></div>
      <div className="absolute top-0 w-full h-full z-20">
        <div className="bg-white-ffffff w-full h-full px-[12px] pt-[35px] pb-[30px] md:border-2 md:border-main md:w-[480px] md:h-[697px] md:px-[24px] md:pt-[28px] md:mx-auto md:my-[100px] md:rounded-lg">
          <div className="flex flex-col gap-[55px] md:gap-[25px]">
            <div className="flex flex-row justify-between h-[40px]">
              <h1 className="font-bold text-[30px]">예약 정보</h1>
              <div onClick={onCancel} className="hover: cursor-pointer">
                <FaXmark size={35} />
              </div>
            </div>
            <div className="flex flex-row justify-start gap-[12px] h-[43px] border-b-2 font-semibold">
              <div
                onClick={currentView}
                className={`cursor-pointer hover:cursor-pointer text-gray-500 ${view === "pending" && "border-b-[3px] border-main text-main"}`}
              >
                <p id="pending">신청 {ReservationsCount.pending}</p>
              </div>
              <div
                onClick={currentView}
                className={`cursor-pointer hover:cursor-pointer text-gray-500 ${view === "confirmed" && "border-b-[3px] border-main text-main"} ${ReservationsCount.confirmed === 0 && "pointer-events-none cursor-not-allowed"}`}
              >
                <p id="confirmed">승인 {ReservationsCount.confirmed}</p>
              </div>
              <div
                onClick={currentView}
                className={`cursor-pointer hover:cursor-pointer text-gray-500 ${view === "declined" && "border-b-[3px] border-main text-main"} ${ReservationsCount.declined === 0 && "pointer-events-none cursor-not-allowed"}`}
              >
                <p id="declined">거절 {ReservationsCount.declined}</p>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <h1 className="font-bold text-[20px]">예약 날짜</h1>
              <p className="font-semibold">{formatDate(ACTIVITYDATE)}</p>
              <Select
                defaultValue={filteredDateReservations[0]?.scheduleId}
                value={scheduleId}
                onValueChange={setScheduleId}
              >
                <SelectTrigger className="border border-gray-500 h-[56px] rounded-md focus:outline-none placeholder:font-bold">
                  <SelectValue placeholder="시간을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  {filteredDateReservations.map(
                    (filteredDateReservations: any, index: number) => (
                      <SelectItem
                        value={filteredDateReservations.scheduleId}
                        key={`key-${index}`}
                      >
                        {filteredDateReservations.startTime} -
                        {filteredDateReservations.endTime}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-[16px]">
              <h1 className="font-bold text-[20px]">예약 내역</h1>
              <ReservationInfoModalDetail
                activityId={ACTIVITYID}
                status={view}
                scheduleId={scheduleId}
                view={view}
              />
            </div>
            <div className="flex flex-row justify-between h-[40px]">
              <h1 className="font-bold text-[24px]">예약 현황</h1>
              <h1 className="font-bold text-[24px]">
                {ReservationsCount.pending +
                  ReservationsCount.confirmed +
                  ReservationsCount.declined}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>,
    destination
  );
};

export default ReservationInfoModal;
