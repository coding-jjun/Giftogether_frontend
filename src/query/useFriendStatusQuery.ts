import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CommonResponse } from "@/types/CommonResponse";
import { FriendStatus } from "@/types/Friend";

interface QueryResponse {
  message: FriendStatus;
}

const fetchFriendStatus = async (
  userId: number,
  friendId: number,
): Promise<FriendStatus> => {
  const { data } = await axios.get<CommonResponse<QueryResponse>>(
    `/api/friend/${userId}/${friendId}`,
  );
  return data.data.message;
};

const useFriendStatusQuery = (
  userId: number,
  friendId: number,
): UseQueryResult<FriendStatus> => {
  return useQuery<FriendStatus>({
    queryKey: ["friendStatus", friendId],
    queryFn: () => fetchFriendStatus(userId, friendId),
  });
};

export default useFriendStatusQuery;
