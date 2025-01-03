import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommonResponse } from "@/types/CommonResponse";
import axiosInstance from "@/utils/axios";

interface ResponseData {
  message: string;
  data: string;
}

const deleteFriend = async (
  friendId: number,
): Promise<CommonResponse<ResponseData>> => {
  const { data } = await axiosInstance.delete<CommonResponse<ResponseData>>(
    `/api/friend`,
    {
      data: {
        friendId,
      },
    },
  );

  return data;
};

const useDeleteFriend = (frdId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteFriend(frdId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friendStatus", frdId],
      });
      queryClient.invalidateQueries({
        queryKey: ["friends"],
      });
    },
  });
};

export default useDeleteFriend;
