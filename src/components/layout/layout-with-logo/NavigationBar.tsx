"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@public/icons/Home.svg";
import PeopleIcon from "@public/icons/People.svg";
import AddIcon from "@public/icons/AddCircle.svg";
import AccountIcon from "@public/icons/Account.svg";
import SettingsIcon from "@public/icons/Settings.svg";
import { activeIcon, icon, iconBtn, navBar } from "./layout.css";

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
    href: "/profile",
    icon: AccountIcon,
  },
  {
    href: "/setting",
    icon: SettingsIcon,
  },
];

interface Props {
  href: string;
  SvgIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const NavigationButton = ({ href, SvgIcon }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={iconBtn}>
      <SvgIcon className={`${icon} ${isActive ? activeIcon : ""}`} />
    </Link>
  );
};

export const NavigationBar = () => {
  return (
    <div className={navBar}>
      {NAVIGATIONS.map((nav) => (
        <NavigationButton key={nav.href} href={nav.href} SvgIcon={nav.icon} />
      ))}
    </div>
  );
};
