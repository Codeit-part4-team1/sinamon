import { Dispatch, SetStateAction } from "react";

export interface Modal {
  show: boolean;
  modal: React.RefObject<HTMLDivElement>;
  date: string;
}

export interface DateType {
  year: number;
  month: number;
}

export interface MyToolbarProps {
  date: Date;
  setDate: Dispatch<SetStateAction<{ year: number; month: number }>>;
  onNavigate: (direction: string) => void;
}