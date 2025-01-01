"use client";
import React, { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { grey } from "@mui/material/colors";
import LayoutWithPrev from "@/components/layout/layout-with-prev";
import { DetailActionBar } from "@/components/layout/action-bar";
import SuccessIcon from "@public/icons/Success.svg";
import InfoIcon from "@public/icons/Info.svg";
import theme from "@/components/theme";
import { useToast } from "@/components/toast";

const OUR_ACCOUNT = "신한 123-456-7890";
// TODO: 임시값 수정 필요
const DEPOSIT_DETAIL = [
  { label: "입금계좌", value: `${OUR_ACCOUNT} 박세준`, copyText: OUR_ACCOUNT },
  { label: "송금자명", value: "홍길동564", copyText: "홍길동564" },
  { label: "후원금액", value: "200,000 KRW" },
  { label: "입금기한", value: "2024-12-11 23:59" },
];

export default function FundingDepositInfoPage({
  params,
}: {
  params: { fundId: number };
}) {
  const router = useRouter();
  const { addToast } = useToast();
  // TODO: 후원 요청 api 호출하는 로직 추가 필요 + 고유번호 받기

  // 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // 클립보드 복사
  const copyToClipboard = (text: string, target: string) => {
    navigator.clipboard.writeText(target).then(() => {
      addToast(`${text} 복사 완료!`);
    });
  };

  const InfoRow = ({
    label,
    value,
    copyText,
  }: {
    label: string;
    value: string;
    copyText?: string;
  }) => (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography fontWeight={500} color={grey[700]}>
        {label}
      </Typography>
      {copyText ? (
        <Typography
          fontWeight={500}
          sx={{
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            cursor: "pointer",
          }}
          onClick={() => copyToClipboard(label, copyText)}
        >
          {value}
        </Typography>
      ) : (
        <Typography fontWeight={600}>{value}</Typography>
      )}
    </Stack>
  );

  return (
    <LayoutWithPrev
      title="입금 안내"
      actionBar={
        <DetailActionBar
          buttonText="후원 목록보기"
          handleSubmit={() => router.push(`/fundings/${params.fundId}`)}
        />
      }
    >
      <Stack
        alignItems="center"
        spacing={1.5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "85vh",
          p: "4vw",
        }}
      >
        <SuccessIcon
          style={{
            height: "9vh",
            fill: theme.palette.primary.main,
          }}
        />
        <Typography variant="h5" fontWeight={600}>
          후원이 신청되었어요
        </Typography>
        <Typography color="textSecondary" paddingBottom={4}>
          아래 계좌로 입금해 주시면 펀딩 참여가 확정됩니다.
        </Typography>

        {/* 입금 안내 박스 */}
        <Stack
          direction="column"
          spacing={2}
          sx={{
            width: "100%",
            p: "4vw",
            borderRadius: "3vw",
            backgroundColor: grey[100],
            color: grey[700],
          }}
        >
          {DEPOSIT_DETAIL.map(({ label, value, copyText }) => (
            <InfoRow
              key={label}
              label={label}
              value={value}
              copyText={copyText}
            />
          ))}
        </Stack>

        {/* 입금 시 유의사항 */}
        <Stack spacing={2} paddingTop={4}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <InfoIcon
              style={{ width: "20px", height: "20px", color: "#959595" }}
            />
            <Typography>입금 시 유의사항</Typography>
          </Stack>
          <Typography color="textSecondary">
            반드시 <b>고유번호가 포함된 송금자명</b>으로 입금해 주세요.
            <br />
            입금 기한 내 입금이 이루어지지 않으면 펀딩 신청이 자동으로
            취소됩니다.
          </Typography>
        </Stack>
      </Stack>
    </LayoutWithPrev>
  );
}
