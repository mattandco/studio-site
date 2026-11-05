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
  beforeAfter: { label: string; before: string; after: string }[];
  results: string[];
  lessons: string[];
  standards: { label: string; value: string }[];
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
    scope: "Website audit, complete rebuild, brand identity and document library",
    line: "Partnership · 2026 · Complete rebuild and new identity, in testing before relaunch",
    languages: "English first, more planned",
    status: { label: "Status", text: "In testing. Not yet launched" },
    summary:
      "How a health-emergency partnership’s website was rebuilt from the ground up, with a new identity, so that people on slow connections can reach current guidance. Now in testing before its relaunch.",
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
    challenge: [
      "The Collective Service is a global partnership for risk communication and community engagement in health emergencies. Its website was set up in 2020 as a central library of guidance. It is still the partnership’s front door: the place coordinators and responders go for tools, training and data when they have to reach communities during an outbreak.",
      "Six years on, the site was still shaped by the pandemic it was built for. Most of its library dated from 2020 to 2022, while the emergencies people were working on had moved on.",
      "The people who most need it are also the hardest to reach. In a 2022 survey of people sharing emergency-health course content, poor connectivity was the most-cited difficulty in low-income countries, at 29%, against 8% in high-income countries. The median home page on a phone was 2.56 MB in 2025, which takes about 51 seconds at 400 kilobits per second. That is too long for a coordinator who needs a document now.",
      "The partnership had a recognition problem too. A 2023 evaluation found its purpose under-communicated, and its logo was the name alone, with no symbol to carry it.",
    ],
    goals: [
      "Make every page light enough for a slow connection, with a budget of 500 KB a page.",
      "Bring current guidance to the front and retire what is out of date.",
      "Build a document library with search, emergency kits and redirects from every old address.",
      "Hand the site to the partnership’s own editors, with testing, training and a relaunch.",
    ],
    decisions: [
      {
        title: "Rebuild from the ground up",
        text: "Updating the old site page by page would have kept the structure and weight it needed to lose. So every page was rebuilt: a custom WordPress theme of 30 page templates, a new editing side, and content brought across through a repeatable importer that can be rerun and checked.",
      },
      {
        title: "Set the weight limit before the design",
        text: "Every page had to stay under 500 KB, about 10 seconds at 400 kilobits per second. Setting that limit first meant every template was built to it. Each download also states its format and size before it is pressed, so nobody spends scarce data on a file they did not expect.",
      },
      {
        title: "Hold every document on the site",
        text: "Many documents were only linked to, so they would stop working if a publisher moved a page. We fetched 155 of them, so the site now holds its own copies, with French, Portuguese, Spanish and Swahili versions where publishers offer them. Documents listed two, three or four times now appear once, with their other languages on the same page.",
      },
      {
        title: "Propose a new identity, not only a new site",
        text: "The old logo stopped working below about 100 pixels wide: in a browser tab, as an app icon or in a row of partner logos. We proposed a new mark that shows separate organisations acting as one service. It stays legible at 16 pixels and comes with rules for colour, clear space and minimum size. The name stays the same. The new site carries the identity, with new colours and type throughout.",
      },
      {
        title: "Build for the people who will run it",
        text: "A library only stays current if its own team can keep it current. The editing side has one form for each kind of content, and each form lists what is still missing before it can be published. Adding a document means pasting its address: its format, size and page count fill in by themselves. A built-in guide shows editors each job, screen by screen.",
      },
      {
        title: "Try a new way into the library",
        text: "Search only helps people who know the right words. The Knowledge bank lets a reader describe a situation in their own words and get advice drawn only from the library’s documents, with every point cited. When the library has no answer, it says so. It is an experimental part of the build.",
      },
    ],
    beforeAfter: [
      {
        label: "The website",
        before: "The site set up in 2020",
        after: "Rebuilt from the ground up, with 30 page templates",
      },
      {
        label: "The library",
        before: "Mostly from 2020 to 2022",
        after: "Current guidance first, with out-of-date material left out",
      },
      {
        label: "Documents",
        before: "Many only linked to on other sites",
        after: "Held by the site itself, including 155 fetched from publishers",
      },
      {
        label: "Repeated entries",
        before: "Some listed up to four times",
        after: "Each listed once, with its languages together",
      },
      {
        label: "The logo",
        before: "The name alone",
        after: "A proposed mark, legible at 16 pixels",
      },
      {
        label: "Old addresses",
        before: "1,593 across the old site",
        after: "Every one mapped to a place on the new site",
      },
    ],
    results: [
      "The site has not launched, so there are no visitor results to report yet. Until the relaunch, the partnership’s public address still shows the old site.",
      "What can be reported is what was tested. On 23 October 2026 a crawl of 332 pages and 634 links to other sites found none broken. Every page is checked from 320 to 1,920 pixels wide. Visitor measurement is built in and loads only after a visitor consents, so the relaunch can be judged on real use.",
    ],
    lessons: [
      "Count before you design. Reading the site’s own database, rather than estimating from a crawl, showed how much of the library belonged to another time, and that changed the plan.",
      "Weight is a design decision. Set the limit first and every template is built to it.",
      "Show people real pages. Reviewers pinned comments to the working site, so each point was about something they could see and could be tracked to a fix or a decision.",
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
    clientTeam: "The Collective Service Secretariat",
    next: "Questions asked and answered in French, Spanish and Arabic, from the same library, with every answer still cited to its source.",
  },
  {
    slug: "global-girls-foundation",
    name: "Global Girls Foundation",
    type: "Foundation",
    year: "2026",
    scope: "Website redesign, WordPress build and fundraising platform integration",
    line: "Foundation · 2026 · Website redesign and fundraising platform integration",
    languages: "English",
    status: {
      label: "Live site",
      text: "globalgirlsfoundation.org",
      href: "https://globalgirlsfoundation.org",
    },
    summary:
      "How a Swiss foundation created by Plan International got a website of its own, built to speak to philanthropists and to take gifts in three currencies.",
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
    challenge: [
      "The Global Girls Foundation is a Swiss foundation, established in 2022, created by Plan International to fund its programmes for girls. Its website has to reach philanthropists and the people around them: family offices, advisers and lawyers, as well as family and corporate foundations.",
      "Its website did not match that ambition. It was 11 pages on Plan International’s WordPress platform, hard to manage and to find things on, and it had no integrated way to give.",
      "The new site had two jobs that pull in different directions. It had to read as a serious institution to someone thinking about a legacy or an endowment, and it still had to take a gift by card from anyone who wanted to give today.",
    ],
    goals: [
      "Say clearly what the Foundation is and why a donor should give to it.",
      "Give each kind of donor a clear route from first visit to gift.",
      "Take secure one-time and monthly gifts in more than one currency.",
      "Let the Foundation’s own team edit every page without breaking the design.",
    ],
    decisions: [
      {
        title: "Offer a conversation as well as a checkout",
        text: "A major gift usually starts with a conversation. So the first screen offers two routes side by side: give now, or start a conversation. The Annual Giving Fund and the endowment are reached only through a conversation.",
      },
      {
        title: "Let the donor name the amount",
        text: "Earlier versions offered preset gift levels. After seeing them, the Foundation asked for them to go, so the giving panel opens with one empty box and sets no upper limit of its own. A gift above what a card can carry shows the bank details instead, and any donor can ask for those at any size.",
      },
      {
        title: "Keep card details off the site",
        text: "One-time gifts are taken on the page itself and monthly gifts on Stripe’s hosted page, so card details are handled by Stripe and never by the site. The panel still works as a plain form if scripts are turned off.",
      },
      {
        title: "Build the editor around the page",
        text: "The Foundation’s staff needed to run the site themselves. Editors work on the page as it will appear: they change text in place, add sections from a picture menu, and the site checks each page against its rules before it publishes. The WordPress admin was restyled in the Foundation’s own look, with a 31-step guide kept inside it.",
      },
      {
        title: "Review real pages, not pictures",
        text: "The design was built as a working review site with comments on the page. The Foundation’s team reviewed real pages on real screens, and only approved pages moved to WordPress.",
      },
      {
        title: "Move without losing the old addresses",
        text: "The Foundation’s domain sat with Plan International, so the move depended on its IT team. We sent the exact changes needed, and every old address was set to redirect to its new home. On launch day all 21 pages and 23 redirects answered correctly.",
      },
    ],
    beforeAfter: [
      { label: "Pages", before: "11", after: "21" },
      {
        label: "Where it lives",
        before: "Plan International’s WordPress platform",
        after: "Its own WordPress site, hosted in Belgium",
      },
      {
        label: "Giving",
        before: "No integrated way to give",
        after: "One-time and monthly gifts in Swiss francs, euros and US dollars",
      },
      {
        label: "Editing",
        before: "Hard to manage",
        after: "Edited on the page by the Foundation’s own team",
      },
    ],
    results: [
      "The site went live on 9 October 2026, with all 21 pages and 23 redirects answering correctly on the day. One-time and monthly gifts were both confirmed with real payments by 12 October.",
      "For the first time the Foundation can take a gift on its own site, and its staff have been trained to run the pages themselves. Giving totals belong to the Foundation and are not published here.",
    ],
    lessons: [
      "Decide who the site is for, then let that settle the arguments. Knowing the reader was a philanthropist made most questions about wording and giving easier to answer.",
      "Expect the giving rules to change. Gift levels, limits and currencies all changed close to launch, so the giving panel had to be easy to change.",
      "When a launch depends on another organisation’s team, send the exact change, not a general request.",
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
