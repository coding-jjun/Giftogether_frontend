import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CommonResponse } from "@/types/CommonResponse";
import { GetGratitudeDto } from "@/types/Gratitude";
import axiosInstance from "@/utils/axios";

const fetchGratitude = async (fundUuid: string): Promise<GetGratitudeDto> => {
  const response = await axiosInstance.get<CommonResponse<GetGratitudeDto>>(
    `/api/gratitude/${fundUuid}`,
  );

  return response.data.data;
};

const useGratitudeQuery = (
  fundUuid: string,
): UseQueryResult<GetGratitudeDto> => {
  return useQuery<GetGratitudeDto>({
    queryKey: ["gratitude", fundUuid],
    queryFn: () => fetchGratitude(fundUuid),
  });
};

export default useGratitudeQuery;
