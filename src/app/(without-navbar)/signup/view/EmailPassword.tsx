"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { CreateUserForm } from "@/types/User";
import SignUpFormLayout from "@/app/(without-navbar)/signup/view/SignUpFormLayout";
import EmailField from "./input/EmailField";
import PasswordField from "./input/PasswordField";

interface Props {
  onNext: () => void;
}

export default function EmailPassword({ onNext }: Props) {
  const router = useRouter();
  const { trigger } = useFormContext<CreateUserForm>();

  const handleNextClick = async () => {
    const isValid = await trigger(["userEmail", "userPw"]);
    if (isValid) {
      onNext();
    }
  };

  return (
    <SignUpFormLayout
      title={`이메일과 비밀번호를 \n입력해주세요.`}
      currStep={1}
      totalStep={4}
      formContent={
        <>
          <EmailField />
          <PasswordField />
        </>
      }
      onPrev={() => router.back()}
      onNext={handleNextClick}
    />
  );
}
