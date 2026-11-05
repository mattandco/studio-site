"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { HERO_LANGUAGES, setHeroIndex } from "@/lib/hero";
import DiscussLink from "@/components/DiscussLink";
import type { Lang } from "@/lib/languages";

type Phase = "intro" | "in" | "out" | "none";

const HOLD = 3400;

function units(text: string, code: string) {
  return code === "ar" ? text.split(" ").length : Array.from(text).length;
}

function duration(index: number, phase: Phase) {
  const { code, first, second } = HERO_LANGUAGES[index];
  const count = units(first, code) + units(second, code) - 1;
  const ar = code === "ar";
  if (phase === "out") return 700 + count * (ar ? 90 : 24);
  if (phase === "in") return 1300 + count * (ar ? 150 : 46);
  return 1700 + count * (ar ? 180 : 64);
}

// Arabic moves by whole words so its letters stay joined; the rest by letter.
function Letters({
  text,
  offset,
  code,
  phase,
  generation,
}: {
  text: string;
  offset: number;
  code: string;
  phase: Phase;
  generation: number;
}) {
  const ar = code === "ar";
  const parts = ar ? text.split(" ") : Array.from(text);
  return (
    <>
      {parts.map((part, index) => {
        const step = offset + index;
        const animation =
          phase === "none"
            ? "none"
            : phase === "out"
              ? `heroLeave .7s cubic-bezier(.7,0,.84,0) ${step * (ar ? 90 : 24)}ms both`
              : phase === "in"
                ? `heroRise 1.3s cubic-bezier(.16,1,.3,1) ${step * (ar ? 150 : 46)}ms both`
                : `heroRise 1.5s cubic-bezier(.16,1,.3,1) ${200 + step * (ar ? 180 : 64)}ms both`;
        return (
          <Fragment key={`${generation}${code}${index}`}>
            {ar && index > 0 ? " " : null}
            <span className="hero-unit">
              <span style={{ animation }}>{part === " " ? " " : part}</span>
            </span>
          </Fragment>
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
  pause: string;
  play: string;
  discuss: string;
};

export default function Hero({ lang, text }: { lang: Lang; text: HeroText }) {
  // The display opens on the page's own language, then turns through the rest.
  const start = Math.max(0, HERO_LANGUAGES.findIndex(({ code }) => code === lang));
  const [index, setIndex] = useState(start);
  const [phase, setPhase] = useState<Phase>("intro");
  const [generation, setGeneration] = useState(0);
  const [paused, setPaused] = useState(false);

  const section = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const live = useRef({ index: start, phase: "intro" as Phase, paused: false, reduced: false, visible: true });
  const stepRef = useRef<() => void>(() => {});

  const schedule = useCallback((ms: number) => {
    clearTimeout(timer.current);
    if (!live.current.paused && !live.current.reduced) {
      timer.current = setTimeout(() => stepRef.current(), ms);
    }
  }, []);

  const show = useCallback((next: number) => {
    live.current.index = next;
    live.current.phase = "in";
    setIndex(next);
    setPhase("in");
    setGeneration((value) => value + 1);
    setHeroIndex(next);
  }, []);

  useEffect(() => {
    stepRef.current = () => {
      if (!live.current.visible || document.hidden) {
        schedule(1000);
        return;
      }
      const from = live.current.index;
      const next = (from + 1) % HERO_LANGUAGES.length;
      live.current.phase = "out";
      setPhase("out");
      timer.current = setTimeout(() => {
        show(next);
        schedule(duration(next, "in") + HOLD);
      }, duration(from, "out"));
    };
  }, [schedule, show]);

  useEffect(() => {
    setHeroIndex(start);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    live.current.reduced = reduced;
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- the media query only exists in the browser
      setPhase("none");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        live.current.visible = Boolean(entries[0]?.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (section.current) observer.observe(section.current);
    schedule(duration(start, "intro") + HOLD);
    return () => {
      clearTimeout(timer.current);
      observer.disconnect();
      setHeroIndex(0);
    };
  }, [schedule, start]);

  const toggle = () => {
    clearTimeout(timer.current);
    if (live.current.paused) {
      live.current.paused = false;
      setPaused(false);
      schedule(2000);
      return;
    }
    if (live.current.phase === "out") {
      show((live.current.index + 1) % HERO_LANGUAGES.length);
    }
    live.current.paused = true;
    setPaused(true);
  };

  const language = HERO_LANGUAGES[index];
  const { code } = language;
  const ar = code === "ar";
  const joined = ar || code === "zh";
  const long = code === "fr" || code === "es";

  return (
    <section ref={section} aria-labelledby="home-title" className="wrap hero">
      <div className="hero-top">
        <div className="hero-caption">
          <span aria-hidden="true" className="hero-caption-text">
            <span className="tabular">{`0${index + 1} / 06`}</span>
            <span lang={code} dir={ar ? "rtl" : "ltr"}>
              {language.name}
            </span>
          </span>
          <button type="button" onClick={toggle} className="hero-pause">
            {paused ? (
              <span aria-hidden="true" className="hero-play-icon" />
            ) : (
              <span aria-hidden="true" className="hero-pause-icon">
                <span />
                <span />
              </span>
            )}
            <span>{paused ? text.play : text.pause}</span>
          </button>
        </div>
        <p
          aria-hidden="true"
          className="hero-display"
          style={{
            color: language.colour,
            fontSize: long ? "clamp(50px,10.8vw,188px)" : "clamp(60px,12.6vw,216px)",
            lineHeight: ar ? 1.3 : code === "zh" ? 1.12 : 1,
            letterSpacing: joined ? 0 : "-0.05em",
          }}
        >
          <span dir={ar ? "rtl" : "ltr"} lang={code} className="hero-lines">
            <span>
              <Letters text={language.first} offset={0} code={code} phase={phase} generation={generation} />
            </span>
            <span className="hero-line-end">
              <Letters
                text={language.second}
                offset={units(language.first, code)}
                code={code}
                phase={phase}
                generation={generation}
              />
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
