import useFriendsQuery from "@/query/useFriendsQuery";
import { Typography } from "@mui/material";

interface Props {
  userId: number;
}

export default function FriendCount() {
  const { data: friends } = useFriendsQuery();
  return (
    <Typography variant="body2" padding={0} margin={0}>
      친구 {friends?.total ?? 0}명
    </Typography>
  );
}
