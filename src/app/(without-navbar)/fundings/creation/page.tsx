"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
import LayoutWithPrev from "@/components/layout/layout-with-prev";
import { v4 as uuidv4 } from "uuid";

const Root = styled("div")(() => ({
  height: "100%",
}));

const DEFAULT_CREATE_GIFT_DTO: GiftDto = {
  id: uuidv4(),
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

  const methods = useForm<FundingForm>({
    defaultValues: {
      gifts: getInitialGifts(),
    },
  });

  const { mutate } = useFundingCreateQuery();

  const onSubmit = (body: any) => {
    body.fundGoal = Number(body.fundGoal.replaceAll(",", ""));
    const { fundAddrZip, fundAddrRoad, fundAddrDetl, ...rest } = body;

    const updatedGifts = rest.gifts.map((gift: GiftDto, index: number) => ({
      ...gift,
      giftOrd: index + 1
    }))

    const submitData = {
      ...rest,
      gifts: updatedGifts,
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
    <LayoutWithPrev
      title="펀딩 등록"
      actionBar={
        <div style={{ display: openBottomSheet ? "none" : "block" }}>
          <DetailActionBar
            buttonText="작성하기"
            handleSubmit={methods.handleSubmit(onSubmit)}
          />
        </div>
      }
    >
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
        <Box sx={{ padding: 2 }}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {/*입력폼*/}
                <InputComponent />

                {/*기프트 아이템*/}
                <GiftComponent />

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
    </LayoutWithPrev>
  );
}
