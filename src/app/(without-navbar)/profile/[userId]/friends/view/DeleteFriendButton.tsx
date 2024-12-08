import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import useDeleteFriend from "@/query/useDeleteFriend";
import theme from "@/components/theme";
import { useOverlay } from "@/components/overlay";
import { CreateOverlayElement } from "@/types/CreateOverlayElement";
import { styled } from "@mui/system";
import { red } from "@mui/material/colors";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "22px",
    padding: theme.spacing(1),
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(2),
  fontWeight: "bold",
  fontSize: "19px",
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
  color: "#555",
  fontSize: "16px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "15px",
  padding: theme.spacing(1),
  borderColor: "#e6e6e6",
  borderRadius: "12px",
  backgroundColor: "#e6e6e6",
  color: "#3a3a3a",
  "&:hover": {
    borderColor: "#cecece",
    backgroundColor: "#cecece",
  },
}));

interface Props {
  friendId: number;
  friendName: string;
}

export default function DeleteFriendButton({ friendId, friendName }: Props) {
  const { mutate: deleteFriend } = useDeleteFriend(friendId);
  const overlay = useOverlay();

  const handleDelete = () => {
    deleteFriend();
    overlay.close();
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const overlayElement: CreateOverlayElement = ({ isOpen, close }) => (
      <StyledDialog open={isOpen} onClose={close}>
        <StyledDialogTitle>
          {friendName}님과 친구를 끊으시겠어요?
        </StyledDialogTitle>
        <StyledDialogContent>
          <StyledDialogContentText>
            친구에게 알림이 가지 않아요.
          </StyledDialogContentText>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: "center",
              flex: 1,
              margin: theme.spacing(0.5),
              borderRadius: "12px",
            }}
          >
            <StyledButton fullWidth onClick={close}>
              닫기
            </StyledButton>
            <StyledButton
              fullWidth
              onClick={handleDelete}
              sx={{
                borderColor: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
                "&:hover": {
                  borderColor: red[100],
                  backgroundColor: red[200],
                },
              }}
            >
              삭제하기
            </StyledButton>
          </Stack>
        </StyledDialogContent>
      </StyledDialog>
    );

    overlay.open(overlayElement);
  };

  return (
    <ButtonGroup
      sx={{
        width: "15%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Button
          onClick={handleSubmit}
          sx={{
            borderColor: "#d0d0d0",
            borderRadius: 2,
            color: "#535353",
            padding: "3px",
            flex: 1,
            "&:hover": {
              color: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
            },
          }}
        >
          삭제
        </Button>
      </Box>
    </ButtonGroup>
  );
}
