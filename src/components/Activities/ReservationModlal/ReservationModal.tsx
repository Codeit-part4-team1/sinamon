import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";

import { IoMdClose } from "react-icons/io";
import ReservationCalendar from "@/components/Activities/ReservationCalendar/ReservationCalendar";
import ReservationTime from "@/components/Activities/ReservationTime/ReservationTime";
import Button from "@/components/common/Button/Button";

interface ReservationModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ReservationModalUi = () => {
  return (
    <div>
      <div>
        <h1>날짜</h1>
        <button>
          <IoMdClose />
        </button>
      </div>
      <div>
        <ReservationCalendar />
        <ReservationTime />
      </div>
      <Button text="신청하기" size="full" type="button" />
    </div>
  );
};

const ReservationModal = () => {
  return createPortal(
    <ReservationModalUi />,
    document.getElementById("modal-root") as HTMLDivElement
  );
};

export default ReservationModal;
