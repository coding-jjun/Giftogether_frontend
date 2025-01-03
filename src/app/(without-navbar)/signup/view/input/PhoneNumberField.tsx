import React from "react";
import axios, { AxiosError } from "axios";
import { Controller, useFormContext } from "react-hook-form";
import { GreyTextField } from "@/components/textfield";
import { CommonResponse } from "@/types/CommonResponse";
import { CreateUserForm } from "@/types/User";
import { ErrorData } from "@/types/ErrorData";
import { InputLabel } from "@/app/(without-navbar)/signup/view/input/InputLabel";
import axiosInstance from "@/utils/axios";

const validatePhoneNumberFormat = (phoneNumber: string): boolean => {
  const regex = /^010-\d{4}-\d{4}$/;
  return regex.test(phoneNumber);
};

const validate = async (
  phoneNumber: string | undefined,
  myPhoneNumber?: string,
) => {
  if (myPhoneNumber && phoneNumber === myPhoneNumber) {
    return true;
  }

  if (!phoneNumber) {
    return "휴대폰 번호는 필수 입력 항목입니다.";
  }

  if (!validatePhoneNumberFormat(phoneNumber)) {
    return "휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)";
  }

  try {
    const { data } = await axiosInstance.post<CommonResponse<Boolean>>(
      `/api/auth/phone`,
      {
        userPhone: phoneNumber,
      },
    );

    if (!data.data) {
      return "이미 가입된 휴대폰 번호입니다.";
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
  myPhoneNumber?: string;
}

const PhoneNumberField = ({ myPhoneNumber }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateUserForm>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value.replace(/\D/g, "");

    if (input.length > 3 && input.length <= 7) {
      input = input.replace(/(\d{3})(\d{1,4})/, "010-$2");
    } else if (input.length > 7) {
      input = input.replace(/(\d{3})(\d{4})(\d{1,4})/, "010-$2-$3");
    }

    event.target.value = input;
  };

  return (
    <div>
      <InputLabel>휴대폰 번호</InputLabel>
      <Controller
        name="userPhone"
        control={control}
        rules={{
          required: "휴대폰 번호는 필수 입력 항목입니다.",
          validate: (value) => validate(value, myPhoneNumber),
        }}
        render={({ field }) => (
          <GreyTextField
            {...field}
            onChange={(e) => {
              handleInputChange(e);
              field.onChange(e);
            }}
            value={field.value || ""}
            error={!!errors.userPhone}
            helperText={errors.userPhone?.message?.toString() || ""}
            InputLabelProps={{ shrink: false }}
            margin="none"
          />
        )}
      />
    </div>
  );
};

export default PhoneNumberField;
