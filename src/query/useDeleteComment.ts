import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetCommentDto } from "@/types/Comment";
import { CommonResponse } from "@/types/CommonResponse";
import axiosInstance from "@/utils/axios";

const deleteComment = async (
  comId: number,
  fundUuid: string | undefined,
): Promise<CommonResponse<GetCommentDto>> => {
  if (fundUuid === undefined) {
    throw new Error("fundUuid가 유효하지 않습니다.");
  }

  const { data } = await axiosInstance.delete(
    `/api/comment/${fundUuid}?comId=${comId}`,
  );
  return data;
};

const useDeleteComment = (fundUuid: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comId: number) => deleteComment(comId, fundUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", fundUuid],
      });
    },
  });
};

export default useDeleteComment;
