import { NextResponse } from "next/server";
import { DeliveryIssuesApiService } from "@/airtable/tables/delivery-issue";

export async function POST(req: Request) {
  const recordData = await req.json();

  const result = await DeliveryIssuesApiService.createRecordBase({ recordData });
  return NextResponse.json(result);
}
