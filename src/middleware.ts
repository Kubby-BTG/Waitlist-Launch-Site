import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DeliveryIssuesApiService } from "./airtable/tables/delivery-issue";
import { IQueryParameters, IDeliveryIssue } from "./airtable/types";
import { ContactApiService } from "./airtable/tables/contact";
import { PartnersApiService } from "./airtable/tables/partner";
import { revalidateTag } from "next/cache";

import { exitPreview, redirectToPreviewURL } from "@prismicio/next";
import { createClient } from "./prismicio";
import { WaitlistApiService } from "./airtable/tables/waitlist";

const routesMonitor = {
  DeliveryIssueCreate: "/api/delivery-issue",
  DeliveryIssue_Find: "/api/delivery-issue/find",
  Contact: "/api/contact",
  Waitlist: "/api/waitlist",
  Partner: "/api/partner",
  Revalidate: "/api/revalidate",
  ExitPreview: "/api/exit-preview",
  Preview: "/api/preview",
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname;

  console.log({ url: request.url, pathname });

  if (request.method.toUpperCase() === "POST") {
    if (pathname === routesMonitor.DeliveryIssueCreate) {
      const recordData = await request.json();
      const result = await DeliveryIssuesApiService.createRecordBase({ recordData });
      return NextResponse.json(result);
    }

    if (pathname === routesMonitor.DeliveryIssue_Find) {
      const query = (await request.json()) as IQueryParameters<IDeliveryIssue>;

      const result = await DeliveryIssuesApiService.findRecordBase({ query });
      return NextResponse.json(result);
    }

    if (pathname === routesMonitor.Waitlist) {
      const recordData = await request.json();
      const result = await WaitlistApiService.createRecordBase({ recordData });
      return NextResponse.json(result);
    }

    if (pathname === routesMonitor.Contact) {
      const recordData = await request.json();

      const result = await ContactApiService.createRecordBase({ recordData });

      return NextResponse.json(result);
    }

    if (pathname === routesMonitor.Partner) {
      const recordData = await request.json();

      const result = await PartnersApiService.createRecordBase({ recordData });
      return NextResponse.json(result);
    }

    if (pathname === routesMonitor.Revalidate) {
      revalidateTag("prismic");

      return NextResponse.json({ revalidated: true, now: Date.now() });
    }
  }

  if (request.method.toUpperCase() === "GET") {
    if (pathname === routesMonitor.Preview) {
      const client = createClient();

      return await redirectToPreviewURL({ client, request });
    }

    if (pathname === routesMonitor.ExitPreview) {
      return exitPreview();
    }
  }

  return NextResponse.next({ status: 404, statusText: "Not found" });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/:path*"],
};
