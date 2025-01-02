import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import useAddFriend from "@/query/useAddFriend";
import useDeleteFriend from "@/query/useDeleteFriend";
import useFriendStatusQuery from "@/query/useFriendStatusQuery";

interface Props {
  userId: number;
  userNick: string;
  friendId: number;
}

export default function FriendActionButton({
  userId,
  userNick,
  friendId,
}: Props) {
  const router = useRouter();
  const { data: friendStatus } = useFriendStatusQuery(userId, friendId);
  const { mutate: requestFriend } = useAddFriend(friendId);
  const { mutate: deleteFriend } = useDeleteFriend(friendId);

  const handleClickFriendActionButton = () => {
    // 본인일 경우 친구 목록 페이지로 이동
    if (userId === friendId) {
      router.push(
        `/profile/${userId}/friends?userNick=${encodeURIComponent(userNick)}`,
      );
      return;
    }

    switch (friendStatus) {
      case "friend":
        deleteFriend();
        break;
      case "request":
        deleteFriend();
        break;
      case "requested":
        requestFriend();
        break;
      case "notFriend":
        requestFriend();
        break;
      default:
        break;
    }
  };
  const getFriendActionButtonText = () => {
    if (userId === friendId) {
      return "친구 목록";
    }
    switch (friendStatus) {
      case "friend":
        return "친구 끊기";
      case "request":
        return "요청 중";
      case "requested":
        return "요청 수락";
      case "notFriend":
        return "친구 요청";
      default:
        return "친구 요청";
    }
  };

  return (
    <Button
      variant="outlined"
      sx={{ borderRadius: 2 }}
      color="info"
      onClick={handleClickFriendActionButton}
    >
      {getFriendActionButtonText()}
    </Button>
  );
}
