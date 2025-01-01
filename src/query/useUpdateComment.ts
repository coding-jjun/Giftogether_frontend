import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetCommentDto } from "@/types/Comment";
import { CommonResponse } from "@/types/CommonResponse";
import axiosInstance from "@/utils/axios";

const updateComment = async (
  fundUuid: string | undefined,
  comId: number,
  content: string,
): Promise<CommonResponse<GetCommentDto>> => {
  if (fundUuid === undefined) {
    throw new Error("fundUuid가 유효하지 않습니다.");
  }

  const { data } = await axiosInstance.put(
    `/api/comment/${fundUuid}?comId=${comId}`,
    {
      content,
    },
  );

  return data;
};

const useUpdateComment = (fundUuid: string | undefined, comId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => updateComment(fundUuid, comId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", fundUuid],
      });
    },
  });
};

export default useUpdateComment;
