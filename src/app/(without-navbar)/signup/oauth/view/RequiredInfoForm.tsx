import React from "react";
import { UserDto } from "@/types/User";
import SectionTitle from "@/app/(without-navbar)/signup/view/SectionTitle";
import NameField from "@/app/(without-navbar)/signup/view/input/NameField";
import NicknameField from "@/app/(without-navbar)/signup/view/input/NicknameField";
import PhoneNumberField from "@/app/(without-navbar)/signup/view/input/PhoneNumberField";

interface Props {
  user?: UserDto;
}

export default function RequiredInfoForm({ user }: Props) {
  return (
    <>
      <SectionTitle>필수 정보를 입력해주세요.</SectionTitle>
      <NameField />
      <NicknameField myNickname={user?.userNick} />
      <PhoneNumberField myPhoneNumber={user?.userPhone} />
    </>
  );
}
