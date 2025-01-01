"use client";
import useFriendsQuery from "@/query/useFriendsQuery";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { FriendQueryDto } from "@/types/Friend";
import { useRouter, useSearchParams } from "next/navigation";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import EmptyState from "@/components/emptyState/EmptyState";
import LayoutWithPrev from "@/components/layout/layout-with-prev";
import DeleteFriendButton from "@/app/(without-navbar)/profile/[userId]/friends/view/DeleteFriendButton";

interface Params {
  params: {
    userId: string;
  };
}

export default function FriendsListPage({ params }: Params) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = Number(params.userId);
  const userNick = searchParams.get("userNick");
  const { data: friendsList } = useFriendsQuery(userId);

  if (!friendsList) {
    return <></>;
  }

  return (
    <LayoutWithPrev title="친구 목록">
      <Box>
        <List>
          {friendsList.result ? (
            friendsList.result.map((friend: FriendQueryDto) => (
              <ListItem
                key={friend.userId}
                sx={{ marginBottom: 2 }}
                onClick={() => router.push(`/profile/${friend.userId}`)}
              >
                <ListItemAvatar>
                  <Avatar
                    src={friend.userImg ?? "/dummy/profile.webp"}
                    sx={{ width: 30, height: 30 }}
                  />
                </ListItemAvatar>
                <ListItemText primary={friend.userName} />
                <DeleteFriendButton
                  friendId={friend.userId}
                  friendName={friend.userName}
                />
              </ListItem>
            ))
          ) : (
            <EmptyState
              icon={
                <PersonSearchIcon sx={{ fontSize: 60, color: "#FFC107" }} />
              }
              title={"앗, 아직 친구가 없어요"}
              message={"친구 목록을 불러올 수 있는 항목이 없습니다."}
            />
          )}
        </List>
      </Box>
    </LayoutWithPrev>
  );
}