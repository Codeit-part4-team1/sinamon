import React, { useState } from "react";

import { FaXmark } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { GoDotFill } from "react-icons/go";

type NotificationType = {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

type NotificationArrayType = NotificationType[];

const NotificationModal = () => {
  const [notifications, setNotifications] = useState<NotificationArrayType>([]);

  const arr = [1, 2, 3, 4, 5, 6];

  return (
    <div className="flex-col rounded-lg bg-sub w-[368px] h-[469px] px-[20px] py-[24px]">
      <div className="flex flex-row justify-between pb-[16px]">
        <h1 className="text-[20px] w-[75px] font-bold">알림 6개</h1>
        <div>
          <FaXmark width={24} height={24} />
        </div>
      </div>
      <div className="flex flex-col h-[376px] gap-[8px] overflow-auto scrollbar-hide">
        {arr.map((item, index) => {
          return (
            <div className="flex flex-col gap-[4px] bg-zinc-50 rounded-md w-[328px] h-[120px] px-[12px] py-[16px]">
              <div>
                <div className="flex flex-row justify-between h-[24px]">
                  <GoDotFill width={10} height={10} color="blue" />
                  <div>
                    <RxCross2 width={25} height={25} />
                  </div>
                </div>
                <div className="h-[44px]">
                  함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이
                  승인되었어요.
                </div>
              </div>
              <div className="h-[16px]">
                <small className="text-gray-400">1분전</small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationModal;
