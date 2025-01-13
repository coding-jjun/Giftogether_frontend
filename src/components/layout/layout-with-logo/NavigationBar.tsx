"use server";
import { cookies } from "next/headers";
import { NavigationButtons } from "@/components/layout/layout-with-logo/NavigationButtons";

export const NavigationBar = () => {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  return <NavigationButtons userId={userId} />;
};
