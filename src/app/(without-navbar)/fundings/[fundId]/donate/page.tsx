"use client";
import React, { useEffect, useState } from "react";
import LayoutWithPrev from "@/components/layout/layout-with-prev";
import { DetailActionBar } from "@/components/layout/action-bar";
import { Avatar, Button, Grid, Stack, Typography } from "@mui/material";
import useFundingDetailQuery from "@/query/useFundingDetailQuery";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/navigation";

export default function FundingDonatePage({
  params,
}: {
  params: { fundId: string };
}) {
  const { data: funding } = useFundingDetailQuery(params.fundId);
  const [amount, setAmount] = useState<number>(0);
  const router = useRouter();

  // 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // 숫자 입력 핸들러
  const handleAmountClick = (num: number) => {
    setAmount((prev) => Number(`${prev}${num}`));
  };

  // 전액 입력 핸들러
  const handleGoalAmountClick = () => {
    if (funding?.fundGoal) {
      setAmount(funding.fundGoal);
    }
  };

  // 1의자리 지우기 핸들러
  const handleBackspace = () => {
    setAmount((prev) => Math.floor(prev / 10));
  };

  // "00" 추가
  const handleDoubleZero = () => {
    setAmount((prev) => prev * 100);
  };

  const handleSubmit = () => {
    router.push(`/fundings/${params.fundId}/donate/deposit-info`);
  };

  return (
    <LayoutWithPrev
      title="후원하기"
      actionBar={
        amount === 0 ? null : (
          <DetailActionBar buttonText="결제하기" handleSubmit={handleSubmit} />
        )
      }
    >
      {/* 펀딩글 작성자 정보 */}
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ pt: "2vw" }}
      >
        <Avatar
          alt={`${funding?.fundUserNick}-profile`}
          src={funding?.fundUserImg ?? "/dummy/profile.webp"}
          sx={{
            width: "12vw",
            height: "12vw",
            maxWidth: "60px",
            maxHeight: "60px",
          }}
        />
        <Typography
          variant="h5"
          fontWeight={600}
          sx={{
            fontSize: "6vw",
            maxWidth: "80%",
            textAlign: "center",
            color: grey[800],
          }}
        >
          {funding?.fundUserNick} 에게
        </Typography>
      </Stack>

      {/* 금액 입력 */}
      <Stack alignItems="center" spacing={1} sx={{ padding: "4vw" }}>
        <Typography
          fontWeight={600}
          sx={{
            fontSize: "7vw",
            textAlign: "center",
            color: grey[500],
          }}
        >
          {amount === 0 ? "얼마나 후원할까요?" : `${amount.toLocaleString()}원`}
        </Typography>
        <Button
          sx={{
            py: "2vw",
            px: "4vw",
            borderRadius: "3vw",
            fontSize: "4vw",
            backgroundColor: grey[100],
            color: grey[700],
          }}
          onClick={handleGoalAmountClick}
        >
          전액 · {funding?.fundGoal.toLocaleString()}원 입력
        </Button>
      </Stack>

      {/* 키패드 */}
      <Grid
        container
        spacing={1}
        sx={{
          position: "fixed",
          bottom: "16vw",
          padding: "1vw",
          marginTop: "auto",
        }}
      >
        {[...Array(9).keys()].map((num) => (
          <Grid item xs={4} key={num + 1}>
            <Button
              fullWidth
              sx={{
                padding: "4vw",
                fontSize: "7vw",
                borderRadius: "2vw",
                color: grey[800],
              }}
              onClick={() => handleAmountClick(num + 1)}
            >
              {num + 1}
            </Button>
          </Grid>
        ))}
        <Grid item xs={4}>
          <Button fullWidth sx={keypadStyle} onClick={handleDoubleZero}>
            00
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            sx={keypadStyle}
            onClick={() => handleAmountClick(0)}
          >
            0
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth sx={keypadStyle} onClick={handleBackspace}>
            ←
          </Button>
        </Grid>
      </Grid>
    </LayoutWithPrev>
  );
}

const keypadStyle = {
  padding: "4vw",
  fontSize: "7vw",
  borderRadius: "2vw",
  color: grey[800],
};
