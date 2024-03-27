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
  schedulesToAdd: z.any().optional(),
  scheduleIdsToRemove: z.array(z.string()).optional(),
  schedulesInitial: z.any().optional(),
  bannerImageSelect: z.any(),
  bannerImageUrl: z.string().min(1, {
    message: "배너 이미지를 등록해 주세요"
  }),
  bannerImagePreview: z.string(),
  subImageSelect: z.any(),
  subImageUrlList: z.array(
    z.object({
      subImagePreview: z.string(),
      subImageUrl: z.string(),
      id: z.number().optional()
    })
  ),
  subImageUrls: z.any(),
  subImageUrlsToAdd: z.any().optional(),
  subImageIdsToRemove: z.array(z.string()).optional(),
  subImageiInitial: z.any().optional()
});
