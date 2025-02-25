"use client";
import { grey } from "@mui/material/colors";
import { Avatar, Link, Stack, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import useCurrentUserQuery from "@/query/useCurrentUserQuery";
import { logout } from "@/app/(with-navbar)/setting/action";

export default function SettingPage() {
  // TODO: 현재 로그인된 유저 조회 실패 시 로직 처리 필요
  const { data: user } = useCurrentUserQuery();

  return (
    <Stack direction="column" sx={{ marginTop: "20px" }}>
      <Link href="/setting/myinfo">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: "20px", py: "30px", borderBottom: "1px solid #e2e2e2" }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{ width: "70px", height: "70px" }}
              src={user?.userImg}
            />
            <div>
              <Typography fontSize="22px" fontWeight={700}>
                {user?.userName}
              </Typography>
              <Typography sx={{ fontSize: "16px" }}>
                내 정보 수정하기
              </Typography>
            </div>
          </Stack>
          <KeyboardArrowRightIcon sx={{ color: grey[800], fontSize: "30px" }} />
        </Stack>
      </Link>
      <Link href="/setting/address">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: "20px", borderBottom: "1px solid #e2e2e2" }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <LocationOnIcon sx={{ color: grey[500], fontSize: "26px" }} />
            <Typography sx={{ fontSize: "16px" }}>배송지 관리</Typography>
          </Stack>
          <KeyboardArrowRightIcon sx={{ color: grey[800], fontSize: "30px" }} />
        </Stack>
      </Link>
      <Link href="/setting/donation">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: "20px", borderBottom: "1px solid #e2e2e2" }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <VolunteerActivismIcon
              sx={{ color: grey[500], fontSize: "26px" }}
            />
            <Typography sx={{ fontSize: "16px" }}>나의 후원내역</Typography>
          </Stack>
          <KeyboardArrowRightIcon sx={{ color: grey[800], fontSize: "30px" }} />
        </Stack>
      </Link>
      <Link href="/setting/board">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: "20px", borderBottom: "1px solid #e2e2e2" }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <AssignmentIcon sx={{ color: grey[500], fontSize: "26px" }} />
            <Typography sx={{ fontSize: "16px" }}>게시판</Typography>
          </Stack>
          <KeyboardArrowRightIcon sx={{ color: grey[800], fontSize: "30px" }} />
        </Stack>
      </Link>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: "20px", borderBottom: "1px solid #e2e2e2" }}
        onClick={() => logout()}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <LogoutIcon sx={{ color: grey[500], fontSize: "26px" }} />
          <Typography sx={{ fontSize: "16px" }}>로그아웃</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
