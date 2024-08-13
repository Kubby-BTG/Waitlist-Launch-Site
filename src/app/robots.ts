import { MetadataRoute } from "next";
import { AppConfig } from "../utils/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/slice-simulator/"],
    },
    sitemap: [AppConfig().CURRENT_SITE_URL, "sitemap.xml"].join("/"),
  };
}
