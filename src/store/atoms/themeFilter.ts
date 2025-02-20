import { atom } from "recoil";
import {
  FundingPublFilterValue,
  FundingSortValue,
  FundingStatusValue,
  FundThemeValue,
} from "@/types/Funding.enum";

export const selectedThemesState = atom<FundThemeValue[]>({
  key: "selectedThemesState",
  default: ["생일", "기념일", "기부"],
});

export const selectedVisibilityState = atom<FundingPublFilterValue>({
  key: "selectedVisibilityState",
  default: "전체",
});

export const selectedStatusState = atom<FundingStatusValue>({
  key: "selectedStatusState",
  default: "진행 중",
});

export const selectedSortState = atom<FundingSortValue>({
  key: "selectedSortState",
  default: "마감일순",
});
