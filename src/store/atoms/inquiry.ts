import { atom } from "recoil";
import { InquiryType } from "@/types/Inquiry";

interface InquiryFormState {
  inquiryType?: InquiryType;
  title: string;
  content: string;
  isPublic: boolean;
  fundUuid?: string;
  fundTitle?: string;
}

export const inquiryState = atom<InquiryFormState>({
  key: "inquiryState",
  default: {
    inquiryType: undefined,
    title: "",
    content: "",
    isPublic: true,
    fundUuid: undefined,
    fundTitle: undefined,
  },
});
