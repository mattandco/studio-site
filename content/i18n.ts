import type { Lang } from "@/lib/languages";
import { PERSONAL } from "@/lib/website";
import de from "./translations/de.json";
import en from "./translations/en.json";
import es from "./translations/es.json";
import fr from "./translations/fr.json";
import pt from "./translations/pt.json";
import mbDe from "./translations/matthew-bowman/de.json";
import mbEn from "./translations/matthew-bowman/en.json";
import mbEs from "./translations/matthew-bowman/es.json";
import mbFr from "./translations/matthew-bowman/fr.json";
import mbPt from "./translations/matthew-bowman/pt.json";

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

export type Reasoned = { intro: string[]; items: { title: string; text: string }[] };

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
  origin: string[];
  research: Reasoned;
  design: Reasoned;
  wording: Reasoned;
  decisions: { title: string; text: string; link?: Link }[];
  brand?: {
    intro: string[];
    reasons: { title: string; text: string }[];
    guidelines: string[];
  };
  results: string[];
  lessons: string[];
  standards: { label: string; value: string }[];
  clientTeam: string;
  next: string;
  proves: { title: string; text: string }[];
};

export type Link = { text: string; href: string };
export type Question = { q: string; a: string; link?: Link };

export type CareSection = {
  kind: "care";
  id: string;
  label: string;
  statement: string;
  includes: string;
  plans: string[];
  rows: { label: string; values: string[] }[];
  notes: string[];
};

export type ServiceSection =
  | { kind: "rows"; label: string; rows: { title: string; text: string }[]; note?: string }
  | { kind: "note"; label: string; text: string; link?: Link }
  | { kind: "facts"; label: string; items: string[] }
  | { kind: "work"; label: string; project: string; line: string }
  | { kind: "questions"; label: string; items: Question[] }
  | CareSection;

export type ServicePage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  statement: string;
  intro: string[];
  sections: ServiceSection[];
};

export type Content = Omit<typeof en, "projects" | "insights" | "servicePages"> & {
  projects: Project[];
  insights: Insight[];
  servicePages: { label: string; pages: ServicePage[] };
};

// Every figure in the projects comes from a dated measurement in the project's
// own records, or from a test of the live site. Name only what each client has
// cleared for publication. Translations are checked by scripts/check-translations.mjs.
// Matthew's own site has its own wording, in the first person, in translations/matthew-bowman/.
const CONTENT = (
  PERSONAL ? { de: mbDe, en: mbEn, es: mbEs, fr: mbFr, pt: mbPt } : { de, en, es, fr, pt }
) as unknown as Record<Lang, Content>;

export const getContent = (lang: Lang) => CONTENT[lang];

export const getProject = (lang: Lang, slug: string) =>
  CONTENT[lang].projects.find((project) => project.slug === slug);

export function nextProject(lang: Lang, slug: string) {
  const { projects } = CONTENT[lang];
  return projects[(projects.findIndex((project) => project.slug === slug) + 1) % projects.length];
}

export const getServicePage = (lang: Lang, slug: string) =>
  CONTENT[lang].servicePages.pages.find((page) => page.slug === slug);

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
