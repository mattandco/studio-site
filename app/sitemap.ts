import type { MetadataRoute } from "next";
import { getContent } from "@/content/i18n";
import { SITE } from "@/content/site";
import { LANGUAGES, localePath } from "@/lib/languages";

export default function sitemap(): MetadataRoute.Sitemap {
  const { projects, insights } = getContent("en");
  const paths = [
    "/",
    "/insights",
    "/accessibility",
    ...projects.map(({ slug }) => `/work/${slug}`),
    ...insights.map(({ slug }) => `/insights/${slug}`),
  ];
  const address = (code: (typeof LANGUAGES)[number]["code"], path: string) =>
    `${SITE.url}${localePath(code, path) === "/" ? "" : localePath(code, path)}`;
  return LANGUAGES.flatMap(({ code }) =>
    paths.map((path) => ({
      url: address(code, path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(LANGUAGES.map((item) => [item.htmlLang, address(item.code, path)])),
      },
    }))
  );
}
