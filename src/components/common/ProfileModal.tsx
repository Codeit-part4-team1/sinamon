import Image from "next/image";
import Button from "@/components/common/Button";
import { LuUser2 } from "react-icons/lu";
import { TbListCheck } from "react-icons/tb";
import { AiOutlineSetting } from "react-icons/ai";
import { LuCalendarCheck } from "react-icons/lu";

const ProfileModal = () => {
  return (
    <div className="w-72 p-5 border border-gray-dddddd rounded-xl bg-white-ffffff">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 items-center">
          <Image
            src={"/images/temp-profile.png"}
            alt="profile image"
            width={100}
            height={100}
            className="border border-gray-dddddd rounded-full"
          />
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold">정만철</p>
            <p className="text-base">mancheol@codeit.com</p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-dddddd"></div>
        <ul className="flex flex-col gap-1">
          <li>
            <button className="group w-full py-2 px-3 flex items-center gap-3 rounded-md hover:bg-sub">
              <LuUser2 className="text-xl text-gray-79747e group-hover:text-main" />
              <span className="text-base text-gray-79747e group-hover:text-main font-semibold">
                내 정보
              </span>
            </button>
          </li>
          <li>
            <button className="group w-full py-2 px-3 flex items-center gap-3 rounded-md hover:bg-sub">
              <TbListCheck className="text-xl text-gray-79747e group-hover:text-main" />
              <span className="text-base text-gray-79747e group-hover:text-main font-semibold">
                예약 내역
              </span>
            </button>
          </li>
          <li>
            <button className="group w-full py-2 px-3 flex items-center gap-3 rounded-md hover:bg-sub">
              <AiOutlineSetting className="text-xl text-gray-79747e group-hover:text-main" />
              <span className="text-base text-gray-79747e group-hover:text-main font-semibold">
                내 모임 관리
              </span>
            </button>
          </li>
          <li>
            <button className="group w-full py-2 px-3 flex items-center gap-3 rounded-md hover:bg-sub">
              <LuCalendarCheck className="text-xl text-gray-79747e group-hover:text-main" />
              <span className="text-base text-gray-79747e group-hover:text-main font-semibold">
                예약 현황
              </span>
            </button>
          </li>
        </ul>
        <Button text="로그아웃" size="full" type="button" />
      </div>
    </div>
  );
};

export default ProfileModal;
