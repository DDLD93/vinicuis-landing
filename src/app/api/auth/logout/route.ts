import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(COOKIE_NAME);
  res.cookies.set(COOKIE_NAME, "", { path: "/", httpOnly: true, maxAge: 0, sameSite: "lax" });
  return res;
}
