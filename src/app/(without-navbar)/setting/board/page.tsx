"use client";
import LayoutWithPrev from "@/components/layout/layout-with-prev";
import { Box, Button } from "@mui/material";
import FilterButtonGroup from "@/components/theme/components/FilterButtonGroup";
import {
  BoardFilter,
  BoardFilterMap,
  getBoardFilterValue,
} from "@/types/Board.enum";
import theme from "@/components/theme";
import { useState } from "react";

export default function BoardPage() {
  const [filter, setFilter] = useState<BoardFilter>("all");

  const filterButtonStyle = (isActive: boolean) => ({
    backgroundColor: isActive ? theme.palette.primary.main : "#fff",
    borderColor: isActive ? theme.palette.primary.main : "#d0d0d0",
    color: isActive ? "#fff" : "#000",
  });

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
          {Object.keys(BoardFilterMap).map((key) => (
            <Button key={key} style={filterButtonStyle(key === filter)}>
              {getBoardFilterValue(key as BoardFilter)}
            </Button>
          ))}
        </FilterButtonGroup>
      </Box>
    </LayoutWithPrev>
  );
}
