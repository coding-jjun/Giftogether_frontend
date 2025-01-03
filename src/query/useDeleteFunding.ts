import axios from "axios";
import { CommonResponse } from "@/types/CommonResponse";
import { FundingDto } from "@/types/Funding";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

const deleteFunding = async (
  fundUuid: string | undefined,
): Promise<CommonResponse<FundingDto>> => {
  if (fundUuid === undefined) {
    throw new Error("유효하지 않은 fundUuid 입니다.");
  }

  const { data } = await axiosInstance.delete(`/api/funding/${fundUuid}`);
  return data;
};

const useDeleteFunding = (fundUuid: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fundUuid: string | undefined) => deleteFunding(fundUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["funding", fundUuid],
      });
      queryClient.invalidateQueries({
        queryKey: ["fundings"],
      });
    },
  });
};

export default useDeleteFunding;
