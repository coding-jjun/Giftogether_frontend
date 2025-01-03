import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommonResponse } from "@/types/CommonResponse";
import { UpdateUserDto, UserDto } from "@/types/User";
import axiosInstance from "@/utils/axios";

const updateUser = async (
  dto: UpdateUserDto,
): Promise<CommonResponse<UserDto> | null> => {
  const { data } = await axiosInstance.put(`/api/user`, dto);
  return data;
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateUserDto) => updateUser(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
  });
};

export default useUpdateUser;
