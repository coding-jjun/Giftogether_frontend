"use server";
import "server-only";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify session");
  }
}

export async function getUserId() {
  const cookie = (await cookies()).get("access_token")?.value;
  if (!cookie) {
    return null;
  }

  const session = await decrypt(cookie);

  return session && session.sub ? Number(session.sub) : null;
}
