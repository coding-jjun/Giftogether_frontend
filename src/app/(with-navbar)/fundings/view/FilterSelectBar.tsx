import { Stack } from "@mui/material";
import { FilterSelect } from "@/components/filter";
import { BottomSheet, useOverlay } from "@/components/overlay";
import { FilterBottomSheet } from "./FilterBottomSheet";
import { useRecoilValue } from "recoil";
import {
  selectedSortState,
  selectedStatusState,
  selectedThemesState,
  selectedVisibilityState,
} from "@/store/atoms/themeFilter";

export default function FilterSelectBar() {
  const themes = useRecoilValue(selectedThemesState);
  const visibility = useRecoilValue(selectedVisibilityState);
  const status = useRecoilValue(selectedStatusState);
  const sort = useRecoilValue(selectedSortState);

  // 오버레이 훅
  const overlay = useOverlay();

  // Bottom Sheet 열기
  const openBottomSheet = () => {
    return new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <BottomSheet
          isOpen={isOpen}
          onClose={handleClose}
          title="필터"
          body={<FilterBottomSheet handleClose={handleClose} />}
        />
      ));
    });
  };

  // Bottom Sheet 닫기
  const handleClose = () => {
    overlay.close();
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent={"flex-start"}
      sx={{
        flexGrow: 1,
        overflowX: "auto",
        whiteSpace: "nowrap",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <FilterSelect
        label="테마"
        handleClick={openBottomSheet}
        selected={themes.length !== 3}
        sx={{ flexShrink: 0 }}
      />
      <FilterSelect
        label={visibility === "전체" ? "공개범위" : visibility}
        handleClick={openBottomSheet}
        selected={visibility !== "전체"}
        sx={{ flexShrink: 0 }}
      />
      <FilterSelect
        label={status === "진행 중" ? "진행상태" : status}
        handleClick={openBottomSheet}
        selected={status !== "진행 중"}
        sx={{ flexShrink: 0 }}
      />
      <FilterSelect
        label={sort}
        handleClick={openBottomSheet}
        selected={sort !== "마감일순"}
        sx={{ flexShrink: 0 }}
      />
    </Stack>
  );
}
