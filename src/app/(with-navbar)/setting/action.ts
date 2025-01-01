"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axiosInstance from "@/utils/axios";

export async function logout() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken");

  if (refreshToken) {
    const { data } = await axiosInstance.post("/api/auth/logout", {
      refreshToken: refreshToken,
    });

    if (data?.data) {
      cookieStore.delete("session");
      cookieStore.delete("refreshToken");
      cookieStore.delete("userId");
      cookieStore.delete("nickname");
      redirect("/");
    }
  }
}
