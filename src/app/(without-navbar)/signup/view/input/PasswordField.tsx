import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GreyTextField } from "@/components/textfield";
import { CreateUserForm } from "@/types/User";
import { InputLabel } from "@/app/(without-navbar)/signup/view/input/InputLabel";

const PasswordField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateUserForm>();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <InputLabel>비밀번호</InputLabel>
      <Controller
        name="userPw"
        control={control}
        rules={{ required: "비밀번호는 필수 입력 항목입니다." }}
        render={({ field }) => (
          <GreyTextField
            {...field}
            type={showPassword ? "text" : "password"}
            fullWidth
            error={!!errors.userPw}
            helperText={errors.userPw?.message?.toString() || ""}
            InputLabelProps={{ shrink: false }}
            margin="none"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default PasswordField;
