import { z } from "zod";

const priceNumberRegex = new RegExp("^[0-9]*$");
const priceHeadZeroRegex = new RegExp("^(0|[1-9][0-9]*)$");

export const createPageSchema = z.object({
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
  address: z.string(),
  addressObject: z.object({
    postcode: z.string().min(1, {
      message: "주소를 입력해 주세요"
    }),
    roadAddress: z.string(),
    detailAddress: z.string()
  }),
  dateSelect: z.date(),
  startTimeSelect: z.date(),
  endTimeSelect: z.date(),
  schedules: z
    .array(
      z.object({
        date: z.string(),
        startTime: z.date().or(z.string()),
        endTime: z.date().or(z.string())
      })
    )
    .nonempty({
      message: "일정을 등록해 주세요"
    }),
  bannerImageSelect: z.any(),
  bannerImageUrl: z.string().min(1, {
    message: "배너 이미지를 등록해 주세요"
  }),
  subImageSelect: z.any(),
  subImageUrlList: z.array(
    z.object({
      subImageUrl: z.string()
    })
  ),
  subImageUrls: z.array(z.string())
});
