import React from "react";
import { grey } from "@mui/material/colors";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FundTheme, getFundThemeValue } from "@/types/Funding.enum";
import addComma from "@/utils/addComma";
import { CoverImage } from "@/components/image";

interface Props {
  image: string;
  userId: string;
  title: string;
  theme: FundTheme;
  money: number;
  buttonText: string;
  handleClick: () => void;
}

export default function HorizontalDonationCard({
  image,
  userId,
  title,
  theme,
  money,
  buttonText,
  handleClick,
}: Props) {
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{ borderBottom: "1px solid #e2e2e2", py: "10px" }}
    >
      <Stack
        direction="row"
        sx={{
          width: "100%",
        }}
      >
        <CoverImage
          src={image ?? "/dummy/present.png"}
          alt={`thumbnail-${title}`}
          parentDivStyle={{ width: "120px", height: "120px" }}
        />
        <Stack
          id="content"
          justifyContent="space-between"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "calc(100% - 120px)",
            padding: "10px",
          }}
        >
          <Stack direction="column">
            <Typography variant="body2" color="text.secondary">
              {userId} | {getFundThemeValue(theme)}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              fontWeight="bold"
              color={grey[800]}
            >
              {title}
            </Typography>
          </Stack>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Stack direction="column" alignItems="flex-end">
              <Typography variant="body2" color={grey[600]}>
                2024.07.31
              </Typography>
              <Typography fontSize={20} fontWeight={700} color={grey[700]}>
                {addComma(money)}원
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Stack>
      <Button
        variant="contained"
        fullWidth
        disableElevation
        sx={{ backgroundColor: grey[300], color: grey[900] }}
      >
        {buttonText}
      </Button>
    </Stack>
  );
}
