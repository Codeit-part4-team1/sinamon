import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const ReservationCalendar = () => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      className="md:hidden lg:block"
      mode="single"
      selected={selectedDay}
      onSelect={setSelectedDay}
    />
  );
};

export default ReservationCalendar;
