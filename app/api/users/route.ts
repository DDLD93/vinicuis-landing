import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import { getSession } from "@/lib/auth";
import { UserModel } from "@/lib/models/User";
import { toAdminUser } from "@/lib/models/User";
import { hashPassword } from "@/lib/users";
import type { UserRole } from "@/lib/models/User";

async function requireSuperadmin(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "superadmin") {
    return NextResponse.json({ error: "Forbidden. Superadmin only." }, { status: 403 });
  }
  return null;
}

/** GET /api/users — list all users (superadmin only) */
export async function GET(request: NextRequest) {
  const err = await requireSuperadmin(request);
  if (err) return err;
  try {
    await connect();
    const docs = await UserModel.find({}).select("-passwordHash").sort({ createdAt: -1 }).lean();
    const users = docs.map((d) => toAdminUser(d as Parameters<typeof toAdminUser>[0]));
    return NextResponse.json(users);
  } catch (e) {
    console.error("Users list error:", e);
    return NextResponse.json({ error: "Failed to list users" }, { status: 500 });
  }
}

/** POST /api/users — create user (superadmin only) */
export async function POST(request: NextRequest) {
  const err = await requireSuperadmin(request);
  if (err) return err;
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const role = (body.role === "superadmin" ? "superadmin" : "admin") as UserRole;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    await connect();
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const doc = await UserModel.create({
      email,
      passwordHash,
      name,
      role,
    });
    const user = toAdminUser({
      _id: doc._id,
      email: doc.email,
      name: doc.name ?? "",
      role: doc.role,
      createdAt: doc.createdAt,
    });
    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    console.error("User create error:", e);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
