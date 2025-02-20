"use client";
import dayjs from "dayjs";
import { useFundingDonationsQuery } from "@/query/useFundingDonationsQuery";
import addComma from "@/utils/addComma";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import {
  amountText,
  container,
  dateText,
  detailsSection,
  donationItem,
  emptyMessage,
  observer,
  userImage,
  userName,
} from "./page.css";

interface Props {
  fundUuid: string;
}

export const DonationList = ({ fundUuid }: Props) => {
  const { data, fetchNextPage, hasNextPage } =
    useFundingDonationsQuery(fundUuid);

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

  if (data?.pages[0]?.donations?.length === 0) {
    return <div className={emptyMessage}>후원 내역이 없습니다</div>;
  }

  return (
    <div className={container}>
      {data?.pages
        .flatMap((page) => page.donations)
        .map((donation) => (
          <div key={donation.donId} className={donationItem}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src={donation.donUserImg}
                alt={donation.donUserNick}
                className={userImage}
              />
              <p className={userName}>{donation.donUserNick}</p>
            </div>
            <div className={detailsSection}>
              <p className={dateText}>
                {dayjs(donation.regAt).format("YYYY.MM.DD")}
              </p>
              <p className={amountText}>{addComma(donation.donAmnt)}원</p>
            </div>
          </div>
        ))}
      <div ref={observerRef} className={observer} />
    </div>
  );
};
