import { MetadataRoute } from "next";
import { AppConfig } from "../utils/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/banned_faa41b67a500c5885cc4c0f0f8bd/", "/slice-simulator/"],
    },
    sitemap: [AppConfig().CURRENT_SITE_URL, "sitemap.xml"].join("/"),
  };
}
