import Link from "next/link";
import NotificationIcon from "@public/icons/Notification.svg";
import { header, iconBtn, logo, notiIcon } from "./layout.css";

export const Header = () => {
  return (
    <div className={header}>
      <button className={logo}>기프투게더</button>
      <Link href="/notification" className={iconBtn}>
        <NotificationIcon className={`${notiIcon}`} />
      </Link>
    </div>
  );
};
