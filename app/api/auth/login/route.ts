import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import { createToken, COOKIE_NAME, type UserRole } from "@/lib/auth";
import { UserModel } from "@/lib/models/User";
import { verifyPassword } from "@/lib/users";


const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function redirectToLogin(request: NextRequest, error: string) {
  const url = new URL("/admin/login", request.url);
  url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}

function redirectToDashboard(request: NextRequest, token: string) {
  const redirectUrl = new URL("/admin/dashboard", request.url);
  const res = NextResponse.redirect(redirectUrl);
  const expiresAt = new Date(Date.now() + COOKIE_MAX_AGE * 1000);
  const isProd = process.env.NODE_ENV === "production";
  // Per Next.js auth docs: httpOnly, secure, sameSite, path, expires
  res.cookies.set(COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    expires: expiresAt,
    maxAge: COOKIE_MAX_AGE,
  });
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  res.headers.set("Pragma", "no-cache");
  return res;
}

export async function POST(request: NextRequest) {
  try {
    let email: string;
    let password: string;
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await request.json();
      email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      password = typeof body.password === "string" ? body.password.trim() : "";
    } else {
      const form = await request.formData();
      email = (form.get("email") as string)?.trim?.()?.toLowerCase?.() ?? "";
      password = (form.get("password") as string)?.trim?.() ?? "";
    }

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD?.trim();

    if (!email || !password) {
      return redirectToLogin(request, "Email and password are required.");
    }

    let role: UserRole = "admin";

    // 1. Superadmin from env (optional)
    if (adminEmail && adminPassword && email === adminEmail && password === adminPassword) {
      role = "superadmin";
    } else {
      // 2. Admin users from DB
      await connect();
      const user = await UserModel.findOne({ email } as { email: string }).select("passwordHash role").lean();
      if (!user || !(await verifyPassword(password, user.passwordHash))) {
        return redirectToLogin(request, "Invalid email or password.");
      }
      role = (user.role === "superadmin" ? user.role : "admin") as UserRole;
    }

    const token = await createToken({ email, sub: email, role });
    return redirectToDashboard(request, token);
  } catch (err) {
    console.error("Login error:", err);
    const message = err instanceof Error ? err.message : "";
    if (message.includes("JWT_SECRET")) {
      return redirectToLogin(request, "Server auth not configured. Set JWT_SECRET in .env (min 32 characters).");
    }
    return redirectToLogin(request, "Login failed.");
  }
}
