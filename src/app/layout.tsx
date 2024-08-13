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
import { AppConfig, AppDescription, ApplicationAuthor, ApplicationKeyword, ApplicationSiteName } from "../utils/constants";

const DMSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const TTBluescreens = localFont({
  src: "../fonts/tt-bluescreens-trial-webfont/TT-Bluescreens-Trial-ExtraBold.woff",
  weight: "800",
  variable: "--font-tt-bluescreens",
});

const metadataData: Metadata = {
  title: {
    template: `%s | ${ApplicationSiteName}`,
    default: "Kubby",
  },
  metadataBase: new URL(AppConfig().CURRENT_SITE_URL),
  keywords: Array.from(new Set(ApplicationKeyword)),
  // alternates: {
  //   canonical: "/",
  //   languages: {
  //     "en-US": "/en-US",
  //     "de-DE": "/de-DE",
  //   },
  // },
  twitter: {
    card: "summary_large_image",
    description: AppDescription,
    creator: ApplicationAuthor,
    images: "/twitter-image.png",
    title: ApplicationSiteName,
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    images: "/opengraph-image.png",
    type: "website",

    siteName: ApplicationSiteName,
    title: ApplicationSiteName,
    description: AppDescription,
    // phoneNumbers: AppConfig.CONTACT_PHONE_NUMBER_01,
    // emails: AppConfig.CONTACT_EMAIL,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const settings = await client.getSingle("settings");

  // return {
  //   ...metadataData,
  //   title: settings.data.site_title || metadataData.title,
  //   description: settings.data.meta_description || "Kubby description",
  //   openGraph: {
  //     images: [settings.data.og_image.url || ""],
  //   },
  // };

  return {
    title: {
      template: `%s | ${ApplicationSiteName}`,
      default: "Kubby",
    },
    metadataBase: new URL(AppConfig().CURRENT_SITE_URL),
    keywords: Array.from(new Set(ApplicationKeyword)),
    // alternates: {
    //   canonical: "/",
    //   languages: {
    //     "en-US": "/en-US",
    //     "de-DE": "/de-DE",
    //   },
    // },
    twitter: {
      card: "summary_large_image",
      description: AppDescription,
      creator: ApplicationAuthor,
      images: "/twitter-image.png",
      title: ApplicationSiteName,
    },
    icons: {
      icon: "/icon.png",
      apple: "/apple-icon.png",
    },
    openGraph: {
      images: "/opengraph-image.png",
      type: "website",

      siteName: ApplicationSiteName,
      title: ApplicationSiteName,
      description: AppDescription,
      // phoneNumbers: AppConfig.CONTACT_PHONE_NUMBER_01,
      // emails: AppConfig.CONTACT_EMAIL,
    },
  } satisfies Metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"scroll-smooth"}>
      <body className={cn([DMSans.variable, TTBluescreens.variable, "font-sans"])}>
        {/* <AnimatedLayout> */}
        <Header />
        {children}
        <Footer />
        {/* <ExitAnimationWrapper /> */}
        {/* </AnimatedLayout> */}
      </body>
    </html>
  );
}
