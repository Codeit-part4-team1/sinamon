import React from "react";

import Button from "@/components/common/Button";

interface Activity {
  bannerImageUrl: string;
  title: string;
  id: number;
}

interface Reservation {
  id: number;
  activity: Activity;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface ReservationCardProps {
  reservation: Reservation;
}

const getStatusLabel = (status: Reservation["status"]) => {
  const statusLabels: { [key: string]: string } = {
    pending: "승인 대기",
    confirmed: "예약 완료",
    declined: "예약 거절",
    canceled: "예약 취소",
    completed: "체험 완료"
  };
  return statusLabels[status] || "";
};

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  const {
    activity: { bannerImageUrl, title },
    status,
    reviewSubmitted,
    totalPrice,
    headCount,
    date,
    startTime,
    endTime
  } = reservation;

  return (
    <li className=" w-full md:w-[400px] lg:w-[448px] rounded-xl overflow-hidden shadow-lg bg-white-ffffff my-2">
      <img
        className="w-full h-40 object-cover"
        src={bannerImageUrl}
        alt="Activity"
      />
      <div className="px-6 p-6 h-[235px] lg:h-[251px]">
        <div className="flex justify-between items-center">
          <span
            className={` text-sm md:text-base leading-[26px] font-bold lg:mb-2  ${
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
        </div>
        <div className="font-bold text-xl md:mb-1 lg:mb-3">{title}</div>
        <div className="text-gray-700 text-base">
          <span className="font-medium">
            {date} · {startTime} - {endTime} · {headCount}명
          </span>
        </div>
        <div className="py-3">
          <span className="text-[24px] font-medium">
            ￦{totalPrice.toLocaleString()}
          </span>
        </div>
        {status === "completed" && !reviewSubmitted && (
          <Button text="후기 작성" size="lg" type="submit" />
        )}
        {status === "confirmed" && (
          <Button text="예약 취소" size="lg" type="submit" />
        )}
      </div>
    </li>
  );
};

export default ReservationCard;
