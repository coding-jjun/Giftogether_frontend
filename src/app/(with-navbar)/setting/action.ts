"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axiosInstance from "@/utils/axios";

export async function logout() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refresh_token");

  if (refreshToken) {
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    try {
      const { data } = await axiosInstance.post(
        "https://api.giftogether.co.kr/auth/logout",
        {
          refreshToken: refreshToken.value,
        },
        {
          headers: {
            Cookie: cookieHeader,
          },
        },
      );
      if (data?.data) {
        cookieStore.delete("access_token");
        cookieStore.delete("refresh_token");
        cookieStore.delete("userId");
        cookieStore.delete("nickname");
      }
    } catch (e) {
      console.error(e);
      throw new Error("로그아웃 실패");
    }

    redirect("/");
  }
}
