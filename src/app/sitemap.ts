import type { MetadataRoute } from "next";
import { documents } from "@/lib/documents";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
    },
    ...documents.map((document) => ({
      url: `${SITE_URL}/documents/${document.slug}`,
      lastModified: new Date(),
    })),
  ];
}
