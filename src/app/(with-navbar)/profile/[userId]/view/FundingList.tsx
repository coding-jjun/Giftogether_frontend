import { styled } from "@mui/system";
import { Stack } from "@mui/material";
import { HorizontalImgCard } from "@/components/card";
import calculatePercent from "@/utils/calculatePercent";
import { useRouter } from "next/navigation";
import { Funding } from "@/types/Funding";

interface Props {
  fundings: Funding[] | undefined;
}

export const FundingList = ({ fundings }: Props) => {
  const router = useRouter();
  const handleClickFunding = (uuid: string) => {
    router.push(`/fundings/${uuid}`);
  };

  if (!fundings) {
    return null;
  }

  return (
    <FundingListContainer direction="column" spacing={1}>
      {fundings.map((funding) => (
        <HorizontalImgCard
          key={funding.fundUuid}
          image={funding.fundImg ?? "/dummy/present.webp"}
          userId={funding.fundUserNick || "익명"}
          title={funding.fundTitle}
          theme={funding.fundTheme}
          endDate={funding.endAt.toString()}
          fundSum={funding.fundSum}
          fundGoal={funding.fundGoal}
          progress={calculatePercent(funding.fundSum, funding.fundGoal)}
          handleClick={() => handleClickFunding(funding.fundUuid)}
        />
      ))}
    </FundingListContainer>
  );
};

const FundingListContainer = styled(Stack)({
  width: "100%",
});
