import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.identity.canonical, lastModified: site.identity.lastModified, changeFrequency: "monthly", priority: 1 }];
}
