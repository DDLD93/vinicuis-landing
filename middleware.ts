import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTokenFromCookie, verifyToken, COOKIE_NAME } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value ?? getTokenFromCookie(request.headers.get("cookie"));
    if (token) {
      try {
        const payload = await verifyToken(token);
        if (payload) {
          return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
      } catch {
        // invalid or missing secret; allow login page
      }
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value ?? getTokenFromCookie(request.headers.get("cookie"));
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  let payload;
  try {
    payload = await verifyToken(token);
  } catch {
    payload = null;
  }
  if (!payload) {
    const res = NextResponse.redirect(new URL("/admin/login", request.url));
    res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
    return res;
  }

  // Users module is superadmin-only
  if (pathname.startsWith("/admin/users") && payload.role !== "superadmin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
