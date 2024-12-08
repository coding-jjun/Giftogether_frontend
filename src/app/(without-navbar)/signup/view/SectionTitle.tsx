import { PropsWithChildren } from "react";
import { Typography } from "@mui/material";
import { Title } from "@/app/(without-navbar)/signup/styles";

export default function SectionTitle({ children }: PropsWithChildren) {
  return (
    <Title>
      <Typography
        variant="h5"
        component="h1"
        sx={{ mt: "25px", mb: "20px", fontWeight: 700, whiteSpace: "pre-line" }}
      >
        {children}
      </Typography>
    </Title>
  );
}
