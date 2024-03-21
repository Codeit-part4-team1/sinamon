import { useRef, MouseEvent } from "react";

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
  const modalRef = useRef<HTMLDivElement>(null);

  const modalOutsideClick = (e: MouseEvent) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={modalOutsideClick}
      className="flex flex-col w-full sclo content-center h-full fixed top-0 z-[1] bg-white-ffffff rounded-none px-6 pb-10 pt-6 md:px-7 md:pb-9 md:pt-7 gap-[27px] md:rounded-3xl md:w-[480px] md:h-[670px] lg:hidden"
    >
      <div className="flex justify-between ">
        <h1 className="flex text-black font-bold text-[28px] items-center">
          날짜
        </h1>
        <button onClick={closeModal}>
          <IoMdClose />
        </button>
      </div>
      <div className="flex justify-center">
        <ReservationCalendar />
      </div>
      <div className="mb-56 md:mb-0">
        <ReservationTime />
      </div>
      <Button text="신청하기" size="full" type="submit" />
    </div>
  );
};

export default ReservationModalUi;
