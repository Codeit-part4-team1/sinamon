import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

const DescriptionField = () => {
  const { control } = useFormContext();

  return (
    <div>
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className="h-fit">
            <FormLabel className="text-lg md:text-xl font-semibold">
              설명
            </FormLabel>
            <FormControl>
              <textarea
                className="w-full h-52 py-2 md:py-3 px-3 md:px-4 mt-1 md:mt-2 text-sm md:text-base bg-white-ffffff border border-gray-a4a1aa rounded-md outline-none resize-none placeholder:text-gray-adaeb8"
                placeholder="설명을 입력해 주세요"
                {...field}
              ></textarea>
            </FormControl>
            <FormMessage className="mt-0 leading-none md:leading-none" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DescriptionField;
