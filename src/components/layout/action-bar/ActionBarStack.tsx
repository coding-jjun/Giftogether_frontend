import { styled } from "@mui/system";
import { Stack } from "@mui/material";

export const ActionBarStack = styled(Stack)(() => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "16px 16px 28px 16px", // 모바일 화면에서 버튼의 하단 여백 추가
}));
