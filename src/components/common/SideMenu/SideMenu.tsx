import { LuUser2 } from "react-icons/lu";
import { TbListCheck } from "react-icons/tb";
import { AiOutlineSetting } from "react-icons/ai";
import { LuCalendarCheck } from "react-icons/lu";

interface SideMenuProps {
  path: string;
}

const SideMenu = ({ path }: SideMenuProps) => {
  return (
    <ul className="md:sticky w-full md:w-44 h-fit top-0 md:pt-6 p-2 md:p-0 flex md:flex-col flex-shrink-0 justify-between gap-1 md:gap-3 bg-white-ffffff md:bg-transparent border border-gray-cbc9cf md:border-none rounded-md">
      <li className="sm:flex-1">
        <button
          className={`group w-full py-1 md:py-2 px-2 sm:px-[2px] md:px-3 flex justify-center md:justify-start items-center gap-2 md:gap-3 rounded-md md:border-none ${path === "/mypage" && "border border-main bg-sub"}`}
        >
          <LuUser2
            className={`hidden md:block text-xl text-gray-79747e group-hover:text-main ${path === "/mypage" && "text-main"}`}
          />
          <span
            className={`text-sm md:text-base text-gray-79747e group-hover:text-main font-semibold ${path === "/mypage" && "text-main"}`}
          >
            내 정보
          </span>
        </button>
      </li>
      <li className="sm:flex-1">
        <button
          className={`group w-full py-1 md:py-2 px-2 sm:px-[2px] md:px-3 flex justify-center md:justify-start items-center gap-2 md:gap-3 rounded-md md:border-none ${path === "/history" && "border border-main bg-sub"}`}
        >
          <TbListCheck
            className={`hidden md:block text-xl text-gray-79747e group-hover:text-main ${path === "/history" && "text-main"}`}
          />
          <span
            className={`text-sm md:text-base text-gray-79747e group-hover:text-main font-semibold ${path === "/history" && "text-main"}`}
          >
            참여 내역
          </span>
        </button>
      </li>
      <li className="sm:flex-1">
        <button
          className={`group w-full py-1 md:py-2 px-2 sm:px-[2px] md:px-3 flex justify-center md:justify-start items-center gap-2 md:gap-3 rounded-md md:border-none ${path === "/create" && "border border-main bg-sub"}`}
        >
          <AiOutlineSetting
            className={`hidden md:block text-xl text-gray-79747e group-hover:text-main ${path === "/create" && "text-main"}`}
          />
          <span
            className={`text-sm md:text-base text-gray-79747e group-hover:text-main font-semibold ${path === "/create" && "text-main"}`}
          >
            내 모임 관리
          </span>
        </button>
      </li>
      <li className="sm:flex-1">
        <button
          className={`group w-full py-1 md:py-2 px-2 sm:px-[2px] md:px-3 flex justify-center md:justify-start items-center gap-2 md:gap-3 rounded-md md:border-none ${path === "/status" && "border border-main bg-sub"}`}
        >
          <LuCalendarCheck
            className={`hidden md:block text-xl text-gray-79747e group-hover:text-main ${path === "/status" && "text-main"}`}
          />
          <span
            className={`text-sm md:text-base text-gray-79747e group-hover:text-main font-semibold ${path === "/status" && "text-main"}`}
          >
            모집 현황
          </span>
        </button>
      </li>
    </ul>
  );
};

export default SideMenu;
