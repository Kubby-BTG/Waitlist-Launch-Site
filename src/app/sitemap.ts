import type { MetadataRoute } from "next";
import { AppConfig, DefinedRoutes } from "../utils/constants";

type ISitemap = Required<MetadataRoute.Sitemap[number]>;

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap01: ISitemap[] = [];
  const siteBaseUrl = (AppConfig().CURRENT_SITE_URL || "").trim();

  Object.values(DefinedRoutes).forEach((route) => {
    if (route && typeof route === "string") {
      const sitemapItem: ISitemap = {
        url: [siteBaseUrl, route].join(""),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {},
      };

      if (route === DefinedRoutes.home) {
        sitemapItem.priority = 1;
        //
      } else if (route === DefinedRoutes.partnership) {
        sitemapItem.priority = 0.9;
        //
      } else if (route === DefinedRoutes.contact) {
        sitemapItem.priority = 0.5;
        //
      }
      // else if (route === DefinedRoutes.privacyPolicy) {
      //   sitemapItem.priority = 0.2;
      // }
      sitemap01.push(sitemapItem);
    }
  });

  const sitemap02 = sitemap01.sort((a, b) => {
    return a.priority > b.priority ? -1 : 1;
  });

  return sitemap02;
}
