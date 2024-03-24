import Avatar from "@/components/common/Avatar/Avatar";
import Button from "@/components/common/Button/Button";
import { LuUser2 } from "react-icons/lu";
import { TbListCheck } from "react-icons/tb";
import { AiOutlineSetting } from "react-icons/ai";
import { LuCalendarCheck } from "react-icons/lu";

interface ProfileModalProps {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl?: string;
    createdAt: string;
    updatedAt: string;
  };
}

const ProfileModal = ({ user }: ProfileModalProps) => {
  return (
    <div className="w-72 p-5 border border-gray-dddddd rounded-xl bg-white-ffffff">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4 items-center">
          <Avatar user={user} size="lg" />
          <div className="flex flex-col gap-1 items-center">
            <p className="text-lg font-bold">{user?.nickname}</p>
            <p className="text-base">{user?.email}</p>
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
