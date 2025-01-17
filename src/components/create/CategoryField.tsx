import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const CategoryField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => {
        const fieldWithoutRef = { ...field, ref: undefined };
        return (
          <FormItem className="flex-1">
            <FormLabel className="text-lg md:text-xl font-semibold">
              카테고리
            </FormLabel>
            <Select onValueChange={field.onChange} {...fieldWithoutRef}>
              <FormControl>
                <SelectTrigger className="w-full md:w-[124px] h-10 md:h-12 px-3 md:py-3 md:px-4 mt-1 md:mt-2 text-sm md:text-base font-medium">
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem
                  className="text-sm md:text-base font-medium focus:bg-sub"
                  value="문화 · 예술"
                >
                  문화 · 예술
                </SelectItem>
                <SelectItem
                  className="text-sm md:text-base font-medium focus:bg-sub"
                  value="식음료"
                >
                  식음료
                </SelectItem>
                <SelectItem
                  className="text-sm md:text-base font-medium focus:bg-sub"
                  value="스포츠"
                >
                  스포츠
                </SelectItem>
                <SelectItem
                  className="text-sm md:text-base font-medium focus:bg-sub"
                  value="투어"
                >
                  투어
                </SelectItem>
                <SelectItem
                  className="text-sm md:text-base font-medium focus:bg-sub"
                  value="관광"
                >
                  관광
                </SelectItem>
                <SelectItem
                  className="text-sm md:text-base font-medium focus:bg-sub"
                  value="웰빙"
                >
                  웰빙
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default CategoryField;
