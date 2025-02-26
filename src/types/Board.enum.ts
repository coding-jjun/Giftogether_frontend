export type BoardFilter = "all" | "payment" | "shipping" | "notice";
export type BoardFilterValue = "전체" | "결제" | "배송" | "공지";

export const BoardFilterMap: Record<BoardFilter, BoardFilterValue> = {
  all: "전체",
  payment: "결제",
  shipping: "배송",
  notice: "공지",
};

export const getBoardFilterValue = (key: BoardFilter): BoardFilterValue => {
  return BoardFilterMap[key];
};
