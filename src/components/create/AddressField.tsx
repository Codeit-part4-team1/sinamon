import { useFormContext } from "react-hook-form";
import { useState } from "react";
import DaumPostcode, {Address} from "react-daum-postcode";
import { useTheme } from "next-themes";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const AddressField = () => {
  const { theme } = useTheme();

  const [dialogopen, setDialogOpen] = useState(false);

  const { control, setValue } = useFormContext();

  const handleComplete = (data: Address) => {
    console.log(data)
    setDialogOpen((prev) => !prev);
    setValue("address", data.address);
  };

  const addressStyle = {
    height: "500px"
  };

  const light = {
    bgColor: "",
    searchBgColor: "",
    contentBgColor: "",
    pageBgColor: "",
    textColor: "",
    queryTextColor: "",
    outlineColor: ""
  };

  const dark = {
    bgColor: "#090705",
    searchBgColor: "#14110F",
    contentBgColor: "#14110F",
    pageBgColor: "#14110F",
    textColor: "#ccc",
    queryTextColor: "#ccc",
    outlineColor: "#444444"
  };

  return (
    <div className="max-w-[700px]">
      <div className="flex flex-col gap-4">
        <Dialog open={dialogopen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DaumPostcode
              className="bg-main"
              theme={theme === "dark" ? dark : light}
              style={addressStyle}
              onComplete={handleComplete}
            ></DaumPostcode>
          </DialogContent>
          <FormField
            control={control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-lg md:text-xl font-semibold">
                  주소
                </FormLabel>
                <div className="flex items-end gap-2 md:gap-4">
                  <DialogTrigger asChild>
                    <FormControl>
                      <input
                        className="w-full h-10 md:h-12 px-3 md:px-4 mt-[6px] md:mt-2 text-sm md:text-base bg-white-ffffff border border-gray-a4a1aa rounded-md outline-none cursor-pointer caret-transparent"
                        type="text"
                        placeholder="기본 주소를 입력해 주세요"
                        {...field}
                      />
                    </FormControl>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <button
                      className="flex-shrink-0 h-10 px-6 text-base md:h-12 md:px-8 bg-main text-white-ffffff hover:bg-sub hover:text-main hover:border-main rounded-md font-medium border border-transparent"
                      type="button"
                    >
                      주소 검색
                    </button>
                  </DialogTrigger>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default AddressField;
