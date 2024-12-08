import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { BankInfo, banks } from "@/app/(without-navbar)/signup/constants/banks";

interface Props {
  selectBank: (bank: BankInfo) => void;
  closeOverlay: () => void;
}

export default function BankBottomSheet({ selectBank, closeOverlay }: Props) {
  const handleClick = (bank: BankInfo) => {
    selectBank(bank);
    closeOverlay();
  };

  return (
    <BankSelectorContainer>
      <Grid container spacing={2} justifyContent="flex-start">
        {banks.map((bank) => (
          <Grid item key={bank.name} xs={6} sm={6} md={6}>
            <BankButton variant="outlined" onClick={() => handleClick(bank)}>
              <BankLogo src={bank.logo} alt={bank.name} />
              <Typography variant="body2">{bank.name}</Typography>
            </BankButton>
          </Grid>
        ))}
      </Grid>
    </BankSelectorContainer>
  );
}

const BankSelectorContainer = styled("div")({
  padding: "20px",
  textAlign: "center",
});

const BankButton = styled(Button)({
  width: "100%",
  padding: "15px 20px 15px 20px",
  textTransform: "none",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderColor: "#d3d3d3",
  borderRadius: "10px",
});

const BankLogo = styled("img")({
  width: "40px",
  height: "40px",
  marginRight: "10px",
});
