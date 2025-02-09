import {
  DefaultError,
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { DonationListDto } from "@/types/Donation";

interface FundingDonationsResponse {
  donations: DonationListDto[];
  lastId: number;
}

interface PageParam {
  lastId: number | undefined;
}

export const fetchDonations = async (
  fundUuid: string,
  lastId?: number,
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
    queryFn: ({ pageParam = { lastId: undefined } }) =>
      fetchDonations(fundUuid, pageParam.lastId),
    getNextPageParam: (lastPage) => {
      return { lastId: lastPage.lastId };
    },
    initialPageParam: { lastId: undefined },
  });
};
