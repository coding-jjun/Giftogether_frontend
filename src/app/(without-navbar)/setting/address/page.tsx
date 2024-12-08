"use client";
import { Button } from "@mui/material";
import AddressWrapper from "@/components/address/AddressWrapper";
import React, { useMemo } from "react";
import { AddressDto } from "@/types/Address";
import useAddressesQuery from "@/query/useAddressesQuery";
import { useRouter } from "next/navigation";
import LayoutWithPrev from "@/components/layout/layout-with-prev";

export default function AddressPage() {
  const { data: addresses } = useAddressesQuery();

  const handleOpenAdd = () => {
    router.push("/setting/address/new");
  };

  const handleOpenEdit = (address: AddressDto) => {
    // setSelectedAddress(address);
    // setShowEditAddress(true);
    router.push(`/setting/address/${address.addrId}`);
  };

  const sortedAddresses = useMemo(() => {
    if (!addresses) return [];

    const defaultAddress = addresses.find((addr) => addr.isDef);
    const otherAddresses = addresses
      .filter((addr) => !addr.isDef)
      .sort((a, b) => b.addrId - a.addrId);

    return defaultAddress
      ? [defaultAddress, ...otherAddresses]
      : otherAddresses;
  }, [addresses]);

  const router = useRouter();

  return (
    <LayoutWithPrev title="배송지 관리">
      <div style={{ padding: "10px" }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleOpenAdd}
          sx={{ mb: 3 }}
        >
          새로운 주소 +
        </Button>

        {/*배송지 목록*/}
        {sortedAddresses?.map((addr) => (
          <AddressWrapper
            key={addr.addrId}
            address={addr}
            onSelectAddress={(address) => {
              router.push(`/address/${address.addrId}`);
            }}
            onEditAddress={handleOpenEdit}
          />
        ))}
      </div>
    </LayoutWithPrev>
  );
}
