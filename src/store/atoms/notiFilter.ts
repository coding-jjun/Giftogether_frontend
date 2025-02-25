import { atom } from "recoil";
import { NotiFilterValue } from "@/types/Notification.enum";

export const notiFilterState = atom<NotiFilterValue>({
  key: "NotiFilterState",
  default: "모두",
});
