import { AddressDto, UpdateAddressDto } from "@/types/Address";
import { CommonResponse } from "@/types/CommonResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

const updateAddress = async (
  addrId: number,
  dto: UpdateAddressDto,
): Promise<CommonResponse<AddressDto>> => {
  const { data } = await axiosInstance.put(`/api/address/${addrId}`, dto);
  return data;
};

const useUpdateAddress = (addrId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateAddressDto) => updateAddress(addrId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });
};

export default useUpdateAddress;
