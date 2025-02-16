import {
  DefaultError,
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { DonationListDto } from "@/types/Donation";
import axiosInstance from "@/utils/axios";

interface FundingDonationsResponse {
  donations: DonationListDto[];
  lastId?: number | null;
}

type PageParam = number | undefined | null;

export const fetchDonations = async (
  fundUuid: string,
  lastId?: number | null,
): Promise<FundingDonationsResponse> => {
  const { data } = await axiosInstance.get(
    `/api/funding/${fundUuid}/donation`,
    {
      params: { lastId },
    },
  );

  return data.data;
};

export const useFundingDonationsQuery = (fundUuid: string) => {
  return useInfiniteQuery<
    FundingDonationsResponse,
    DefaultError,
    InfiniteData<FundingDonationsResponse>,
    QueryKey,
    PageParam
  >({
    queryKey: ["donations", fundUuid],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) => fetchDonations(fundUuid, pageParam),
    getNextPageParam: (lastPage) => lastPage.lastId,
  });
};
