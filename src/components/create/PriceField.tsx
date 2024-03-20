import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const PriceField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="price"
      render={({ field }) => (
        <FormItem className="relative flex-1 md:w-32">
          <FormLabel className="text-lg md:text-xl font-semibold">
            가격 (원)
          </FormLabel>
          <FormControl>
            <Input
              className="h-10 md:h-12 px-3 md:px-4 mt-1 md:mt-2 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
              placeholder="가격"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PriceField;
