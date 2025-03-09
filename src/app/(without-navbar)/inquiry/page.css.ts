import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  gap: "20px",
});

export const input = style({
  flex: "1 48px",
  height: "48px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "16px",
  color: "#424242",
  selectors: {
    "&:focus": {
      outlineColor: "#F43C6B",
    },
    "&.error": {
      borderColor: "#F43C6B",
    },
  },
});

export const textarea = style({
  width: "100%",
  height: "160px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "16px",
  color: "#424242",
  selectors: {
    "&:focus": {
      outlineColor: "#F43C6B",
    },
    "&.error": {
      borderColor: "#F43C6B",
    },
  },
});

export const formContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});
