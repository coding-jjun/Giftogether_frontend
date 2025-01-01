import {
  DefaultError,
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { CommonResponse } from "@/types/CommonResponse";
import {
  NotificationQueryParam,
  NotificationResponse,
} from "@/types/Notification";
import axiosInstance from "@/utils/axios";

// 쿼리 스트링
const buildURL = (params: Partial<NotificationQueryParam>): string => {
  const baseUrl = `/api/notification`;
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

  return `${baseUrl}?${queryParams.toString()}`;
};

const fetchNotifications = async (
  queryParams: Partial<NotificationQueryParam>,
): Promise<NotificationResponse> => {
  const url = buildURL(queryParams);
  const response =
    await axiosInstance.get<CommonResponse<NotificationResponse>>(url);
  return response.data.data;
};

interface PageParam {
  lastId: number | undefined;
}

const useNotificationsQuery = (
  queryParams: Partial<NotificationQueryParam>,
): UseInfiniteQueryResult<InfiniteData<NotificationResponse>> => {
  return useInfiniteQuery<
    NotificationResponse,
    DefaultError,
    InfiniteData<NotificationResponse>,
    QueryKey,
    PageParam
  >({
    queryKey: ["notifications", queryParams],
    queryFn: ({ pageParam = { lastId: undefined } }) =>
      fetchNotifications({
        ...queryParams,
        lastId: pageParam.lastId,
      }),
    initialPageParam: { lastId: undefined },
    getNextPageParam: (lastPage) => {
      if (lastPage.count < (queryParams?.lastId ?? 1)) {
        return undefined;
      }

      return { lastId: lastPage.lastId };
    },
  });
};

export default useNotificationsQuery;
