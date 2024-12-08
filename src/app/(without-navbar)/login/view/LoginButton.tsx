import { ReactNode } from "react";
import Image from "next/image";
import { Box, Button, Link, styled } from "@mui/material";
import { grey } from "@mui/material/colors";

export interface LoginButtonProps {
  name: string;
  icon: string | ReactNode;
  url: string;
  bgColor: string;
  textColor?: string;
  border?: string;
}

const LoginButton = ({
  name,
  icon,
  url,
  bgColor,
  textColor,
  border,
}: LoginButtonProps) => {
  return (
    <Link href={url}>
      <StyledButton
        variant="contained"
        style={{
          backgroundColor: bgColor,
          color: textColor || grey[800],
          border: border || "none",
        }}
      >
        <IconBox>
          {typeof icon === "string" ? (
            <Image src={icon} alt={name} width={24} height={24} />
          ) : (
            icon
          )}
        </IconBox>
        {`${name}로 로그인`}
      </StyledButton>
    </Link>
  );
};

export default LoginButton;

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "100%",
  height: "48px",
  fontSize: "16px",
  boxShadow: "none",
  borderRadius: 50,
  fontWeight: 700,
  color: grey[800],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  paddingLeft: theme.spacing(6), // Add left padding to make space for the icon
}));

const IconBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
}));
