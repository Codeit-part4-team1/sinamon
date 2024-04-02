import React from "react";

import { RxCross2 } from "react-icons/rx";
import { GoDotFill } from "react-icons/go";
import { PiBellSlashThin } from "react-icons/pi";

import { myNotifications } from "@/hooks/useMyNotifications";

const NotificationModal = () => {
  const { data: notifications } = myNotifications.get();
  const { mutate } = myNotifications.delete();

  const elapsedTime = (rfc: string) => {
    const currentDate = new Date();
    const targetTime = new Date(rfc);
    const diffInMilliseconds = currentDate.getTime() - targetTime.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInMinutes <= 60) {
      return diffInMinutes + "분 전";
    } else if (diffInHours <= 24) {
      return diffInHours + "시간 전";
    } else {
      return diffInDays + "일 전";
    }
  };

  return (
    <div className="flex flex-col border border-gray-dddddd rounded-lg bg-sub w-[330px] h-[350px] px-[20px] py-[24px]">
      <div className="flex flex-row justify-between pb-[16px]">
        <h1 className="text-[20px] w-[100px] font-bold">
          알림 {notifications?.data.totalCount}개
        </h1>
      </div>
      <div className="flex flex-col h-[250px] gap-[8px] overflow-auto scrollbar-hide">
        {notifications?.data.notifications.length > 0 ? (
          notifications?.data.notifications.map((item: any) => {
            return (
              <div
                className="flex flex-col gap-[4px] bg-zinc-50 rounded-md w-[289px] h-[120px] px-[12px] py-[16px]"
                key={item.id}
              >
                <div>
                  <div className="flex flex-row justify-between h-[24px]">
                    <GoDotFill
                      size={10}
                      color={
                        item.content.includes("승인되었습니다.")
                          ? "blue"
                          : "red"
                      }
                    />
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        mutate(item.id);
                      }}
                    >
                      <RxCross2 size={15} />
                    </div>
                  </div>
                  <div className="h-[44px]">
                    {item.content.includes("거절") ? (
                      <span>
                        {item.content.split("거절")[0]}{" "}
                        <span className="text-red-500">거절</span>
                        {item.content.split("거절")[1]}{" "}
                      </span>
                    ) : item.content.includes("승인") ? (
                      <span>
                        {item.content.split("승인")[0]}{" "}
                        <span className="text-blue-500">승인</span>
                        {item.content.split("승인")[1]}{" "}
                      </span>
                    ) : (
                      item.content
                    )}
                  </div>
                </div>
                <div className="h-[16px]">
                  <small className="text-gray-400">
                    {elapsedTime(item.createdAt)}
                  </small>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <div className="flex flex-col items-center pt-[20px] gap-[30px]">
              <PiBellSlashThin size={120} />
              <h1 className="font-semibold">새로운 알림이 없습니다.</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
