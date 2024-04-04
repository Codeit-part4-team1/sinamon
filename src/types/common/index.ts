export type Category =
  | "문화 · 예술"
  | "식음료"
  | "스포츠"
  | "투어"
  | "관광"
  | "웰빙"
  | "";
export interface AvailableTime {
  id: number;
  startTime: string;
  endTime: string;
}
export interface TimeSlot {
  times: AvailableTime[];
  date: string;
}
export type Status =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed"
  | "";
