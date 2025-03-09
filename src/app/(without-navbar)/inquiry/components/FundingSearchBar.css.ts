import { style } from "@vanilla-extract/css";

export const fundingSearchBar = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  position: "relative",
});

export const clearFundingButton = style({
  position: "absolute",
  right: "70px",
  width: "20px",
  height: "20px",
  borderRadius: "24px",
  background: "#c2c2c2",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000000",
});

export const findFundingButton = style({
  border: "none",
  width: "48px",
  height: "48px",
  borderRadius: "8px",
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
