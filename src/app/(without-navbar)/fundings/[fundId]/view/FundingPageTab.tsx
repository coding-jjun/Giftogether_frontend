import { SyntheticEvent, useState } from "react";
import StickyTabs from "@/components/tab/StickyTabs";
import FundingInfoPanel from "@/app/(without-navbar)/fundings/[fundId]/view/FundingInfoPanel";
import type { Funding } from "@/types/Funding";
import CommentPanel from "@/app/(without-navbar)/fundings/[fundId]/view/CommentPanel";
import GratitudePanel from "@/app/(without-navbar)/fundings/[fundId]/view/GratitudePanel";
import RollingPaperPanel from "@/app/(without-navbar)/fundings/[fundId]/view/RollingPaperPanel";

interface Props {
  funding: Funding;
}

export default function FundingPageTab({ funding }: Props) {
  const [tab, setTab] = useState<string>("정보");

  const handleTabChange = (event: SyntheticEvent, newTab: string) => {
    setTab(newTab);
  };

  return (
    <StickyTabs
      tabs={[
        {
          label: "정보",
          value: "정보",
          panel: <FundingInfoPanel funding={funding} />,
        },
        {
          label: "댓글",
          value: "댓글",
          panel: <CommentPanel fundId={funding.fundId} />,
        },
        {
          label: "감사인사",
          value: "감사인사",
          panel: (
            <GratitudePanel
              gratId={funding.fundId}
              fundUuid={funding.fundUuid}
            />
          ),
        },
        {
          label: "롤링페이퍼",
          value: "롤링페이퍼",
          panel: <RollingPaperPanel fundUuid={funding.fundUuid} />,
        },
      ]}
      selectedTab={tab}
      handleTabChange={handleTabChange}
    />
  );
}
