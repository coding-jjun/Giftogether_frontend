import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { InquiryRequest, InquiryResponse } from "@/types/Inquiry";
import { CommonResponse } from "@/types/CommonResponse";

const addInquiry = async (
  inquiry: InquiryRequest,
): Promise<InquiryResponse> => {
  const { data } = await axiosInstance.post<CommonResponse<InquiryResponse>>(
    "/api/inquiries",
    inquiry,
  );
  return data.data;
};

const useAddInquiry = () => {
  return useMutation({
    mutationFn: (inquiry: InquiryRequest) => addInquiry(inquiry),
  });
};

export default useAddInquiry;
