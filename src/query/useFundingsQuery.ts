import axios from "axios";
import {
  DefaultError,
  InfiniteData,
  QueryKey,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
} from "@tanstack/react-query";
import { FundingQueryParam, FundingQueryResponse } from "@/types/Funding";
import { CommonResponse } from "@/types/CommonResponse";
import Cookies from "js-cookie";

const buildURL = (
  userId: number,
  params: Partial<FundingQueryParam>,
  isFallback: boolean = false,
): string => {
  const isLoggedIn = Cookies.get("isLoggedIn");

  let baseUrl;

  if (isFallback || isLoggedIn !== "true" || userId === undefined) {
    baseUrl = `/api/funding`;
  } else {
    baseUrl = `/api/user/${userId}/funding`;
  }

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item: string) => queryParams.append(key, item));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });

  return queryParams.toString() === ""
    ? baseUrl
    : `${baseUrl}?${queryParams.toString()}`;
};

const fetchFundings = async (
  userId: number,
  queryParams: Partial<FundingQueryParam>,
): Promise<FundingQueryResponse> => {
  try {
    const url = buildURL(userId, queryParams);
    const response = await axios.get<CommonResponse<FundingQueryResponse>>(url);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const fallbackUrl = buildURL(userId, queryParams, true);
      const fallbackResponse =
        await axios.get<CommonResponse<FundingQueryResponse>>(fallbackUrl);
      return fallbackResponse.data.data;
    }
    throw error;
  }
};

interface PageParam {
  lastFundUuid: number | undefined;
  lastEndAt: string | undefined;
}

const useFundingsQuery = (
  queryParams: Partial<FundingQueryParam>,
  userId?: number,
): UseSuspenseInfiniteQueryResult<InfiniteData<FundingQueryResponse>> => {
  return useSuspenseInfiniteQuery<
    FundingQueryResponse,
    DefaultError,
    InfiniteData<FundingQueryResponse>,
    QueryKey,
    PageParam
  >({
    queryKey: ["fundings", userId, queryParams],
    queryFn: ({
      pageParam = { lastFundUuid: undefined, lastEndAt: undefined },
    }) =>
      fetchFundings(userId ?? Number(Cookies.get("userId")), {
        ...queryParams,
        lastFundUuid: pageParam.lastFundUuid,
        lastEndAt: pageParam.lastEndAt,
      }),
    initialPageParam: { lastFundUuid: undefined, lastEndAt: undefined },
    getNextPageParam: (lastPage) => {
      console.log("lastPage Count: ", lastPage, "limit: ", queryParams?.limit);

      if (lastPage.count < (queryParams?.limit ?? 1)) {
        return undefined;
      }

      return {
        lastFundUuid: lastPage.lastFundUuid,
        lastEndAt: lastPage.lastEndAt,
      };
    },
  });
};

export default useFundingsQuery;
