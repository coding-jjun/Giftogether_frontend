import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { Notification } from "@/types/Notification";
import NotificationContent from "@/app/(without-navbar)/notification/view/NotificationContent";
import { grey } from "@mui/material/colors";
import getTimeAgoText from "@/utils/getTimeAgoText";
import IncomingFollowButtons from "@/app/(without-navbar)/notification/view/IncomingFollowButtons";
import { NotiType } from "@/types/Notification.enum";
import { useRouter } from "next/navigation";
import useReadNotification from "@/query/useReadNotification";

interface Props {
  notification: Notification;
  entryTimeRef: React.MutableRefObject<Date>;
}

export default function NotificationWrapper({
  notification,
  entryTimeRef,
}: Props) {
  const router = useRouter();
  const { sendId, sendImg, sendNick, notiType, subId, notiTime, fundTitle } =
    notification;
  const { mutate: readNoti } = useReadNotification(entryTimeRef.current); // isRead: false -> true

  const handleClickUserProfile = () => {
    readNoti();
    router.push(`/profile/${sendId}`);
  };

  const handleClick = () => {
    if (
      notiType === NotiType.IncomingFollow ||
      notiType === NotiType.AcceptFollow ||
      notiType === NotiType.NewFriend
    ) {
      readNoti();
      router.push(`/profile/${sendId}`);
    } else if (subId) {
      readNoti();
      router.push(`/fundings/${subId}`);
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
      sx={{
        py: 1.5,
        width: "100%",
        position: "relative",
      }}
    >
      {notiType !== NotiType.FundClose &&
        notiType !== NotiType.FundAchieve &&
        notiType !== NotiType.WriteGratitude && (
          <Avatar
            alt={`${sendNick}-profile`}
            src={sendImg ?? "/dummy/profile.webp"}
            sx={{ width: 30, height: 30 }}
            onClick={handleClickUserProfile}
          />
        )}
      <div style={{ width: "100%" }} onClick={handleClick}>
        <NotificationContent
          sender={sendNick}
          notiType={notiType}
          fundTitle={fundTitle}
        />
        <Typography
          variant={"body2"}
          color={grey[500]}
          sx={{ padding: 0, margin: 0 }}
        >
          {getTimeAgoText(notiTime.toString())}
        </Typography>
      </div>
      {notiType === NotiType.IncomingFollow && (
        <IncomingFollowButtons sendId={sendId} />
      )}
    </Stack>
  );
}
