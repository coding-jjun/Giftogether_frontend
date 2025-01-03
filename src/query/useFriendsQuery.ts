import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CommonResponse } from "@/types/CommonResponse";
import { FriendQueryDto } from "@/types/Friend";

interface QueryResponse {
  result?: FriendQueryDto[];
  total?: number;
}

const fetchFriends = async (): Promise<QueryResponse> => {
  const { data } =
    await axios.get<CommonResponse<QueryResponse>>(`/api/friend`);
  return data.data;
};

const useFriendsQuery = (): UseQueryResult<QueryResponse> => {
  return useQuery<QueryResponse>({
    queryKey: ["friends"],
    queryFn: () => fetchFriends(),
  });
};

export default useFriendsQuery;
