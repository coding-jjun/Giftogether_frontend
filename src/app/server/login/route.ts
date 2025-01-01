import { NextResponse } from "next/server";
import { decrypt } from "@/utils/auth/session";
import axiosInstance from "@/utils/axios";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    const { data } = await axiosInstance.post(
      "https://api.giftogether.co.kr/auth/login",
      body,
      {
        withCredentials: true,
      },
    );

    const { accessToken, refreshToken, user } = data?.data || {};

    if (!accessToken) {
      return NextResponse.json({ message: "Login failed" }, { status: 401 });
    }

    const tokenPayload = await decrypt(accessToken);

    if (!tokenPayload?.sub || !tokenPayload?.exp) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Response 객체 생성
    const res = NextResponse.json({ message: "로그인 성공" });
    const cookieOptions: Partial<ResponseCookie> = {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    };

    // 만료 시간
    const expires = new Date(tokenPayload.exp * 1000);

    // 쿠키 설정
    res.cookies.set("session", accessToken, { ...cookieOptions, expires });
    res.cookies.set("refreshToken", refreshToken, cookieOptions);
    res.cookies.set("userId", tokenPayload.sub, { ...cookieOptions, expires });

    if (user?.userNick) {
      res.cookies.set("nickname", user.userNick, { ...cookieOptions, expires });
    }

    return res;
  } catch (error) {
    return NextResponse.json({ message: "Login failed" }, { status: 401 });
  }
}
