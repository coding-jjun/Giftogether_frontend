import { motion } from "framer-motion";
import { styled } from "@mui/system";

const BOTTOM_SHEET_HEIGHT: number = window.innerHeight;

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  zIndex: 10,
  top: "20vh",
  left: 0,
  right: 0,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  backgroundColor: "white",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.6)",
  height: `${BOTTOM_SHEET_HEIGHT}px`,
  margin: "0 auto",
  overflow: "hidden",
});

const HeaderWrapper = styled("div")({
  height: 48,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  position: "relative",
  paddingTop: 16,
  paddingBottom: 4,
});

const HandleBar = styled("div")({
  width: 32,
  height: 4,
  borderRadius: 2,
  backgroundColor: "#d0d0d0",
  margin: "auto",
});

// 배경 터치 시 모달 닫기
const Overlay = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.5)",
  zIndex: 9,
});

const ContentWrapper = styled("div")({
  flex: 1,
  overflowY: "auto",
});

const MotionWrapper = motion(Wrapper);
const MotionHeaderWrapper = motion(HeaderWrapper);
const MotionHandleBar = motion(HandleBar);

export {
  MotionWrapper as Wrapper,
  MotionHeaderWrapper as HeaderWrapper,
  MotionHandleBar as HandleBar,
  Overlay,
  ContentWrapper,
};
