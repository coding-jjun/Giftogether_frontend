import { useMutation } from "@tanstack/react-query";
import { CommonResponse } from "@/types/CommonResponse";
import { Account, CreateAccountDto } from "@/types/Account";
import axiosInstance from "@/utils/axios";

const addAccount = async (dto: CreateAccountDto): Promise<number> => {
  const { data } = await axiosInstance.post<CommonResponse<Account>>(
    "/api/account",
    dto,
  );
  return data.data.accId;
};

const useAddAccount = () => {
  return useMutation({
    mutationFn: (dto: CreateAccountDto) => addAccount(dto),
  });
};

export default useAddAccount;
