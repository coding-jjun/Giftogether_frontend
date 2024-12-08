import React from "react";
import axios, { AxiosError } from "axios";
import { Controller, useFormContext } from "react-hook-form";
import { validateEmail } from "@/utils/validateEmail";
import { CommonResponse } from "@/types/CommonResponse";
import { GreyTextField } from "@/components/textfield";
import { CreateUserForm } from "@/types/User";
import { ErrorData } from "@/types/ErrorData";
import { InputLabel } from "@/app/(without-navbar)/signup/view/input/InputLabel";

const EmailField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateUserForm>();

  const validate = async (email: string | undefined) => {
    if (!email) {
      return "이메일은 필수 입력 항목입니다.";
    }

    if (!validateEmail(email)) {
      return "올바르지 않은 이메일 형식입니다.";
    }

    try {
      const { data } = await axios.post<CommonResponse<Boolean>>(
        `/api/auth/email`,
        {
          userEmail: email,
        },
      );

      if (!data.data) {
        return "이미 가입된 이메일입니다.";
      }
    } catch (e) {
      if (axios.isAxiosError(e) && (e as AxiosError<ErrorData>).response) {
        const axiosError = e as AxiosError<ErrorData>;
        if (axiosError.response) {
          return axiosError.response.data.message;
        }
      }
      return "서버와의 통신에 실패했습니다.";
    }

    return true;
  };

  return (
    <div>
      <InputLabel>이메일</InputLabel>
      <Controller
        name="userEmail"
        control={control}
        rules={{
          required: "이메일은 필수 입력 항목입니다.",
          validate,
        }}
        render={({ field }) => (
          <GreyTextField
            {...field}
            error={!!errors.userEmail}
            helperText={errors.userEmail?.message?.toString() || ""}
            InputLabelProps={{ shrink: false }}
            margin="none"
          />
        )}
      />
    </div>
  );
};

export default EmailField;
