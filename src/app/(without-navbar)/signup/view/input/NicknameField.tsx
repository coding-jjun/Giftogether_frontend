import React, { useCallback, useEffect } from "react";
import axios, { AxiosError } from "axios";
import debounce from "lodash/debounce";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { CreateUserForm } from "@/types/User";
import { GreyTextField } from "@/components/textfield";
import { CommonResponse } from "@/types/CommonResponse";
import { ErrorData } from "@/types/ErrorData";
import { InputLabel } from "@/app/(without-navbar)/signup/view/input/InputLabel";
import axiosInstance from "@/utils/axios";

const validateNickname = async (nickname: string | undefined) => {
  if (!nickname) {
    return "닉네임은 필수 입력 항목입니다.";
  }

  try {
    const { data } = await axiosInstance.post<CommonResponse<Boolean>>(
      `/api/auth/nickname`,
      { userNick: nickname },
    );

    if (!data.data) {
      return "이미 존재하는 닉네임입니다.";
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

interface Props {
  myNickname?: string;
}

const NicknameField = ({ myNickname }: Props) => {
  const {
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext<CreateUserForm>();

  const userNick = useWatch({ control, name: "userNick" });

  const debouncedValidate = useCallback(
    debounce(async (value: string) => {
      const validationResult = await validateNickname(value);
      if (validationResult !== true) {
        setError("userNick", { type: "manual", message: validationResult });
      } else {
        clearErrors("userNick");
      }
    }, 500),
    [setError, clearErrors],
  );

  useEffect(() => {
    if (userNick && userNick !== myNickname) {
      debouncedValidate(userNick);
    } else {
      clearErrors("userNick");
    }

    return () => {
      debouncedValidate.cancel();
    };
  }, [userNick, debouncedValidate, clearErrors]);

  return (
    <div>
      <InputLabel>닉네임</InputLabel>
      <Controller
        name="userNick"
        control={control}
        rules={{
          required: "닉네임은 필수 입력 항목입니다.",
        }}
        render={({ field }) => (
          <GreyTextField
            {...field}
            error={!!errors.userNick}
            helperText={errors.userNick?.message?.toString() || ""}
            InputLabelProps={{ shrink: false }}
            margin="none"
          />
        )}
      />
    </div>
  );
};

export default NicknameField;
