import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CommonResponse } from "@/types/CommonResponse";
import { RollingPaperDto } from "@/types/RollingPaper";
import axiosInstance from "@/utils/axios";

const fetchRollingPapers = async (
  fundUuid: string,
): Promise<RollingPaperDto[]> => {
  const response = await axiosInstance.get<CommonResponse<RollingPaperDto[]>>(
    `/api/rollingpaper/${fundUuid}`,
  );

  return response.data.data;
};

const useRollingPapersQuery = (
  fundUuid: string,
): UseQueryResult<RollingPaperDto[]> => {
  return useQuery<RollingPaperDto[]>({
    queryKey: ["rollingPapers", fundUuid],
    queryFn: () => fetchRollingPapers(fundUuid),
  });
};

export default useRollingPapersQuery;
