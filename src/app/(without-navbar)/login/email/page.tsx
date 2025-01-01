"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast";
import { ErrorData } from "@/types/ErrorData";
import LayoutWithPrev from "@/components/layout/layout-with-prev";
import axiosInstance from "@/utils/axios";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#fff",
});

const Form = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "90%",
});

const StyledButton = styled(Button)({
  marginTop: "20px",
  marginBottom: "20px",
  borderRadius: "50px",
  padding: "12px",
});

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#d3d3d3",
    },
    "&:hover fieldset": {
      borderColor: "#9e9e9e",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9e9e9e",
    },
    "&.Mui-error fieldset": {
      borderColor: "#f44336",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#9e9e9e",
    "&.Mui-focused": {
      color: "#9e9e9e",
    },
  },
});

const CustomLink = styled(Link)({
  textDecoration: "none",
  color: "#4f5558",
  fontWeight: 500,
});

const LoginComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { addToast } = useToast();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickLogin = async () => {
    try {
      const response = await axiosInstance.post(`/server/login`, {
        userEmail: email,
        userPw: password,
      });

      if (response.status === 200) {
        router.push("/");
      }
    } catch (e) {
      if (axios.isAxiosError(e) && (e as AxiosError<ErrorData>).response) {
        const axiosError = e as AxiosError<ErrorData>;
        if (axiosError.response) {
          addToast(axiosError.response.data.message);
        }
      }
    }
  };

  return (
    <LayoutWithPrev>
      <Container>
        <Typography
          variant="h5"
          component="h1"
          sx={{ my: "20px", fontWeight: 700 }}
        >
          이메일로 로그인하기
        </Typography>
        <Form>
          <CustomTextField
            label="이메일 주소"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomTextField
            label="비밀번호"
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <StyledButton
            variant="contained"
            fullWidth
            color="secondary"
            onClick={handleClickLogin}
          >
            로그인
          </StyledButton>
          <Box display="flex" justifyContent="center" mt="10px" gap="10px">
            <CustomLink href="#" variant="body2">
              계정 찾기
            </CustomLink>
            <Typography variant="body2">|</Typography>
            <CustomLink href="#" variant="body2">
              비밀번호 재설정
            </CustomLink>
          </Box>
          <Typography variant="body2" align="center" mt="20px">
            아직 기프투게더 계정이 없으신가요?{" "}
            <CustomLink href="/signup" sx={{ fontWeight: 700 }}>
              회원가입하기
            </CustomLink>
          </Typography>
        </Form>
      </Container>
    </LayoutWithPrev>
  );
};

export default LoginComponent;
