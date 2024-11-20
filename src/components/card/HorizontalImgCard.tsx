import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { FundTheme, getFundThemeValue } from "@/types/Funding.enum";
import NonProgressBar from "@/components/progress/NonProgressBar";

interface Props {
  image: string;
  userId: string;
  title: string;
  theme: FundTheme;
  endDate: string;
  fundSum: number;
  fundGoal: number;
  progress: number;
  handleClick: () => void;
}

export default function HorizontalImgCard({
  image,
  userId,
  title,
  theme,
  endDate,
  progress,
  handleClick,
}: Props) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 5 }}>
      <CardActionArea sx={{ display: "flex" }} onClick={handleClick}>
        <CardMedia
          component="img"
          sx={{ width: 140, height: 140, flexShrink: 0, maxWidth: 140 }}
          image={image}
          alt="펀딩 썸네일"
        />
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="body2" color="text.secondary">
              {userId} | {getFundThemeValue(theme)}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              fontWeight="bold"
            >
              {title}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              pb: 1,
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            <NonProgressBar progress={progress} endDate={endDate} />
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
