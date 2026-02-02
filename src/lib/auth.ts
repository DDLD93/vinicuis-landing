import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";
const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export { COOKIE_NAME };

export type UserRole = "superadmin" | "admin";
export type AuthPayload = { email: string; sub: string; role: UserRole };

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set and at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

export async function createToken(payload: AuthPayload, maxAgeSeconds = DEFAULT_MAX_AGE): Promise<string> {
  const secret = getSecret();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + maxAgeSeconds)
    .sign(secret);
}

export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const secret = getSecret();
    const { payload } = await jwtVerify(token, secret);
    if (typeof payload.sub !== "string" || typeof payload.email !== "string") return null;
    const role = payload.role === "superadmin" || payload.role === "admin" ? payload.role : "admin";
    return { sub: payload.sub, email: payload.email, role };
  } catch {
    return null;
  }
}

export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function buildAuthCookie(token: string, maxAgeSeconds = DEFAULT_MAX_AGE): string {
  const isProd = process.env.NODE_ENV === "production";
  return [
    `${COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    `Max-Age=${maxAgeSeconds}`,
    "SameSite=Lax",
    ...(isProd ? ["Secure"] : []),
  ].join("; ");
}

export function buildClearAuthCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`;
}

/** Get current session from request (Cookie header). Use in API routes. */
export async function getSession(request: Request): Promise<AuthPayload | null> {
  const token = getTokenFromCookie(request.headers.get("cookie"));
  if (!token) return null;
  return verifyToken(token);
}

/** Get current session from Next.js cookies(). Use in server actions. */
export async function getSessionFromCookies(): Promise<AuthPayload | null> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
