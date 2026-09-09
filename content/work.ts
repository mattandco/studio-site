export type WorkItem = {
  num: string;
  name: string;
  client: string;
  title: string;
  note: string;
  scope: string;
  link: string;
  linkLabel: string;
};

// Ported verbatim from the design reference (Matthew Bowman.dc.html).
// Only StarApple and Nestvested carry outbound links — do not invent
// URLs for the IFRC / RCCE entries, they are pending client confirmation.
export const WORK: WorkItem[] = [
  {
    num: "01",
    name: "Community Engagement Hub",
    client: "IFRC · Community Engagement and Accountability",
    title: "Micro sites that make community feedback legible",
    note: "Two micro sites that synthesise and visualise community feedback and research on trust, with interactive tools reading from global surveys and operational research.",
    scope: "Two sites · Themes · Data tools",
    link: "",
    linkLabel: "",
  },
  {
    num: "02",
    name: "Collective Service",
    client: "RCCE Collective Service · UNICEF, WHO, IFRC, Gates Foundation",
    title: "A coordination platform for public health emergencies",
    note: "Feature and content development on the partnership's platform, with multi-language support and server maintenance held steady through live emergencies.",
    scope: "Platform · Multilingual · Maintenance",
    link: "",
    linkLabel: "",
  },
  {
    num: "03",
    name: "StarApple AI",
    client: "StarApple AI",
    title: "Technical direction for an AI company",
    note: "Technical vision and roadmap for the company's AI products, and the engineering leadership to build them at scale, with security, performance, and cost owned end to end.",
    scope: "Product · Engineering leadership",
    link: "https://www.starapple.ai",
    linkLabel: "starapple.ai",
  },
  {
    num: "04",
    name: "Nestvested",
    client: "Nestvested Limited",
    title: "Risk adjudication, automated at the front door",
    note: "A cloud platform that automates early-stage risk adjudication for financial firms, designed end to end and delivered with a fourteen-person team.",
    scope: "Web app · Design · Delivery",
    link: "https://www.nestvested.co",
    linkLabel: "nestvested.co",
  },
  {
    num: "05",
    name: "Loansnest",
    client: "Loansnest",
    title: "Lending where credit infrastructure is thin",
    note: "Machine-learning scoring for applicants in markets with limited credit-rating infrastructure, shipped on the web and the App Store.",
    scope: "Web · iOS · Machine learning",
    link: "",
    linkLabel: "",
  },
  {
    num: "06",
    name: "Wilber",
    client: "Wilber",
    title: "Agreements signed from a phone",
    note: "A mobile and web application for creating, signing, and sending legally binding agreements from a library of plain-English templates.",
    scope: "Mobile · Web · Product design",
    link: "",
    linkLabel: "",
  },
];
