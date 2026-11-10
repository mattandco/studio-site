"use client";

// The hero of Matthew's own site: one fixed line, "Technology Consultant", in English on
// every language page, rising once after the opening. Nestvested's hero (Hero.tsx) turns
// through the five languages instead.

import { useEffect, useState } from "react";
import { HERO_LANGUAGES, HERO_LINE, setLogoStep } from "@/lib/hero";
import DiscussLink from "@/components/DiscussLink";
import type { Lang } from "@/lib/languages";

type Phase = "intro" | "none" | "hide";

function Letters({ text, offset, phase, generation }: { text: string; offset: number; phase: Phase; generation: number }) {
  return (
    <>
      {Array.from(text).map((part, index) => {
        const step = offset + index;
        const animation = phase === "intro" ? `heroRise 1.5s cubic-bezier(.16,1,.3,1) ${200 + step * 64}ms both` : "none";
        return (
          <span key={`${generation}${index}`} className="hero-unit">
            <span style={phase === "hide" ? { animation, transform: "translateY(112%)" } : { animation }}>{part === " " ? " " : part}</span>
          </span>
        );
      })}
    </>
  );
}

type HeroText = {
  title: string;
  statement: string;
  facts: string[];
  seeWork: string;
  discuss: string;
};

export default function HeroFixedLine({ lang, text }: { lang: Lang; text: HeroText }) {
  // The line is fixed and in English on every language page; the logo shows the page's language.
  const start = Math.max(0, HERO_LANGUAGES.findIndex(({ code }) => code === lang));
  const [phase, setPhase] = useState<Phase>("intro");
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    setLogoStep(start);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- the media query only exists in the browser
      setPhase("none");
      return;
    }
    // Behind the opening animation the letters wait, then rise as the sheet lifts.
    const begin = () => {
      setPhase("intro");
      setGeneration((value) => value + 1);
    };
    if ((window as Window & { __nvCovered?: boolean }).__nvCovered) {
      setPhase("hide");
      window.addEventListener("nv-uncover", begin, { once: true });
    }
    return () => {
      window.removeEventListener("nv-uncover", begin);
      setLogoStep(0);
    };
  }, [start]);

  const { first, second, colour } = HERO_LINE;

  return (
    <section aria-labelledby="home-title" className="wrap hero">
      <div className="hero-top">
        <div className="hero-caption" />
        <p
          aria-hidden="true"
          className="hero-display"
          style={{
            color: colour,
            // The size the design gave its longer lines: at 320px wide, "Technology" fits.
            fontSize: "clamp(50px,10.8vw,188px)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          <span lang="en" className="hero-lines">
            <span>
              <Letters text={first} offset={0} phase={phase} generation={generation} />
            </span>
            <span className="hero-line-end">
              <Letters text={second} offset={Array.from(first).length} phase={phase} generation={generation} />
            </span>
          </span>
        </p>
      </div>
      <div className="hero-foot">
        <div className="hero-copy">
          <h1 id="home-title" className="hero-title">
            {text.title}
          </h1>
          <p className="hero-lede">{text.statement}</p>
        </div>
        <div className="hero-links">
          <DiscussLink className="link">{text.discuss}</DiscussLink>
          <a href="#work" className="link-quiet">
            {text.seeWork}
          </a>
        </div>
      </div>
      <ul className="fact-row hero-facts">
        {text.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </section>
  );
}
