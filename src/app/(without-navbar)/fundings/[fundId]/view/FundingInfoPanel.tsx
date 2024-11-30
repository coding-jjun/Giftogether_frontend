import { Typography } from "@mui/material";
import { FundingDto } from "@/types/Funding";
import { GiftCard } from "@/components/card";

interface Props {
  funding: FundingDto;
}

export default function FundingInfoPanel({ funding }: Props) {
  const { fundCont, gifts } = funding;

  return (
    <>
      <Typography variant="body1" marginBottom={4}>
        {fundCont}
      </Typography>
      <Typography variant="body1" fontWeight={700}>
        선물 목록
      </Typography>
      {gifts.map((gift, index) => (
        <GiftCard
          key={gift.giftId}
          title={gift.giftTitle}
          image={gift.giftImg ?? "/dummy/present.png"}
          option={gift.giftOpt}
          content={gift.giftCont}
          url={gift.giftUrl}
        />
      ))}
    </>
  );
}
