import React, { useState, useRef, useContext } from "react";
import ReactDOM from "react-dom";

import { FaXmark } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { AuthContext } from "@/contexts/AuthProvider";
import Button from "./Button";
import AlertModal from "./AlertModal";

type ViewType = {
  apply: boolean;
  approval: boolean;
  refusal: boolean;
};

const ReservationInfoModal = ({ onCancel, destination }: any) => {
  const { userCookie } = useContext(AuthContext);

  const [view, setView] = useState<ViewType>({
    apply: true,
    approval: false,
    refusal: false
  });

  const submit = {
    onSubmit: async () => {
      dialogRef.current.showModal();
    },
    onError: async () => {
      undefined;
    }
  };

  const currentView = (e: any) => {
    const clicked = e.target.id;

    (clicked === "apply" || clicked === "approval" || clicked === "refusal") &&
      setView(() => ({
        apply: clicked === "apply",
        approval: clicked === "approval",
        refusal: clicked === "refusal"
      }));
  };

  const dialogRef = useRef<any>();

  return ReactDOM.createPortal(
    <>
      <div className="absolute top-0 bg-gray-400 opacity-40 w-full h-full">
        <dialog ref={dialogRef}>
          <AlertModal
            type="alert"
            size="sm"
            text=""
            handlerAlertModal={() => {
              dialogRef.current.close();
            }}
          />
        </dialog>
      </div>
      <div className="absolute top-0 w-full h-full">
        <form
          onSubmit={submit.onSubmit}
          className="bg-white-ffffff w-full h-full px-[12px] pt-[35px] pb-[30px] md:border-2 md:border-main md:w-[480px] md:h-[697px] md:px-[24px] md:pt-[28px] md:mx-auto md:my-[100px] md:rounded-lg"
        >
          <div className="flex flex-col gap-[55px] md:gap-[25px]">
            <div className="flex flex-row justify-between h-[40px]">
              <h1 className="font-bold text-[30px]">예약 정보</h1>
              <div onClick={onCancel} className="hover: cursor-pointer">
                <FaXmark size={35} />
              </div>
            </div>
            <div className="flex flex-row justify-start gap-[12px] h-[43px] border-b-2 font-semibold">
              <div
                onClick={currentView}
                className={`cursor-pointer hover:cursor-pointer text-gray-500 ${view.apply && "border-b-[3px] border-main"}`}
              >
                <p id="apply">신청 2</p>
              </div>
              <div
                onClick={currentView}
                className={`cursor-pointer hover:cursor-pointer text-gray-500 ${view.approval && "border-b-[3px] border-main"}`}
              >
                <p id="approval">승인 1</p>
              </div>
              <div
                onClick={currentView}
                className={`cursor-pointer hover:cursor-pointer text-gray-500 ${view.refusal && "border-b-[3px] border-main"}`}
              >
                <p id="refusal">거절 1</p>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <h1 className="font-bold text-[20px]">예약 날짜</h1>
              <p className="font-semibold">2023년 12월 12일</p>
              <Select>
                <SelectTrigger className="border border-gray-500 h-[56px] rounded-md focus:outline-none placeholder:font-bold">
                  <SelectValue placeholder="14:00 ~ 15:00" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-[16px]">
              <h1 className="font-bold text-[20px]">예약 내역</h1>
              <div className="flex flex-col gap-[14px] h-[250px] overflow-auto scrollbar-hide">
                {[1, 2, 3, 4].map((item, index): any => (
                  <div
                    key={index}
                    className="border-2 rounded-lg h-[116px] p-[16px]"
                  >
                    <div className="flex flex-col gap-[6px] w-[97px]">
                      <div className="flex felx-row gap-[10px] font-bold text-[14px]">
                        <p>닉네임</p>
                        <p>정만철</p>
                      </div>
                      <div className="flex felx-row gap-[10px] font-bold text-[14px]">
                        <p>인원</p>
                        <p>12명</p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-[8px] justify-end">
                      <Button text="승인하기" size="sm" type="submit" />
                      <Button
                        text="거절하기"
                        size="sm"
                        type="submit"
                        status="second"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between h-[40px]">
              <h1 className="font-bold text-[24px]">예약 현황</h1>
              <h1 className="font-bold text-[24px]">0/10</h1>
            </div>
          </div>
        </form>
      </div>
    </>,
    destination
  );
};

export default ReservationInfoModal;
