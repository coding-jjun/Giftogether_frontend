import { atom } from "recoil";
import { BoardFilterValue } from "@/types/Board.enum";

export const boardFilterState = atom<BoardFilterValue>({
  key: "boardFilterState",
  default: "전체",
});
