"use client";
import React from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Complete() {
  const router = useRouter();

  return (
    <Container>
      <Title>
        <Typography
          variant="h5"
          component="h1"
          sx={{ my: "20px", fontWeight: 700 }}
        >
          회원가입 완료!
        </Typography>
        <Typography variant="h6" component="h1" margin="none">
          추가 정보를 입력하시겠어요?
        </Typography>
        <Typography variant="h6" component="h1" margin="none">
          좀 더 편리한 서비스 이용이 가능해요.
        </Typography>
      </Title>
      <div style={{ width: "80%", height: "20vh" }}>
        <DotLottieReact src="/animation/check.json" autoplay />
      </div>
      <LoginRouterButton
        variant="outlined"
        color="secondary"
        style={{ width: "50%" }}
        onClick={() => router.push("/login")}
      >
        로그인하러 가기
      </LoginRouterButton>
      <LoginRouterButton
        variant="contained"
        color="secondary"
        style={{ width: "50%" }}
        onClick={() => router.push("/signup/additional")}
      >
        추가 정보 입력하기
      </LoginRouterButton>
    </Container>
  );
}

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "80vh",
  backgroundColor: "#fff",
});

const Title = styled(Box)({
  width: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const LoginRouterButton = styled(Button)({
  marginBottom: "10px",
  borderRadius: "50px",
  padding: "12px",
});
