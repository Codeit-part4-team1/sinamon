import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";

import React, { useState, useEffect } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";

const CustomToolbar = ({ onNavigate }: any) => {
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);

  return (
    <div className="flex flex-row justify-center gap-[30px] md:gap-[100px]">
      <div
        onClick={() => {
          if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear((prev: number) => (prev - 1));
            onNavigate("PREV");
          } else {
            setCurrentMonth(currentMonth - 1);
            onNavigate("PREV");
          }
        }}
        className="hover:cursor-pointer"
      >
        <MdKeyboardDoubleArrowLeft size={35} />
      </div>
      <div>
        <h1 className="text-[20px] font-bold">{`${currentYear}년 ${currentMonth}월`}</h1>
      </div>
      <div
        onClick={() => {
          if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear((prev: number) => (prev + 1));
          } else {
            setCurrentMonth(currentMonth + 1);
          }
          onNavigate("NEXT");
        }}
        className="hover:cursor-pointer"
      >
        <MdKeyboardDoubleArrowRight size={35} />
      </div>
    </div>
  );
};

const ReservationStatus: NextPageWithLayout = () => {
  const localizer = momentLocalizer(moment);

  return (
    <div className="flex flex-col gap-[40px]">
      <div className="relative flex flex-col gap-[32px]">
        <h1 className="text-[28px] font-bold">예약 현황</h1>
        <Select>
          <SelectTrigger className="border border-gray-500 h-[56px] rounded-md focus:outline-none placeholder:font-bold">
            <SelectValue placeholder="함께 배우면 즐거운 스트릿 댄스" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <div className="absolute bg-white-ffffff bottom-[43px] left-[30px] text-[16px] font-semibold">
          체험명
        </div>
      </div>
      <div>
        <div>
          <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            view="month"
            style={{ height: 500 }}
            components={{
              toolbar: CustomToolbar
            }}
            className="flex flex-col gap-[30px]"
          />
        </div>
      </div>
    </div>
  );
};

ReservationStatus.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <MenuLayout>{page}</MenuLayout>
    </BaseLayout>
  );
};

export default ReservationStatus;
