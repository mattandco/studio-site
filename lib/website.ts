// Which of the two sites this build is. Both come from this one codebase (Matthew,
// 10 November 2026): the Vercel project "nestvested.co" builds Nestvested's site, and
// the project "matthew-bowman" sets WEBSITE=matthew-bowman and builds Matthew's own.
// Everything that differs between them reads this: the facts in content/site.ts, the
// wording in content/translations/ or content/translations/matthew-bowman/, the hero,
// the opening, the header, the structured record and the search-engine rules.
export const PERSONAL = process.env.WEBSITE === "matthew-bowman";
