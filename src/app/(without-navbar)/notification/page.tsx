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
import React, { useRef, useState } from "react";
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
import useReadNotification from "@/query/useReadNotification";

export default function AlarmHistoryPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<NotiFilter>("all");

  const entryTimeRef = useRef(new Date()); // 페이지 진입 시점 기록
  const { mutate: readNoti } = useReadNotification(entryTimeRef.current); // isRead: false -> true

  const {
    data: notificationResponse,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useNotificationsQuery({
    notiFilter: filter,
  });

  // 뒤로가기 버튼 클릭
  const handleClick = () => {
    readNoti();
    router.back();
  };

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
          <IconButton edge="start" aria-label="back" onClick={handleClick}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography fontWeight={700} variant="h5">
            알림
          </Typography>
        </Toolbar>

        {/* 알림 필터 버튼 */}
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
        <Stack spacing={2} sx={{ py: 2 }}>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography>로딩 중 에러</Typography>
          ) : notificationResponse.pages.length !== 0 ? (
            <>
              <Stack>
                {/*읽지 않은 알림이 있을 때*/}
                {notificationResponse?.pages
                  ?.flatMap((page) => page.noti)
                  .filter((notification) => !notification.isRead).length > 0 ? (
                  <>
                    {/* 읽지 않은 알림 */}
                    {notificationResponse?.pages
                      ?.flatMap((page) => page.noti)
                      .filter((notification) => !notification.isRead)
                      .map((notification) => (
                        <NotificationWrapper
                          key={`notification-${notification.notiId}`}
                          notification={notification}
                          entryTimeRef={entryTimeRef}
                        />
                      ))}

                    {/* 이전 알림 문구 표시*/}
                    <Stack>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          pt: 2,
                          px: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            flex: 1,
                            borderBottom: "0.5px solid #bdbdbd",
                            height: 0,
                            marginRight: "8px",
                          }}
                        />
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "#bdbdbd" }}
                        >
                          이전 알림
                        </Typography>
                        <Box
                          sx={{
                            flex: 1,
                            borderBottom: "0.5px solid #bdbdbd",
                            height: 0,
                            marginLeft: "8px",
                          }}
                        />
                      </Box>
                      {notificationResponse?.pages
                        ?.flatMap((page) => page.noti)
                        .filter((notification) => notification.isRead)
                        .map((notification) => (
                          <NotificationWrapper
                            key={`notification-${notification.notiId}`}
                            notification={notification}
                            entryTimeRef={entryTimeRef}
                          />
                        ))}
                    </Stack>
                  </>
                ) : (
                  <>
                    {/* 읽지 않은 알림이 없을 때: 이전 알림 문구 표시 없이 바로 읽은 알림 보여줌 */}
                    {notificationResponse?.pages
                      ?.flatMap((page) => page.noti)
                      .filter((notification) => notification.isRead)
                      .map((notification) => (
                        <NotificationWrapper
                          key={`notification-${notification.notiId}`}
                          notification={notification}
                          entryTimeRef={entryTimeRef}
                        />
                      ))}
                  </>
                )}
              </Stack>
            </>
          ) : (
            <EmptyState
              icon={
                <NotificationsOffIcon sx={{ fontSize: 60, color: "#FFC107" }} />
              }
              title={"앗, 아직 도착한 알림이 없어요"}
              message={"새로운 소식이 도착하면 알려드릴게요!"}
            />
          )}
          <div
            className={"as"}
            ref={observerRef}
            style={{ height: "20px", background: "transparent" }}
          />
        </Stack>
      </Box>
    </>
  );
}
