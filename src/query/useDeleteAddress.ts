import { CommonResponse } from "@/types/CommonResponse";
import { AddressDto } from "@/types/Address";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteAddress = async (
  addrId: number,
): Promise<CommonResponse<AddressDto>> => {
  const { data } = await axios.delete(`/api/address/${addrId}`, {
    withCredentials: true, // 요청에 쿠키 포함
  });

  return data;
};

const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addrId: number) => deleteAddress(addrId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });
};

export default useDeleteAddress;
