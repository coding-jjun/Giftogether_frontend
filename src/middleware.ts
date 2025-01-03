import { NextRequest, NextResponse, userAgent } from "next/server";
import { decrypt } from "@/utils/auth/session";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.has("viewport")) {
    const { device } = userAgent(request);
    const viewport = device.type === "mobile" ? "mobile" : "desktop";
    response.cookies.set("viewport", viewport);
    response.headers.set("viewport", viewport);
  }

  const cookieSession = (await cookies()).get("session")?.value;
  const session = await decrypt(cookieSession);

  const isAuthorized =
    session && session.exp && session?.exp * 1000 > new Date().getTime();

  if (!isAuthorized && shouldCheckAuth(request)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

function shouldCheckAuth(request: NextRequest): boolean {
  const protectedRoutes = [
    "/setting",
    "/notification",
    "/fundings/creation",
    "/profile",
  ];
  return protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );
}
