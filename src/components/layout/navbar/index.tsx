"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNavigationAction } from "@mui/material";
import { useMediaQuery } from "@mui/system";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { StyledNavigationPaper } from "@/components/layout/navbar/navigation-paper";
import { StyledBottomNavigation } from "@/components/layout/navbar/bottom-navigation";
import { useCookie } from "@/hook/useCookie";

export default function NavigationBar() {
  const router = useRouter();
  const [tab, setTab] = useState("home");
  const loginUserId = useCookie<string>("userId");

  // 모바일 사이트에서 접속했는지 / 앱에서 접속했는지 여부
  const isStandalone = useMediaQuery("(display-mode:standalone)");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <StyledNavigationPaper sx={{ pb: isStandalone ? 3 : 0 }}>
      <StyledBottomNavigation
        value={tab}
        onChange={handleChange}
        showLabels={false}
      >
        <BottomNavigationAction
          value="home"
          icon={<HomeOutlinedIcon />}
          onClick={() => router.push("/")}
        />
        <BottomNavigationAction
          value="feeds"
          icon={<PeopleAltOutlinedIcon />}
          onClick={() => router.push("/fundings")}
        />
        <BottomNavigationAction
          value="new"
          icon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => router.push("/fundings/creation")}
        />
        <BottomNavigationAction
          value="profile"
          icon={<AccountCircleOutlinedIcon />}
          onClick={() => router.push(`/profile/${loginUserId}`)}
        />
        <BottomNavigationAction
          value="setting"
          icon={<SettingsOutlinedIcon />}
          onClick={() => router.push("/setting")}
        />
      </StyledBottomNavigation>
    </StyledNavigationPaper>
  );
}
