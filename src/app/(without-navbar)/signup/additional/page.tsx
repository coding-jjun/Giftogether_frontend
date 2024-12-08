"use client";
import { FormProvider, useForm } from "react-hook-form";
import { CreateUserForm, UpdateUserDto, UserDto } from "@/types/User";
import { TopFixedStack } from "@/components/layout/action-bar/TopFixedStack";
import { IconButton, Link, Stack } from "@mui/material";
import { ArrowBackIosNew as ArrowBackIosNewIcon } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useCookie } from "@/hook/useCookie";
import useAddAccount from "@/query/useAddAccount";
import { CreateAccountDto } from "@/types/Account";
import useUpdateUser from "@/query/useUpdateUser";
import {
  Container,
  FormContainer,
  NextButton,
} from "@/app/(without-navbar)/signup/styles";
import SectionTitle from "@/app/(without-navbar)/signup/view/SectionTitle";
import ProfileImageField from "@/app/(without-navbar)/signup/view/input/ProfileImageField";
import BirthdayField from "@/app/(without-navbar)/signup/view/input/BirthdayField";
import AccountField from "@/app/(without-navbar)/signup/view/input/AccountField";

const DEFAULT_CREATE_USER_DTO: CreateUserForm = {
  userEmail: "",
  userPw: "",
  userName: "",
  userNick: "",
  userPhone: "",
};

const USER_DEFAULT_IMG_ID = 24;

export default function AdditionalInfoPage() {
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<CreateUserForm>({
    defaultValues: DEFAULT_CREATE_USER_DTO,
  });

  const user = useCookie<UserDto>("user");

  const { mutate: updateUser } = useUpdateUser();
  const { mutateAsync: registerAccount } = useAddAccount();

  useEffect(() => {
    if (user) {
      methods.reset({
        userName: user.userName,
        userNick: user.userNick,
        userEmail: user.userEmail,
        userPhone: user.userPhone,
        userImg: user.userImg,
        userBirth: user.userBirth ?? new Date(),
      });
    }
  }, [user, methods]);

  const { handleSubmit } = methods;

  const createAccount = async (dto: CreateAccountDto): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      registerAccount(dto, {
        onSuccess: (accId: number) => resolve(accId),
        onError: (error) => reject(error),
      });
    });
  };

  const onSubmit = async (data: CreateUserForm) => {
    let { userBirth, userAccBank, userAccNum, userImg, defaultImgId } = data;

    try {
      setLoading(true);

      if (userAccBank && userAccNum) {
        await createAccount({
          bank: userAccBank,
          accNum: userAccNum,
        });
      }

      if (!userImg) {
        defaultImgId = USER_DEFAULT_IMG_ID;
      }

      const dto: UpdateUserDto = {
        userBirth,
        userImg,
        defaultImgId,
      };

      updateUser(dto);
    } catch (error) {
      console.error("OAuth 회원가입 에러 발생", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <TopFixedStack direction="row" alignItems="center">
        <Link href="/login" sx={{ textDecoration: "none" }}>
          <IconButton>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Link>
      </TopFixedStack>
      <FormContainer>
        <FormProvider {...methods}>
          <Stack direction="column" spacing={2}>
            <SectionTitle>추가 정보를 입력해주세요.</SectionTitle>
            <ProfileImageField />
            <BirthdayField />
            <AccountField />
          </Stack>
        </FormProvider>
        <NextButton
          variant="contained"
          color="secondary"
          onClick={handleSubmit(onSubmit)}
          loading={loading}
          fullWidth
        >
          완료
        </NextButton>
      </FormContainer>
    </Container>
  );
}
