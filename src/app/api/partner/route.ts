import { NextResponse } from "next/server";
import { PartnersApiService } from "@/airtable/partner";

export async function POST(req: Request) {
  const recordData = await req.json();

  const result = await PartnersApiService.createRecordBase({ recordData });
  return NextResponse.json({ data: result });
}
