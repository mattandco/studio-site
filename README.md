# Matthew's two websites

One codebase, two sites (Matthew, 10 November 2026):

| Site | Address | Vercel project | Built with |
|---|---|---|---|
| Nestvested, the company | https://nestvested.co | `nestvested.co` | no setting |
| Matthew Bowman, his own | https://mattbowman.vercel.app | `matthew-bowman` | `WEBSITE=matthew-bowman` |

Both Vercel projects build from this repository's `main`, so one push publishes both.
Everything that differs between them reads `lib/website.ts`:

- the facts (name, email, address): `content/site.ts`
- the wording: Nestvested's in `content/translations/*.json`, Matthew's own (first person)
  in `content/translations/matthew-bowman/*.json`. A change to shared wording goes in both.
  Check with `node scripts/check-translations.mjs`, which checks both sets.
- the hero: `components/Hero.tsx` turns through the languages; Matthew's own site uses
  `components/HeroFixedLine.tsx`, one fixed line
- the opening, header, structured record, search-engine rules and procurement pack

Matthew's own site is kept out of search engines. To see it locally:
`WEBSITE=matthew-bowman npm run dev`.

Until 10 November 2026 Matthew's own site was a separate copy in `mattandco/matthew-bowman`;
that repository is archived.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
