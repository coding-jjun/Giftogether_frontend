import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommonResponse } from "@/types/CommonResponse";
import { NotificationResponse } from "@/types/Notification";
import axiosInstance from "@/utils/axios";

const readNotification = async (
  lastTime: Date | undefined,
): Promise<NotificationResponse> => {
  const response = await axiosInstance.patch<
    CommonResponse<NotificationResponse>
  >("/api/notification/read", { lastTime: lastTime?.toISOString() });
  return response.data.data;
};

const useReadNotification = (lastTime: Date | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => readNotification(lastTime),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};

export default useReadNotification;
