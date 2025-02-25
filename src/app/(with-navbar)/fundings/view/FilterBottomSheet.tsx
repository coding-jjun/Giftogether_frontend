import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Box, Button, Chip, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import {
  selectedSortState,
  selectedStatusState,
  selectedThemesState,
  selectedVisibilityState,
} from "@/store/atoms/themeFilter";
import {
  FundingPublFilterValue,
  FundingSortValue,
  FundingStatusValue,
  FundThemeValue,
} from "@/types/Funding.enum";
import styled from "@emotion/styled";

const filters = {
  themes: ["생일", "기념일", "기부"],
  visibility: ["전체", "친구공개", "전체공개"],
  status: ["진행 중", "종료됨"],
  sort: ["마감일순", "등록일순"],
};

interface Props {
  handleClose: () => void;
}
export function FilterBottomSheet({ handleClose }: Props) {
  const [recoilThemes, setRecoilThemes] = useRecoilState(selectedThemesState);
  const [recoilVisibility, setRecoilVisibility] = useRecoilState(
    selectedVisibilityState,
  );
  const [recoilStatus, setRecoilStatus] = useRecoilState(selectedStatusState);
  const [recoilSort, setRecoilSort] = useRecoilState(selectedSortState);

  const [themes, setThemes] = useState<FundThemeValue[]>(recoilThemes);
  const [visibility, setVisibility] =
    useState<FundingPublFilterValue>(recoilVisibility);
  const [status, setStatus] = useState<FundingStatusValue>(recoilStatus);
  const [sort, setSort] = useState<FundingSortValue>(recoilSort);

  const getColor = (key: string, value: string) => {
    switch (key) {
      case "themes":
        return themes.includes(value as FundThemeValue)
          ? "secondary"
          : "default";
      case "visibility":
        return visibility === value ? "secondary" : "default";
      case "status":
        return status === value ? "secondary" : "default";
      default:
        return sort === value ? "secondary" : "default";
    }
  };

  const handleThemeClick = (value: FundThemeValue) => {
    setThemes((prevThemes) => {
      const index = prevThemes.indexOf(value);
      if (index === -1) {
        return [...prevThemes, value];
      } else {
        return prevThemes.filter((theme) => theme !== value);
      }
    });
  };

  const handleClick = (type: string, value: string | string[]) => {
    switch (type) {
      case "themes":
        handleThemeClick(value as FundThemeValue);
        break;
      case "visibility":
        setVisibility(value as FundingPublFilterValue);
        break;
      case "status":
        setStatus(value as FundingStatusValue);
        break;
      case "sort":
        setSort(value as FundingSortValue);
        break;
      default:
        break;
    }
  };

  const getTitle = (key: string) => {
    switch (key) {
      case "themes":
        return "테마";
      case "visibility":
        return "공개범위";
      case "status":
        return "진행상태";
      default:
        return "정렬";
    }
  };

  const applyFilter = () => {
    setRecoilThemes(themes);
    setRecoilVisibility(visibility);
    setRecoilStatus(status);
    setRecoilSort(sort);
    handleClose();
  };

  return (
    <Wrapper>
      <ContentWrapper>
        {Object.entries(filters).map(([key, values]) => (
          <FilterSection key={key}>
            <SubTitle variant="body1">{getTitle(key)}</SubTitle>
            <Stack direction="row" spacing={1}>
              {values.map((value: string) => (
                <FilterChip
                  key={value}
                  label={value}
                  color={getColor(key, value)}
                  onClick={() => handleClick(key, value)}
                />
              ))}
            </Stack>
          </FilterSection>
        ))}
      </ContentWrapper>
      <ApplyButton
        variant="contained"
        size="large"
        onClick={applyFilter}
        color="secondary"
      >
        적용하기
      </ApplyButton>
    </Wrapper>
  );
}
const FilterChip = React.memo(
  styled(Chip)(({ theme }) => ({
    borderRadius: "4px",
  })),
);

const FilterSection = styled(Stack)(({ theme }) => ({
  marginBottom: "24px",
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  color: grey[700],
  paddingRight: "8px",
}));

const ApplyButton = styled(Button)(({ theme }) => ({
  width: "100%",
  marginTop: "auto",
}));

const Wrapper = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const ContentWrapper = styled(Stack)(({ theme }) => ({
  marginTop: "10px",
  flexDirection: "column",
  spacing: "24px",
  flex: 1,
}));
