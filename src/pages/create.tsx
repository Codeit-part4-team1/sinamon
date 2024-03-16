import React, { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DaumPostcode from "react-daum-postcode";
import BaseLayout from "@/components/layout/BaseLayout";
import MenuLayout from "@/components/layout/MenuLayout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Button from "@/components/common/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus, FaMinus } from "react-icons/fa6";

const priceNumberRegex = new RegExp("^[0-9]*$");
const priceHeadZeroRegex = new RegExp("^(0|[1-9][0-9]*)$");
const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "제목은 5자 이상으로 입력해 주세요"
    })
    .max(24, {
      message: "제목은 25자 미만으로 입력해 주세요"
    }),
  category: z.string(),
  price: z
    .string()
    .regex(priceNumberRegex, { message: "숫자만 입력해 주세요" })
    .regex(priceHeadZeroRegex, { message: "올바른 가격을 입력해 주세요" })
    .max(7, { message: "1000만원 미만으로 입력해 주세요" }),
  description: z
    .string()
    .min(10, { message: "설명은 10자 이상으로 입력해 주세요" })
    .max(255, {
      message: "설명은 256자 미만으로 입력해 주세요"
    }),
  address: z.object({
    address1: z.string(),
    address2: z.string(),
    address3: z.string()
  }),
  datePicker: z.date(),
  startTimePicker: z.date().or(z.string()),
  endTimePicker: z.date().or(z.string()),
  dateField: z.array(
    z.object({
      date: z.string(),
      startTime: z.date().or(z.string()),
      endTime: z.date().or(z.string())
    })
  )
});

