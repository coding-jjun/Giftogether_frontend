import { Avatar, styled } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { grey } from "@mui/material/colors";
import { AvatarWithBadge } from "@/components/avatar";
import { BottomSheet, useOverlay } from "@/components/overlay";
import ProfileBottomSheet from "@/app/(with-navbar)/profile/[userId]/view/ProfileBottomSheet";
import { useCookie } from "@/hook/useCookie";

interface Props {
  imgSrc?: string;
  onSubmit: (img: string) => void;
  userId?: number;
}

export const ProfileImage = ({ imgSrc, onSubmit, userId }: Props) => {
  const loginUserId = useCookie<number>("userId");

  // 오버레이 훅
  const overlay = useOverlay();

  // Bottom Sheet 열기
  const openBottomSheet = () => {
    return new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <BottomSheet
          isOpen={isOpen}
          onClose={handleClose}
          title="프로필 사진 선택"
          body={
            <ProfileBottomSheet
              handleClose={handleClose}
              userId={userId}
              handleSubmit={handleSubmit}
            />
          }
          boxSx={{ height: "auto" }}
        />
      ));
    });
  };

  // Bottom Sheet 닫기
  const handleClose = () => {
    overlay.close();
  };

  const handleSubmit = async (userImg: string) => {
    onSubmit(userImg);
    handleClose();
  };

  return userId === loginUserId ? (
    <AvatarWithBadge
      imgSrc={imgSrc}
      badge={
        <BadgeAvatar sx={{ bgcolor: grey[600] }}>
          <CameraAltIcon sx={{ width: "70%", height: "70%", margin: "auto" }} />
        </BadgeAvatar>
      }
      onClick={openBottomSheet}
    />
  ) : (
    <AvatarWithBadge imgSrc={imgSrc} />
  );
};

const BadgeAvatar = styled(Avatar)(({ theme }) => ({
  width: 25,
  height: 25,
  border: `2px solid ${theme.palette.background.paper}`,
}));
