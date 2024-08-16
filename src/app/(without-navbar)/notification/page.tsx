"use client";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FilterButtonGroup from "@/components/theme/components/FilterButtonGroup";
import useNotificationsQuery from "@/query/useNotificationsQuery";
import {
  getNotiFilterValue,
  NotiFilter,
  NotiFilterMap,
} from "@/types/Notification.enum";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import NotificationWrapper from "@/app/(without-navbar)/notification/view/NotificationWrapper";

export default function AlarmHistoryPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<NotiFilter>("all");
  // TODO: 현재 로그인되어 있는 유저의 아이디로 수정 필요
  const {
    data: notificationResponse,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useNotificationsQuery(1, {
    notiFilter: filter,
  });

  // 무한 스크롤
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  // 무한 스크롤 관련 IntersectionObserver hook
  const observerRef = useIntersectionObserver(loadMore, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  if (!notificationResponse) {
    return <></>;
  }

  const handleFilterChange = (value: NotiFilter) => {
    setFilter(value);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ backgroundColor: "#fff", py: 2, px: 1 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="back"
            onClick={() => router.back()}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography fontWeight={700} variant="h5">
            알림
          </Typography>
        </Toolbar>
        <FilterButtonGroup fullWidth>
          {Object.keys(NotiFilterMap).map((key) => (
            <Button
              key={key}
              onClick={() => handleFilterChange(key as NotiFilter)}
              style={{
                fontWeight: key === filter ? "bold" : "normal",
                backgroundColor: key === filter ? "#ECF0EF" : "#fff",
                borderColor: key === filter ? "#4F4635" : "#d0d0d0",
                color: key === filter ? "#4F4635" : "#4F4635",
                borderWidth: key === filter ? "1.5px" : "1px",
              }}
            >
              {getNotiFilterValue(key as NotiFilter)}
            </Button>
          ))}
        </FilterButtonGroup>
      </AppBar>

      <Box sx={{ mt: 17 }}>
        <Stack spacing={2} sx={{ p: 2 }}>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography>로딩 중 에러</Typography>
          ) : notificationResponse.pages.length !== 0 ? (
            notificationResponse?.pages
              ?.flatMap((page) => page.noti)
              .map((notification) => (
                <NotificationWrapper
                  key={`notification-${notification.notiId}`}
                  notification={notification}
                />
              ))
          ) : (
            <Typography>알림이 없어요</Typography>
          )}
          <div
            ref={observerRef}
            style={{ height: "20px", background: "transparent" }}
          />
        </Stack>
      </Box>
    </>
  );
}
