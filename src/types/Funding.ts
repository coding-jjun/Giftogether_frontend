import GiftDto, { ResponseGiftDto } from "@/types/GiftDto";

import {
  FundingPublFilter,
  FundingSort,
  FundingStatus,
  FundTheme,
} from "@/types/Funding.enum";

export interface Funding {
  fundId: number;
  fundUuid: string;
  fundTitle: string;
  fundCont: string;
  fundImg: string;
  fundTheme: FundTheme;
  fundPubl: boolean;
  fundGoal: number;
  fundSum: number;
  endAt: string;
  regAt: string;
  fundUserNick?: string;
}

// 펀딩 상세 불러올 때 사용
export interface FundingDto {
  fundId: number;
  fundUuid: string;
  fundUserId: number;
  fundUserNick: string;
  fundUserImg?: string;
  fundTitle: string;
  fundCont: string;
  fundTheme: FundTheme;
  fundPubl: boolean;
  fundGoal: number;
  fundSum: number;
  fundAddrRoad: string;
  fundAddrDetl: string;
  fundAddrZip: string;
  fundRecvName: string;
  fundRecvPhone: string;
  fundRecvReq?: string;
  regAt: Date;
  endAt: Date;
  gifts: ResponseGiftDto[];
  fundImgUrls: string[];
}

// 펀딩글 등록 시 사용
export interface FundingForm {
  fundId: number;
  fundTitle: string;
  fundCont: string;
  fundTheme: FundTheme;
  fundPubl: boolean;
  fundGoal: string; // "," 표시를 위해 string 타입으로 설정
  endAt: string;
  fundImg?: string;
  gifts: GiftDto[];
  fundRecvName: string;
  fundRecvPhone: string;
  fundRecvReq: string;
  fundAddrZip: string;
  fundAddrRoad: string;
  fundAddrDetl: string;
  fundAddr: string;
}

export interface UpdateFundingDto {
  fundTitle: string;
  fundCont: string;
  fundTheme: FundTheme;
  fundPubl: boolean;
  fundGoal: string; // "," 표시를 위해 string 타입으로 설정
  endAt: string;
  fundImg?: string;
  // gifts: GiftDto[];
  fundRecvName: string;
  fundRecvPhone: string;
  fundRecvReq: string;
  fundAddrZip: string;
  fundAddrRoad: string;
  fundAddrDetl: string;
}

export interface FundingQueryParam {
  fundPublFilter: FundingPublFilter;
  fundThemes: FundTheme[];
  status: FundingStatus;
  sort: FundingSort;
  limit: number;
  lastFundUuid?: string;
  lastEndAt: string;
}

export interface FundingQueryResponse {
  fundings: Funding[];
  count: number;
  lastFundUuid?: string;
  lastEndAt?: string;
}
