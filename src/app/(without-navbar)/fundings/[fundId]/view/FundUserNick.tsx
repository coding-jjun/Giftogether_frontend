import { Avatar, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { FundingDto } from "@/types/Funding";
import { useRouter } from "next/navigation";

interface Props {
  funding: FundingDto;
}
export default function FundUserNick({ funding }: Props) {
  const { fundUserImg, fundUserNick, fundUserId } = funding;
  const router = useRouter();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      onClick={() => router.push(`/profile/${fundUserId}`)}
    >
      <Avatar
        alt={`${fundUserNick}-profile`}
        src={fundUserImg ?? "/dummy/profile.webp"}
        sx={{ width: 25, height: 25 }}
      />
      <Typography variant={"body1"} color={grey[700]}>
        {fundUserNick}
      </Typography>
    </Stack>
  );
}
