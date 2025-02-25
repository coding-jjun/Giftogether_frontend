import { ButtonGroup, styled } from "@mui/material";

const FilterButtonGroup = styled(ButtonGroup)({
  "& .MuiButton-root": {
    borderColor: "#d0d0d0",
    flex: 1,
    borderRadius: 10,
    color: "#000",
    backgroundColor: "#fff",
    margin: "5px",
    padding: "5px",
  },
  marginBottom: "15px",
});

export default FilterButtonGroup;
