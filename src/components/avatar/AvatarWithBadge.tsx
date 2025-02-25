import React, { CSSProperties, ReactNode } from "react";
import { Avatar, Badge } from "@mui/material";

interface Props {
  imgSrc?: string;
  badge?: ReactNode;
  onClick?: () => void;
  avatarSx?: CSSProperties;
}

export const AvatarWithBadge = ({
  imgSrc,
  badge,
  onClick,
  avatarSx,
}: Props) => {
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={badge}
      onClick={onClick}
    >
      <Avatar
        sx={{
          width: 100,
          height: 100,
          ...avatarSx,
        }}
        src={imgSrc}
      />
    </Badge>
  );
};
