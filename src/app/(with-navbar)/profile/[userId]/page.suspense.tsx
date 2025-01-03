"use client";
import { SyntheticEvent, useState } from "react";
import StickyTabs from "@/components/tab/StickyTabs";
import { FundingStatusValue } from "@/types/Funding.enum";
import useFundingsQuery from "@/query/useFundingsQuery";
import UserProfile from "./view/UserProfile";
import { FundingList } from "./view/FundingList";
import useCurrentUserQuery from "@/query/useCurrentUserQuery";
import useUserQuery from "@/query/useUserQuery";

interface Props {
  myId: number | null;
  friendId: number;
}

export default function MyPageContent({ myId, friendId }: Props) {
  const [tab, setTab] = useState<FundingStatusValue>("진행 중");

  const { data: loginUser } = useCurrentUserQuery();
  const { data: anotherUser } = useUserQuery(friendId);

  // 나의 펀딩 - 진행중
  const { data: ongoinMyFundingQueryResponse } = useFundingsQuery({
    fundPublFilter: "mine",
    status: "ongoing",
  });

  // 나의 펀딩 - 종료됨
  const { data: endedMyFundingQueryResponse } = useFundingsQuery({
    fundPublFilter: "mine",
    status: "ended",
  });

  // 다른 사람들의 펀딩 - 진행중
  const { data: ongoingOthersFundingQueryResponse } = useFundingsQuery({
    fundPublFilter: "both",
    status: "ongoing",
  });

  // 다른 사람들의 펀딩 - 종료됨
  const { data: endedOthersFundingQueryResponse } = useFundingsQuery({
    fundPublFilter: "both",
    status: "ended",
  });

  const handleTabChange = (
    event: SyntheticEvent,
    newTab: FundingStatusValue,
  ) => {
    setTab(newTab);
  };

  // 프로필 유저 정보
  const profileUser = friendId === myId ? loginUser : anotherUser;
  const profileOngoingQuery =
    friendId === myId
      ? ongoinMyFundingQueryResponse
      : ongoingOthersFundingQueryResponse;
  const profileEndedQuery =
    friendId === myId
      ? endedMyFundingQueryResponse
      : endedOthersFundingQueryResponse;

  if (!profileUser) {
    // TODO: 유저정보가 없을 때
    return null;
  }

  return (
    <>
      <UserProfile
        user={profileUser}
        userId={myId || undefined}
        friendId={friendId}
      />
      <StickyTabs
        tabs={[
          {
            label: `진행 중  ${
              profileOngoingQuery?.pages?.flatMap((page) => page.fundings)
                .length ?? 0
            }     `,
            value: "진행 중",
            panel: (
              <FundingList
                fundings={profileOngoingQuery?.pages?.flatMap(
                  (page) => page.fundings,
                )}
              />
            ),
          },
          {
            label: `종료됨  ${
              profileEndedQuery?.pages?.flatMap((page) => page.fundings)
                .length ?? 0
            }     `,
            value: "종료됨",
            panel: (
              <FundingList
                fundings={profileEndedQuery?.pages?.flatMap(
                  (page) => page.fundings,
                )}
              />
            ),
          },
        ]}
        selectedTab={tab}
        handleTabChange={handleTabChange}
        tabPanelSx={{ padding: 0, marginTop: 2 }}
      />
    </>
  );
}
