import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

import { IoMdClose } from "react-icons/io";
import ReservationCalendar from "@/components/Activities/ReservationCalendar/ReservationCalendar";
import ReservationTime from "@/components/Activities/ReservationTime/ReservationTime";
import Button from "@/components/common/Button/Button";

interface ReservationModalProps {
  closeModal: () => void;
}

const ReservationModalUi: React.FC<ReservationModalProps> = ({
  closeModal
}) => {
  return (
    <div className="flex flex-col w-full h-full bg-white-ffffff rounded-none md:gap-[27px] md:w-[480px] md:px-7 md:py-6 ">
      <div className="flex justify-between">
        <h1 className="flex text-black font-bold text-[28px] items-center">
          날짜
        </h1>
        <button onClick={closeModal}>
          <IoMdClose />
        </button>
      </div>
      <div className="flex justify-center flex-col gap-8 items-center">
        <ReservationCalendar />
        <ReservationTime />
      </div>
      <Button text="신청하기" size="full" type="button" />
    </div>
  );
};

export default ReservationModalUi;
