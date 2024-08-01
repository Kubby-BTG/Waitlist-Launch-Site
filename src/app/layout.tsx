import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { createClient } from "@/prismicio";
import Header from "@/components/global/header";
import Footer from "@/components/global/footer";
import AnimatedLayout from "@/components/animated-ui/animated-layout";
import ExitAnimationWrapper from "@/components/animated-ui/exit-animation-wrapper";

const DMSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const TTBluescreens = localFont({
  src: "../fonts/tt-bluescreens-trial-webfont/TT Bluescreens Trial ExtraBold.woff",
  weight: "800",
  variable: "--font-tt-bluescreens",
});

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
    <html lang="en" className={"scroll-smooth"}>
      <body
        className={cn(DMSans.variable, TTBluescreens.variable, "font-sans")}
      >
        <AnimatedLayout>
          <>
            <Header />
            {children}
            <Footer />
            <ExitAnimationWrapper />
          </>
        </AnimatedLayout>
      </body>
    </html>
  );
}
