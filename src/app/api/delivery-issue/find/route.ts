import { NextResponse } from "next/server";
import { DeliveryIssuesApiService } from "@/airtable/tables/delivery-issue";
import { IDeliveryIssue, IQueryParameters } from "@/airtable/types";

export async function POST(req: Request) {
  const query = (await req.json()) as IQueryParameters<IDeliveryIssue>;

  const result = await DeliveryIssuesApiService.findRecordBase({ query });
  return NextResponse.json(result);
}
