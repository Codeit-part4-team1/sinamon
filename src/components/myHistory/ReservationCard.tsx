import Image from "next/image";
import Button from "@/components/common/Button/Button";
import { ReservationType } from "@/types/reservationTypes";
import { useState } from "react";
import { useMyReservations } from "@/hooks/useMyReservations";
import AlertModal from "../common/Modal/AlertModal";
import ReviewModal from "../common/Modal/ReviewModal";

const getStatusLabel = (status: ReservationType["status"]) => {
  const statusLabels: { [key: string]: string } = {
    pending: "승인 대기",
    confirmed: "예약 완료",
    declined: "예약 거절",
    canceled: "예약 취소",
    completed: "체험 완료"
  };
  return statusLabels[status] || "";
};

const ReservationCard: React.FC<ReservationType> = ({
  activity: { title, bannerImageUrl },
  id,
  status,
  reviewSubmitted,
  totalPrice,
  headCount,
  date,
  startTime,
  endTime
}) => {
  const [imageSrc, setImageSrc] = useState(bannerImageUrl);
  const [isCancelModalVisible, setCancelModalVisible] = useState(false);

  const { cancelMyReservations } = useMyReservations();

  const handleToggleCancelModal = () => {
    setCancelModalVisible((prev) => !prev);
  };
  console.log(id);
  const handleCancelToggleModal = (id: number) => {
    setCancelModalVisible(false);
    cancelMyReservations.mutate(id);
  };

  const defaultImage = "/images/temp-active-preview.png"; // 기본 이미지 경로 설정

  const handleError = () => {
    setImageSrc(defaultImage); // 이미지 로드 실패 시 기본 이미지로 변경
  };

  console.log(status);

  return (
    <li className="w-full aspect-[1/1.4] max-h-[500px] flex flex-col rounded-b-xl shadow-lg bg-white-ffffff cursor-pointer">
      <div className="relative flex-1 w-full rounded-t-xl overflow-hidden">
        <Image
          className="w-full object-cover"
          src={imageSrc}
          alt="Activity"
          fill
          onError={handleError}
        />
      </div>
      <div className="flex-[1.2] flex flex-col justify-between">
        <div className="h-full px-4 py-3 flex flex-col justify-between">
          <div className="flex flex-col gap-1 justify-between">
            <span
              className={`text-sm font-bold  ${
                status === "pending"
                  ? "text-orange-ff7c1d"
                  : status === "confirmed"
                    ? "text-blue-2eb4ff"
                    : status === "declined"
                      ? "text-red-ff472e"
                      : status === "canceled"
                        ? "text-gray-79747e"
                        : "text-gray-79747e"
              }`}
            >
              {getStatusLabel(status)}
            </span>
            <div className="font-bold text-lg leading-6">{title}</div>
            <div className="text-gray-700 font-medium text-sm leading-[18px]">
              <p className="">{date}</p>
              <p className="">
                {startTime} - {endTime} · {headCount}명
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base font-medium text-gray-4b4b4b">
              ￦{totalPrice.toLocaleString()}
            </span>
            <div className="h-8">
              {status === "completed" && !reviewSubmitted && (
                <Button text="후기 작성" size="sm" type="submit" />
              )}
              {status === "pending" && (
                <div onClick={handleToggleCancelModal}>
                  <Button text="예약 취소" size="sm" type="submit" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isCancelModalVisible && (
        <div className="absolute flex align-middle justify-center">
          <div className="fixed inset-0 z-10 flex items-center justify-center">
            <div className="z-20 bg-black opacity-50 w-full h-full absolute"></div>
            <div className="z-30">
              <AlertModal
                type="decide"
                size="decide"
                text="예약을 취소하시겠습니까?"
                handlerDicideNo={handleToggleCancelModal}
                handelerDicideYes={() => handleCancelToggleModal(id)}
              />
            </div>
          </div>
        </div>
      )}
      <ReviewModal />
    </li>
  );
};

export default ReservationCard;
