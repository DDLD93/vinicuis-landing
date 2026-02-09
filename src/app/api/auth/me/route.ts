import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

/** GET /api/auth/me — current user from session cookie */
export async function GET(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    email: session.email,
    role: session.role,
  });
}
