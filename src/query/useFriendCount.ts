import axios from "axios";
import { CommonResponse } from "@/types/CommonResponse";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface QueryResponse {
  count: number;
}

const fetchFriendCount = async (
  userId: number,
): Promise<CommonResponse<QueryResponse>> => {
  const { data } = await axios.get(`/api/friend/${userId}`);
  return data;
};

const useFriendCount = (
  userId: number,
): UseQueryResult<CommonResponse<QueryResponse>> => {
  return useQuery<CommonResponse<QueryResponse>>({
    queryKey: ["friends", userId],
    queryFn: () => fetchFriendCount(userId),
  });
};

export default useFriendCount;
