import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { createClient } from "@/prismicio";

const DMSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title || "Kubby",
    description: settings.data.meta_description || "Kubby description",
    openGraph: {
      images: [settings.data.og_image.url || ""],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(DMSans.variable, "font-sans")}>
        <header>
          <div className="flex bg-background-invert text-white items-center gap-2 justify-center py-3">
            <p className="sm:font-bold">Issue with your delivery {">"}</p>
            <a href="/" className={"font-bold text-secondary underline"}>
              Report it here
            </a>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
