import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CommonResponse } from "@/types/CommonResponse";
import { FriendQueryDto } from "@/types/Friend";

interface QueryResponse {
  result?: FriendQueryDto[];
  total?: number;
}

const fetchFriends = async (userId: number): Promise<QueryResponse> => {
  const { data } = await axios.get<CommonResponse<QueryResponse>>(
    `/api/friend/${userId}`,
  );
  return data.data;
};

const useFriendsQuery = (userId: number): UseQueryResult<QueryResponse> => {
  return useQuery<QueryResponse>({
    queryKey: ["friends", userId],
    queryFn: () => fetchFriends(userId),
    enabled: userId !== undefined,
  });
};

export default useFriendsQuery;
