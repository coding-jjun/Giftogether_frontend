"use client";
import "swiper/css";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";
import useFundingsQuery from "@/query/useFundingsQuery";
import { IconButton, Stack, Typography } from "@mui/material";
import { SectionHeader } from "@/components/layout/header";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { grey } from "@mui/material/colors";
import { BoxButton } from "@/components/button";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { HorizontalImgCard, VerticalImgCard } from "@/components/card";
import calculatePercent from "@/utils/calculatePercent";
import styled from "@emotion/styled";
import PullToRefresh from "@/components/refresh/PullToRefresh";
import Cookies from "js-cookie";

export default function MainPageContent() {
  const router = useRouter();

  const session = Cookies.get("session");

  // 나의 펀딩
  const { data: myFundingQueryResponse, refetch: refetchMyFundings } =
    useFundingsQuery({
      fundPublFilter: "mine",
    });

  // 다른 사람들의 펀딩
  const { data: othersFundingQueryResponse, refetch: refetchOthersFundings } =
    useFundingsQuery({
      fundPublFilter: "both",
      limit: 5,
    });

  const refetch = async () => {
    await Promise.all([refetchMyFundings(), refetchOthersFundings()]);
  };

  return (
    <>
      <PullToRefresh refreshData={refetch} />
      <Stack direction="column" spacing={1}>
        <SectionHeader
          title="나의 펀딩"
          rightSlot={
            <IconButton sx={{ margin: 0, padding: 0 }}>
              <NavigateNextIcon sx={{ fontSize: 28, color: grey[800] }} />
            </IconButton>
          }
          barSx={{ paddingBottom: "5px" }}
        />
        {!session || !myFundingQueryResponse.pages.at(0)?.fundings?.length ? (
          <BoxButton
            handleClick={() => router.push("/fundings/creation")}
            content={
              <Typography variant="body1" display="block" fontWeight={700}>
                펀딩 개설하러 가기
              </Typography>
            }
          />
        ) : (
          <MyFundingSwiper
            pagination={true}
            modules={[Pagination]}
            style={{ width: "100%", height: "100%" }}
          >
            {myFundingQueryResponse?.pages
              ?.flatMap((page) => page.fundings)
              .map((funding) => (
                <SwiperSlide key={`slide-${funding.fundUuid}`}>
                  <HorizontalImgCard
                    key={funding.fundUuid}
                    image={funding.fundImg ?? "/dummy/present.webp"}
                    userId={funding.fundUserNick || "익명"}
                    title={funding.fundTitle}
                    theme={funding.fundTheme}
                    endDate={funding.endAt.toString()}
                    fundSum={funding.fundSum}
                    fundGoal={funding.fundGoal}
                    progress={calculatePercent(
                      funding.fundSum,
                      funding.fundGoal,
                    )}
                    handleClick={() =>
                      router.push(`/fundings/${funding.fundUuid}`)
                    }
                  />
                </SwiperSlide>
              ))}
          </MyFundingSwiper>
        )}
        <SectionHeader
          title="다른 사람들의 펀딩"
          rightSlot={
            <IconButton
              sx={{ margin: 0, padding: 0 }}
              onClick={() => router.push("/fundings")}
            >
              <NavigateNextIcon sx={{ fontSize: 28, color: grey[800] }} />
            </IconButton>
          }
          barSx={{ paddingBottom: "5px" }}
        />
        {othersFundingQueryResponse?.pages
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
      </Stack>
    </>
  );
}

const MyFundingSwiper = styled(Swiper)`
  .swiper-pagination {
    position: relative;
    margin-top: 10px;
  }
  .swiper-pagination-bullet-active {
    background-color: #424242;
  }
`;
