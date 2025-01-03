import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Funding, FundingForm } from "@/types/Funding";
import { CommonResponse } from "@/types/CommonResponse";
import axiosInstance from "@/utils/axios";

const fetchFundingCreate = async (
  body: FundingForm,
): Promise<CommonResponse<Funding>> => {
  const { data } = await axiosInstance.post<CommonResponse<Funding>>(
    `/api/funding`,
    body,
  );
  return data;
};

const useFundingCreateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: FundingForm) => fetchFundingCreate(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fundings"],
      });
    },
  });
};

export default useFundingCreateQuery;
