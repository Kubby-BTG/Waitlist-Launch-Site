import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export function GET() {
  return NextResponse.json({ revalidated: true, now: Date.now() });
}