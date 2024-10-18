import { NextResponse, NextRequest } from "next/server";
const bannedIpAddresses = [
  //
  "102.88.83.109",
  "172.176.75.89",
  "20.169.168.224",
  "52.165.149.97",
  //
  "197.210.28.176",
];

export async function POST(request: NextRequest) {
  const plainIp = request.headers.get("x-forwarded-for") || request.headers.get("X-Forwarded-For") || request?.ip;
  const realIp = request.headers.get("x-real-ip");

  console.log({ plainIp, bannedIpAddresses });

  const currentIp = (plainIp || realIp || "").trim();

  if (currentIp && typeof currentIp === "string" && bannedIpAddresses.includes(currentIp)) {
    return NextResponse.json({ value: false, currentIp, realIp, plainIp, now: Date.now() });
  }
  return NextResponse.json({ value: true, now: Date.now() });
}
