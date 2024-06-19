import GiftDto from "@/types/GiftDto";

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
}

export interface FundingForm {
  fundId: number;
  fundTitle: string;
  fundCont: string;
  fundImg: string;
  fundTheme: string;
  fundPubl: boolean;
  fundGoal: string;
  endAt: string;
  gifts: GiftDto[];
  fundRecvName: string;
  fundRecvPhone: string;
  fundRecvReq: string;
  fundAddrZip: string;
  fundAddrRoad: string;
  fundAddrDetl: string;
  fundAddr: string;
}

export interface FundingQueryParam {
  fundPublFilter: FundingPublFilter;
  fundThemes: FundTheme[];
  status: FundingStatus;
  sort: FundingSort;
  limit: number;
  lastFundId: number;
  lastEndAt: string;
}

export interface FundingQueryResponse {
  fundings: Funding[];
  count: number;
  lastFundId: number;
  lastEndAt?: string;
}
