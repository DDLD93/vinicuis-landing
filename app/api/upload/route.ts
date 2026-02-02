import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const ALLOWED_TYPES = ["news", "gallery", "division"];
// Keep under Vercel serverless request body limit (~4.5MB); multipart adds overhead
const MAX_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    const type = (formData.get("type") as string) || "news";

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(type)) {
      return NextResponse.json(
        { error: "Invalid type. Use 'news', 'gallery', or 'division'" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max 4MB per image." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIMES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Use JPEG, PNG, WebP or GIF." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const publicId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload(
        dataUri,
        {
          folder: `vini-web-app/${type}`,
          public_id: publicId,
          resource_type: "image",
        },
        (err, res) => {
          if (err) reject(err);
          else if (res && "secure_url" in res) resolve(res as { secure_url: string });
          else reject(new Error("Upload failed"));
        }
      );
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "object" && err !== null && "message" in err && typeof (err as { message: unknown }).message === "string"
          ? (err as { message: string }).message
          : "Upload failed";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
