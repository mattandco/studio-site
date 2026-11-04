import type { Metadata } from "next";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description: "How the Nestvested website was tested against WCAG 2.1 AA, what was found, and how to report a problem.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <section aria-labelledby="statement-title" className="wrap page-top">
      <h1 id="statement-title" className="post-title">
        Accessibility statement
      </h1>
      <div className="plain-page">
        <p>
          This statement covers nestvested.co. We aim for WCAG 2.1 level AA. We last tested the
          site on {SITE.accessibilityTested}.
        </p>

        <h2 className="body-heading">How it was tested</h2>
        <ul>
          <li>Every page type was tested: home, case study, insights list, article and this page.</li>
          <li>Automated: axe-core, with its WCAG 2.0, 2.1 and 2.2 A and AA rules, and Lighthouse.</li>
          <li>Keyboard: scripted key presses through the skip link, the menu, the contact form and the hero’s pause button, with a check that focus stays visible.</li>
          <li>Widths from 320 to 1,920 pixels, checked for sideways scrolling.</li>
          <li>With reduced motion turned on, the hero stays still on its first language.</li>
        </ul>

        <h2 className="body-heading">What we know is not done</h2>
        <ul>
          <li>The site has not been tested by a person using a screen reader.</li>
          <li>The site is in English only. The moving display in the hero is decorative and hidden from screen readers.</li>
        </ul>

        <h2 className="body-heading">Report a problem</h2>
        <p>
          Write to{" "}
          <a href={`mailto:${SITE.email}`} className="link">
            {SITE.email}
          </a>{" "}
          and a named person will reply.
        </p>

        <h2 className="body-heading">Security note</h2>
        <p>
          The site runs on Vercel and is served over HTTPS. It has no accounts and no analytics. It
          sets no cookies of its own. The contact form stores nothing: it opens a message in your
          own email app.
        </p>
      </div>
    </section>
  );
}
