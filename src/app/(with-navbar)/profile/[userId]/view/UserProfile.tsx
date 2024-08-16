import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { User } from "@/types/User";
import FriendActionButton from "./FriendActionButton";
import FriendCount from "./FriendCount";
import MyProfileImage from "./MyProfileImage";

interface Props {
  user: User;
  userId: number;
  friendId: number;
}

export default function UserProfile({ user, userId, friendId }: Props) {
  return (
    <UserProfileContainer direction="row" spacing={3}>
      <UserInfoContainer direction="column" spacing={2}>
        <Box>
          <UserName variant="h6">{user?.userNick ?? "sample_id"}</UserName>
          <FriendCount userId={userId} />
        </Box>
        <FriendActionButton userId={userId} friendId={friendId} />
      </UserInfoContainer>
      <MyProfileImage user={user} />
    </UserProfileContainer>
  );
}

const UserProfileContainer = styled(Stack)({
  margin: "40px 16px 32px 16px",
  justifyContent: "space-between",
  alignItems: "center",
});

const UserInfoContainer = styled(Stack)({
  justifyContent: "space-between",
  alignItems: "flex-start",
});

const UserName = styled(Typography)({
  fontWeight: 700,
  padding: 0,
  margin: 0,
});
