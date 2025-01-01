import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommonResponse } from "@/types/CommonResponse";
import { GratitudeDto } from "@/types/Gratitude";
import axiosInstance from "@/utils/axios";

const addGratitude = async (
  dto: GratitudeDto,
  fundUuid: string,
): Promise<CommonResponse<any>> => {
  const { data } = await axiosInstance.post(`/api/gratitude/${fundUuid}`, dto);
  return data;
};

const useAddGratitude = (fundUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: GratitudeDto) => addGratitude(dto, fundUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["gratitude", fundUuid],
      });
    },
  });
};

export default useAddGratitude;
