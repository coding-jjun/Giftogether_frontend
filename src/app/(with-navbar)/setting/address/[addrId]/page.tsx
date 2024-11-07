"use client";
import EditAddress from "@/components/address/EditAddress";
import React from "react";
import useAddressQuery from "@/query/useAddressQuery";
import { useRouter } from "next/navigation";
import { TopFixedStack } from "@/components/layout/action-bar/TopFixedStack";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function AddressEditPage({
  params,
}: {
  params: { addrId: string };
}) {
  const { data: address } = useAddressQuery(Number(params.addrId));
  const router = useRouter();

  if (!address) {
    return <span>에러가 발생했습니다.</span>;
  }

  return (
    <>
      <TopFixedStack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <IconButton onClick={() => router.back()}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography
          fontSize="20px"
          fontWeight={700}
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          배송지 수정
        </Typography>
      </TopFixedStack>
      <EditAddress
        address={address}
        onClose={() => router.push("/setting/address")}
      />
    </>
  );
}
