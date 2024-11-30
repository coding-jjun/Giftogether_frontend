import React, { ChangeEvent, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Postcode from "@/components/address/Postcode";
import { AddressDto } from "@/types/Address";
import useUpdateAddress from "@/query/useUpdateAddress";
import useDeleteAddress from "@/query/useDeleteAddress";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface Props {
  address: AddressDto;
  onClose: () => void;
}

const predefinedRequests = [
  "부재 시 경비실에 맡겨주세요",
  "배송 전에 꼭 연락주세요",
  "집 앞에 놓아주세요",
  "택배함에 넣어주세요",
];

export default function EditAddress({ address, onClose }: Props) {
  const addrId: number | undefined = address?.addrId;
  const [addrNick, setAddrNick] = useState<string>(address.addrNick);
  const [recvName, setRecvName] = useState<string>(address.recvName);
  const [postcodeData, setPostcodeData] = useState({
    addrZip: address.addrZip,
    addrRoad: address.addrRoad,
    addrDetl: address.addrDetl,
  });
  const [recvPhone, setRecvPhone] = useState<string>(address.recvPhone);
  const [recvReq, setRecvReq] = useState<string>(address.recvReq || "");
  const [isCustomMessage, setIsCustomMessage] = useState<boolean>(false);
  const [isDef, setIsDef] = useState<boolean>(address.isDef);
  const { mutate: updateAddress } = useUpdateAddress(addrId);
  const { mutate: deleteAddress } = useDeleteAddress();

  useEffect(() => {
    setAddrNick(address.addrNick);
    setRecvName(address.recvName);
    setPostcodeData({
      addrZip: address.addrZip,
      addrRoad: address.addrRoad,
      addrDetl: address.addrDetl,
    });
    setRecvPhone(address.recvPhone);
    setRecvReq(address.recvReq || "");

    if (!predefinedRequests.includes(address.recvReq)) {
      setIsCustomMessage(true);
    } else {
      setIsCustomMessage(false);
    }
  }, [address]);

  const handleNickChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddrNick(e.target.value);
  };

  const handleReceiverChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecvName(e.target.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const filteredInput = input.replace(/\D/g, "").slice(0, 11);
    setRecvPhone(filteredInput);
  };

  const handleMsgChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    if (value === "직접입력") {
      setIsCustomMessage(true);
      setRecvReq("");
    } else {
      setIsCustomMessage(false);
      setRecvReq(value);
    }
  };

  const handleCustomMsgChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecvReq(e.target.value);
  };

  const handlePostcodeComplete = (data: {
    addrZip: string;
    addrRoad: string;
    addrDetl: string;
  }) => {
    setPostcodeData(data);
  };

  const handleIsDef = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDef(e.target.checked);
  };

  const handleClose = () => {
    onClose();
  };

  const handleUpdate = () => {
    const body = {
      addrNick,
      recvName,
      addrZip: postcodeData.addrZip,
      addrRoad: postcodeData.addrRoad,
      addrDetl: postcodeData.addrDetl,
      recvPhone,
      recvReq,
      isDef,
    };
    updateAddress(body, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleDelete = () => {
    deleteAddress(addrId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "71dvh",
      }}
    >
      <AppBar
        position="absolute"
        elevation={0}
        sx={{ backgroundColor: "#fff", borderRadius: "16px 16px 0 0" }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={handleClose} aria-label="close">
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography
            fontWeight={500}
            fontSize={18}
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            배송지 수정
          </Typography>
          <ArrowBackIosNewIcon style={{ visibility: "hidden" }} />
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          mt: 2.5,
          flex: 1,
          overflow: "auto",
        }}
      >
        <FormHelperText>배송지 명</FormHelperText>
        <TextField
          value={addrNick}
          onChange={handleNickChange}
          fullWidth
          margin="dense"
          size="small"
          sx={{
            mb: 2,
            borderRadius: 4,
            backgroundColor: "#F8F8F8",
          }}
        />
        <FormHelperText>받는 분</FormHelperText>
        <TextField
          value={recvName}
          onChange={handleReceiverChange}
          fullWidth
          margin="dense"
          size="small"
          sx={{
            mb: 2,
            borderRadius: 4,
            backgroundColor: "#F8F8F8",
          }}
        />
        <FormHelperText>받는 곳</FormHelperText>
        <Postcode address={address} onComplete={handlePostcodeComplete} />
        <FormHelperText>휴대폰번호</FormHelperText>
        <TextField
          value={recvPhone}
          onChange={handlePhoneChange}
          fullWidth
          type="tel"
          margin="dense"
          size="small"
          placeholder="숫자만 입력해주세요"
          sx={{
            mb: 2,
            borderRadius: 4,
            backgroundColor: "#F8F8F8",
          }}
        />
        <FormHelperText>배송 시 요청사항</FormHelperText>
        <Select
          value={isCustomMessage ? "직접입력" : recvReq}
          onChange={handleMsgChange}
          displayEmpty
          fullWidth
          size="small"
          sx={{
            borderRadius: 3,
            backgroundColor: "#F8F8F8",
          }}
          MenuProps={{
            PaperProps: {
              style: {
                borderRadius: 20,
                marginTop: 8,
                width: "100%",
                boxShadow:
                  "0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 2px 4px -1px rgba(0, 0, 0, 0.1), 0px 1px 10px rgba(0, 0, 0, 0.1)",
              },
            },
            MenuListProps: {
              style: {
                padding: "4px 0",
              },
            },
          }}
        >
          <MenuItem disabled value="">
            선택해주세요
          </MenuItem>
          {predefinedRequests.map((request) => (
            <MenuItem key={request} value={request}>
              {request}
            </MenuItem>
          ))}
          <MenuItem value="직접입력">직접입력</MenuItem>
        </Select>
        {isCustomMessage && (
          <TextField
            value={recvReq}
            onChange={handleCustomMsgChange}
            fullWidth
            margin="dense"
            size="small"
            placeholder="요청사항을 입력해주세요"
            sx={{
              borderRadius: 3,
              backgroundColor: "#F8F8F8",
            }}
          />
        )}
        <FormControlLabel
          label="기본배송지로 설정"
          control={<Checkbox checked={isDef} onChange={handleIsDef} />}
          sx={{
            mt: 2,
          }}
        />
      </Box>
      <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
        <Button
          disableElevation
          variant="outlined"
          onClick={handleDelete}
          sx={{ flexGrow: 1 }}
        >
          삭제
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={handleUpdate}
          sx={{ flexGrow: 1 }}
        >
          수정
        </Button>
      </Stack>
    </Box>
  );
}
