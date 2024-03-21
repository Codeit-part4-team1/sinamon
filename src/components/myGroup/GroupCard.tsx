import Image from "next/image";
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
    <li className="w-full aspect-square max-h-[400px] flex flex-col rounded-b-xl shadow-lg bg-white-ffffff cursor-pointer">
      <div className="relative flex-1 w-full rounded-t-xl overflow-hidden">
        <Image
          className="w-full object-cover"
          src={bannerImageUrl}
          alt="Activity"
          fill
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="h-full px-4 py-3 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                ⭐ {rating} ({reviewCount})
              </span>
            </div>
            <div className="font-bold text-lg leading-6">{title}</div>
          </div>
          <div className="py-[1px] flex justify-between">
            <span className="text-base font-medium flex justify-center items-center text-gray-4b4b4b">
              ￦{price.toLocaleString()}
            </span>
            <Select defaultValue="all">
              <SelectTrigger className="w-[100px] flex flex-row-reverse invisible p-0">
                <HiMenu size="24" className="text-black visible" />
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
      </div>
    </li>
  );
};

export default GroupCard;
