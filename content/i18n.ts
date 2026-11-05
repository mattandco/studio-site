import type { Lang } from "@/lib/languages";
import ar from "./translations/ar.json";
import en from "./translations/en.json";
import es from "./translations/es.json";
import fr from "./translations/fr.json";
import ru from "./translations/ru.json";
import zh from "./translations/zh.json";

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "list"; items: string[] };

export type Insight = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  summary: string;
  inShort: string[];
  lead: string;
  body: Block[];
  sources: { title: string; href: string }[];
};

export type Project = {
  slug: string;
  name: string;
  type: string;
  year: string;
  scope: string;
  line: string;
  languages: string;
  status: { label: string; text: string; href?: string };
  summary: string;
  cardImage: { src: string };
  detailImage: { src: string; alt: string; caption: string };
  figures: { value: string; label: string }[];
  challenge: string[];
  goals: string[];
  decisions: { title: string; text: string }[];
  brand?: {
    intro: string[];
    reasons: { title: string; text: string }[];
    guidelines: string[];
  };
  beforeAfter: { label: string; before: string; after: string }[];
  results: string[];
  lessons: string[];
  standards: { label: string; value: string }[];
  clientTeam: string;
  next: string;
};

export type Content = Omit<typeof en, "projects" | "insights"> & {
  projects: Project[];
  insights: Insight[];
};

// Every figure in the projects comes from a dated measurement in the project's
// own records, or from a test of the live site. Name only what each client has
// cleared for publication. Translations are checked by scripts/check-translations.mjs.
const CONTENT = { ar, en, es, fr, ru, zh } as unknown as Record<Lang, Content>;

export const getContent = (lang: Lang) => CONTENT[lang];

export const getProject = (lang: Lang, slug: string) =>
  CONTENT[lang].projects.find((project) => project.slug === slug);

export function nextProject(lang: Lang, slug: string) {
  const { projects } = CONTENT[lang];
  return projects[(projects.findIndex((project) => project.slug === slug) + 1) % projects.length];
}

export const getInsight = (lang: Lang, slug: string) =>
  CONTENT[lang].insights.find((insight) => insight.slug === slug);

/** Worked out from the English text, so every language shows the same figure. */
export function readingMinutes(slug: string) {
  const insight = CONTENT.en.insights.find((item) => item.slug === slug);
  if (!insight) return 1;
  const text = [
    insight.lead,
    ...insight.body.flatMap((block) => (block.kind === "list" ? block.items : [block.text])),
  ].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}
