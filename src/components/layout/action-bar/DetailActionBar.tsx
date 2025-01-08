"use client";
import { IconButton } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { ActionBarStack } from "@/components/layout/action-bar/ActionBarStack";
import { ActionBarButton } from "@/components/layout/action-bar/ActionBarButton";

interface Props {
  buttonText: string;
  handleShare?: () => void;
  handleSubmit?: () => void;
}

export default function DetailActionBar({
  buttonText,
  handleShare,
  handleSubmit,
}: Props) {
  return (
    <ActionBarStack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      spacing={1}
    >
      {buttonText === "선물하기" ? (
        <IconButton aria-label="share" onClick={handleShare}>
          <ShareOutlinedIcon />
        </IconButton>
      ) : null}
      <ActionBarButton variant="contained" onClick={handleSubmit}>
        {buttonText}
      </ActionBarButton>
    </ActionBarStack>
  );
}
