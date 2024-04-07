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
    .max(7, { message: "1000만원 미만으로 입력해 주세요" })
    .or(z.number()),
  description: z
    .string()
    .min(10, { message: "설명은 10자 이상으로 입력해 주세요" })
    .max(255, {
      message: "설명은 256자 미만으로 입력해 주세요"
    }),
  address: z.string().min(1, {
    message: "주소를 입력해 주세요"
  }),
  dateSelect: z.date(),
  startTimeSelect: z.date(),
  endTimeSelect: z.date(),
  schedules: z
    .array(
      z.object({
        date: z.string(),
        startTime: z.date().or(z.string()),
        endTime: z.date().or(z.string()),
        id: z.number().optional()
      })
    )
    .nonempty({
      message: "일정을 등록해 주세요"
    }),
  schedulesToAdd: z
    .array(
      z.object({
        date: z.string(),
        startTime: z.date().or(z.string()),
        endTime: z.date().or(z.string())
      })
    )
    .optional(),
  scheduleIdsToRemove: z.array(z.number()).optional(),
  schedulesInitial: z
    .array(
      z.object({
        id: z.number(),
        date: z.string(),
        startTime: z.date().or(z.string()),
        endTime: z.date().or(z.string())
      })
    )
    .optional(),
  bannerImageSelect: z.custom<File>(),
  bannerImageUrl: z.string().min(1, {
    message: "배너 이미지를 등록해 주세요"
  }),
  bannerImagePreview: z.string(),
  subImageSelect: z.custom<File>(),
  subImageUrlList: z.array(
    z.object({
      subImagePreview: z.string(),
      subImageUrl: z.string(),
      id: z.number().optional()
    })
  ),
  subImageUrls: z.array(z.string()).or(z.string()),
  subImageUrlsToAdd: z.array(z.string()).optional(),
  subImageIdsToRemove: z.array(z.number().optional()).optional(),
  subImageiInitial: z
    .array(
      z.object({
        id: z.number().optional(),
        imageUrl: z.string(),
        subImagePreview: z.string(),
        subImageUrl: z.string()
      })
    )
    .optional()
});
