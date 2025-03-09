import { useRecoilState } from "recoil";
import { inquiryState } from "@/store/atoms/inquiry";

export default function useInquiryForm() {
  const [inquiryForm, setInquiryForm] = useRecoilState(inquiryState);

  const updateInquiryForm = (field: keyof typeof inquiryForm, value: any) => {
    setInquiryForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateFunding = (fundUuid: string, fundTitle: string) => {
    setInquiryForm((prev) => ({ ...prev, fundUuid, fundTitle }));
  };

  const clearFunding = () => {
    setInquiryForm((prev) => ({
      ...prev,
      fundUuid: undefined,
      fundTitle: undefined,
    }));
  };

  return {
    inquiryForm,
    updateInquiryForm,
    updateFunding,
    clearFunding,
  };
}
