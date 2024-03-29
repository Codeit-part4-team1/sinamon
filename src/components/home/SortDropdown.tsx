import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface SortDropdownProps {
  sort: string;
  setSort: any;
  // setSort: (prev: string) => void;
}

const SortDropdown = ({ sort, setSort }: SortDropdownProps) => {
  return (
    <Select defaultValue="latest" value={sort} onValueChange={setSort}>
      <SelectTrigger className="w-[110px] md:w-[140px] h-10 md:h-12 px-3 md:py-3 md:px-4 text-sm md:text-base font-medium">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          className="text-sm md:text-base font-medium focus:bg-sub"
          value="latest"
        >
          최신순
        </SelectItem>
        <SelectItem
          className="text-sm md:text-base font-medium focus:bg-sub"
          value="most_reviewed"
        >
          인기순
        </SelectItem>
        <SelectItem
          className="text-sm md:text-base font-medium focus:bg-sub"
          value="price_asc"
        >
          가격 낮은순
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortDropdown;
