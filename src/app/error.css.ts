import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100dvw",
  height: "100dvh",
});

export const wrapper = style({
  display: "inline-flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  gap: "15px",
});

export const lottieWrapper = style({
  height: "90px",
});

export const errorTitle = style({
  color: "#424242",
  fontSize: "24px",
});

export const errorMessage = style({
  maxWidth: "350px",
  maxHeight: "50px",
  overflowY: "scroll",
  whiteSpace: "normal",
});

export const retryButton = style({
  width: "100%",
  height: "50px",
  fontSize: "16px",
  fontWeight: 600,
  backgroundColor: "#FF9411",
  border: "none",
  borderRadius: "10px",
  color: "white",
  marginTop: "5px",
});
