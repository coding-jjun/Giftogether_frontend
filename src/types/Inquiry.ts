export type InquiryType = "payment" | "shipping" | "funding" | "etc";

export interface InquiryRequest {
  type?: InquiryType;
  title: string;
  content: string;
  isPublic: boolean;
  fundUuid?: string | null;
}

export interface InquiryResponse {
  // TODO: 백엔드 API 확정 시 수정 필요
}
