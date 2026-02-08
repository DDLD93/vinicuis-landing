import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const ALLOWED_TYPES = ["news", "gallery", "division"];
// Keep under Vercel serverless request body limit (~4.5MB); multipart adds overhead
const MAX_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const extensionFromMime: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function getPublicUrl(
  bucket: string,
  region: string,
  key: string,
  baseUrl?: string,
  pathStyle = false
): string {
  if (baseUrl) {
    const base = baseUrl.replace(/\/$/, "");
    if (pathStyle) return `${base}/${bucket}/${key}`;
    return `${base}/${key}`;
  }
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

/** Parse custom endpoint (e.g. https://minio.viniciusint.com) to hostname for S3Client */
function getEndpointHost(s3Url: string): string {
  try {
    const u = new URL(s3Url.startsWith("http") ? s3Url : `https://${s3Url}`);
    return u.origin;
  } catch {
    return "";
  }
}

export async function POST(request: NextRequest) {
  try {
    const bucket = process.env.S3_BUCKET;
    const region = process.env.AWS_REGION || "us-east-1";
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const s3Url = process.env.S3_URL; // optional custom endpoint (e.g. MinIO: https://minio.viniciusint.com)
    const publicBaseUrl = process.env.S3_PUBLIC_BASE_URL || s3Url; // public URL for image links

    if (!bucket || !accessKeyId || !secretAccessKey) {
      return NextResponse.json(
        {
          error:
            "S3 is not configured. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and S3_BUCKET. Optionally AWS_REGION and S3_URL for custom endpoints (e.g. MinIO).",
        },
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
    const ext =
      extensionFromMime[file.type] ||
      (file.name && /\.(jpe?g|png|webp|gif)$/i.test(file.name)
        ? file.name.replace(/.*\./, "").toLowerCase()
        : "jpg");
    const key = `vini-web-app/${type}/${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;

    const endpoint = s3Url ? getEndpointHost(s3Url) : undefined;
    const client = new S3Client({
      region,
      credentials: { accessKeyId, secretAccessKey },
      ...(endpoint
        ? { endpoint, forcePathStyle: true }
        : {}),
    });

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        ACL: "public-read",
      })
    );

    const url = getPublicUrl(
      bucket,
      region,
      key,
      publicBaseUrl || undefined,
      !!endpoint
    );

    return NextResponse.json({ url });
  } catch (err) {
    console.error("Upload error:", err);
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "object" &&
            err !== null &&
            "message" in err &&
            typeof (err as { message: unknown }).message === "string"
          ? (err as { message: string }).message
          : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
