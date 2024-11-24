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
import calculatePercent from "@/utils/calculatePercent";
import addComma from "@/utils/addComma";
import React from "react";

interface Props {
  fundSum: number;
  fundGoal: number;
  endDate: string;
  textSize?: OverridableStringUnion<
    "inherit" | Variant,
    TypographyPropsVariantOverrides
  >;
}

export default function ProgressBarWithText({
  fundSum,
  fundGoal,
  endDate,
  textSize,
}: Props) {
  const progress: number = calculatePercent(fundSum, fundGoal);

  return (
    <Box sx={{ width: "100%" }}>
      {/* 프로그레스 바 */}
      <Box sx={{ position: "relative", height: 23, mt: 1 }}>
        <LinearProgress
          variant="determinate"
          value={Math.min(100, progress)}
          sx={{
            height: "100%",
            borderRadius: 3,
            backgroundColor: grey[300],
          }}
        />
        {/* 달성률 */}
        {/* 0 이상 13% 미만: 미달성한 부분에 달성률 표시*/}
        {/* 13% 이상: 달성한 부분에 달성률 표시*/}
        {0 < progress && progress < 13 ? (
          <Typography
            variant="body2"
            fontWeight={600}
            color="grey"
            sx={{
              position: "absolute",
              top: "50%",
              left: `${Math.min(100, progress)}%`,
              transform: "translate(30%, -50%)",
              whiteSpace: "nowrap",
            }}
          >
            {`${progress}%`}
          </Typography>
        ) : (
          <Typography
            variant="body2"
            fontWeight={600}
            color="white"
            sx={{
              position: "absolute",
              top: "50%",
              left: `${Math.min(100, progress)}%`,
              transform: "translate(-140%, -50%)",
              whiteSpace: "nowrap",
            }}
          >
            {`${progress}%`}
          </Typography>
        )}
      </Box>

      {/* 남은 금액, 남은 일자 */}
      <Stack sx={{ my: 2 }} direction="row" justifyContent="space-between">
        <Stack direction="column">
          <Typography
            variant={textSize ?? "body1"}
            fontWeight={500}
            color={grey[600]}
          >
            남은금액
          </Typography>
          <Stack direction="row" alignItems="baseline" spacing={0.5}>
            <Typography variant={"h6"} fontWeight={600} color={grey[700]}>
              {addComma(fundGoal - fundSum)}
            </Typography>
            <Typography variant={"body2"} fontWeight={500} color={grey[700]}>
              원
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="column">
          <Typography
            variant={textSize ?? "body1"}
            fontWeight={500}
            color={grey[600]}
          >
            남은시간
          </Typography>
          <Stack direction="row" alignItems="baseline" spacing={0.5}>
            <Typography variant={"h6"} fontWeight={600} color={grey[700]}>
              {getDeadlineStatus(endDate)}
            </Typography>
            {getDeadlineStatus(endDate) !== "만료됨" &&
              getDeadlineStatus(endDate) !== "오늘 마감" && (
                <Typography
                  variant={"body2"}
                  fontWeight={500}
                  color={grey[700]}
                >
                  일
                </Typography>
              )}
          </Stack>
        </Stack>
      </Stack>

      {/*목표 금액*/}
      <Stack
        direction="row"
        sx={{ pt: "20px", borderTop: "1px solid #e2e2e2" }}
      >
        <Typography
          variant={textSize ?? "body1"}
          fontWeight={500}
          color={grey[600]}
          sx={{ mr: 3 }}
        >
          목표금액
        </Typography>
        <Typography>{addComma(fundGoal)}원</Typography>
      </Stack>
    </Box>
  );
}
