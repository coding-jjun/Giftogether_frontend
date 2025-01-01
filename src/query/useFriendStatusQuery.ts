import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CommonResponse } from "@/types/CommonResponse";
import { FriendStatus } from "@/types/Friend";
import axiosInstance from "@/utils/axios";

interface QueryResponse {
  message: FriendStatus;
}

const fetchFriendStatus = async (friendId: number): Promise<FriendStatus> => {
  const { data } = await axiosInstance.get<CommonResponse<QueryResponse>>(
    `/api/friend/${friendId}`,
  );
  return data.data.message;
};

const useFriendStatusQuery = (
  friendId: number,
): UseQueryResult<FriendStatus> => {
  return useQuery<FriendStatus>({
    queryKey: ["friendStatus", friendId],
    queryFn: () => fetchFriendStatus(friendId),
  });
};

export default useFriendStatusQuery;
