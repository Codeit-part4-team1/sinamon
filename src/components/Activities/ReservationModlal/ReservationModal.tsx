import { useRef, Dispatch, SetStateAction } from "react";
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form";
import { AvailableTime } from "@/types/common";

import { IoMdClose } from "react-icons/io";
import ReservationCalendar from "@/components/Activities/ReservationCalendar/ReservationCalendar";
import ReservationTime from "@/components/Activities/ReservationTime/ReservationTime";
import Button from "@/components/common/Button/Button";
import { PostReservationData } from "../ReservationPicker/ReservationDatePicker";
interface AvailableDateData {
  date: string;
  times: { id: number; startTime: string; endTime: string }[];
}

interface ReservationModalProps {
  closeModal?: () => void;
  control?: Control<PostReservationData>;
  AvailableDateData?: AvailableDateData[];
  getValues?: UseFormGetValues<any>;
  setValue?: UseFormSetValue<any>;
  getdate?: string;
  register?: UseFormRegister<PostReservationData>;
  dateValue: Date | undefined;
  setDateValue: Dispatch<SetStateAction<Date | undefined>>;
  availableTime: AvailableTime[] | undefined;
}

const ReservationModalUi: React.FC<ReservationModalProps> = ({
  closeModal,
  dateValue,
  setDateValue,
  availableTime,
  setValue,
  control,
  AvailableDateData
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // const modalOutsideClick = (e: MouseEvent) => {
  //   if (modalRef.current === e.target) {
  //     closeModal();
  //   }
  // };

  return (
    <div
      ref={modalRef}
      // onClick={modalOutsideClick}
      className="flex flex-col w-full content-center h-full fixed top-0 z-[1] bg-white-ffffff rounded-none px-6 pb-10 pt-6  md:px-7 md:pb-9 md:pt-7 gap-[27px]  md:absolute md:right-3 md:top-[600px] md:rounded-3xl md:w-[480px] md:min-h-[600px] md:max-h-[650px] lg:hidden  "
    >
      <div className="flex justify-between ">
        <h1 className="flex text-black font-bold text-[28px] items-center">
          날짜
        </h1>
        <button onClick={closeModal}>
          <IoMdClose />
        </button>
      </div>
      <div className="flex justify-center ">
        <ReservationCalendar
          dateValue={dateValue}
          setDateValue={setDateValue}
        />
      </div>
      <div className="mb-56 md:mb-[71px]">
        <ReservationTime
          setValue={setValue}
          control={control}
          availableTime={availableTime}
        />
      </div>
      <Button text="신청하기" size="full" type="submit" />
    </div>
  );
};

export default ReservationModalUi;
