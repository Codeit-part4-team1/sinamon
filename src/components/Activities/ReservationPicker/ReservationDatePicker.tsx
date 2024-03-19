import { useState } from "react";

import ReservationCalendar from "@/components/Activities/ReservationCalendar/ReservationCalendar";
import Button from "@/components/common/Button/Button";
import ReservationTime from "@/components/Activities/ReservationTime/ReservationTime";
import SelectHeadcount from "@/components/Activities/SelectHeadcount/SelectHeadcount";
import ReservationModalUi from "../ReservationModlal/ReservationModal";
import { createPortal } from "react-dom";

const ReservationDatePicker = () => {
  const [isModalOpend, setisModalOpend] = useState(false);
  const [Headcount, setHeadcount] = useState(1);

  const html = document.querySelector("html");

  const handelReserveModalOpen = () => {
    setisModalOpend((prev) => !prev);
    html?.classList.add("scroll-locked");
  };

  const handelReserveModalClose = () => {
    setisModalOpend((prev) => !prev);
    html?.classList.remove("scroll-locked");
  };

  return (
    <>
      <div className="sm:hidden md:block md:flex-col md:border md:gap-6 md:rounded-sm bg-white-ffffff lg:top-0 lg:w-96 md:p-6 md:absolute md:top-1 md:w-[251px]">
        <p className="md:flex md:font-bold md:text-[24px] md:gap-[5px] center lg:text-[28px]">
          ￦ 1,000
          <span className=" md:text-gray-4b4b4b md:self-center md:font-normal md:text-[16px] lg:text-[20px]">
            / 인
          </span>
        </p>
        <hr className="md:w-full md:bg-gray-dddddd md:my-4" />
        <div>
          <h2 className="md:font-bold md:text-[20px]">날짜</h2>
          <button
            className="md:text-black md:underline md:font-semibold md:pb-[30px] md:text-[16px] lg:hidden"
            onClick={handelReserveModalOpen}
          >
            날짜 선택하기
          </button>
          <div className="md:hidden lg:block">
            <ReservationCalendar />
          </div>
        </div>
        <div className="lg:flex-col lg:pb-4 lg:block md:hidden">
          <ReservationTime />
        </div>
        <hr className="md:w-full md:bg-gray-dddddd md:hidden lg:block" />
        <SelectHeadcount Headcount={Headcount} setHeadcount={setHeadcount} />
        <Button text="신청하기" size="full" type="button" />
        <hr className="md:w-full md:bg-gray-dddddd md:mt-6 md:mb-4" />
        <div>
          <div className="md:flex md:justify-between">
            <h2 className="md:font-bold md:text-[20px]">총 합계</h2>
            <p className="md:font-bold md:text-[20px]">￦ 10,000</p>
          </div>
        </div>
      </div>

      {/* 모바일 */}
      <div className="md:hidden flex border bg-white-ffffff justify-between w-full sticky bottom-0 p-4 h-20 ">
        <div>
          <p className="font-bold text-[20px]">
            ￦ 1,000
            <button className="text-main text-[14px] underline underline-offset-[3px] ">
              / 인
            </button>
          </p>
          <button className="text-main underline font-semibold text-[14px]   ">
            날짜 선택하기
          </button>
        </div>
        <Button text="신청하기" size="lg" type="button" />
      </div>

      {isModalOpend &&
        createPortal(
          <ReservationModalUi closeModal={handelReserveModalClose} />,
          document.getElementById("modal-root") as HTMLDivElement
        )}
    </>
  );
};

export default ReservationDatePicker;
