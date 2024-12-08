import React from "react";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, styled } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { koKR } from "@mui/x-date-pickers/locales";
import { CreateUserForm } from "@/types/User";
import { InputLabel } from "@/app/(without-navbar)/signup/view/input/InputLabel";

const BirthdayField = () => {
  const { control } = useFormContext<CreateUserForm>();

  return (
    <FormControl>
      <InputLabel>생일</InputLabel>
      <Controller
        name="userBirth"
        control={control}
        render={({ field: { onChange, value } }) => (
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ko"
            localeText={
              koKR.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <CustomDatePicker
              format="YYYY.MM.DD"
              slotProps={{
                toolbar: { toolbarFormat: "YYYY.MM.DD", hidden: false },
              }}
              onChange={(date) => {
                if (date) {
                  onChange(dayjs(date).format("YYYY-MM-DD"));
                }
              }}
              defaultValue={dayjs(new Date())}
              value={dayjs(value)}
              sx={{
                borderRadius: 20,
                "& .MuiDatePickerToolbar-title": { fontSize: "20px" },
              }}
            />
          </LocalizationProvider>
        )}
      />
    </FormControl>
  );
};

const CustomDatePicker = styled(MobileDatePicker)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#d3d3d3" },
    "&:hover fieldset": { borderColor: "#9e9e9e" },
    "&.Mui-focused fieldset": { borderColor: "#9e9e9e" },
    "&.Mui-error fieldset": { borderColor: "#f44336" },
  },
  "& .MuiInputLabel-root": {
    color: "#9e9e9e",
    "&.Mui-focused": { color: "#9e9e9e" },
  },
});

export default BirthdayField;
