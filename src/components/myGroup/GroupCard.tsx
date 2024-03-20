import React from "react";

import type { GroupType } from "@/types/groupTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { HiMenu } from "react-icons/hi";

const GroupCard: React.FC<GroupType> = ({
  bannerImageUrl,
  title,
  price,
  rating,
  reviewCount
}) => {
  return (
    <li className=" w-full md:w-[400px] lg:w-[448px] rounded-xl overflow-hidden shadow-lg bg-white-ffffff my-2">
      <img
        className="w-full h-40 object-cover"
        src={bannerImageUrl}
        alt="Activity"
      />
      <div className="p-6 lg:h-[200px] md:h-[190px] sm:h-[180px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <span className="text-sm md:text-base leading-[26px] font-medium lg:mb-2">
              ⭐ {rating} ({reviewCount})
            </span>
          </div>
          <div className="font-bold text-xl md:mb-9">{title}</div>
        </div>
        <div className="py-[1px] flex justify-between">
          <span className="text-[24px] font-medium flex justify-center items-center text-gray-4b4b4b">
            ￦{price.toLocaleString()}
          </span>
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]  flex flex-row-reverse invisible">
              <HiMenu size="30" className="text-black visible" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                className="text-sm md:text-base font-medium focus:bg-sub"
                value="edit"
              >
                수정하기
              </SelectItem>
              <SelectItem
                className="text-sm md:text-base font-medium focus:bg-sub"
                value="delete"
              >
                삭제하기
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </li>
  );
};

export default GroupCard;
