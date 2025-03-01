"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import { useEffect, useRef, useState } from "react";
import FilterButtonGroup from "@/components/theme/components/FilterButtonGroup";
import useNotificationsQuery from "@/query/useNotificationsQuery";
import {
  getNotiFilterKey,
  getNotiFilterValue,
  NotiFilter,
  NotiFilterMap,
  NotiFilterValue,
} from "@/types/Notification.enum";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import NotificationWrapper from "@/app/(without-navbar)/notification/view/NotificationWrapper";
import EmptyState from "@/components/empty-state/EmptyState";
import useReadNotification from "@/query/useReadNotification";
import LayoutWithPrev from "@/components/layout/layout-with-prev";
import theme from "@/components/theme";
import Error from "@/app/error";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { notiFilterState } from "@/store/atoms/notiFilter";

export default function AlarmHistoryPage() {
  const router = useRouter();
  const [filter, setFilter] = useRecoilState(notiFilterState);
  const [hasVisited, setHasVisited] = useState<boolean>(false); // 페이지 방문 플래그

  const entryTimeRef = useRef(new Date()); // 페이지 진입 시점 기록
  const { mutate: readNoti } = useReadNotification(entryTimeRef.current); // isRead: false -> true

  const {
    data: notificationResponse,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useNotificationsQuery({
    notiFilter: getNotiFilterKey(filter),
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

  useEffect(() => {
    return () => {
      if (hasVisited) readNoti();
    };
  }, [readNoti, hasVisited]);

  // 읽지 않은 알림 확인 후 페이지 나가면 방문한 페이지로 설정
  useEffect(() => {
    setHasVisited(true);
  }, []);

  if (!notificationResponse) {
    return <></>;
  }

  const handleFilterChange = (value: NotiFilterValue) => {
    setFilter(value);
  };

  const filterButtonStyle = (isActive: boolean) => ({
    backgroundColor: isActive ? theme.palette.primary.main : "#fff",
    borderColor: isActive ? theme.palette.primary.main : "#d0d0d0",
    color: isActive ? "#fff" : "#000",
  });

  return (
    <LayoutWithPrev title="알림">
      <Box
        sx={{
          position: "sticky",
          top: 52,
          zIndex: 1,
          backgroundColor: "white",
          paddingX: 1,
        }}
      >
        <FilterButtonGroup fullWidth>
          {Object.keys(NotiFilterMap).map((key) => {
            const value = getNotiFilterValue(key as NotiFilter);
            return (
              <Button
                key={key}
                style={filterButtonStyle(value === filter)}
                onClick={() => handleFilterChange(value)}
              >
                {value}
              </Button>
            );
          })}
        </FilterButtonGroup>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Error
            error={error}
            reset={() => {
              router.push("/notification");
            }}
          />
        ) : notificationResponse.pages.length !== 0 ? (
          <Grid spacing={2}>
            {/*읽지 않은 알림이 있을 때*/}
            {notificationResponse?.pages
              ?.flatMap((page) => page.noti)
              .filter((notification) => !notification.isRead).length > 0 ? (
              <Grid>
                {/* 읽지 않은 알림 */}
                <Grid sx={notiContainerStyles(false)}>
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
                </Grid>

                {/* 이전 알림 문구 표시*/}
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pt: 2,
                    px: 1.5,
                  }}
                >
                  <Grid
                    sx={{
                      flex: 1,
                      borderBottom: "0.5px solid #bdbdbd",
                      height: 0,
                      marginRight: "8px",
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ color: "#bdbdbd" }}>
                    이전 알림
                  </Typography>
                  <Grid
                    sx={{
                      flex: 1,
                      borderBottom: "0.5px solid #bdbdbd",
                      height: 0,
                      marginLeft: "8px",
                    }}
                  />
                </Grid>

                {/* 이전 알림들  */}
                <Grid sx={notiContainerStyles(true)}>
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
                </Grid>
              </Grid>
            ) : (
              <Grid sx={notiContainerStyles(true)}>
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
              </Grid>
            )}
          </Grid>
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
      </Box>
    </LayoutWithPrev>
  );
}

const notiContainerStyles = (isRead: boolean) => ({
  backgroundColor: isRead ? "transparent" : "#fff6f6",
});
