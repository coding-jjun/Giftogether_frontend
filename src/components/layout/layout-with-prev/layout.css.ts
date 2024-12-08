import { style } from "@vanilla-extract/css";

export const header = style({
  width: "100%",
  height: "52px",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 18px 10px 12px",
  boxSizing: "border-box",
  backgroundColor: "white",
  zIndex: 999,
});

export const iconBtn = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  width: "28px",
  height: "28px",
});

export const icon = style({
  width: "24px",
  height: "24px",
  fill: "#121314",
});

export const titleSpan = style({
  fontSize: "18px",
  lineHeight: "22px",
  fontWeight: 700,
  color: "#424242",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
});

export const content = style({
  paddingTop: "52px",
  paddingBottom: "100px",
  minHeight: "calc(100dvh - 52px)",
});

export const footer = style({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#fff",
  borderTop: "1px solid #eeeeee",
  zIndex: 1000,
  height: "65px",
});
