import React, { ReactNode } from "react";
import { Stack } from "@mui/material";
import { Container, FormContainer, NextButton } from "../styles";
import SectionTitle from "@/app/(without-navbar)/signup/view/SectionTitle";
import LayoutWithPrev from "@/components/layout/layout-with-prev";

interface Props {
  title: string;
  currStep: number;
  totalStep: number;
  formContent: ReactNode;
  onPrev: () => void;
  onNext: () => void;
  loading?: boolean;
}

export default function SignUpFormLayout({
  title,
  currStep,
  totalStep,
  formContent,
  onPrev,
  onNext,
  loading,
}: Props) {
  return (
    <LayoutWithPrev title="회원가입">
      <Container>
        <FormContainer>
          <SectionTitle>{title}</SectionTitle>
          {formContent}
          {currStep === totalStep ? (
            <Stack direction="row" justifyContent="space-between">
              <NextButton
                variant="outlined"
                color="secondary"
                onClick={onNext}
                loading={loading}
                sx={{ width: "35%" }}
              >
                건너뛰기
              </NextButton>
              <NextButton
                variant="contained"
                color="secondary"
                loading={loading}
                onClick={onNext}
                sx={{ width: "35%" }}
              >
                완료
              </NextButton>
            </Stack>
          ) : (
            <Stack direction="row" justifyContent="end">
              <NextButton
                variant="contained"
                color="secondary"
                onClick={onNext}
                sx={{ width: "40%" }}
              >
                {`다음(${currStep} / ${totalStep})`}
              </NextButton>
            </Stack>
          )}
        </FormContainer>
      </Container>
    </LayoutWithPrev>
  );
}
