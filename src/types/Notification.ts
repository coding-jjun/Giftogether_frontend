import { NotiFilter, NotiType } from "@/types/Notification.enum";

export interface Notification {
  notiId: number;
  recvId: number;
  sendId: number;
  sendNick: string;
  sendImg: string;
  notiType: NotiType;
  subId?: string;
  notiTime: Date;
  fundTitle?: string;
  isRead: boolean;
}

export interface NotificationQueryParam {
  lastId: number;
  notiFilter: NotiFilter;
}

export interface NotificationResponse {
  noti: Notification[];
  count: number;
  lastId: number; // 무한 스크롤 용 마지막 알림의 notiId
}
