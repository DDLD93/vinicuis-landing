import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { getGalleryItems } from "@/lib/actions/gallery";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    const cacheKey = ["public-gallery", String(limitNum ?? "all")];

    const items = await unstable_cache(
      () => getGalleryItems({ limit: limitNum }),
      cacheKey,
      { revalidate: 60 }
    )();

    const headers = new Headers();
    headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=60"
    );

    return NextResponse.json(items, { headers });
  } catch (err) {
    if (
      err instanceof Error &&
      err.message.includes("MONGODB_URI")
    ) {
      return NextResponse.json([], { status: 200 });
    }
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}
