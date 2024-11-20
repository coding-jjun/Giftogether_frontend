"use client";
import { useRouter } from "next/navigation";
import { VerticalImgCard } from "@/components/card";
import calculatePercent from "@/utils/calculatePercent";
import { Stack } from "@mui/material";
import {
  getFundingSortKey,
  getFundingStatusKey,
  getFundThemeKey,
  getPublFilterKey,
} from "@/types/Funding.enum";
import { useRecoilValue } from "recoil";
import {
  selectedSortState,
  selectedStatusState,
  selectedThemesState,
  selectedVisibilityState,
} from "@/store/atoms/filter";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import useFundingsQuery from "@/query/useFundingsQuery";
import FilterSelectBar from "@/app/(with-navbar)/fundings/view/FilterSelectBar";

export default function FundingListContent() {
  const router = useRouter();

  // 필터
  const themes = useRecoilValue(selectedThemesState);
  const visibility = useRecoilValue(selectedVisibilityState);
  const status = useRecoilValue(selectedStatusState);
  const sort = useRecoilValue(selectedSortState);

  // 다른 사람들의 펀딩
  const {
    data: fundingQueryResponse,
    fetchNextPage,
    hasNextPage,
  } = useFundingsQuery({
    fundThemes: themes.map((value) => getFundThemeKey(value)),
    fundPublFilter: getPublFilterKey(visibility),
    status: getFundingStatusKey(status),
    sort: getFundingSortKey(sort),
    limit: 5,
  });

  // 무한 스크롤
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  // 무한 스크롤 관련 IntersectionObserver 훅
  const observerRef = useIntersectionObserver(loadMore, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  return (
    <Stack direction="column" spacing={2} sx={{ mt: 3 }}>
      <FilterSelectBar />
      {fundingQueryResponse?.pages
        ?.flatMap((page) => page.fundings)
        .map((funding) => (
          <VerticalImgCard
            key={funding.fundUuid}
            image={funding.fundImg ?? "/dummy/present.webp"}
            userId={funding.fundUserNick || "익명"}
            title={funding.fundTitle}
            theme={funding.fundTheme}
            endDate={funding.endAt.toString()}
            fundSum={funding.fundSum}
            fundGoal={funding.fundGoal}
            progress={calculatePercent(funding.fundSum, funding.fundGoal)}
            handleClick={() => router.push(`/fundings/${funding.fundUuid}`)}
          />
        ))}
      <div
        ref={observerRef}
        style={{ height: "20px", background: "transparent" }}
      />
    </Stack>
  );
}
