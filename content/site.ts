import { PERSONAL } from "@/lib/website";

// Company facts. The name and address are as printed on Nestvested Limited's
// invoices; the phone is the one the previous site published.
const NESTVESTED = {
  name: "Nestvested",
  legalName: "Nestvested Limited",
  addressLines: ["35 Lady Musgrave Road, Building 18", "Kingston, Jamaica"],
  founder: "Matthew Bowman",
  email: "hello@nestvested.co",
  phone: "+1 876 881 8780",
  phoneHref: "tel:+18768818780",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nestvested.co",
};

// Matthew's own facts. The address is the one printed on his invoices; the phone
// is the one the previous site published.
const MATTHEW_BOWMAN = {
  name: "Matthew Bowman",
  legalName: "Matthew Bowman",
  addressLines: ["35 Lady Musgrave Road, Building 18", "Kingston, Jamaica"],
  founder: "Matthew Bowman",
  email: "matthew.bowman.consult@gmail.com",
  phone: "+1 876 881 8780",
  phoneHref: "tel:+18768818780",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mattbowman.vercel.app",
};

export const SITE = PERSONAL ? MATTHEW_BOWMAN : NESTVESTED;
