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
  ForTest: "/api/test",
  Banned: "/banned_faa41b67a500c5885cc4c0f0f8bd",
} as const;

const bannedIpAddresses = [
  //
  "102.88.83.109",
  "172.176.75.89",
  "20.169.168.224",
  "52.165.149.97",
  //
  // "::1",
];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const plainIp = request.headers.get("x-forwarded-for");
    const plainIp_02 = request.headers.get("X-Forwarded-For");
    const realIp = request.headers.get("x-real-ip");
    const request_ip = request.ip;
    const pathname = new URL(request.url).pathname;

    const currentIp =
      (plainIp || plainIp_02 || request.ip || realIp || "")
        .split(",")
        ?.map((f) => f?.trim())?.[0]
        ?.trim() || "";

    try {
      console.log(
        JSON.stringify({
          currentIp,
          pathname,
          realIp,
          plainIp_02,
          plainIp,
          request_ip,
          headers: request.headers,
          geo: request.geo,
          method: request.method,
          ip: request.ip,
          url: request.url,
          body: request.body,
          mode: request.mode,
        }),
      );
    } catch (error) {
      //
    }

    if (currentIp && typeof currentIp === "string" && bannedIpAddresses.includes(currentIp)) {
      return NextResponse.redirect(new URL(routesMonitor.Banned, request.url));
    }

    if (pathname === routesMonitor.Banned) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!pathname.startsWith("/api")) {
      return NextResponse.next();
    }

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
  matcher: [
    "/api/:path*",
    "/blog/:path*",
    "/",
    "/contact",
    "/partnership",
    "/slice-simulator",
    "/banned_faa41b67a500c5885cc4c0f0f8bd",
  ],
};
