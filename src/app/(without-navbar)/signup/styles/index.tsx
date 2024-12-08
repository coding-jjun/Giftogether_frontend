import { Box, styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#fff",
});

export const Title = styled(Box)({
  width: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

export const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "90%",
});

export const NextButton = styled(LoadingButton)({
  marginTop: "30px",
  marginBottom: "20px",
  borderRadius: "10px",
  padding: "12px",
  width: "100%",
});
