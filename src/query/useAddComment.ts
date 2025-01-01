import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCommentDto, GetCommentDto } from "@/types/Comment";
import { CommonResponse } from "@/types/CommonResponse";
import axiosInstance from "@/utils/axios";

const addComment = async (
  fundUuid: string,
  dto: CreateCommentDto,
): Promise<CommonResponse<GetCommentDto>> => {
  const { data } = await axiosInstance.post(`/api/comment/${fundUuid}`, dto);
  return data;
};

const useAddComment = (fundUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCommentDto) => addComment(fundUuid, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", fundUuid],
      });
    },
  });
};

export default useAddComment;
