import { NextResponse } from "next/server";
import { DeliveryIssuesApiService } from "@/airtable/delivery-issue";

export async function POST(req: Request) {
  // const { searchParams } = new URL(request.url);

  const recordData = await req.json();

  const result = await DeliveryIssuesApiService.createRecordBase(recordData);
  return NextResponse.json({ data: result });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = await DeliveryIssuesApiService.findRecordBase({
    pageSize: 20,
  });
  return NextResponse.json({ data: result });
}
