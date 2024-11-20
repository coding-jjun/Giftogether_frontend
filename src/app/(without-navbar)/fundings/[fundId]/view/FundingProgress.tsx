import ProgressBarWithText from "@/components/progress/ProgressBarWithText";
import { FundingDto } from "@/types/Funding";

interface Props {
  funding: FundingDto;
}

export default function FundingProgress({ funding }: Props) {
  const { fundSum, fundGoal, endAt } = funding;

  return (
    <ProgressBarWithText
      fundSum={fundSum}
      fundGoal={fundGoal}
      endDate={endAt.toString()}
    />
  );
}
