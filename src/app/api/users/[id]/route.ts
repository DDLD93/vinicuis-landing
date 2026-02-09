import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import { getSession } from "@/lib/auth";
import { UserModel } from "@/lib/models/User";
import { toAdminUser } from "@/lib/models/User";
import { hashPassword } from "@/lib/users";
import mongoose from "mongoose";
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

/** GET /api/users/[id] — get one user (superadmin only) */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const err = await requireSuperadmin(request);
  if (err) return err;
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }
  try {
    await connect();
    const doc = await UserModel.findById(id).select("-passwordHash").lean();
    if (!doc) return NextResponse.json({ error: "User not found" }, { status: 404 });
    const user = toAdminUser(doc as Parameters<typeof toAdminUser>[0]);
    return NextResponse.json(user);
  } catch (e) {
    console.error("User get error:", e);
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}

/** PATCH /api/users/[id] — update user (superadmin only) */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const err = await requireSuperadmin(request);
  if (err) return err;
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : undefined;
    const role = body.role === "superadmin" || body.role === "admin" ? (body.role as UserRole) : undefined;
    const password = typeof body.password === "string" ? body.password.trim() : undefined;

    if (password !== undefined && password.length > 0 && password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    await connect();
    const doc = await UserModel.findById(id);
    if (!doc) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (name !== undefined) doc.name = name;
    if (role !== undefined) doc.role = role;
    if (password !== undefined && password.length > 0) {
      doc.passwordHash = await hashPassword(password);
    }
    await doc.save();

    const updated = await UserModel.findById(id).select("-passwordHash").lean();
    const user = toAdminUser(updated as Parameters<typeof toAdminUser>[0]);
    return NextResponse.json(user);
  } catch (e) {
    console.error("User update error:", e);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

/** DELETE /api/users/[id] — delete user (superadmin only) */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const err = await requireSuperadmin(request);
  if (err) return err;
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }
  try {
    const session = await getSession(request);
    if (session?.email) {
      const doc = await UserModel.findById(id).select("email").lean();
      if (doc?.email === session.email) {
        return NextResponse.json(
          { error: "You cannot delete your own account" },
          { status: 400 }
        );
      }
    }

    await connect();
    const doc = await UserModel.findByIdAndDelete(id);
    if (!doc) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("User delete error:", e);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
