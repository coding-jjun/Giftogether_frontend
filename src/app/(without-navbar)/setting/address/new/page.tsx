"use client";
import React from "react";
import AddAddress from "@/components/address/AddAddress";
import { useRouter } from "next/navigation";

export default function NewAddressPage() {
  const router = useRouter();

  return <AddAddress onClose={() => router.push("/setting/address")} />;
}
