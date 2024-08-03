import { NextResponse, NextRequest } from "next/server";
import { WaitlistApiService } from "@/airtable/waitlist";

export async function POST(request: Request) {
  const recordData = await request.json();
  const result = await WaitlistApiService.createRecordBase(recordData);
  return NextResponse.json({ data: result });
}

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  const result = await WaitlistApiService.findRecordBase();
  return NextResponse.json({ data: result });
}

// export async function K__GET(request: NextRequest) {
//   const requestHeaders = new Headers(request.headers);
// }
