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
import { getUserId } from "@/utils/auth/session";
import Cookies from "js-cookie";
import axiosInstance from "@/utils/axios";

const buildURL = (
  params: Partial<FundingQueryParam>,
  userId?: number,
  isFallback: boolean = false,
): string => {
  const isLoggedIn = Cookies.get("session");

  let baseUrl;

  if (isFallback || !isLoggedIn || userId === undefined) {
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
  queryParams: Partial<FundingQueryParam>,
  userId?: number,
): Promise<FundingQueryResponse> => {
  if (!userId) {
    userId = (await getUserId()) || undefined;
  }

  try {
    const url = buildURL(queryParams, userId);
    const response =
      await axiosInstance.get<CommonResponse<FundingQueryResponse>>(url);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const fallbackUrl = buildURL(queryParams, userId, true);
      const fallbackResponse =
        await axiosInstance.get<CommonResponse<FundingQueryResponse>>(
          fallbackUrl,
        );
      return fallbackResponse.data.data;
    }
    throw error;
  }
};

interface PageParam {
  lastFundUuid: string | undefined;
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
      fetchFundings(
        {
          ...queryParams,
          lastFundUuid: pageParam.lastFundUuid,
          lastEndAt: pageParam.lastEndAt,
        },
        userId,
      ),
    initialPageParam: { lastFundUuid: undefined, lastEndAt: undefined },
    getNextPageParam: (lastPage) => {
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
