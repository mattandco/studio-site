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
  context: string[];
  objectives: string[];
  approach: string[];
  standards: { label: string; value: string }[];
  results: string[];
  clientTeam: string;
  next: string;
};

// Every figure below comes from a dated measurement in the project's own
// records, or from a test of the live site. Name only what each client has
// cleared for publication.
export const PROJECTS: Project[] = [
  {
    slug: "collective-service",
    name: "The Collective Service",
    type: "Partnership",
    year: "2026",
    scope: "Website audit, design, build and document library",
    line: "Partnership · 2026 · Audit, design and build, in testing before relaunch",
    languages: "English first, more planned",
    status: { label: "Status", text: "In testing. Not yet launched" },
    summary:
      "A lighter website and document library for people working in health emergencies, now in testing before its relaunch.",
    cardImage: { src: "/work/collective-service-knowledge-bank.jpg" },
    detailImage: {
      src: "/work/collective-service-documents.jpg",
      alt: "The Knowledge bank page: a box for describing a situation above a picture of the library’s documents grouped by theme.",
      caption: "The Knowledge bank on the new site, an experimental part of the build.",
    },
    figures: [
      { value: "283 KB", label: "Home page as it opens on a phone, against a 500 KB budget. Measured 24 October 2026" },
      { value: "30", label: "Page templates measured against WCAG 2.2 AA. Measured 22 October 2026" },
      { value: "279", label: "Documents read into the Knowledge bank. Measured 4 November 2026" },
    ],
    context: [
      "The Collective Service is a global partnership for risk communication and community engagement in health emergencies. Its website is the partnership’s public library and its front door: guidance, tools, training and data for the people who have to reach communities during an outbreak.",
      "The people it has to serve first are coordinators and responders, many of them working in remote places on slow connections. Partners, researchers, ministries of health and field teams use it too.",
      "Much of the library dated from the COVID-19 years. The job was to bring current guidance to the front and to make the whole site lighter and easier to use for people working in remote areas.",
    ],
    objectives: [
      "Make the site lighter and more accessible for partners in remote areas, with a budget of 500 KB a page.",
      "Review the content, update what matters now, and retire what is out of date.",
      "Build a document library with search, emergency kits and redirects from every old address.",
      "Hand the site to the partnership’s own editors, with testing, training and a relaunch.",
    ],
    approach: [
      "We started by counting. Everything on the old site was read from its own database rather than estimated from a crawl, and every kit was read document by document. A questionnaire in English and French went to the people who use the site and to the partnership’s own team.",
      "The design was reviewed on a working copy of the site, not on pictures. Reviewers pinned comments directly to the pages, and each one was tracked to a fix or a decision.",
      "The site is WordPress with a custom theme of 30 page templates. Content comes across through a repeatable importer, and a redirect map covers all 1,593 old addresses. Documents that were only linked to are now held by the site, so they keep working if a publisher’s page moves. Each download states its format and size before it is pressed.",
      "The Knowledge bank reads the library’s own documents and groups them by theme. A reader describes a situation and gets advice drawn only from those documents, with every point cited. When the library has no answer, it says so.",
    ],
    standards: [
      {
        label: "Accessibility",
        value:
          "WCAG 2.2 AA on all 30 page templates, by scripted tests in headless Chrome with real keyboard input, at desktop and phone widths. Other organisations’ PDFs and embedded reports are excepted. A screen-reader test by a person is part of the final review.",
      },
      {
        label: "Languages",
        value:
          "English. Where publishers offer them, documents also carry their French, Portuguese, Spanish and Swahili versions.",
      },
      {
        label: "Performance",
        value:
          "500 KB budget, about 10 seconds at 400 kilobits per second. The home page is 245 KB to 283 KB as it opens on a phone, and 530 KB to 563 KB if scrolled to the very end.",
      },
      {
        label: "Security",
        value: "Three layers of backup: host restore points, a nightly database copy and the code repository, checked by script.",
      },
    ],
    results: [
      "The site has not launched, so there are no visitor results to report yet. Until the relaunch, the partnership’s public address still shows the old site.",
      "What can be reported is what was tested. On 23 October 2026 a crawl of 332 pages and 634 links to other sites found none broken. Every page is checked from 320 to 1,920 pixels wide.",
    ],
    clientTeam: "The Collective Service Secretariat",
    next: "Questions asked and answered in French, Spanish and Arabic, from the same library, with every answer still cited to its source.",
  },
  {
    slug: "global-girls-foundation",
    name: "Global Girls Foundation",
    type: "Foundation",
    year: "2026",
    scope: "Website redesign, WordPress build and online giving",
    line: "Foundation · 2026 · Website redesign and online giving",
    languages: "English",
    status: {
      label: "Live site",
      text: "globalgirlsfoundation.org",
      href: "https://globalgirlsfoundation.org",
    },
    summary:
      "A new website for a Swiss foundation created by Plan International, with online giving in three currencies and pages its own team can edit.",
    cardImage: { src: "/work/global-girls-foundation-home.jpg" },
    detailImage: {
      src: "/work/global-girls-foundation-giving.jpg",
      alt: "A section of the Global Girls Foundation home page headed Three ways to invest in girls, with three columns: Annual Giving Fund, Designated Gifts and The Endowment.",
      caption: "The giving options on the Foundation’s home page.",
    },
    figures: [
      { value: "3", label: "Currencies for one-time and monthly gifts: Swiss francs, euros and US dollars" },
      { value: "100", label: "Lighthouse accessibility score, live home and giving pages. Measured 4 November 2026" },
      { value: "14.0 s", label: "Live home page fully loaded on a 3G profile of 400 kbit/s and 2 s latency. Measured 4 November 2026" },
    ],
    context: [
      "The Global Girls Foundation is a Swiss foundation, established in 2022, created by Plan International to fund its programmes for girls. Its website speaks to major donors, family and corporate foundations, institutional funders and individual supporters.",
      "Its earlier site was 11 pages on Plan International’s WordPress platform. It had no integrated way to give, and it was hard to manage and to find things on.",
    ],
    objectives: [
      "Say clearly what the Foundation is and why a donor should give to it.",
      "Give each kind of donor a clear route from first visit to gift.",
      "Take secure one-time and monthly gifts in more than one currency.",
      "Let the Foundation’s own team edit every page without breaking the design.",
    ],
    approach: [
      "The work began with a review of the old site and a written plan for the audiences and their journeys.",
      "The design was built as a working review site with comments on the page. The Foundation’s team reviewed real pages on real screens, and only approved pages moved to WordPress.",
      "The site is a WordPress block theme with a companion plugin of section blocks. Editors work on the page as it will appear: they change text in place, add sections from a picture menu, and the site checks each page against its rules before it publishes. The content came across through a scripted import, and the team was trained on a live call, with a 31-step guide kept in the admin area.",
      "One-time gifts are taken on the page itself and monthly gifts on Stripe’s hosted page, so card details are handled by Stripe and never by the site.",
    ],
    standards: [
      {
        label: "Accessibility",
        value:
          "Lighthouse accessibility 100 on the live home and giving pages, 4 November 2026. An axe-core run across 16 pages before launch found no confirmed violations. No screen-reader test by a person is on record yet.",
      },
      { label: "Languages", value: "English" },
      {
        label: "Performance",
        value:
          "Home page 546 KB, giving page 395 KB. On the 3G profile the home page shows first content at 6.8 s and its main content at 12.5 s.",
      },
      {
        label: "Security",
        value: "Hosted in Belgium on WP Engine · HTTPS with HSTS · daily backup points · card details held by Stripe",
      },
    ],
    results: [
      "The site went live on 9 October 2026, with all 21 pages and 23 redirects answering correctly on the day. One-time and monthly gifts were both confirmed with real payments by 12 October.",
      "For the first time the Foundation can take a gift on its own site, and its staff have been trained to run the pages themselves.",
    ],
    clientTeam: "Global Girls Foundation staff",
    next: "Pages in German and French, translated by machine and checked by the Foundation’s team before anything is published.",
  },
];

export const getProject = (slug: string) =>
  PROJECTS.find((project) => project.slug === slug);

export function nextProject(slug: string) {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  return PROJECTS[(index + 1) % PROJECTS.length];
}
