import { style } from "@vanilla-extract/css";

export const buttonGroup = style({
  display: "flex",
  borderRadius: "8px",
  overflow: "hidden",
});

export const button = style({
  flex: 1,
  padding: "12px",
  textAlign: "center",
  background: "#e0e0e0",
  color: "#757575",
  border: "none",
  cursor: "pointer",
  fontSize: "15px",
  selectors: {
    "&.active": {
      background: "rgba(0,0,0,0.7)",
      color: "white",
      fontWeight: 500,
    },
  },
});
