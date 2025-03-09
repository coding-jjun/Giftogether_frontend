import { useMemo } from "react";
import useFundingsQuery from "@/query/useFundingsQuery";
import useMyDonationsQuery, {
  MyDonationsQueryResponse,
} from "@/query/useMyDonationsQuery";
import { FundingQueryResponse } from "@/types/Funding";

export default function useRelatedFundingQuery(queryType: string | null) {
  const isFunding = queryType === "funding";
  const isPayment = queryType === "payment";
  const isShipping = queryType === "shipping";

  const fundingQuery = useFundingsQuery(
    { fundPublFilter: "mine", status: "ongoing" },
    undefined,
    {
      enabled: Boolean(queryType) && isFunding,
    },
  );

  const shippingQuery = useFundingsQuery(
    { fundPublFilter: "mine", status: "ended" },
    undefined,
    {
      enabled: Boolean(queryType) && isShipping,
    },
  );

  const donationQuery = useMyDonationsQuery("ongoing", {
    enabled: Boolean(queryType) && isPayment,
  });

  const query = useMemo(() => {
    if (!queryType) return null;
    return isFunding
      ? fundingQuery
      : isShipping
        ? shippingQuery
        : donationQuery;
  }, [
    queryType,
    isFunding,
    isShipping,
    isPayment,
    fundingQuery,
    shippingQuery,
    donationQuery,
  ]);

  const fundings = useMemo(() => {
    if (!query || !query.data) return [];

    if (isFunding || isShipping) {
      return (
        query.data.pages
          ?.flatMap((page) => (page as FundingQueryResponse).fundings)
          .map((funding) => ({
            id: funding.fundUuid,
            thumbnail: "/dummy/fallback.webp",
            nickname: funding.fundUserNick,
            title: funding.fundTitle,
          })) ?? []
      );
    }

    if (isPayment) {
      return (
        query.data.pages
          ?.flatMap((page) => (page as MyDonationsQueryResponse).donations)
          .map((donation) => ({
            id: donation.fundUuid,
            thumbnail: donation.fundUserImg,
            nickname: donation.fundUserNick,
            title: donation.fundTitle,
          })) ?? []
      );
    }

    return [];
  }, [query, isFunding, isShipping, isPayment]);

  return { fundings };
}
