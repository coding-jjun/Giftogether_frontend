import { SyntheticEvent, useState } from "react";
import StickyTabs from "@/components/tab/StickyTabs";
import FundingInfoPanel from "@/app/(without-navbar)/fundings/[fundId]/view/FundingInfoPanel";
import type { FundingDto } from "@/types/Funding";
import CommentPanel from "@/app/(without-navbar)/fundings/[fundId]/view/CommentPanel";
import GratitudePanel from "@/app/(without-navbar)/fundings/[fundId]/view/GratitudePanel";
import RollingPaperPanel from "@/app/(without-navbar)/fundings/[fundId]/view/RollingPaperPanel";
import DetailInfoPanel from "@/app/(without-navbar)/fundings/[fundId]/view/DetailInfoPanel";
import { useCookie } from "@/hook/useCookie";

interface Props {
  funding: FundingDto;
}

export default function FundingPageTab({ funding }: Props) {
  const [tab, setTab] = useState<string>("정보");
  const loginUserId = useCookie<number>("userId");

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
          panel: <CommentPanel fundUuid={funding.fundUuid} />,
        },
        {
          label: "감사인사",
          value: "감사인사",
          panel: <GratitudePanel fundUuid={funding.fundUuid} />,
        },
        // TODO: 로그인 이슈 해결되면 주석 해제 필요
        // loginUserId === funding.fundUserId ?
        {
          label: "상세",
          value: "상세",
          panel: <DetailInfoPanel funding={funding} />,
        },
        // : {
        //     label: "롤링페이퍼",
        //     value: "롤링페이퍼",
        //     panel: <RollingPaperPanel fundUuid={funding.fundUuid} />,
        //   },
      ]}
      selectedTab={tab}
      handleTabChange={handleTabChange}
    />
  );
}
