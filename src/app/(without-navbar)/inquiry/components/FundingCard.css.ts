import { style } from "@vanilla-extract/css";

export const cardContainer = style({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  padding: "12px",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  backgroundColor: "#fff",
  gap: "12px",
  cursor: "pointer",
  transition: "border 0.2s ease-in-out",
  WebkitTapHighlightColor: "transparent",

  ":active": {
    backgroundColor: "transparent",
  },
});

export const selectedCard = style({
  outline: "1.5px solid #F6B70B",
});

export const thumbnail = style({
  width: "80px",
  height: "80px",
  borderRadius: "4px",
  objectFit: "cover",
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "4px",
  flex: 1,
});

export const nickname = style({
  fontSize: "14px",
  fontWeight: "bold",
  color: "#424242",
});

export const title = style({
  fontSize: "16px",
  color: "#000",
});
