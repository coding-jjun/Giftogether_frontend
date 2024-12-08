"use client";
import { useState } from "react";
import { CreateUserForm } from "@/types/User";
import { FormProvider, useForm } from "react-hook-form";
import EmailPassword from "@/app/(without-navbar)/signup/view/EmailPassword";
import PhoneNumber from "@/app/(without-navbar)/signup/view/PhoneNumber";
import Complete from "@/app/(without-navbar)/signup/view/Complete";
import NameNickname from "@/app/(without-navbar)/signup/view/NameNickname";

const DEFAULT_CREATE_USER_DTO: CreateUserForm = {
  userEmail: "",
  userPw: "",
  userName: "",
  userNick: "",
  userPhone: "",
};

export default function SignUpPage() {
  const [step, setStep] = useState<
    "emailAndPassword" | "nameAndNickname" | "phone" | "end" | "additional"
  >("emailAndPassword");

  const methods = useForm<CreateUserForm>({
    defaultValues: DEFAULT_CREATE_USER_DTO,
  });

  return (
    <FormProvider {...methods}>
      <form>
        {step === "emailAndPassword" && (
          <EmailPassword
            onNext={() => {
              setStep("nameAndNickname");
            }}
          />
        )}
        {step === "nameAndNickname" && (
          <NameNickname
            onPrev={() => {
              setStep("emailAndPassword");
            }}
            onNext={() => {
              setStep("phone");
            }}
          />
        )}
        {step === "phone" && (
          <PhoneNumber
            onPrev={() => {
              setStep("nameAndNickname");
            }}
            onNext={() => {
              setStep("end");
            }}
          />
        )}
        {step === "end" && <Complete />}
      </form>
    </FormProvider>
  );
}
