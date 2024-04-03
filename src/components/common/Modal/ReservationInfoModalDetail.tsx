import React, { useState } from "react";
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
  console.log(reservations);

  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);

  const handleToggleApproveModal = () => {
    setIsApproveModalVisible((prev) => !prev);
  };

  const handleToggleDeclineModal = () => {
    setIsDeclineModalVisible((prev) => !prev);
  };

  const handleApprove = (reservationId: number) => {
    setIsApproveModalVisible((prev) => !prev);
    ApporveReservation.mutate({
      activityId: activityId,
      reservationId: reservationId
    });
    setScheduleId(undefined);
  };

  const handleDecline = (reservationId: number) => {
    setIsDeclineModalVisible((prev) => !prev);
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
              <div onClick={handleToggleApproveModal}>
                <Button text="승인하기" size="sm" type="submit" />
              </div>
              <div onClick={handleToggleDeclineModal}>
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
          {isApproveModalVisible && (
            <div className="absolute flex align-middle justify-center">
              <div className="fixed inset-0 z-10 flex items-center justify-center">
                <div className="z-20 bg-black opacity-50 w-full h-full absolute"></div>
                <div className="z-30">
                  <AlertModal
                    type="decide"
                    size="decide"
                    text="예약을 승인하시겠습니까??"
                    handlerDicideNo={handleToggleApproveModal}
                    handelerDicideYes={() => handleApprove(reservations.id)}
                  />
                </div>
              </div>
            </div>
          )}
          {isDeclineModalVisible && (
            <div className="absolute flex align-middle justify-center">
              <div className="fixed inset-0 z-10 flex items-center justify-center">
                <div className="z-20 bg-black opacity-50 w-full h-full absolute"></div>
                <div className="z-30">
                  <AlertModal
                    type="decide"
                    size="decide"
                    text="예약을 거절하시겠습니까?"
                    handlerDicideNo={handleToggleDeclineModal}
                    handelerDicideYes={() => handleDecline(reservations.id)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReservationInfoModalDetail;
