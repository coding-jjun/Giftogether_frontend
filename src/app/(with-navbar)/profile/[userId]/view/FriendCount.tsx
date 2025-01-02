import { Typography } from "@mui/material";
import useFriendCount from "@/query/useFriendCount";

interface Props {
  userId: number;
}

export default function FriendCount({ userId }: Props) {
  const { data: friendCount } = useFriendCount(userId);
  return (
    <Typography variant="body2" padding={0} margin={0}>
      친구 {friendCount?.data.count ?? 0}명
    </Typography>
  );
}
