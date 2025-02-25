"use client";
import LayoutWithPrev from "@/components/layout/layout-with-prev";
import { Box, Button } from "@mui/material";
import FilterButtonGroup from "@/components/theme/components/FilterButtonGroup";
import {
  BoardFilter,
  BoardFilterMap,
  BoardFilterValue,
  getBoardFilterValue,
} from "@/types/Board.enum";
import theme from "@/components/theme";
import { useRecoilState } from "recoil";
import { boardFilterState } from "@/store/atoms/boardFilter";
import BoardItem from "@/app/(without-navbar)/setting/board/view/BoardItem";

export default function BoardPage() {
  const [filter, setFilter] = useRecoilState(boardFilterState);

  const filterButtonStyle = (isActive: boolean) => ({
    backgroundColor: isActive ? theme.palette.primary.main : "#fff",
    borderColor: isActive ? theme.palette.primary.main : "#d0d0d0",
    color: isActive ? "#fff" : "#000",
  });

  const handleClick = (value: BoardFilterValue) => {
    setFilter(value);
  };

  return (
    <LayoutWithPrev title="게시판">
      <Box
        sx={{
          position: "sticky",
          top: 52,
          zIndex: 1,
          backgroundColor: "white",
          paddingX: 1,
        }}
      >
        <FilterButtonGroup fullWidth>
          {Object.keys(BoardFilterMap).map((key) => {
            const value = getBoardFilterValue(key as BoardFilter);
            return (
              <Button
                key={key}
                style={filterButtonStyle(value === filter)}
                onClick={() => handleClick(value)}
              >
                {value}
              </Button>
            );
          })}
        </FilterButtonGroup>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <BoardItem />
      </Box>
    </LayoutWithPrev>
  );
}
