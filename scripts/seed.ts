/**
 * Seed script: inserts static news, gallery, divisions, and admin users into MongoDB.
 * Run with: npm run seed  (or npx tsx scripts/seed.ts)
 * Ensure MONGODB_URI is set in .env or in the environment.
 */
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
import mongoose from "mongoose";
import { newsArticles } from "../src/data/newsData";
import { galleryItems } from "../src/data/galleryData";
import { divisions } from "../src/data/divisionsData";
import { NewsModel } from "../src/lib/models/News";
import { GalleryModel } from "../src/lib/models/Gallery";
import { DivisionModel } from "../src/lib/models/Division";
import { UserModel } from "../src/lib/models/User";
import { hashPassword } from "../src/lib/users";

const DIVISION_ICON_ORDER = ["Shield", "Building2", "Plane", "Server", "Car", "Wheat", "Pill", "Trophy"];

/** Default password for seeded admin users (change in production). */
const SEED_ADMIN_PASSWORD = "admin123";

const SEED_USERS = [
  { email: "admin@example.com", name: "Admin User", role: "admin" as const, password: SEED_ADMIN_PASSWORD },
  { email: "editor@example.com", name: "Editor", role: "admin" as const, password: SEED_ADMIN_PASSWORD },
  { email: "admin@system.com", name: "Superadmin", role: "superadmin" as const, password: "0987654321" },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Add it to .env or set the env var.");
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log("Connected to MongoDB.");

  const newsPayload = newsArticles.map(({ id: _id, ...rest }) => rest);
  const galleryPayload = galleryItems.map(({ id: _id, ...rest }) => rest);
  const divisionsPayload = divisions.map((d, i) => ({
    slug: d.slug,
    title: d.title,
    subtitle: d.subtitle,
    description: d.description,
    image: d.image,
    icon: DIVISION_ICON_ORDER[i] ?? "Shield",
    detailedContent: d.detailedContent,
  }));

  await NewsModel.deleteMany({});
  await NewsModel.insertMany(newsPayload);
  console.log(`Inserted ${newsPayload.length} news articles.`);

  await GalleryModel.deleteMany({});
  await GalleryModel.insertMany(galleryPayload);
  console.log(`Inserted ${galleryPayload.length} gallery items.`);

  await DivisionModel.deleteMany({});
  await DivisionModel.insertMany(divisionsPayload);
  console.log(`Inserted ${divisionsPayload.length} divisions.`);

  // Seed admin users (normal admins; superadmin is from env only)
  for (const u of SEED_USERS) {
    const existing = await UserModel.findOne({ email: u.email });
    if (existing) {
      console.log(`User ${u.email} already exists, skipping.`);
      continue;
    }
    const passwordHash = await hashPassword(u.password);
    await UserModel.create({
      email: u.email,
      passwordHash,
      name: u.name,
      role: u.role,
    });
    console.log(`Created user: ${u.email} (role: ${u.role})`);
  }
  console.log("Seeded admin users. Default password for seeded users: " + SEED_ADMIN_PASSWORD);

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    console.log("\nSuperadmin login (env): use ADMIN_EMAIL and ADMIN_PASSWORD from .env");
    console.log(`  Email: ${adminEmail}`);
  } else {
    console.log("\nSuperadmin: set ADMIN_EMAIL and ADMIN_PASSWORD in .env to sign in as superadmin at /admin/login");
  }
  console.log("Normal admins: use seeded emails (e.g. admin@example.com) with password: " + SEED_ADMIN_PASSWORD);

  await mongoose.disconnect();
  console.log("\nSeed complete. Disconnected.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
