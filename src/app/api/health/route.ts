import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";

export async function GET() {
  try {
    const conn = await connect();
    const state = conn.connection.readyState;
    // 1 = connected, 2 = connecting, 3 = disconnecting, 0 = disconnected
    const connected = state === 1;
    return NextResponse.json({
      connected,
      mongodb: connected ? "connected" : `state ${state}`,
      db: conn.connection.db?.databaseName ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { connected: false, error: message },
      { status: 503 }
    );
  }
}
