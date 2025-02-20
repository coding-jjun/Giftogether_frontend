"use client";
import { SyntheticEvent, useState } from "react";
import StickyTabs from "@/components/tab/StickyTabs";
import { FundingStatusValue } from "@/types/Funding.enum";
import useFundingsQuery from "@/query/useFundingsQuery";
import UserProfile from "./view/UserProfile";
import { FundingList } from "./view/FundingList";
import useUserQuery from "@/query/useUserQuery";

interface Props {
  myId: number | null;
  friendId: number;
}

export default function MyPageContent({ myId, friendId }: Props) {
  const [tab, setTab] = useState<FundingStatusValue>("진행 중");

  const { data: profileUser } = useUserQuery(friendId);

  // 프로필 유저 - 진행 중인 펀딩
  const { data: profileOngoingQuery } = useFundingsQuery(
    {
      fundPublFilter: "mine",
      status: "ongoing",
    },
    profileUser?.userId,
  );

  // 프로필 유저 - 종료된 펀딩
  const { data: profileEndedQuery } = useFundingsQuery(
    {
      fundPublFilter: "mine",
      status: "ended",
    },
    profileUser?.userId,
  );

  const handleTabChange = (
    event: SyntheticEvent,
    newTab: FundingStatusValue,
  ) => {
    setTab(newTab);
  };

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
