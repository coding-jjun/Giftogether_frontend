import React from "react";
import { useFormContext } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";

export default function DeadlineCalendar() {
  const { register, setValue } = useFormContext();

  const handleEndDateChange = (date: Dayjs | null) => {
    if (date) {
      const endDateToServer: Dayjs = date;
      setValue("endAt", endDateToServer);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem label="마감기한">
          <DatePicker
            {...register("endAt")}
            disablePast
            views={["year", "month", "day"]}
            onChange={handleEndDateChange}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
