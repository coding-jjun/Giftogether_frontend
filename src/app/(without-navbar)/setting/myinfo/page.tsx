"use client";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CreateUserForm, UpdateUserDto } from "@/types/User";
import useUpdateUser from "@/query/useUpdateUser";
import useAddAccount from "@/query/useAddAccount";
import { CreateAccountDto } from "@/types/Account";
import useCurrentUserQuery from "@/query/useCurrentUserQuery";
import { useRouter } from "next/navigation";
import LayoutWithPrev from "@/components/layout/layout-with-prev";
import {
  Container,
  FormContainer,
  NextButton,
} from "@/app/(without-navbar)/signup/styles";
import ProfileImageField from "@/app/(without-navbar)/signup/view/input/ProfileImageField";
import NameField from "@/app/(without-navbar)/signup/view/input/NameField";
import NicknameField from "@/app/(without-navbar)/signup/view/input/NicknameField";
import PhoneNumberField from "@/app/(without-navbar)/signup/view/input/PhoneNumberField";
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

export default function MyInfoPage() {
  const router = useRouter();

  const methods = useForm<CreateUserForm>({
    defaultValues: DEFAULT_CREATE_USER_DTO,
  });

  const { data: user } = useCurrentUserQuery();

  useEffect(() => {
    if (user) {
      methods.reset({
        userName: user.userName,
        userNick: user.userNick,
        userPhone: user.userPhone,
        userImg: user.userImg,
        userBirth: user.userBirth ?? new Date(),
        userAccNum: user.accNum,
        userAccBank: user.bank,
      });
    }
  }, [user, methods]);

  const { handleSubmit } = methods;

  const { mutate: updateUser } = useUpdateUser();
  const { mutateAsync: registerAccount } = useAddAccount();

  const onSubmit = async (data: CreateUserForm) => {
    let {
      userPw,
      userName,
      userNick,
      userPhone,
      userBirth,
      userAccBank,
      userAccNum,
      userImg,
      defaultImgId,
    } = data;

    try {
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
        userNick,
        userPw,
        userName,
        userPhone,
        userBirth,
        userImg,
        defaultImgId,
      };

      updateUser(dto);
      router.push("/setting");
    } catch (error) {
      console.error("회원 정보 수정 에러 발생", error);
    }
  };

  const createAccount = async (dto: CreateAccountDto): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      registerAccount(dto, {
        onSuccess: (accId: number) => resolve(accId),
        onError: (error) => reject(error),
      });
    });
  };

  return (
    <LayoutWithPrev
      title="내 정보 수정하기"
      actionBar={
        <div style={{ padding: "0 10px", width: "100%" }}>
          <NextButton
            variant="contained"
            color="secondary"
            onClick={handleSubmit(onSubmit)}
            fullWidth
            style={{ margin: "auto" }}
          >
            완료
          </NextButton>
        </div>
      }
    >
      <FormProvider {...methods}>
        <Container style={{ marginTop: "10px" }}>
          <FormContainer>
            <ProfileImageField />
            <NameField />
            <NicknameField myNickname={user?.userNick} />
            <PhoneNumberField myPhoneNumber={user?.userPhone} />
            <BirthdayField />
            <AccountField />
          </FormContainer>
        </Container>
      </FormProvider>
    </LayoutWithPrev>
  );
}
