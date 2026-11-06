// Where each project's desktop and phone screenshots sit, as placed in the design.
export type Place = { left?: string; right?: string; top?: string; bottom?: string; width: string };

export type StackLabel =
  | "newSite"
  | "newSiteHome"
  | "newSiteCountries"
  | "detailedWireframe"
  | "roughWireframe"
  | "original";

export type StackLayer = { label: StackLabel; tone: "new" | "detailed" | "rough" | "original"; desktop: string; phone: string };

export type Stack = {
  desktop: Place;
  phone: Place;
  // How far each screenshot trails as the next layer slides in, as a percentage of its height.
  lag: { desktop: number; phone: number };
  layers: StackLayer[];
};

const file = (name: string) => `/work/mock/${name}`;

const layers = (key: string, original: boolean): StackLayer[] => [
  { label: "newSite", tone: "new", desktop: file(`${key}-after-desktop.jpg`), phone: file(`${key}-after-phone.jpg`) },
  { label: "detailedWireframe", tone: "detailed", desktop: file(`${key}.svg`), phone: file(`${key}-phone.svg`) },
  { label: "roughWireframe", tone: "rough", desktop: file(`${key}-lo.svg`), phone: file(`${key}-lo-phone.svg`) },
  ...(original
    ? [
        {
          label: "original" as const,
          tone: "original" as const,
          desktop: file(`${key}-before-desktop.jpg`),
          phone: file(`${key}-before-phone.jpg`),
        },
      ]
    : []),
];

export const CARDS: Record<string, { desktopSrc: string; phoneSrc: string; desktop: Place; phone: Place }> = {
  "collective-service": {
    desktopSrc: file("cs-after-desktop.jpg"),
    phoneSrc: file("cs-after-phone.jpg"),
    desktop: { left: "5%", top: "15%", width: "82%" },
    phone: { left: "82%", top: "33%", width: "15%" },
  },
  "global-girls-foundation": {
    desktopSrc: file("ggf-after-desktop.jpg"),
    phoneSrc: file("ggf-after-phone.jpg"),
    desktop: { left: "22%", top: "3%", width: "100%" },
    phone: { left: "6%", top: "40.8%", width: "34%" },
  },
  "community-trust-index": {
    desktopSrc: file("cti-after-desktop.jpg"),
    phoneSrc: file("cti-after-phone.jpg"),
    desktop: { left: "8%", top: "9%", width: "100%" },
    phone: { right: "8%", top: "30%", width: "38%" },
  },
  "dual-diploma-switzerland": {
    desktopSrc: file("dd-after-desktop.jpg"),
    phoneSrc: file("dd-after-phone.jpg"),
    desktop: { left: "6%", top: "18%", width: "100%" },
    phone: { right: "2%", bottom: "2%", width: "34%" },
  },
};

export const STACKS: Record<string, Stack> = {
  "collective-service": {
    desktop: { left: "5%", top: "15%", width: "82%" },
    phone: { left: "82%", top: "33%", width: "15%" },
    lag: { desktop: 6, phone: 24 },
    layers: layers("cs", true),
  },
  "global-girls-foundation": {
    desktop: { left: "28%", top: "15%", width: "80%" },
    phone: { left: "10%", top: "7%", width: "19.5%" },
    lag: { desktop: 16, phone: 6 },
    layers: layers("ggf", true),
  },
  "community-trust-index": {
    desktop: { left: "30%", top: "6%", width: "64%" },
    phone: { left: "14%", top: "20%", width: "21%" },
    lag: { desktop: 6, phone: -20 },
    layers: [
      { label: "newSiteHome", tone: "new", desktop: file("cti-after-desktop.jpg"), phone: file("cti-after-phone.jpg") },
      { label: "newSiteCountries", tone: "new", desktop: file("cti-countries-desktop.jpg"), phone: file("cti-countries-phone.jpg") },
      ...layers("cti", false).slice(1),
    ],
  },
  "dual-diploma-switzerland": {
    desktop: { left: "3%", top: "13%", width: "76%" },
    phone: { left: "62%", top: "6%", width: "18.5%" },
    lag: { desktop: 14, phone: -16 },
    layers: layers("dd", false),
  },
};
