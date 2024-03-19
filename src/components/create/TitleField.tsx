import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const TitleField = ({ useForm }: any) => {
  return (
    <FormField
      control={useForm.control}
      name="title"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel className="text-lg md:text-xl font-semibold">
            제목
          </FormLabel>
          <FormControl>
            <Input
              className="h-10 md:h-12 px-3 md:px-4 mt-1 md:mt-2 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
              placeholder="제목을 입력해 주세요"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TitleField;
