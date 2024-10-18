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
import { BANNED_IP_ROUTE_ID } from "./utils/constants";

const routesMonitor = {
  DeliveryIssueCreate: "/api/delivery-issue",
  DeliveryIssue_Find: "/api/delivery-issue/find",
  Contact: "/api/contact",
  Waitlist: "/api/waitlist",
  Partner: "/api/partner",
  Revalidate: "/api/revalidate",
  ExitPreview: "/api/exit-preview",
  Preview: "/api/preview",
  ForTest: "/api/test",
  FetchIpAdress: BANNED_IP_ROUTE_ID,
} as const;

const bannedIpAddresses = [
  //
  "102.88.83.109",
  "172.176.75.89",
  "20.169.168.224",
  "52.165.149.97",
  //
  "197.210.28.176",
];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const pathname = new URL(request.url).pathname;

    // console.log({ url: request.url, pathname });

    if (request.method.toUpperCase() === "POST") {
      const recordData = await request.json();

      // console.log(JSON.stringify({ recordData, AppConfig: AppConfig() }));

      if (pathname === routesMonitor.DeliveryIssueCreate) {
        const result = await DeliveryIssuesApiService.createRecordBase({ recordData });
        return NextResponse.json(result);
      }

      if (pathname === routesMonitor.DeliveryIssue_Find) {
        const query = recordData as IQueryParameters<IDeliveryIssue>;

        const result = await DeliveryIssuesApiService.findRecordBase({ query });
        return NextResponse.json(result);
      }

      if (pathname === routesMonitor.Waitlist) {
        const result = await WaitlistApiService.createRecordBase({ recordData });
        return NextResponse.json(result);
      }

      if (pathname === routesMonitor.Contact) {
        const result = await ContactApiService.createRecordBase({ recordData });

        return NextResponse.json(result);
      }

      if (pathname === routesMonitor.Partner) {
        const result = await PartnersApiService.createRecordBase({ recordData });
        return NextResponse.json(result);
      }

      if (pathname === routesMonitor.Revalidate) {
        revalidateTag("prismic");

        return NextResponse.json({ revalidated: true, now: Date.now() });
      }

      if (pathname === routesMonitor.FetchIpAdress) {
        const currentIp = request.headers.get("X-Forwarded-For") || request.ip;
        if (currentIp && typeof currentIp === "string" && bannedIpAddresses.includes(currentIp)) {
          return NextResponse.json({ value: false, now: Date.now() });
        }
        return NextResponse.json({ value: true, now: Date.now() });
      }
    }

    if (request.method.toUpperCase() === "GET") {
      if (pathname === routesMonitor.ForTest) {
        return NextResponse.json({ test: true, now: Date.now() });
      }

      if (pathname === routesMonitor.Preview) {
        const client = createClient();

        return await redirectToPreviewURL({ client, request });
      }

      if (pathname === routesMonitor.ExitPreview) {
        return exitPreview();
      }
    }

    return NextResponse.json({ message: "Not found" }, { status: 404 });
  } catch (error) {
    console.error(error);

    try {
      console.log(JSON.stringify({ error }));
    } catch (error) {
      //
    }

    return NextResponse.json({ message: "Error occured" }, { status: 500 });
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/:path*"],
};
