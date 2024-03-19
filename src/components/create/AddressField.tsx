import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const AddressField = ({ useForm }: any) => {
  const [dialogopen, setDialogOpen] = useState(false);

  const handleComplete = (data: any) => {
    setDialogOpen((prev) => !prev);
    useForm.setValue("addressObject.postcode", data.zonecode);
    useForm.setValue("addressObject.roadAddress", data.address);
  };

  const addressStyle = {
    height: "500px"
  };

  return (
    <div className="max-w-[700px]">
      <div className="flex flex-col gap-4">
        <Dialog open={dialogopen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DaumPostcode
              style={addressStyle}
              onComplete={handleComplete}
            ></DaumPostcode>
          </DialogContent>
          <FormField
            control={useForm.control}
            name="addressObject.postcode"
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
                        placeholder="우편번호"
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
                <FormMessage className="mt-[2px] md:mt-1" />
              </FormItem>
            )}
          />
          <FormField
            control={useForm.control}
            name="addressObject.roadAddress"
            render={({ field }) => (
              <FormItem className="flex-1">
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={useForm.control}
            name="addressObject.detailAddress"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="h-10 md:h-12 px-3 md:px-4 mt-1 md:mt-2 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
                    placeholder="상세 주소를 입력해 주세요"
                    {...field}
                  />
                </FormControl>
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
