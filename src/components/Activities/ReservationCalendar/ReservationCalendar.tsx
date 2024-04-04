import { Dispatch, SetStateAction } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { OnArgs, TileArgs } from "react-calendar";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import { UseFormRegister } from "react-hook-form";
import { TimeSlot } from "@/types/common";
import { PostReservationData } from "../ReservationPicker/ReservationDatePicker";
dayjs.extend(customParseFormat);

interface ReservationCalendarProps {
  dateValue?: Date;
  setDateValue: Dispatch<SetStateAction<Date | undefined>>;
  register?: UseFormRegister<PostReservationData>;

  // timeButtonId: number | null;
  // setTimeButtonId: Dispatch<SetStateAction<number | null>>;
  // AvailableDateData: TimeSlot[] | undefined;
}

const ReservationCalendar = ({
  dateValue,
  setDateValue
  // timeButtonId,
  // setTimeButtonId,
  // AvailableDateData
}: ReservationCalendarProps) => {
  // const handleCalendarDateChange = (
  //   value: Date | null | [Date | null, Date | null]
  // ) => {
  //   setDateValue(value);
  //   if (timeButtonId) {
  //     setTimeButtonId(null);
  //   }
  // };

  // const handleOnActiveStartDateChange = ({ activeStartDate }: OnArgs) => {
  //   setTimeButtonId(null);
  //   setDateValue(activeStartDate);
  // };

  // const currentTime = dayjs();

  // const handleTileDisabled = ({ date, view }: TileArgs) => {
  //   if (view === "year") {
  //     return false; // 연도 뷰에서는 비활성화하지 않음
  //   }

  //   const formattedDate = dayjs(date).format("YYYY-MM-DD");
  //   const availableDate = AvailableDateData?.find(
  //     (item) => item.date === formattedDate
  //   );

  //   if (!availableDate) {
  //     return true; // 해당 날짜에 사용 가능한 일정이 없으면 비활성화
  //   }

  //   // 오늘이지만, 이미 시간이 지나버린 데이터만 존재한다면 거르기
  //   let filteredTimes;
  //   if (currentTime.isSame(date, "date")) {
  //     filteredTimes = availableDate.times.filter((time) => {
  //       const startTime = time.startTime;
  //       return currentTime.isBefore(dayjs(startTime, "HH:mm"));
  //     });
  //   } else {
  //     filteredTimes = availableDate.times;
  //   }

  //   return filteredTimes.length === 0;
  // };
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const disabledDays = [{ from: new Date(2022, 4, 18), to: yesterday }];

  return (
    <Calendar
      mode="single"
      selected={dateValue}
      onSelect={setDateValue}
      disabled={disabledDays}
    />
  );
};

export default ReservationCalendar;
