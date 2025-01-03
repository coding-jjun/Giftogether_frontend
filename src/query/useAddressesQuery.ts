import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AddressDto } from "@/types/Address";
import { CommonResponse } from "@/types/CommonResponse";
import axiosInstance from "@/utils/axios";

const fetchAddresses = async (): Promise<AddressDto[]> => {
  const response =
    await axiosInstance.get<CommonResponse<AddressDto[]>>(`/api/user/address`);

  return response.data.data;
};

const useAddressesQuery = (): UseQueryResult<AddressDto[]> => {
  return useQuery<AddressDto[]>({
    queryKey: ["addresses"],
    queryFn: fetchAddresses,
  });
};

export default useAddressesQuery;
