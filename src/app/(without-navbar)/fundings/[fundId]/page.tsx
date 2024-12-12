"use client";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Menu, MenuItem, Stack } from "@mui/material";
import useFundingDetailQuery from "@/query/useFundingDetailQuery";
import FundingPageTab from "@/app/(without-navbar)/fundings/[fundId]/view/FundingPageTab";
import FundingTitle from "@/app/(without-navbar)/fundings/[fundId]/view/FundingTitle";
import FundingProgress from "@/app/(without-navbar)/fundings/[fundId]/view/FundingProgress";
import FundingThumbnail from "@/app/(without-navbar)/fundings/[fundId]/view/FundingThumbnail";
import { currentFundingAtom } from "@/store/atoms/funding";
import { DetailActionBar } from "@/components/layout/action-bar";
import { useRouter } from "next/navigation";
import { useCookie } from "@/hook/useCookie";
import useDeleteFunding from "@/query/useDeleteFunding";
import FundUserNick from "@/app/(without-navbar)/fundings/[fundId]/view/FundUserNick";
import PullToRefresh from "@/components/refresh/PullToRefresh";
import LayoutWithPrev from "@/components/layout/layout-with-prev";

export default function FundingDetailPage({
  params,
}: {
  params: { fundId: string };
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { data: funding, refetch } = useFundingDetailQuery(params.fundId);
  const { mutate: deleteFunding } = useDeleteFunding(params.fundId);

  const setCurrentFunding = useSetRecoilState(currentFundingAtom);
  const [isWriter, setIsWriter] = useState<boolean>(false);
  const loginUserId = useCookie<number>("userId");

  const router = useRouter();

  useEffect(() => {
    setCurrentFunding(funding);
    if (loginUserId) {
      setIsWriter(loginUserId === funding?.fundUserId);
    }
  }, [setCurrentFunding, funding, loginUserId]);

  const handleEdit = () => {
    router.push(`/fundings/${params.fundId}/edit`);
  };

  const handleDelete = () => {
    if (params.fundId === "") return;
    deleteFunding(params.fundId);
    router.push(`/profile/${loginUserId}`);
  };

  if (!funding) {
    // TODO: fallback UI 작업 필요
    return null;
  }

  return (
    <LayoutWithPrev
      actionBar={
        isWriter ? null : (
          <DetailActionBar
            buttonText="선물하기"
            handleSubmit={() =>
              router.push(`/fundings/${params.fundId}/donate`)
            }
          />
        )
      }
      showMoreIcon={isWriter}
      onClickMore={handleMenuOpen}
    >
      {isWriter && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>수정</MenuItem>
          <MenuItem onClick={handleDelete}>삭제</MenuItem>
        </Menu>
      )}
      <PullToRefresh refreshData={refetch} />
      {funding && (
        <Stack direction={"column"} spacing={1}>
          <FundingThumbnail funding={funding} />
          <Stack padding={2} spacing={1}>
            <FundUserNick funding={funding} />
            <FundingTitle funding={funding} />
            <FundingProgress funding={funding} />
          </Stack>
          <FundingPageTab funding={funding} />
        </Stack>
      )}
    </LayoutWithPrev>
  );
}
