import { NextResponse, NextRequest } from "next/server";
import { ContactApiService } from "@/airtable/tables/contact";

export async function POST(request: Request) {
  const recordData = await request.json();

  const result = await ContactApiService.createRecordBase({ recordData });

  return NextResponse.json(result);
}
