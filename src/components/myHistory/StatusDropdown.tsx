import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const StatusDropdown = () => {
  return (
    <Select defaultValue="all">
      <SelectTrigger className="w-[110px] md:w-[120px] h-10 md:h-12 px-3 md:py-3 md:px-4 text-sm md:text-base font-medium">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          className="text-sm md:text-base font-medium focus:bg-sub"
          value="all"
        >
          모두
        </SelectItem>
        <SelectItem
          className="text-sm md:text-base font-medium focus:bg-sub"
          value="pending"
        >
          예약 신청
        </SelectItem>
        <SelectItem
          className="text-sm md:text-base font-medium focus:bg-sub"
          value="confirmed"
        >
          예약 취소
        </SelectItem>
        <SelectItem
          className="text-sm md:text-base font-medium focus:bg-sub"
          value="declined"
        >
          예약 승인
        </SelectItem>
        <SelectItem
          className="text-sm md:text-base font-medium focus:bg-sub"
          value="canceled"
        >
          예약 거절
        </SelectItem>
        <SelectItem
          className="text-sm md:text-base font-medium focus:bg-sub"
          value="completed"
        >
          체험 완료
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusDropdown;
