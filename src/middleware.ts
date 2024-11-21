import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.has("viewport")) {
    const { device } = userAgent(request);
    const viewport = device.type === "mobile" ? "mobile" : "desktop";
    response.cookies.set("viewport", viewport);
    response.headers.set("viewport", viewport);
  }

  const accessToken = request.cookies.get("access_token");
  const refreshToken = request.cookies.get("refresh_token");
  const userCookie = request.cookies.get("user");

  const userId = getUserIdFromCookie(userCookie?.value);
  if (userId) {
    response.cookies.set("userId", userId.toString());
  }

  if (refreshToken) {
    response.cookies.set("refreshToken", refreshToken.value);
  }

  if (!accessToken && shouldCheckAuth(request)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken) {
    response.cookies.set("isLoggedIn", "true");
  }

  return response;
}

function getUserIdFromCookie(
  userCookie: string | undefined,
): number | undefined {
  if (!userCookie) return undefined;

  try {
    const userValue = userCookie.startsWith("j:")
      ? userCookie.slice(2)
      : userCookie;
    const userObj = JSON.parse(userValue);
    return userObj.userId;
  } catch (error) {
    console.error("Failed to parse user cookie", error);
    return undefined;
  }
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
