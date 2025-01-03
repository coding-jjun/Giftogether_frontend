import { useMutation } from "@tanstack/react-query";
import { CommonResponse } from "@/types/CommonResponse";
import { CreateUserDto } from "@/types/User";
import axiosInstance from "@/utils/axios";

interface ResponseData {
  message: string;
  data: string;
}

const addUser = async (
  dto: CreateUserDto,
): Promise<CommonResponse<ResponseData>> => {
  const { data } = await axiosInstance.post<CommonResponse<ResponseData>>(
    "/api/auth/signup",
    dto,
  );

  return data;
};

const useAddUser = () => {
  return useMutation({
    mutationFn: (dto: CreateUserDto) => addUser(dto),
  });
};

export default useAddUser;
