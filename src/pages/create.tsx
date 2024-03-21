import React, { useState, type ReactElement } from "react";
import Image from "next/image";
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
import Button from "@/components/common/Button/Button";
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
    address1: z.string().min(1, {
      message: "주소를 입력해 주세요"
    }),
    address2: z.string(),
    address3: z.string()
  }),
  datePicker: z.date(),
  startTimePicker: z.date(),
  endTimePicker: z.date(),
  schedules: z
    .array(
      z.object({
        date: z.string(),
        startTime: z.date().or(z.string()),
        endTime: z.date().or(z.string())
      })
    )
    .nonempty({
      message: "일정을 등록해주세요"
    }),
  bannerImageSelect: z.any(),
  bannerImageUrl: z.string().min(1, {
    message: "배너 이미지를 등록해주세요"
  }),
  subImageSelect: z.any(),
  subImageUrlList: z
    .array(
      z.object({
        subImageUrl: z.string()
      })
    )
    .nonempty({
      message: "소개 이미지를 등록해주세요"
    })
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
      endTimePicker: new Date(
        new Date().setHours(new Date().getHours() + 1, 0)
      ),
      bannerImageUrl: ""
      // subImage: ""
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
  const {
    fields: schedulesFields,
    append: schedulesAppend,
    remove: schedulesRemove
  } = useFieldArray({
    control,
    name: "schedules"
  });
  const {
    fields: subImageUrlListFields,
    append: subImageUrlListAppend,
    remove: subImageUrlListRemove
  } = useFieldArray({
    control,
    name: "subImageUrlList"
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
            <div className="flex flex-col gap-4">
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
                  control={form.control}
                  name="address.address2"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <DialogTrigger asChild>
                        <FormControl>
                          <input
                            className="w-full h-10 md:h-12 px-3 md:px-4 mt-[6px] md:mt-2 text-sm md:text-base bg-white-ffffff border border-gray-a4a1aa rounded-md outline-none cursor-pointer caret-transparent"
                            type="text"
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
                      onChange={(data: Date) =>
                        data ? onChange(data) : onChange(new Date())
                      }
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
                      className="w-16 md:w-24 h-10 md:h-12 px-3 md:px-4 mt-[6px] md:mt-2 text-sm md:text-base bg-white-ffffff border border-gray-a4a1aa rounded-md outline-none cursor-pointer caret-transparent"
                      selected={value}
                      onChange={(data: Date) => onChange(new Date(data))}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Time"
                      timeFormat="HH:mm"
                      dateFormat="HH:mm"
                      minTime={new Date(new Date().setHours(0, 0))}
                      maxTime={
                        new Date(
                          new Date(form.watch("endTimePicker")).setMinutes(
                            new Date(form.watch("endTimePicker")).getMinutes() -
                              15
                          )
                        ) || new Date(new Date().setHours(23, 59))
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
                      className="w-16 md:w-24 h-10 md:h-12 px-3 md:px-4 mt-[6px] md:mt-2 text-sm md:text-base bg-white-ffffff border border-gray-a4a1aa rounded-md outline-none cursor-pointer caret-transparent"
                      selected={value}
                      onChange={(data: Date) => onChange(new Date(data))}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Time"
                      timeFormat="HH:mm"
                      dateFormat="HH:mm"
                      minTime={
                        new Date(
                          new Date(form.watch("startTimePicker")).setMinutes(
                            new Date(
                              form.watch("startTimePicker")
                            ).getMinutes() + 15
                          )
                        ) || new Date(new Date().setHours(0, 0))
                      }
                      maxTime={new Date(new Date().setHours(23, 59))}
                    />
                  )}
                />
              </div>
              <button
                className="h-10 md:h-12 aspect-square flex justify-center items-center bg-main rounded-md"
                type="button"
                onClick={() => {
                  if (
                    form.getValues("datePicker") &&
                    form.getValues("startTimePicker") &&
                    form.getValues("endTimePicker")
                  ) {
                    schedulesAppend({
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
              <span className="absolute text-xs md:text-sm font-medium md:leading-4 text-destructive">
                {form.formState.errors.schedules?.message}
              </span>
              {schedulesFields.map((item, index) => {
                return (
                  <li key={item.id}>
                    <div className="flex items-end gap-x-2 md:gap-x-5">
                      <Input
                        className="w-[136px] md:w-40 h-10 md:h-12 px-3 md:px-4 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
                        disabled
                        {...register(`schedules.${index}.date`)}
                      />
                      <Input
                        className="w-16 md:w-24 h-10 md:h-12 px-3 md:px-4 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
                        disabled
                        {...register(`schedules.${index}.startTime`)}
                      />
                      <Input
                        className="w-16 md:w-24 h-10 md:h-12 px-3 md:px-4 text-sm md:text-base bg-white-ffffff border-gray-a4a1aa"
                        disabled
                        {...register(`schedules.${index}.endTime`)}
                      />
                      <button
                        className="h-10 md:h-12 aspect-square flex justify-center items-center bg-main rounded-md"
                        type="button"
                        onClick={() => schedulesRemove(index)}
                      >
                        <FaMinus className="text-white-ffffff text-xl md:text-2xl" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-1">
            <span className="text-lg md:text-xl font-semibold leading-5 md:leading-5">
              배너 이미지
            </span>
            <div className="mt-1">
              {form.watch("bannerImageUrl") ? (
                <div>
                  <Image
                    src={form.watch("bannerImageUrl")}
                    alt="모임 배너 이미지"
                    width={50}
                    height={50}
                  />
                  <button
                    type="button"
                    onClick={() => form.setValue("bannerImageUrl", "")}
                  >
                    삭제 버튼
                  </button>
                </div>
              ) : (
                <div className="group relative w-fit">
                  <label
                    className="w-[100px] aspect-square flex bg-white-ffffff rounded-md border border-gray-a4a1aa border-dashed cursor-pointer"
                    htmlFor="bannerImageSelect"
                  >
                    <FaPlus className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-cbc9cf text-xl md:text-2xl group-hover:text-main" />
                  </label>
                  <input
                    className="hidden"
                    id="bannerImageSelect"
                    type="file"
                    accept="image/*"
                    {...register("bannerImageSelect", {
                      onChange: () =>
                        form.setValue(
                          "bannerImageUrl",
                          URL?.createObjectURL(
                            form.getValues("bannerImageSelect")[0]
                          )
                        )
                    })}
                  />

                  <span className="absolute mt-1 text-xs md:text-sm font-medium md:leading-4 text-destructive whitespace-nowrap">
                    {form.formState.errors.bannerImageUrl?.message}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-1">
            <span className="text-lg md:text-xl font-semibold leading-5 md:leading-5">
              소개 이미지
            </span>
            <div className="mt-1">
              {subImageUrlListFields.length < 4 && (
                <div className="group relative w-fit">
                  <label
                    className="w-[100px] aspect-square flex bg-white-ffffff rounded-md border border-gray-a4a1aa border-dashed cursor-pointer"
                    htmlFor="subImageSelect"
                  >
                    <FaPlus className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-cbc9cf text-xl md:text-2xl group-hover:text-main" />
                  </label>
                  <input
                    className="hidden"
                    id="subImageSelect"
                    type="file"
                    accept="image/*"
                    {...register("subImageSelect", {
                      onChange: () =>
                        subImageUrlListAppend({
                          subImageUrl: URL?.createObjectURL(
                            form.getValues("subImageSelect")[0]
                          )
                        })
                    })}
                  />
                  <span className="absolute mt-1 text-xs md:text-sm font-medium md:leading-4 text-destructive whitespace-nowrap">
                    {form.formState.errors.subImageUrlList?.message}
                  </span>
                </div>
              )}
              {subImageUrlListFields.map((item, index) => (
                <div key={item.id}>
                  <Image
                    src={form.watch(`subImageUrlList.${index}.subImageUrl`)}
                    alt="모임 소개 이미지"
                    width={50}
                    height={50}
                  />
                  <button
                    className="h-10 md:h-12 aspect-square flex justify-center items-center bg-main rounded-md"
                    type="button"
                    onClick={() => subImageUrlListRemove(index)}
                  >
                    <FaMinus className="text-white-ffffff text-xl md:text-2xl" />
                  </button>
                </div>
              ))}
            </div>
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
