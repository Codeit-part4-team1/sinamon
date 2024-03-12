import { LuUser2 } from "react-icons/lu";
import { TbListCheck } from "react-icons/tb";
import { AiOutlineSetting } from "react-icons/ai";
import { LuCalendarCheck } from "react-icons/lu";

const Usermenu = () => {

  return(<ul className="flex flex-col gap-1">
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
</ul>)
}

export default Usermenu