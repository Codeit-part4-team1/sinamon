import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const ReservationCalendar = () => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());

  return (
    <Calendar mode="single" selected={selectedDay} onSelect={setSelectedDay} />
  );
};

export default ReservationCalendar;
