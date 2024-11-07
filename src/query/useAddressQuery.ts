import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AddressDto } from "@/types/Address";
import { CommonResponse } from "@/types/CommonResponse";

const fetchAddress = async (addrId: number): Promise<AddressDto> => {
  const response = await axios.get<CommonResponse<AddressDto>>(
    `/api/address/${addrId}`,
  );

  return response.data.data;
};

const useAddressQuery = (addrId: number): UseQueryResult<AddressDto> => {
  return useQuery<AddressDto>({
    queryKey: ["address", addrId],
    queryFn: () => fetchAddress(addrId),
  });
};

export default useAddressQuery;
