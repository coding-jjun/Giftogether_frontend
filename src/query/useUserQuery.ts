import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CommonResponse } from "@/types/CommonResponse";
import { User } from "@/types/User";
import axiosInstance from "@/utils/axios";

const fetchUser = async (userId: number): Promise<User> => {
  const response = await axiosInstance.get<CommonResponse<User>>(
    `/api/user/${userId}`,
  );
  return response.data.data;
};

const useUserQuery = (userId?: number): UseQueryResult<User> => {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId as number),
    enabled: userId !== undefined,
  });
};

export default useUserQuery;
