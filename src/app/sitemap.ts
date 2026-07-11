import type { MetadataRoute } from "next";
import { site, workItems } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.identity.canonical, lastModified: site.identity.lastModified, changeFrequency: "monthly", priority: 1 },
    ...workItems.map((project) => ({
      url: `${site.identity.canonical}/work/${project.slug}`,
      lastModified: site.identity.lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
