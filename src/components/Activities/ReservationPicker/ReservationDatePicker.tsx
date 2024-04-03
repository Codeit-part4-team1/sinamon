import { useState } from "react";

import ReservationCalendar from "@/components/Activities/ReservationCalendar/ReservationCalendar";
import Button from "@/components/common/Button/Button";
import ReservationTime from "@/components/Activities/ReservationTime/ReservationTime";
import SelectHeadcount from "@/components/Activities/SelectHeadcount/SelectHeadcount";
import ReservationModalUi from "@/components/Activities/ReservationModlal/ReservationModal";
import { createPortal } from "react-dom";
import { Activity } from "@/types/activities";
import dayjs from "dayjs";
import { AvailableTime } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReservation } from "@/api/activities";
import { queryKey } from "@/constants/queryKeys";
import { useRouter } from "next/router";
import useAvailableDate from "@/hooks/useAvailableDate";
import { SubmitHandler, useForm } from "react-hook-form";
import { log } from "console";

export interface PostReservationData {
  headCount: number;
  scheduleId: number;
}
interface ActivityDataProp {
  data: Activity;
}

export const ReservationDatePicker = ({ data }: ActivityDataProp) => {
  const [isModalOpend, setisModalOpend] = useState(false);
  const { control, register, handleSubmit, setValue, getValues, watch } =
    useForm<PostReservationData>({
      defaultValues: { headCount: 1, scheduleId: 0 }
    });
  // 날짜
  const [selectedDateValue, setSelectedDateValue] = useState<Date>();
  // 시간
  const [selectedTimeButtonId, setSelectedTimeButtonId] = useState<
    number | null
  >(null);

  const handelReserveModalOpen = () => {
    setisModalOpend((prev) => !prev);
  };

  const handelReserveModalClose = () => {
    setisModalOpend((prev) => !prev);
  };
  const { availableTime, setAvailableTime, availableDateData } =
    useAvailableDate({
      dateValue: selectedDateValue,
      activityId: data.id
    });
  console.log(availableDateData);

  const router = useRouter();
  const id = data.id;
  const queryClient = useQueryClient();
  const reserveMutation = useMutation({
    mutationFn: (data: PostReservationData) =>
      postReservation({
        activityId: id,
        scheduleId: data.scheduleId,
        headCount: data.headCount
      }),
    onSuccess: async () => {
      alert("예약이 완료되었습니다.");
      await queryClient.invalidateQueries({
        queryKey: [queryKey.reservation]
      });
      router.push("/mypage/reservations");
    },
    onError: (error) => {
      if (error) {
        alert(error?.message);
      }
    }
  });

  const handelOnSubmit: SubmitHandler<PostReservationData> = (data) => {
    reserveMutation.mutate(data);
  };

  return (
    <>
      <div className="sm:hidden lg:min md:block md:flex-col md:border md:gap-6 md:rounded-sm bg-white-ffffff lg:w-96 md:p-6  md:w-[251px]">
        <p className="md:flex md:font-bold md:text-[24px] md:gap-[5px] center lg:text-[28px]">
          ￦ {data.price.toLocaleString()}
          <span className=" md:text-gray-4b4b4b md:self-center md:font-normal md:text-[16px] lg:text-[20px]">
            / 인
          </span>
        </p>
        <hr className="md:w-full md:bg-gray-dddddd md:my-4" />
        <form onSubmit={handleSubmit(handelOnSubmit)}>
          <div>
            <h2 className="md:font-bold md:text-[20px]">날짜</h2>
            <button
              className="md:text-black md:underline md:font-semibold md:pb-[30px] md:text-[16px] lg:hidden"
              onClick={handelReserveModalOpen}
            >
              날짜 선택하기
            </button>
            <div className="m-auto md:hidden lg:block">
              <ReservationCalendar
                dateValue={selectedDateValue}
                setDateValue={setSelectedDateValue}
                register={register}
              />
            </div>
          </div>

          <div className="lg:flex-col lg:pb-4 lg:block md:hidden">
            <ReservationTime
              setValue={setValue}
              control={control}
              availableTime={availableTime}
              register={register}
            />
          </div>
          <hr className="md:w-full md:bg-gray-dddddd md:hidden lg:block" />
          <SelectHeadcount
            control={control}
            Headcount={watch("headCount")}
            setValue={setValue}
          />
          <Button text="신청하기" size="full" type="submit" />
        </form>
        <hr className="md:w-full md:bg-gray-dddddd md:mt-6 md:mb-4" />
        <div>
          <div className="md:flex md:justify-between">
            <h2 className="md:font-bold md:text-[20px]">총 합계</h2>
            <p className="md:font-bold md:text-[20px]">￦ 10,000</p>
          </div>
        </div>
      </div>

      {/* 모바일 */}
      <div className="md:hidden flex border bg-white-ffffff justify-between w-full fixed bottom-0 p-4 h-20 ">
        <div>
          <p className="flex font-bold text-[20px] gap-[6px]  ">
            ￦ {data.price.toLocaleString()}
            <span className="text-[20px] font-semibold text-[#121]">/</span>
            <button className="text-main font-medium text-[18px] underline underline-offset-[3px]  ">
              명
            </button>
          </p>
          <button
            onClick={handelReserveModalOpen}
            className="text-main underline font-semibold text-[14px]   "
          >
            날짜 선택하기
          </button>
        </div>
        <Button text="신청하기" size="lg" type="submit" />
      </div>

      {isModalOpend &&
        createPortal(
          <form>
            <ReservationModalUi
              dateValue={selectedDateValue}
              setDateValue={setSelectedDateValue}
              closeModal={handelReserveModalClose}
              availableTime={availableTime}
            />
          </form>,
          document.getElementById("modal-root") as HTMLDivElement
        )}
    </>
  );
};
