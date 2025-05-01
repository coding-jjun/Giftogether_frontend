import { recipe } from "@vanilla-extract/recipes";

export const relatedFundingContainer = recipe({
  base: {
    padding: "10px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
    minHeight: "calc(100dvh - 160px)",
  },
  variants: {
    variant: {
      empty: {
        justifyContent: "center",
      },
    },
  },
});
