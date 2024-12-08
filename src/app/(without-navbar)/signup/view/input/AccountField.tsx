import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CreateUserForm } from "@/types/User";
import { FormControl, Stack } from "@mui/material";
import { GreyTextField } from "@/components/textfield";
import { InputLabel } from "@/app/(without-navbar)/signup/view/input/InputLabel";
import BankSelectBar from "@/app/(without-navbar)/signup/view/input/BankSelectBar";

const AccountField = () => {
  const { control } = useFormContext<CreateUserForm>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/\D/g, "");
  };

  return (
    <FormControl>
      <InputLabel>계좌번호</InputLabel>
      <Stack direction="column" spacing={1}>
        <BankSelectBar />
        <Controller
          name="userAccNum"
          control={control}
          render={({ field }) => (
            <GreyTextField
              {...field}
              onChange={(e) => {
                handleInputChange(e);
                field.onChange(e);
              }}
              value={field.value || ""}
              helperText="- 없이 입력해주세요."
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: false }}
            />
          )}
        />
      </Stack>
    </FormControl>
  );
};

export default AccountField;
