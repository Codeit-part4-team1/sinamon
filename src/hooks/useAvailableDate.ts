import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getAvailableDate } from "@/api/activities";
import { queryKey } from "@/constants/queryKeys";
import { AvailableTime, TimeSlot } from "@/types/common";

interface useAvailableDateProps {
  dateValue: Date | undefined;
  activityId: number;
}

const useAvailableDate = ({ dateValue, activityId }: useAvailableDateProps) => {
  const [availableTime, setAvailableTime] = useState<AvailableTime[]>();
  const formattedDate = dayjs(dateValue as Date).format("YYYY-MM-DD");
  const formattedYear = dayjs(dateValue as Date).format("YYYY");
  const formattedMonth = dayjs(dateValue as Date).format("MM");
  const currentTime = dayjs();

  const { data: availableDateData } = useQuery({
    queryKey: [queryKey.activity, activityId, formattedYear, formattedMonth],
    queryFn: () =>
      getAvailableDate({
        activityId,
        year: formattedYear,
        month: formattedMonth
      })
  });

  useEffect(() => {
    if (!dateValue || !availableDateData) {
      setAvailableTime([]);
      return;
    }

    const availableDate = availableDateData.find(
      (slot: TimeSlot) => slot.date === formattedDate
    );

    const availableTime = availableDate?.times.filter((time: AvailableTime) => {
      const startTime = time.startTime;

      /* 오늘 날짜의 경우 현재 시간이 시작 시간 이전인 것만 보여줘야함 
      만약 현재 시간이 시작 시간 이후라면 false를 리턴시켜 필터링 */
      return currentTime.isSame(formattedDate, "date")
        ? currentTime.isBefore(dayjs(startTime, "HH:mm"))
        : true;
    });

    setAvailableTime(availableTime);
  }, [dateValue, availableDateData]);

  return { availableTime, setAvailableTime, availableDateData };
};

export default useAvailableDate;
