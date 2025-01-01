import {
  Box,
  LinearProgress,
  Stack,
  Typography,
  TypographyPropsVariantOverrides,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import getDeadlineStatus from "@/utils/getDeadlineStatus";
import { OverridableStringUnion } from "@mui/types";
import { Variant } from "@mui/material/styles/createTypography";

interface Props {
  progress: number;
  endDate: string;
  textSize?: OverridableStringUnion<
    "inherit" | Variant,
    TypographyPropsVariantOverrides
  >;
}

export default function ProgressBarWithText({
  progress,
  endDate,
  textSize,
}: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction={"row"} justifyContent={"space-between"} sx={{ mb: 1 }}>
        <Typography
          variant={textSize ?? "body1"}
          fontWeight={700}
          color="primary"
        >
          {`${progress}%`}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={0.3}>
          <Typography
            variant={textSize ?? "body1"}
            fontWeight={700}
            color={grey[600]}
          >
            {getDeadlineStatus(endDate)}
          </Typography>
          {getDeadlineStatus(endDate) !== "만료됨" &&
            getDeadlineStatus(endDate) !== "오늘 마감" && (
              <Typography variant={"body2"} fontWeight={500} color={grey[700]}>
                일 남음
              </Typography>
            )}
        </Stack>
      </Stack>
      <LinearProgress variant="determinate" value={Math.min(100, progress)} />
    </Box>
  );
}
