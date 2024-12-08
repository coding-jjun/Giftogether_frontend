import React from "react";
import { Chip, Stack, styled, Typography } from "@mui/material";
import { BottomSheet, useOverlay } from "@/components/overlay";
import { useFormContext } from "react-hook-form";
import { CreateUserForm } from "@/types/User";
import { BankInfo, banks } from "@/app/(without-navbar)/signup/constants/banks";
import BankBottomSheet from "@/app/(without-navbar)/signup/view/input/BankBottomSheet";

export default function BankSelectBar() {
  const { setValue, watch } = useFormContext<CreateUserForm>();

  const userAccBank = watch("userAccBank");

  const selectedBank = banks.find((bank) => bank.type === userAccBank) || null;

  const overlay = useOverlay();

  const openBottomSheet = () => {
    overlay.open(({ isOpen, close }) => (
      <BottomSheet
        isOpen={isOpen}
        onClose={close}
        title="은행 선택"
        body={<BankBottomSheet selectBank={selectBank} closeOverlay={close} />}
        boxSx={{ height: "75vh" }}
      />
    ));
  };

  const selectBank = (bank: BankInfo) => {
    setValue("userAccBank", bank.type);
  };

  return (
    <Container
      onClick={openBottomSheet}
      direction="row"
      justifyContent="space-between"
      sx={{ width: "100%", boxSizing: "border-box" }}
    >
      {selectedBank ? (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <BankLogo src={selectedBank.logo} alt={selectedBank.name} />
            <Typography variant="body1">{selectedBank.name}</Typography>
          </Stack>
          <Chip label="변경" />
        </Stack>
      ) : (
        <>
          <Typography sx={{ color: "#9e9e9e" }}>
            은행을 선택해주세요.
          </Typography>
          <Chip label="선택" />
        </>
      )}
    </Container>
  );
}

const Container = styled(Stack)({
  border: "1px solid #d3d3d3",
  borderRadius: "10px",
  padding: "14px",

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#d3d3d3",
    },
    "&:hover fieldset": {
      borderColor: "#9e9e9e",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9e9e9e",
    },
    "&.Mui-error fieldset": {
      borderColor: "#f44336",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#9e9e9e",
    "&.Mui-focused": {
      color: "#9e9e9e",
    },
  },
});

const BankLogo = styled("img")({
  width: "auto",
  height: "100%",
  maxHeight: "25px",
});
