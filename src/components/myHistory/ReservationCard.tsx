import Image from "next/image";
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
    <li className="w-full aspect-[1/1.4] max-h-[500px] flex flex-col rounded-b-xl shadow-lg bg-white-ffffff cursor-pointer">
      <div className="relative flex-1 w-full rounded-t-xl overflow-hidden">
        <Image
          className="w-full object-cover"
          src={bannerImageUrl}
          alt="Activity"
          fill
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
              {status === "confirmed" && (
                <Button text="예약 취소" size="sm" type="submit" />
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ReservationCard;
