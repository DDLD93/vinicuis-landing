"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import connect from "@/lib/mongodb";
import { createToken, COOKIE_NAME, type UserRole } from "@/lib/auth";
import { UserModel } from "@/lib/models/User";
import { verifyPassword } from "@/lib/users";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type LoginState = { ok: false; message: string } | null;

/**
 * Login server action: validate email/password, set session cookie, redirect to dashboard.
 * Per Next.js docs, redirect() in a Server Action sends the redirect response; the browser
 * follows it so navigation works reliably on Vercel (no client-side redirect).
 */
export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = (formData.get("email") as string)?.trim?.()?.toLowerCase?.() ?? "";
  const password = (formData.get("password") as string)?.trim?.() ?? "";
  const nextPath = (formData.get("next") as string)?.trim?.() || "/admin/dashboard";

  if (!email || !password) {
    return { ok: false, message: "Email and password are required." };
  }

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  let role: UserRole = "admin";

  // 1. Superadmin from env (optional)
  if (adminEmail && adminPassword && email === adminEmail && password === adminPassword) {
    role = "superadmin";
  } else {
    // 2. Admin users from DB
    try {
      await connect();
    } catch (err) {
      console.error("Login DB connect error:", err);
      return { ok: false, message: "Login failed." };
    }
    const user = await UserModel.findOne({ email }).select("passwordHash role").lean();
    if (!user) {
      return { ok: false, message: "Invalid email or password." };
    }
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return { ok: false, message: "Invalid email or password." };
    }
    if (user.role !== "superadmin" && user.role !== "admin") {
      return { ok: false, message: "Access denied." };
    }
    role = user.role as UserRole;
  }

  let token: string;
  try {
    token = await createToken({ email, sub: email, role });
  } catch (err) {
    console.error("Login token error:", err);
    return { ok: false, message: "Login failed." };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  // Only allow redirect to paths under /admin (per doc)
  const redirectPath =
    nextPath && nextPath.startsWith("/admin") ? nextPath : "/admin/dashboard";
  const url = redirectPath.includes("?")
    ? `${redirectPath}&login=success`
    : `${redirectPath}?login=success`;
  redirect(url);
}
