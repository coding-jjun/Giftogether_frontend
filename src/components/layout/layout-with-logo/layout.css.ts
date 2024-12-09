import { style } from "@vanilla-extract/css";

export const container = style({
  padding: "16px",
});

export const header = style({
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 18px 10px 12px",
  backdropFilter: "blur(10px)",
  zIndex: 999,
});

export const logo = style({
  fontSize: "24px",
  fontWeight: 700,
  color: "#424242",
  fontFamily: "Jalnan",
  background: "none",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const content = style({
  paddingTop: "40px",
  paddingBottom: "100px",
});

export const navBar = style({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#fff",
  borderTop: "1px solid #ddd",
  zIndex: 1000,
  borderRadius: "20px 20px 0 0",
  height: "65px",
});

export const iconBtn = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const icon = style({
  width: "28px",
  height: "28px",
  fill: "#9e9e9e",
});

export const notiIcon = style([icon, { fill: "#424242" }]);

export const activeIcon = style({
  fill: "#e57373",
});
