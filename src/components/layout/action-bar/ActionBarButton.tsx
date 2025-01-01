import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";

export const ActionBarButton = styled(LoadingButton)(() => ({
  width: "100%",
  height: "100%",
  padding: "2vw",
  fontSize: "4.7vw",
  letterSpacing: 2,
  borderRadius: 13,
  boxShadow: "none",
}));
