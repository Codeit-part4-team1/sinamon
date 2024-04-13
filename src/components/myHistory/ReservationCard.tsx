import { useState } from "react";
import Image from "next/image";

import { ReservationType } from "@/types/MyReservationTypes";
import { useMyReservations } from "@/hooks/useMyReservations";
import Button from "@/components/common/Button/Button";
import AlertModal from "@/components/common/Modal/AlertModal";
import ReviewModal from "@/components/common/Modal/ReviewModal";

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
  const [isReviewModalVisible, setReviewModalVisible] = useState(false);

  const { cancelMyReservations } = useMyReservations();

  const handleToggleCancelModal = () => {
    setCancelModalVisible((prev) => !prev);
  };
  const handleCancel = (id: number) => {
    setCancelModalVisible(false);
    cancelMyReservations.mutate(id);
  };

  const handleToggleReviewModal = () => {
    setReviewModalVisible((prev) => !prev);
  };

  const defaultImage = "/images/temp-active-preview.avif";

  const handleError = () => {
    setImageSrc(defaultImage);
  };

  return (
    <li className="w-full aspect-[1/1.4] max-h-[500px] flex flex-col rounded-b-xl shadow-lg bg-white-ffffff">
      <div className="relative flex-1 w-full rounded-t-xl overflow-hidden">
        <Image
          className="w-full object-cover"
          src={imageSrc}
          alt="Activity"
          fill
          sizes="100%"
          priority
          onError={handleError}
        />
      </div>
      <div className="flex-[1.2] flex flex-col justify-between">
        <div className="h-full px-4 py-3 flex flex-col justify-between">
          <div className="flex flex-col gap-3 justify-between">
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
            <div className="text-gray-700 dark:text-zinc-400 font-medium text-sm leading-[18px]">
              <p className="">{date}</p>
              <p className="">
                {startTime} - {endTime} · {headCount}명
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base font-medium text-gray-4b4b4b dark:text-zinc-500">
              ￦{totalPrice.toLocaleString()}
            </span>
            <div className="h-8">
              {status === "completed" && !reviewSubmitted && (
                <div onClick={handleToggleReviewModal}>
                  <Button text="후기 작성" size="sm" type="submit" />
                </div>
              )}
              {status === "pending" && (
                <div onClick={handleToggleCancelModal}>
                  <Button text="예약 취소" size="sm" type="submit" />
                </div>
              )}
              {isReviewModalVisible && (
                <ReviewModal
                  onCancel={handleToggleReviewModal}
                  destination={document.body}
                  setReviewModalVisible={setReviewModalVisible}
                  id={id}
                  bannerImageUrl={imageSrc}
                  title={title}
                  date={date}
                  startTime={startTime}
                  endTime={endTime}
                  headCount={headCount}
                  totalPrice={totalPrice}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isCancelModalVisible && (
        <div className="absolute flex align-middle justify-center">
          <div className="fixed inset-0 z-10 flex items-center justify-center">
            <div className="z-20 bg-black opacity-50 w-full h-full absolute dark:bg-zinc-950 dark:opacity-70"></div>
            <div className="z-30">
              <AlertModal
                type="decide"
                size="decide"
                text="예약을 취소하시겠습니까?"
                handlerDicideNo={handleToggleCancelModal}
                handelerDicideYes={() => handleCancel(id)}
              />
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default ReservationCard;
