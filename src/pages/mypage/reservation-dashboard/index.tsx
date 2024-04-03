import type { NextPageWithLayout } from "@/pages/_app";

import React, { useState, useRef, useEffect, ReactNode } from "react";

import { reservationDashboard } from "@/hooks/useReservationDashboard";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import { Modal, DateType } from "@/types/reservation-dashboard";
import ReservationInfoModal from "@/components/common/Modal/ReservationInfoModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";

const ReservationStatus: NextPageWithLayout = () => {
  const localizer = momentLocalizer(moment);
  const [modal, setModal] = useState<Modal>({
    show: false,
    modal: useRef<HTMLDivElement>(null),
    date: "",
    destination: null
  });

  useEffect(() => {
    setModal((prev: Modal) => ({ ...prev, destination: document.body }));
  }, []);

  const currentDate = new Date();
  const [date, setDate] = useState<DateType>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1
  });
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [activitesId, setActiviesId] = useState<number>(0);
  const { data: activites } = reservationDashboard.getActivities();
  const { data: monthlyActivites } = reservationDashboard.getMonthlyActivites(
    activitesId,
    date.year.toString(),
    date.month.toString().padStart(2, "0")
  );

  console.log(monthlyActivites);

  /* monthlyActivites?.data
  [{
    date: '2024-04-03',
    reservations: {
      completed: 8,
      confirmed: 0,
      pending: 6
    }
  }, ...] */
  const event = isSelected
    ? monthlyActivites?.data.flatMap((item: any, index: number) => {
        const isPastDate = new Date(item.date);

        if (isPastDate.getDate() < currentDate.getDate()) {
          return {
            id: index,
            title: `완료: ${item.reservations.completed + item.reservations.confirmed + item.reservations.pending}`,
            start: new Date(item.date),
            end: new Date(item.date)
          };
        } else {
          const entries = Object.entries(item.reservations);
          return Object.entries(item.reservations).map(
            ([key, value], index) =>
              Number(value) > 0 && {
                id: index * entries.length + index,
                title: `${key === "completed" ? "완료" : key === "confirmed" ? "승인" : "예약"}: ${value}`,
                start: new Date(item.date),
                end: new Date(item.date)
              }
          );
        }
      })
    : undefined;

  return (
    <div className="flex flex-col gap-[50px]">
      {modal.show && (
        <ReservationInfoModal
          destination={modal.destination}
          onCancel={() => {
            setModal((prev: Modal) => ({ ...prev, show: false }));
          }}
          ref={modal.modal}
          ACTIVITYID={activitesId}
          ACTIVITYDATE={modal.date}
        />
      )}
      <div className="relative flex flex-col gap-[32px]">
        <h1 className="text-[28px] font-bold">모집 현황</h1>
        <Select
          onValueChange={(e) => {
            !isSelected && setIsSelected(true);
            setActiviesId(Number(e));
          }}
        >
          <SelectTrigger className="border border-gray-500 h-[56px] rounded-md pl-5 text-base font-normal focus:outline-none placeholder:font-bold">
            <SelectValue placeholder="어떤 모임의 모집 현황을 확인할까요?" />
            <SelectContent>
              {activites?.data.activities.map((item: any) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectTrigger>
        </Select>
        <div className="absolute bg-white-ffffff bottom-[44px] left-[30px] text-[16px] font-semibold">
          체험명
        </div>
      </div>
      <div>
        <div className="calendar-wrapper">
          <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            view="month"
            style={{ height: 670 }}
            components={{
              toolbar: (toolbarProps) => (
                <MyToolbar {...toolbarProps} date={date} setDate={setDate} />
              )
            }}
            events={event}
            onSelectEvent={(e) => {
              const dateObject = new Date(e.start.toString());
              const year = dateObject.getFullYear();
              const month = String(dateObject.getMonth() + 1).padStart(2, "0");
              const day = String(dateObject.getDate()).padStart(2, "0");
              const formattedDateString = `${year}-${month}-${day}`;
              setModal((prev: Modal) => ({
                ...prev,
                date: formattedDateString,
                show: !modal.show
              }));
            }}
            eventPropGetter={(event: any) => {
              if (event.title.includes("예약")) {
                return {
                  style: {
                    color: "#FFF",
                    fontSize: "13px",
                    backgroundColor: "#0085FF",
                    paddingLeft: "10px"
                  }
                };
              } else if (event.title.includes("승인")) {
                return {
                  style: {
                    color: "#FF7C1D",
                    fontSize: "13px",
                    backgroundColor: "#FFF4E8",
                    paddingLeft: "10px"
                  }
                };
              } else if (event.title.includes("완료")) {
                return {
                  style: {
                    color: "#4B4B4B",
                    fontSize: "13px",
                    backgroundColor: "#DDD",
                    paddingLeft: "10px"
                  }
                };
              } else {
                return {
                  className: "flex items-center text-[13px] h-[20px]"
                };
              }
            }}
            className="flex flex-col gap-[50px] rouned-lg"
          />
        </div>
      </div>
    </div>
  );
};

const MyToolbar: React.FC<any> = ({ date, setDate, onNavigate }) => {
  return (
    <div className="flex flex-row justify-center gap-[30px] md:gap-[50px]">
      <div
        onClick={() => {
          date.month === 1
            ? (setDate((prev: DateType) => ({
                ...prev,
                year: prev.year - 1,
                month: 12
              })),
              onNavigate("PREV"))
            : (setDate((prev: DateType) => ({
                ...prev,
                month: prev.month - 1
              })),
              onNavigate("PREV"));
        }}
        className="hover:cursor-pointer"
      >
        <IoIosArrowBack size={35} />
      </div>
      <div>
        <h1 className="w-[150px] text-center text-[20px] font-bold">{`${date.year}년 ${date.month}월`}</h1>
      </div>
      <div
        onClick={() => {
          date.month === 12
            ? (setDate((prev: DateType) => ({
                ...prev,
                year: prev.year + 1,
                month: 1
              })),
              onNavigate("PREV"))
            : (setDate((prev: DateType) => ({
                ...prev,
                month: prev.month + 1
              })),
              onNavigate("NEXT"));
        }}
        className="hover:cursor-pointer"
      >
        <IoIosArrowForward size={35} />
      </div>
    </div>
  );
};

ReservationStatus.getLayout = function getLayout(page: ReactNode) {
  return (
    <BaseLayout>
      <MenuLayout>{page}</MenuLayout>
    </BaseLayout>
  );
};

export default ReservationStatus;
