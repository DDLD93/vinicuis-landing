import mongoose from "mongoose";

export type UserRole = "superadmin" | "admin";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface IUserDoc {
  _id: mongoose.Types.ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new mongoose.Schema<IUserDoc>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "", trim: true },
    role: { type: String, enum: ["superadmin", "admin"], default: "admin" },
  },
  { timestamps: true }
);

export const UserModel: mongoose.Model<IUserDoc> =
  (mongoose.models.User as mongoose.Model<IUserDoc>) ?? mongoose.model<IUserDoc>("User", UserSchema);

export function toAdminUser(doc: {
  _id: mongoose.Types.ObjectId;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: Date | string;
}): AdminUser {
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name ?? "",
    role: doc.role,
    createdAt: typeof doc.createdAt === "string" ? doc.createdAt : doc.createdAt.toISOString(),
  };
}
