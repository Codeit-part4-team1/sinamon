import React, { useState, useRef } from "react";
import Button from "@/components/common/Button/Button";
import { useMyActivities } from "@/hooks/useMyActivites";
import AlertModal from "./AlertModal";

const ReservationInfoModalDetail: React.FC<{
  activityId: number;
  status: string;
  scheduleId: string | undefined;
  setScheduleId: React.Dispatch<React.SetStateAction<string | undefined>>;
  ACTIVITYDATE: string;
}> = ({ activityId, status, scheduleId, setScheduleId, ACTIVITYDATE }) => {
  const {
    GetActivityReservedSchedulesByTime,
    ApporveReservation,
    DeclineReservation
  } = useMyActivities(ACTIVITYDATE);
  let { data } = GetActivityReservedSchedulesByTime(
    activityId,
    scheduleId,
    status
  );
  const { reservations } = data?.data || [];

  const [alertModal, setAlertModal] = useState({
    approveAlertModal: useRef<any>(null),
    desclineAlertModal: useRef<any>(null)
  });

  const handleApprove = (reservationId: number) => {
    ApporveReservation.mutate({
      activityId: activityId,
      reservationId: reservationId
    });
    setScheduleId(undefined);
  };

  const handleDecline = (reservationId: number) => {
    DeclineReservation.mutate({
      activityId: activityId,
      reservationId: reservationId
    });
    setScheduleId(undefined);
  };

  return (
    <div className="flex flex-col gap-[14px] h-[250px] overflow-auto scrollbar-hide">
      {reservations?.map((reservations: any, index: number): any => (
        <div
          key={`key-${index}`}
          className="border-2 rounded-lg h-[116px] p-[16px]"
        >
          <div className="flex flex-col gap-[6px] w-[97px]">
            <div className="flex felx-row gap-[10px] font-bold text-[14px] whitespace-nowrap">
              <p className="text-gray-79747e">닉네임</p>
              <p>{reservations.nickname}</p>
            </div>
            <div className="flex felx-row gap-[10px] font-bold text-[14px]">
              <p className="text-gray-79747e">인원</p>
              <p>{reservations.headCount}명</p>
            </div>
          </div>
          {status === "pending" && (
            <div className="flex flex-row gap-[8px] justify-end">
              <div onClick={() => alertModal.approveAlertModal.current?.showModal()}>
                <Button text="승인하기" size="sm" type="submit" />
              </div>
              <div onClick={() => alertModal.desclineAlertModal.current?.showModal()}>
                <Button
                  text="거절하기"
                  size="sm"
                  type="submit"
                  status="second"
                />
              </div>
            </div>
          )}
          {status === "declined" && (
            <div className="flex flex-row gap-[8px] justify-end">
              <div className="flex justify-center items-center rounded-xl w-[85px] h-[32px] bg-red-ffe4e0">
                <p className="font-bold text-red-ff472e">예약 거절</p>
              </div>
            </div>
          )}
          {status === "confirmed" && (
            <div className="flex flex-row gap-[8px] justify-end">
              <div className="flex justify-center items-center rounded-xl w-[85px] h-[32px] bg-orange-fff4e8">
                <p className="font-bold text-orange-ff7c1d">예약 승인</p>
              </div>
            </div>
          )}
          <dialog ref={alertModal.approveAlertModal}>
            <AlertModal
              type="decide"
              size="decide"
              text="예약을 승인하시겠습니까??"
              handlerDicideNo={() =>
                alertModal.approveAlertModal.current.close()
              }
              handelerDicideYes={() => handleApprove(reservations.id)}
            />
          </dialog>
          <dialog ref={alertModal.desclineAlertModal}>
            <AlertModal
              type="decide"
              size="decide"
              text="예약을 거절하시겠습니까?"
              handlerDicideNo={() =>
                alertModal.desclineAlertModal.current.close()
              }
              handelerDicideYes={() => handleDecline(reservations.id)}
            />
          </dialog>
        </div>
      ))}
    </div>
  );
};

export default ReservationInfoModalDetail;