import { Stack, Typography } from "@mui/material";
import { FundingDto } from "@/types/Funding";

interface Props {
  funding: FundingDto;
}

export default function DetailInfoPanel({ funding }: Props) {
  const {
    regAt,
    endAt,
    fundRecvName,
    fundRecvPhone,
    fundAddrRoad,
    fundAddrDetl,
    fundRecvReq,
  } = funding;

  return (
    <>
      <Stack sx={stackStyles}>
        <Typography sx={labelStyles}>등록일</Typography>
        <Typography>
          {regAt.toString().substring(0, regAt.toString().indexOf("T"))}
        </Typography>
      </Stack>

      <Stack sx={stackStyles}>
        <Typography sx={labelStyles}>마감일</Typography>
        <Typography>{endAt.toString()}</Typography>
      </Stack>

      <Typography sx={labelStyles}>배송지 정보</Typography>
      <Stack margin={1}>
        <Typography fontWeight={600}>{fundRecvName}</Typography>
        <Typography>
          {fundAddrRoad} {fundAddrDetl}
        </Typography>
        <Typography paddingBottom={1}>{fundRecvPhone}</Typography>
        <Typography>{fundRecvReq}</Typography>
      </Stack>
    </>
  );
}

const stackStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 2,
  marginBottom: 3,
};

const labelStyles = {
  fontSize: "17px",
  fontWeight: 600,
};
