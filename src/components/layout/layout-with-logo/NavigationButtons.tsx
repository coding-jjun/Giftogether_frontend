"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@public/icons/Home.svg";
import PeopleIcon from "@public/icons/People.svg";
import AddIcon from "@public/icons/AddCircle.svg";
import AccountIcon from "@public/icons/Account.svg";
import SettingsIcon from "@public/icons/Settings.svg";
import { activeIcon, icon, iconBtn, navBar } from "./layout.css";

interface NavigationButtonProps {
  href: string;
  SvgIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const NavigationButton = ({ href, SvgIcon }: NavigationButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={iconBtn}>
      <SvgIcon className={`${icon} ${isActive ? activeIcon : ""}`} />
    </Link>
  );
};

interface ClientNavigationBarProps {
  userId: string | undefined;
}

export const NavigationButtons = ({ userId }: ClientNavigationBarProps) => {
  const NAVIGATIONS = [
    {
      href: "/",
      icon: HomeIcon,
    },
    {
      href: "/fundings",
      icon: PeopleIcon,
    },
    {
      href: "/fundings/creation",
      icon: AddIcon,
    },
    {
      href: `/profile/${userId}`,
      icon: AccountIcon,
    },
    {
      href: "/setting",
      icon: SettingsIcon,
    },
  ];

  return (
    <div className={navBar}>
      {NAVIGATIONS.map((nav) => (
        <NavigationButton key={nav.href} href={nav.href} SvgIcon={nav.icon} />
      ))}
    </div>
  );
};
