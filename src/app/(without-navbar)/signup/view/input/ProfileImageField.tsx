import React from "react";
import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ProfileImage } from "@/components/avatar";
import { CreateUserForm } from "@/types/User";
import { InputLabel } from "@/app/(without-navbar)/signup/view/input/InputLabel";

const ProfileImageField = () => {
  const { setValue, watch } = useFormContext<CreateUserForm>();

  const userImg = watch("userImg");

  const handleChangeImage = (img: string) => {
    setValue("userImg", img);
  };

  return (
    <Stack>
      <InputLabel>프로필 이미지</InputLabel>
      <div>
        <ProfileImage imgSrc={userImg} onSubmit={handleChangeImage} />
      </div>
    </Stack>
  );
};

export default ProfileImageField;
