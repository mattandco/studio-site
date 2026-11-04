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

export const AUTHOR_NOTE =
  "Written by Matthew Bowman, founder of Nestvested, who has worked in the humanitarian sector since 2010.";

export const INSIGHTS: Insight[] = [
  {
    slug: "website-brief",
    title: "How to write a website brief agencies can quote accurately",
    tag: "Procurement",
    date: "November 2026",
    summary:
      "What to count, what to name and what to decide before a website brief goes out, so the proposals that come back can be compared.",
    inShort: [
      "When quotes come back far apart, each agency has usually guessed at something the brief left out.",
      "Count the page types, the content that has to move, the languages and the connections to other systems.",
      "State your budget range and your scoring in the brief itself.",
    ],
    lead: "When three proposals for the same website come back far apart, it rarely means that two agencies are wrong. It usually means each one guessed at something the brief left out. This piece is for the programme or communications officer who has to write the terms of reference and then compare what comes back.",
    body: [
      { kind: "h", text: "What a terms of reference is for" },
      {
        kind: "p",
        text: "The United Nations Procurement Manual describes a terms of reference as “a description of the scope of work for services, generally indicating the work to be performed, the level of quality and effort, the timeline, and the deliverables”. It adds that the document is often a vendor’s first and main introduction to what you need, and that clear terms limit the risk on both sides.",
      },
      {
        kind: "p",
        text: "The Manual warns in both directions. Over-specification “may increase prices and/or decrease the number of offers”. Under-specification is the opposite failure: essential information is left out. For a website, that second failure is the expensive one. An agency that cannot see how much content has to move will either add a large margin for it or quote low and come back later.",
      },
      {
        kind: "quote",
        text: "When two quotes differ, ask what each agency assumed. The gap is usually in the brief.",
      },
      { kind: "h", text: "What to count before you send it" },
      {
        kind: "list",
        items: [
          "Page types, not pages. List the templates you need: home, article, document, event, country. Design and build cost follows the number of types, not the number of pages.",
          "What has to move. How many pages and documents are on the current site, and which can stay behind. Count them from the content system if you can, because a crawl misses what is not linked.",
          "Languages. Which ones at launch, which later, whether any read right to left, and who does the translating.",
          "Connections. Name each outside system: payments, mailing list, dashboards, single sign-on. Say who holds each account.",
          "Editors. How many people will update the site, how often, and how much training they need.",
          "Standards. The accessibility level, a page-weight limit, where the site may be hosted, and any data protection rules.",
        ],
      },
      { kind: "h", text: "Say how you will decide" },
      {
        kind: "p",
        text: "The Manual says solicitation documents must state the evaluation criteria, and that the balance between technical and commercial scoring must be set before a request for proposals goes out. Follow that even if your own rules do not require it. Agencies write better proposals when they know what will be scored.",
      },
      {
        kind: "p",
        text: "Then give a budget range. It does not weaken your position. It tells each agency what level of work to propose, so you compare answers to the same question. Hold one round of questions, and share every answer with every bidder.",
      },
    ],
    sources: [
      {
        title: "United Nations Procurement Manual (DOS/2020.9), United Nations Department of Operational Support, 2020",
        href: "https://digitallibrary.un.org/record/3954918/files/Procurement_Manual_2020.pdf",
      },
      {
        title: "Web Content Accessibility Guidelines (WCAG) 2.2, W3C, 2023",
        href: "https://www.w3.org/TR/WCAG22/",
      },
      {
        title: "Performance budgets 101, web.dev",
        href: "https://web.dev/articles/performance-budgets-101",
      },
    ],
  },
  {
    slug: "performance-budget",
    title: "A performance budget for sites read on slow connections",
    tag: "Development",
    date: "November 2026",
    summary:
      "How to set a page-weight limit before design starts, and how to measure it so the number means something on a phone with a weak signal.",
    inShort: [
      "Set a page-weight limit before design starts, and treat it as a requirement.",
      "We work to 500 KB a page: about ten seconds at 400 kilobits per second.",
      "Measure each page as it opens, scrolled to the end, and on a high-density phone.",
    ],
    lead: "Field staff often open a website on a phone, on a weak signal, in the middle of something else. If the page takes a minute, it does not get read. This piece is for teams commissioning or building a site for people in low-bandwidth settings, and it sets out how we choose a limit and hold to it.",
    body: [
      { kind: "h", text: "Pick the number first" },
      {
        kind: "p",
        text: "web.dev defines a performance budget as “a set of limits imposed on metrics that affect site performance”. Its suggested starting point is under 170 KB of critical-path resources and under five seconds to interactive, worked out for baseline devices on a 3G network.",
      },
      {
        kind: "p",
        text: "Compare that with the web as it is. The HTTP Archive’s Web Almanac put the median home page in 2025 at 2.86 MB on desktop and 2.56 MB on mobile. On a slow connection of 400 kilobits per second, 2.56 MB takes about 51 seconds to arrive, before any delay from the network itself.",
      },
      {
        kind: "p",
        text: "We work to 500 KB a page. That is about ten seconds at the same speed: slow, but usable. It leaves room for one good photograph and a set of web fonts, which matters when the site also has to look like the organisation that runs it.",
      },
      {
        kind: "quote",
        text: "A budget nobody checks is a wish. It has to be measured, on every release, by someone who can stop the release.",
      },
      { kind: "h", text: "Measure it the way it will fail" },
      {
        kind: "p",
        text: "A single figure from a desktop browser hides most of the problem. These are the checks that have caught real overruns on our projects:",
      },
      {
        kind: "list",
        items: [
          "As it opens. Use an empty cache and count the bytes that travel, not the size of the files on the server.",
          "Scrolled to the end. Lazy loading delays images, it does not remove them. A page can pass as it opens and fail by the bottom.",
          "On a high-density phone. Two-times and three-times screens ask for larger images, so the same page can weigh far more than it does on a laptop.",
          "With JavaScript off. Lazy loading that depends on a script stops, and every image on the page may load at once.",
        ],
      },
      { kind: "h", text: "Put it in the contract" },
      {
        kind: "p",
        text: "Write the limit into the brief, with the method for measuring it. Then each new feature has a price the whole team can see. When something goes over, web.dev gives the three honest choices: optimise it, remove it, or do not add it.",
      },
      {
        kind: "p",
        text: "The discipline pays for itself in the first emergency that sends a new audience to the site on phones and poor connections. By then it is too late to start.",
      },
    ],
    sources: [
      {
        title: "Performance budgets 101, web.dev",
        href: "https://web.dev/articles/performance-budgets-101",
      },
      {
        title: "Page Weight, Web Almanac 2025, HTTP Archive",
        href: "https://almanac.httparchive.org/en/2025/page-weight",
      },
    ],
  },
  {
    slug: "accessible-colour",
    title: "Accessible colour that keeps a brand recognisable",
    tag: "Accessibility",
    date: "November 2026",
    summary:
      "Why most brand palettes fail only in particular pairings, and how giving each colour a job keeps both the brand and the contrast ratio.",
    inShort: [
      "Brand colours rarely fail everywhere. They fail at small sizes and in particular pairings.",
      "Body text needs 4.5:1. Large text and interface parts need 3:1.",
      "Give each colour a job, and test every pair it will appear in.",
    ],
    lead: "Accessibility and branding are often set against each other, as if one has to give way. The real problem is much narrower. This piece is for communications teams and designers who own a palette and have been told it fails.",
    body: [
      { kind: "h", text: "What the standard asks for" },
      {
        kind: "p",
        text: "WCAG 2.2 asks for a contrast ratio of at least 4.5:1 for text, and 3:1 for large text, which it defines as at least 18 point, or 14 point bold. User interface components and meaningful graphics need 3:1 against what sits next to them. Colour also cannot be the only way information is shown. Text that is part of a logo or brand name has no contrast requirement.",
      },
      {
        kind: "p",
        text: "This is the most common failure there is. WebAIM’s 2026 study of the top million home pages found low-contrast text on 83.9% of them, with an average of 34 instances a page.",
      },
      {
        kind: "quote",
        text: "Most palettes do not fail. Particular pairings fail.",
      },
      { kind: "h", text: "What that looks like on a real palette" },
      {
        kind: "p",
        text: "Our own logo uses six colours, one for each language in the display at the top of our home page. Against white, the blue measures 6.16:1, the violet 5.72:1 and the pink 4.84:1, so all three could carry body text. The orange measures 4.30:1, the green 4.38:1 and the amber 3.65:1. Those three fail for small text and pass for large text.",
      },
      {
        kind: "p",
        text: "We did not change the colours. We changed their jobs. All six appear at display size and in the logo. All the small text on the site is near-black or dark grey, at 7.23:1 or better, even the small caption directly above the coloured display. The brand keeps its colour, and no one has to read 14-pixel amber.",
      },
      { kind: "h", text: "How to check a palette" },
      {
        kind: "list",
        items: [
          "List every pair: each text colour on each background it will sit on, including hover states and text over photographs.",
          "Mark each pair as good for body text, good for large text only, or failing.",
          "Give each colour a job from that table: text, display, fill or decoration.",
          "Where a colour has to carry small text, darken it slightly rather than replacing it. Readers recognise the hue, not the exact value.",
          "Find what colour alone is saying, such as links, errors and chart lines, and add an underline, an icon or a label.",
        ],
      },
      { kind: "h", text: "Write it down" },
      {
        kind: "p",
        text: "A palette survives handover when the guidelines say what each colour may do, not only what its value is. Put the table in the brand guide. The next person to build a campaign page will not have to work it out, and the brand will still look like itself.",
      },
    ],
    sources: [
      {
        title: "Understanding Success Criterion 1.4.3: Contrast (Minimum), W3C",
        href: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
      },
      {
        title: "Understanding Success Criterion 1.4.11: Non-text Contrast, W3C",
        href: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html",
      },
      {
        title: "Understanding Success Criterion 1.4.1: Use of Color, W3C",
        href: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html",
      },
      {
        title: "The WebAIM Million, WebAIM, 2026",
        href: "https://webaim.org/projects/million/",
      },
    ],
  },
];

export function readingMinutes(insight: Insight) {
  const text = [
    insight.lead,
    ...insight.body.flatMap((block) =>
      block.kind === "list" ? block.items : [block.text]
    ),
  ].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

export const getInsight = (slug: string) =>
  INSIGHTS.find((insight) => insight.slug === slug);
