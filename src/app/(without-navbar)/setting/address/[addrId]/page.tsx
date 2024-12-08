"use client";
import EditAddress from "@/components/address/EditAddress";
import React from "react";
import useAddressQuery from "@/query/useAddressQuery";
import { useRouter } from "next/navigation";
import { TopFixedStack } from "@/components/layout/action-bar/TopFixedStack";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LayoutWithPrev from "@/components/layout/layout-with-prev";

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
    <LayoutWithPrev title="배송지 수정">
      <EditAddress
        address={address}
        onClose={() => router.push("/setting/address")}
      />
    </LayoutWithPrev>
  );
}
