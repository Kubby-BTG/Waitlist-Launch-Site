import { NextResponse, NextRequest } from "next/server";
import { WaitlistApiService } from "@/airtable/tables/waitlist";

export async function POST(request: Request) {
  const recordData = await request.json();

  const result = await WaitlistApiService.createRecordBase({ recordData });

  return NextResponse.json({ data: result });
}
