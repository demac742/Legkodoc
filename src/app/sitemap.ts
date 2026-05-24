import type { MetadataRoute } from "next";
import { documents } from "@/lib/documents";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...documents.map((document) => ({
      url: `${baseUrl}/documents/${document.slug}`,
      lastModified: new Date(),
    })),
  ];
}
