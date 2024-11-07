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
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
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
import EmptyState from "@/components/emptyState/EmptyState";

export default function AlarmHistoryPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<NotiFilter>("all");
  const {
    data: notificationResponse,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useNotificationsQuery({
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

  const filterButtonStyle = (isActive: boolean) => ({
    fontWeight: isActive ? "bold" : "normal",
    backgroundColor: isActive ? "#ECF0EF" : "#fff",
    borderColor: isActive ? "#4F4635" : "#d0d0d0",
    color: isActive ? "#4F4635" : "#4F4635",
    borderWidth: isActive ? "1.5px" : "1px",
  });

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
              style={filterButtonStyle(key === filter)}
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
            <EmptyState
              icon={
                <NotificationsOffIcon sx={{ fontSize: 60, color: "#FFC107" }} />
              }
              title={"앗, 아직 도착한 알림이 없어요"}
              message={"새로운 소식이 도착하면 알려드릴게요!"}
              buttonText={"홈으로 가기"}
            />
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
