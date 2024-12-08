"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { CreateUserForm } from "@/types/User";
import SignUpFormLayout from "@/app/(without-navbar)/signup/view/SignUpFormLayout";
import NameField from "@/app/(without-navbar)/signup/view/input/NameField";
import NicknameField from "@/app/(without-navbar)/signup/view/input/NicknameField";

interface Props {
  onPrev: () => void;
  onNext: () => void;
}

export default function NameNickname({ onPrev, onNext }: Props) {
  const { trigger } = useFormContext<CreateUserForm>();

  const handleNextClick = async () => {
    const isValid = await trigger(["userName", "userNick"]);
    if (isValid) {
      onNext();
    }
  };

  return (
    <SignUpFormLayout
      title={`이름과 닉네임을 \n입력해주세요.`}
      currStep={2}
      totalStep={4}
      formContent={
        <>
          <NameField />
          <NicknameField />
        </>
      }
      onPrev={onPrev}
      onNext={handleNextClick}
    />
  );
}
