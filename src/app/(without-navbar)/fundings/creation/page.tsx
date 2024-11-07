"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, CssBaseline, Grid } from "@mui/material";
import { DetailActionBar } from "@/components/layout/action-bar";
import useFundingCreateQuery from "@/query/useFundingCreatQuery";
import { useRouter } from "next/navigation";
import { FundingForm } from "@/types/Funding";
import GiftDto from "@/types/GiftDto";

import { styled } from "@mui/material/styles";
import { Global } from "@emotion/react";
import { AddressDto } from "@/types/Address";
import useAddressesQuery from "@/query/useAddressesQuery";
import InputComponent from "@/app/(without-navbar)/fundings/creation/view/InputComponent";
import GiftComponent from "@/app/(without-navbar)/fundings/creation/view/GiftComponent";
import AddressComponent from "@/app/(without-navbar)/fundings/creation/view/AddressComponent";
import { DRAWER_BLEEDING } from "@/constants/constants";
import Appbar from "@/components/layout/appbar/appbar";

const Root = styled("div")(() => ({
  height: "100%",
}));

const DEFAULT_CREATE_GIFT_DTO: GiftDto = {
  id: 1,
  giftOrd: 1,
  giftImg: null,
  giftTitle: "",
  giftUrl: "",
};

function getInitialGifts() {
  return [DEFAULT_CREATE_GIFT_DTO];
}

export default function FundingCreationPage() {
  const router = useRouter();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const { data: addresses } = useAddressesQuery();
  const [selectedAddress, setSelectedAddress] = useState<AddressDto | null>(
    null,
  );

  const methods = useForm<FundingForm>();

  const [gifts, setGifts] = useState<GiftDto[]>(getInitialGifts);

  useEffect(() => {
    const currentValues = methods.getValues("gifts"); // 현재 폼의 값

    const mergedValues = gifts.map((gift, index) => {
      const existGift = currentValues[index]; // 현재 폼에 입력된 값이 있는지 확인
      return {
        ...gift,
        giftOpt: existGift?.giftOpt || gift.giftOpt, // 입력값 있으면 유지
        giftUrl: existGift?.giftUrl || gift.giftUrl,
        giftCont: existGift?.giftCont || gift.giftCont,
      };
    });

    // gifts 배열이 바뀔 때만 폼을 업데이트하고, 폼이 채워져있는건 그대로 유지
    methods.setValue("gifts", mergedValues);
  }, [gifts, methods]);

  const { mutate } = useFundingCreateQuery();

  const onSubmit = (body: any) => {
    body.fundGoal = Number(body.fundGoal.replaceAll(",", ""));
    const { fundAddrZip, fundAddrRoad, fundAddrDetl, ...rest } = body;
    const submitData = {
      ...rest,
      fundAddrZip: selectedAddress?.addrZip,
      fundAddrRoad: selectedAddress?.addrRoad,
      fundAddrDetl: selectedAddress?.addrDetl,
      fundRecvName: selectedAddress?.recvName,
      fundRecvPhone: selectedAddress?.recvPhone,
      fundRecvReq: selectedAddress?.recvReq,
    };
    mutate(submitData, {
      onSuccess: (data) => {
        router.push(`/fundings/${data.data.fundUuid}`);
      },
    });
  };

  return (
    <>
      <Root>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(85% - ${DRAWER_BLEEDING}px)`,
              overflow: "visible",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            },
          }}
        />

        <Appbar title={"펀딩 등록"} />

        <Box sx={{ padding: 2, mt: 8 }}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {/*입력폼*/}
                <InputComponent />

                {/*기프트 아이템*/}
                <GiftComponent gifts={gifts} setGifts={setGifts} />

                {/*배송지*/}
                <AddressComponent
                  addresses={addresses}
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                />
              </Grid>
            </form>
          </FormProvider>
        </Box>
      </Root>
      <div style={{ display: openBottomSheet ? "none" : "block" }}>
        <DetailActionBar
          buttonText="작성하기"
          handleSubmit={methods.handleSubmit(onSubmit)}
        />
      </div>
    </>
  );
}
