import { useState } from "react";

import Button from "@/components/common/Button/Button";

import { AvailableTime } from "@/types/common";
import { PostReservationData } from "@/components/Activities/ReservationPicker/ReservationDatePicker";
import {
  Control,
  Controller,
  UseFormSetValue,
  UseFormGetValues,
  UseFormRegister
} from "react-hook-form";

interface AvailableSchedulesProps {
  availableTime: AvailableTime[] | undefined;
  control?: Control<PostReservationData>;
  setValue?: UseFormSetValue<any>;
  getValues?: UseFormGetValues<any>;
  register?: UseFormRegister<PostReservationData>;
}

const ReservationTime = ({
  availableTime,
  control,
  setValue
}: AvailableSchedulesProps) => {
  const handleClickTimes = (id: number) => {
    if (setValue) {
      setValue("scheduleId", id);
    }
  };
  return (
    <>
      <h2 className="font-bold text-[20px]  pb-4 ">예약 가능한 시간</h2>
      <ul className="flex flex-wrap gap-3 ">
        <Controller
          name="scheduleId"
          control={control}
          render={({ field }) => (
            <>
              {availableTime && availableTime.length ? (
                availableTime?.map((item) => (
                  <li key={item.id} value={field.value}>
                    <Button
                      onClick={() => handleClickTimes(item.id)}
                      text={`${item.startTime}~${item.endTime}`}
                      size="sm"
                      type="button"
                    />
                  </li>
                ))
              ) : (
                <p>해당 날짜에 참석 가능한 시간이 없습니다.</p>
              )}
            </>
          )}
        />
      </ul>
    </>
  );
};

export default ReservationTime;
