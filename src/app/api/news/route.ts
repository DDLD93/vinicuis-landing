import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { getNewsArticles } from "@/lib/actions/news";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const sort = (searchParams.get("sort") as "asc" | "desc") || "desc";
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    const cacheKey = ["public-news", String(limitNum ?? "all"), sort];

    const articles = await unstable_cache(
      () => getNewsArticles({ limit: limitNum, sort }),
      cacheKey,
      { revalidate: 60 }
    )();

    const headers = new Headers();
    headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=60"
    );

    return NextResponse.json(articles, { headers });
  } catch (err) {
    if (
      err instanceof Error &&
      err.message.includes("MONGODB_URI")
    ) {
      return NextResponse.json([], { status: 200 });
    }
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