const CreatePage: NextPageWithLayout = () => {
  const [dialogopen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "문화 · 예술",
      price: "",
      description: "",
      address: {
        address1: "",
        address2: "",
        address3: ""
      },
      datePicker: new Date(),
      startTimePicker: new Date(new Date().setMinutes(0)),
      endTimePicker: new Date(new Date().setHours(new Date().getHours() + 1, 0))
    }
  });

  const handleComplete = (data: any) => {
    setDialogOpen((prev) => !prev);
    form.setValue("address.address1", data.zonecode);
    form.setValue("address.address2", data.address);
    const addressValue = form.getValues("address");
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const addressStyle = {
    height: "500px"
  };

  const { control, register } = form;
  const { fields, remove, append } = useFieldArray({
    control,
    name: "dateField"
  });

  return (
    <>
      <p className="text-2xl md:text-3xl font-bold mb-5 md:mb-8">모임 등록</p>
      <Form {...form}>
        <form
          className="flex flex-col gap-y-5 md:gap-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col md:flex-row gap-x-4 gap-y-5 md:gap-y-6">
            <FormField
              control={form.control}
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
            <div className="flex gap-x-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-lg md:text-xl font-semibold">
                      카테고리
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue="문화 · 예술"
                    >
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
                )}
              />
              <FormField
                control={form.control}
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
            </div>
          </div>
          <div>
            <FormField
              control={form.control}
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
          <div className="max-w-[700px]">
            <div className="flex flex-col gap-2">
              <Dialog open={dialogopen} onOpenChange={setDialogOpen}>
                <DialogContent>
                  <DaumPostcode
                    style={addressStyle}
                    onComplete={handleComplete}
                  ></DaumPostcode>
                </DialogContent>
                <FormField
                  control={form.control}
                  name="address.address1"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-lg md:text-xl font-semibold">
                        주소
                      </FormLabel>
                      <div className="flex items-end gap-2 md:gap-4">
                        <DialogTrigger asChild>
                          <FormControl>
                            <Input
                              className="h-10 md:h-12 px-3 md:px-4 mt-1 md:mt-2 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa cursor-pointer"
                              placeholder="우편번호"
                              {...field}
                            />
                          </FormControl>
                        </DialogTrigger>
                        <FormMessage />
                        <DialogTrigger asChild>
                          <button
                            className="flex-shrink-0 h-10 px-6 text-base md:h-12 md:px-8 bg-main text-white-ffffff hover:bg-sub hover:text-main hover:border-main rounded-md font-medium border border-transparent"
                            type="button"
                          >
                            주소 검색
                          </button>
                        </DialogTrigger>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.address2"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <DialogTrigger asChild>
                        <FormControl>
                          <Input
                            className="h-10 md:h-12 px-3 md:px-4 mt-1 md:mt-2 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa cursor-pointer"
                            placeholder="기본 주소를 입력해주세요"
                            {...field}
                          />
                        </FormControl>
                      </DialogTrigger>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.address3"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          className="h-10 md:h-12 px-3 md:px-4 mt-1 md:mt-2 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
                          placeholder="상세 주소를 입력해주세요"
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
          <div className="w-fit flex flex-col gap-y-2 md:gap-y-3">
            <span className="text-lg md:text-xl font-semibold leading-5 md:leading-5">
              모임 일정
            </span>
            <div className="flex items-end gap-x-2 md:gap-x-5">
              <div className="flex flex-col">
                <label className="text-md md:text-lg font-semibold leading-4 md:leading-5">
                  날짜
                </label>
                <Controller
                  name="datePicker"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      className="w-[136px] md:w-40 h-10 md:h-12 px-3 md:px-4 mt-[6px] md:mt-2 text-sm md:text-base bg-white-ffffff border border-gray-a4a1aa rounded-md outline-none"
                      dateFormat="yyyy년 M월 dd일"
                      dateFormatCalendar="yyyy년 MM월"
                      shouldCloseOnSelect
                      minDate={new Date()}
                      selected={value}
                      onChange={(data: any) => onChange(data)}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-md md:text-lg font-semibold leading-4 md:leading-5">
                  시작 시간
                </label>
                <Controller
                  name="startTimePicker"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      className="w-16 md:w-24 h-10 md:h-12 px-3 md:px-4 mt-[6px] md:mt-2 text-sm md:text-base bg-white-ffffff border border-gray-a4a1aa rounded-md outline-none"
                      selected={new Date(value)}
                      onChange={(data: any) => onChange(data)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Time"
                      timeFormat="HH:mm"
                      dateFormat="HH:mm"
                      minTime={new Date().setHours(0, 0)}
                      maxTime={
                        new Date(form.watch("endTimePicker")).setMinutes(
                          new Date(form.watch("endTimePicker")).getMinutes() -
                            10
                        ) || new Date().setHours(23, 59)
                      }
                    />
                  )}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-md md:text-lg font-semibold leading-4 md:leading-5">
                  종료 시간
                </label>
                <Controller
                  name="endTimePicker"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      className="w-16 md:w-24 h-10 md:h-12 px-3 md:px-4 mt-[6px] md:mt-2 text-sm md:text-base bg-white-ffffff border border-gray-a4a1aa rounded-md outline-none"
                      selected={value}
                      onChange={(data: any) => onChange(data)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Time"
                      timeFormat="HH:mm"
                      dateFormat="HH:mm"
                      minTime={
                        new Date(form.watch("startTimePicker")).setMinutes(
                          new Date(form.watch("startTimePicker")).getMinutes() +
                            10
                        ) || new Date().setHours(0, 0)
                      }
                      maxTime={new Date().setHours(23, 59)}
                    />
                  )}
                />
              </div>
              <button
                className="h-10 md:h-12 aspect-square flex justify-center items-center bg-main rounded-md"
                type="button"
                onClick={() => {
                  console.log(typeof form.getValues("startTimePicker"));
                  if (
                    form.getValues("datePicker") &&
                    form.getValues("startTimePicker") &&
                    form.getValues("endTimePicker")
                  ) {
                    append({
                      date: `${form
                        .getValues("datePicker")
                        .toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}`,
                      startTime: `${form
                        .getValues("startTimePicker")
                        .toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: false
                        })}`,
                      endTime: `${form
                        .getValues("endTimePicker")
                        .toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: false
                        })}`
                    });
                  }
                }}
              >
                <FaPlus className="text-white-ffffff text-xl md:text-2xl" />
              </button>
            </div>
            <div className="w-full h-[1px] bg-gray-dddddd"></div>
            <ul className="flex flex-col gap-y-2 md:gap-y-3">
              {fields.map((item, index) => {
                return (
                  <li key={item.id}>
                    <div className="flex items-end gap-x-2 md:gap-x-5">
                      <Input
                        className="w-[136px] md:w-40 h-10 md:h-12 px-3 md:px-4 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
                        {...register(`dateField.${index}.date`)}
                      />
                      <Input
                        className="w-16 md:w-24 h-10 md:h-12 px-3 md:px-4 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
                        {...register(`dateField.${index}.startTime`)}
                      />
                      <Input
                        className="w-16 md:w-24 h-10 md:h-12 px-3 md:px-4 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
                        {...register(`dateField.${index}.endTime`)}
                      />
                      <button
                        className="h-10 md:h-12 aspect-square flex justify-center items-center bg-main rounded-md"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        <FaMinus className="text-white-ffffff text-xl md:text-2xl" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <Button
            text="등록하기"
            className="w-full md:w-96 h-12 mx-auto mt-8"
            type="submit"
          ></Button>
        </form>
      </Form>
    </>
  );
};

CreatePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <MenuLayout>{page}</MenuLayout>
    </BaseLayout>
  );
};

export default CreatePage;
