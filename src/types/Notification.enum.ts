import { getKeyByValue } from "@/utils/map";

export enum NotiType {
  IncomingFollow = "IncomingFollow", // 들어온 친구 요청
  AcceptFollow = "AcceptFollow", // 내 요청에 대한 친구의 수락
  FundClose = "FundClose", // 내 펀딩 마감
  FundAchieve = "FundAchieve", // 내 펀딩 달성
  NewDonate = "NewDonate", // 내 펀딩에 들어온 새로운 후원
  WriteGratitude = "WriteGratitude", // 감사인사 작성 권유
  NewComment = "NewComment", // 댓글 알림
  DonatedFundClose = "DonatedFundClose", // 후원한 펀딩 마감
  CheckGratitude = "CheckGratitude", // 내가 후원한 펀딩 감사인사 확인
  NewFriend = "NewFriend", // 친구 수락
  DeleteFriend = "DeleteFriend", // 친구 삭제
}

export const NotificationMessages: Record<NotiType, string> = {
  [NotiType.IncomingFollow]: "님이 친구를 신청했어요 👋🏻",
  [NotiType.AcceptFollow]: "님이 친구요청을 수락했어요.",
  [NotiType.FundClose]: "내가 후원한 펀딩이 마감되었어요.",
  [NotiType.FundAchieve]: "내가 올린 펀딩이 목표 금액을 달성했어요 🎉",
  [NotiType.NewDonate]: "님이 참여했어요.",
  [NotiType.WriteGratitude]: "에 참여한 분들에게 감사인사를 작성해보세요 ✍🏻",
  [NotiType.NewComment]: "님이 댓글을 남겼어요 🏷",
  [NotiType.DonatedFundClose]: "님의 펀딩이 마감되었어요.",
  [NotiType.CheckGratitude]: "님이 감사인사를 작성했어요.",
  [NotiType.NewFriend]: "님과 친구가 되었어요 👫🏻",
  [NotiType.DeleteFriend]: "",
};
/**
 * 필터링
 */
export type NotiFilter = "all" | "funding" | "comment" | "friend";
export type NotiFilterValue = "모두" | "펀딩" | "댓글" | "친구";

export const NotiFilterMap: Record<NotiFilter, NotiFilterValue> = {
  all: "모두",
  funding: "펀딩",
  comment: "댓글",
  friend: "친구",
};

export const getNotiFilterValue = (key: NotiFilter): NotiFilterValue => {
  return NotiFilterMap[key];
};

export const getNotiFilterKey = (value: NotiFilterValue): NotiFilter => {
  return getKeyByValue(NotiFilterMap, value);
};
