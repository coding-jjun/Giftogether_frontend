import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { AddressDto } from "@/types/Address";
import AddressList from "@/components/address/AddressList";
import { DRAWER_BLEEDING } from "@/constants/constants";

interface Props {
  addresses: AddressDto[] | undefined;
  selectedAddress: AddressDto | null;
  setSelectedAddress: (address: AddressDto) => void;
}

// 바텀시트 박스
const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
  borderRadius: "8px 8px 0 0",
}));

// 바텀시트 막대기
const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: -40,
  left: "calc(50% - 15px)",
}));

export default function AddressComponent({
  addresses,
  selectedAddress,
  setSelectedAddress,
}: Props) {
  const { register, setValue } = useFormContext();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

  const setAddressValues = (address: AddressDto) => {
    const fundAddr = `${address.addrRoad} ${address.addrDetl} (${address.addrZip})`;
    setValue("fundRecvName", address.recvName);
    setValue("fundRecvPhone", address.recvPhone);
    setValue("fundAddr", fundAddr);
  };

  useEffect(() => {
    if (addresses) {
      const defaultAddress = addresses.find((addr) => addr.isDef);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
        setAddressValues(defaultAddress);
      }
    }
  }, [addresses]);

  useEffect(() => {
    if (selectedAddress) {
      setAddressValues(selectedAddress);
    }
  }, [selectedAddress]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenBottomSheet(newOpen);
  };

  return (
    <Grid item xs={12}>
      <FormHelperText
        sx={{
          my: 1,
          fontSize: 14,
          fontWeight: "bold",
        }}
      >
        배송지 정보
      </FormHelperText>
      <Box display="flex" width="100%">
        <TextField
          {...register("fundRecvName")}
          disabled
          size="small"
          sx={{ flex: 3 }}
        />
        <TextField
          {...register("fundRecvPhone")}
          disabled
          size="small"
          sx={{ flex: 6, marginLeft: 0.5 }}
        />
        <Button sx={{ flex: 1, marginLeft: 0.5 }} onClick={toggleDrawer(true)}>
          변경
        </Button>
      </Box>
      <Box display="flex" width="100%" sx={{ mt: 0.5 }}>
        <TextField
          {...register("fundAddr")}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ flex: 9 }}
          size="small"
          fullWidth
          disabled
        />
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={openBottomSheet}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={0}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: false,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: DRAWER_BLEEDING,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
        </StyledBox>
        <StyledBox
          sx={{
            pt: 5,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <AddressList
            addresses={addresses}
            onSelectAddress={(address) => {
              setSelectedAddress(address);
              setOpenBottomSheet(false);
            }}
          />
        </StyledBox>
      </SwipeableDrawer>
    </Grid>
  );
}
