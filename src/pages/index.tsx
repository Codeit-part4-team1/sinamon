import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function Home() {
  return (
    <>
      <Select defaultValue="latest">
        <SelectTrigger className="w-[110px] sm:w-[140px] py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base font-medium">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            className="text-sm sm:text-base font-medium focus:bg-sub"
            value="latest"
          >
            최신순
          </SelectItem>
          <SelectItem
            className="text-sm sm:text-base font-medium focus:bg-sub"
            value="most_reviewed"
          >
            인기순
          </SelectItem>
          <SelectItem
            className="text-sm sm:text-base font-medium focus:bg-sub"
            value="price_asc"
          >
            가격 낮은순
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
