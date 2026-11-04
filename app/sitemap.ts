import type { MetadataRoute } from "next";
import { INSIGHTS } from "@/content/insights";
import { PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/insights",
    "/accessibility",
    ...PROJECTS.map(({ slug }) => `/work/${slug}`),
    ...INSIGHTS.map(({ slug }) => `/insights/${slug}`),
  ];
  return paths.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
