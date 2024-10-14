"use client";
import { grey } from "@mui/material/colors";
import { Avatar, Link, Stack, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import useCurrentUserQuery from "@/query/useCurrentUserQuery";
import { useRouter } from "next/navigation";
export default function SettingPage() {
  const { data: user } = useCurrentUserQuery();
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }

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
    </Stack>
  );
}
