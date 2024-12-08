import { PropsWithChildren } from "react";
import { styled, Typography } from "@mui/material";

const StyledTypography = styled(Typography)({
  variant: "body2",
  fontWeight: 700,
  color: "#9e9e9e",
  marginBottom: "10px",
});

export const InputLabel = ({ children }: PropsWithChildren) => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <StyledTypography>{children}</StyledTypography>
    </div>
  );
};
