import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputLabel } from "./InputLabel";
import { CreateUserForm } from "@/types/User";
import { GreyTextField } from "@/components/textfield";

const NameField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateUserForm>();

  return (
    <div>
      <InputLabel>이름</InputLabel>
      <Controller
        name="userName"
        control={control}
        rules={{
          required: "이름은 필수 입력 항목입니다.",
        }}
        render={({ field }) => (
          <GreyTextField
            {...field}
            error={!!errors.userName}
            helperText={errors.userName?.message?.toString() || ""}
            InputLabelProps={{ shrink: false }}
            margin="none"
          />
        )}
      />
    </div>
  );
};

export default NameField;
